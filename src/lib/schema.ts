import { z } from 'zod';

// User types for authentication
export const userSchema = z.object({
  email: z.string().email(),
  role: z.enum(['doctor', 'receptionist', 'pharmacist']).optional(),
});

export type User = z.infer<typeof userSchema>;

// Patient schema
export const insertPatientSchema = z.object({
  ho_ten: z.string().min(1, 'Tên không được để trống'),
  ngay_sinh: z.string().min(1, 'Ngày sinh không được để trống'),
  dia_chi: z.string().min(1, 'Địa chỉ không được để trống'),
  so_dien_thoai: z.string().min(1, 'Số điện thoại không được để trống'),
  can_nang: z.string().min(1, 'Cân nặng không được để trống'),
  thang_tuoi: z.number().optional(),
});

export type InsertPatient = z.infer<typeof insertPatientSchema>;

// Utility functions
export const capitalizeVietnameseName = (name: string): string => {
  return name.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const calculateAge = (birthDate: string): { months: number; years: number; display: string } => {
  const birth = new Date(birthDate);
  const now = new Date();
  
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + 
                 (now.getMonth() - birth.getMonth());
  
  const years = Math.floor(months / 12);
  
  let display: string;
  if (months < 36) {
    display = `${months} tháng tuổi`;
  } else {
    const ageYears = Math.round(months / 6) / 2; // Round to nearest 0.5
    display = `${ageYears} tuổi`;
  }
  
  return { months, years, display };
};