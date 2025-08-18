-- Create profiles table for user roles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  ho_ten TEXT,
  vai_tro TEXT NOT NULL CHECK (vai_tro IN ('bacsi', 'tieptan', 'duocsi')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create patients table
CREATE TABLE IF NOT EXISTS public.patients (
  id SERIAL PRIMARY KEY,
  ho_ten TEXT NOT NULL,
  ngay_sinh DATE NOT NULL,
  dia_chi TEXT,
  so_dien_thoai TEXT,
  can_nang DECIMAL(5,2),
  thang_tuoi INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create waiting list table
CREATE TABLE IF NOT EXISTS public.waiting_list (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES public.patients(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create medicine table
CREATE TABLE IF NOT EXISTS public.thuoc (
  id SERIAL PRIMARY KEY,
  ten_thuoc TEXT NOT NULL,
  don_vi TEXT NOT NULL,
  duong_dung TEXT,
  gia_ban DECIMAL(10,2),
  so_luong_ton INTEGER DEFAULT 0
);

-- Create medical examination table
CREATE TABLE IF NOT EXISTS public.khambenh (
  id SERIAL PRIMARY KEY,
  benhnhan_id INTEGER REFERENCES public.patients(id) NOT NULL,
  bacsi_id UUID REFERENCES public.profiles(id) NOT NULL,
  ngay_kham TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  trieu_chung TEXT,
  chan_doan TEXT,
  so_ngay_toa INTEGER DEFAULT 3,
  status TEXT DEFAULT 'active'
);

-- Create prescription table
CREATE TABLE IF NOT EXISTS public.toathuoc (
  id SERIAL PRIMARY KEY,
  khambenh_id INTEGER REFERENCES public.khambenh(id) NOT NULL,
  thuoc_id INTEGER REFERENCES public.thuoc(id) NOT NULL,
  so_lan_dung INTEGER NOT NULL,
  so_luong_moi_lan INTEGER NOT NULL,
  tong_so_luong INTEGER NOT NULL,
  ghi_chu TEXT
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waiting_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.thuoc ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.khambenh ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.toathuoc ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for patients table (accessible by tieptan and bacsi)
CREATE POLICY "Reception and doctors can manage patients" ON public.patients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND vai_tro IN ('tieptan', 'bacsi')
    )
  );

-- Create policies for waiting list (accessible by tieptan and bacsi)
CREATE POLICY "Reception and doctors can manage waiting list" ON public.waiting_list
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND vai_tro IN ('tieptan', 'bacsi')
    )
  );

-- Create policies for medicine table (accessible by bacsi and duocsi)
CREATE POLICY "Doctors and pharmacists can view medicine" ON public.thuoc
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND vai_tro IN ('bacsi', 'duocsi')
    )
  );

-- Create policies for medical examination (accessible by bacsi)
CREATE POLICY "Doctors can manage examinations" ON public.khambenh
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND vai_tro = 'bacsi'
    )
  );

-- Create policies for prescriptions (accessible by bacsi and duocsi)
CREATE POLICY "Doctors and pharmacists can manage prescriptions" ON public.toathuoc
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND vai_tro IN ('bacsi', 'duocsi')
    )
  );

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, ho_ten, vai_tro)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'ho_ten', NEW.email), 'tieptan');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample medicine data
INSERT INTO public.thuoc (ten_thuoc, don_vi, duong_dung, gia_ban, so_luong_ton) VALUES
('Paracetamol 500mg', 'viên', 'Uống', 500, 1000),
('Amoxicillin 250mg', 'viên', 'Uống', 2000, 500),
('Ibuprofen 400mg', 'viên', 'Uống', 1000, 800),
('Vitamin C 500mg', 'viên', 'Uống', 300, 2000),
('ORS', 'gói', 'Pha uống', 1500, 200),
('Dextromethorphan', 'chai', 'Uống', 25000, 50),
('Loratadine 10mg', 'viên', 'Uống', 800, 300),
('Omeprazole 20mg', 'viên', 'Uống', 3000, 400)
ON CONFLICT DO NOTHING;

-- Insert sample user profiles (you'll need to update these IDs after creating users)
-- These are just examples - actual UUIDs will be generated by Supabase Auth
INSERT INTO public.profiles (id, ho_ten, vai_tro) VALUES
('11111111-1111-1111-1111-111111111111', 'Dr. Nguyễn Văn A', 'bacsi'),
('22222222-2222-2222-2222-222222222222', 'Nguyễn Thị B', 'tieptan'),
('33333333-3333-3333-3333-333333333333', 'Dương Sĩ C', 'duocsi')
ON CONFLICT (id) DO NOTHING;