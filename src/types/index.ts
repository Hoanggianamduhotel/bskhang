// Database types
export interface BenhNhan {
  benhnhan_id?: number
  ho_ten: string
  ngay_sinh: string
  dia_chi: string
  so_dien_thoai: string
  can_nang: string
  thang_tuoi?: number
}

export interface KhamBenh {
  khambenh_id?: number
  benhnhan_id: number
  ngay_kham: string
  trieu_chung: string
  chan_doan: string
  bac_si: string
}

export interface ToaThuoc {
  toathuoc_id?: number
  khambenh_id: number
  thuoc_id: number
  so_luong: number
  lieu_dung: string
  ghi_chu?: string
}

export interface Thuoc {
  thuoc_id?: number
  ten_thuoc: string
  gia: number
  don_vi: string
  so_luong_ton?: number
}

export interface DanhSachCho {
  benhnhan_id: number
  ho_ten: string
  ngay_sinh: string
  dia_chi: string
  so_dien_thoai: string
  can_nang: string
  thang_tuoi: number
  ngay_tao?: string
}

// UI types
export interface User {
  email: string
  role?: 'doctor' | 'receptionist' | 'pharmacist'
}

// Utility functions for name formatting and age calculation
export const capitalizeVietnameseName = (name: string): string => {
  return name.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const calculateAge = (birthDate: string): { months: number; years: number; display: string } => {
  const birth = new Date(birthDate)
  const now = new Date()
  
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + 
                 (now.getMonth() - birth.getMonth())
  
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  
  let display: string
  if (months < 36) {
    display = `${months} tháng tuổi`
  } else {
    const ageYears = Math.round(months / 6) / 2 // Round to nearest 0.5
    display = `${ageYears} tuổi`
  }
  
  return { months, years, display }
}