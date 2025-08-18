-- Update user roles based on email addresses
-- First, let's see what user IDs we have
SELECT id, email FROM auth.users;

-- Update roles for existing users
-- You'll need to replace the UUIDs with actual user IDs from your Supabase dashboard

-- For tieptan@example.com
UPDATE public.profiles 
SET vai_tro = 'tieptan', ho_ten = 'Nhân viên tiếp tân' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'tieptan@example.com');

-- For bsngoc@example.com  
UPDATE public.profiles 
SET vai_tro = 'bacsi', ho_ten = 'Bác sĩ Ngọc' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'bsngoc@example.com');

-- For duoc@example.com
UPDATE public.profiles 
SET vai_tro = 'duocsi', ho_ten = 'Dược sĩ' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'duoc@example.com');

-- If profiles don't exist, insert them
INSERT INTO public.profiles (id, ho_ten, vai_tro)
SELECT 
  u.id,
  CASE 
    WHEN u.email = 'tieptan@example.com' THEN 'Nhân viên tiếp tân'
    WHEN u.email = 'bsngoc@example.com' THEN 'Bác sĩ Ngọc'
    WHEN u.email = 'duoc@example.com' THEN 'Dược sĩ'
    ELSE u.email
  END as ho_ten,
  CASE 
    WHEN u.email = 'tieptan@example.com' THEN 'tieptan'
    WHEN u.email = 'bsngoc@example.com' THEN 'bacsi'
    WHEN u.email = 'duoc@example.com' THEN 'duocsi'
    ELSE 'tieptan'
  END as vai_tro
FROM auth.users u
WHERE u.email IN ('tieptan@example.com', 'bsngoc@example.com', 'duoc@example.com')
ON CONFLICT (id) DO UPDATE SET
  ho_ten = EXCLUDED.ho_ten,
  vai_tro = EXCLUDED.vai_tro;