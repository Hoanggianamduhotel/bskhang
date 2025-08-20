import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { pgTable, text, integer, serial, timestamp, boolean } from 'drizzle-orm/pg-core';

// Patient table
export const patients = pgTable('benhnhan', {
  id: serial('benhnhan_id').primaryKey(),
  ho_ten: text('ho_ten').notNull(),
  ngay_sinh: text('ngay_sinh').notNull(),
  dia_chi: text('dia_chi').notNull(),
  so_dien_thoai: text('so_dien_thoai').notNull(),
  can_nang: text('can_nang').notNull(),
  thang_tuoi: integer('thang_tuoi'),
  created_at: timestamp('created_at').defaultNow(),
});

// Medical examination table
export const examinations = pgTable('khambenh', {
  id: text('id').primaryKey(),
  benhnhan_id: integer('benhnhan_id').references(() => patients.id),
  ngay_kham: text('ngay_kham').notNull(),
  trieu_chung: text('trieu_chung').notNull(),
  chan_doan: text('chan_doan').notNull(),
  bac_si: text('bac_si').notNull(),
  so_ngay_toa: integer('so_ngay_toa').default(0),
  ngay_hen_tai_kham: text('ngay_hen_tai_kham'),
  status: text('status').default('active'),
  created_at: timestamp('created_at').defaultNow(),
});

// Medication table
export const medications = pgTable('thuoc', {
  id: serial('thuoc_id').primaryKey(),
  ten_thuoc: text('ten_thuoc').notNull(),
  gia: integer('gia').notNull(),
  don_vi: text('don_vi').notNull(),
  so_luong_ton: integer('so_luong_ton').default(0),
});

// Prescription table
export const prescriptions = pgTable('toathuoc', {
  id: serial('toathuoc_id').primaryKey(),
  khambenh_id: text('khambenh_id').references(() => examinations.id),
  thuoc_id: integer('thuoc_id').references(() => medications.id),
  so_luong: integer('so_luong').notNull(),
  lieu_dung: text('lieu_dung').notNull(),
  so_lan_dung: integer('so_lan_dung').default(1),
  so_luong_moi_lan: integer('so_luong_moi_lan').default(1),
  tong_so_luong: integer('tong_so_luong').default(1),
  ghi_chu: text('ghi_chu'),
});

// Waiting list table
export const waitingList = pgTable('danhsachcho', {
  benhnhan_id: integer('benhnhan_id').references(() => patients.id),
  ho_ten: text('ho_ten').notNull(),
  ngay_sinh: text('ngay_sinh').notNull(),
  dia_chi: text('dia_chi').notNull(),
  so_dien_thoai: text('so_dien_thoai').notNull(),
  can_nang: text('can_nang').notNull(),
  thang_tuoi: integer('thang_tuoi'),
  ngay_tao: timestamp('ngay_tao').defaultNow(),
});

// Create insert schemas
export const insertPatientSchema = createInsertSchema(patients).omit({ id: true, created_at: true });
export const insertExaminationSchema = createInsertSchema(examinations).omit({ created_at: true });
export const insertMedicationSchema = createInsertSchema(medications).omit({ id: true });
export const insertPrescriptionSchema = createInsertSchema(prescriptions).omit({ id: true });
export const insertWaitingListSchema = createInsertSchema(waitingList).omit({ ngay_tao: true });

// Create types
export type Patient = typeof patients.$inferSelect;
export type Examination = typeof examinations.$inferSelect;
export type Medication = typeof medications.$inferSelect;
export type Prescription = typeof prescriptions.$inferSelect;
export type WaitingListItem = typeof waitingList.$inferSelect;

export type InsertPatient = z.infer<typeof insertPatientSchema>;
export type InsertExamination = z.infer<typeof insertExaminationSchema>;
export type InsertMedication = z.infer<typeof insertMedicationSchema>;
export type InsertPrescription = z.infer<typeof insertPrescriptionSchema>;
export type InsertWaitingListItem = z.infer<typeof insertWaitingListSchema>;

// User types for authentication
export const userSchema = z.object({
  email: z.string().email(),
  role: z.enum(['doctor', 'receptionist', 'pharmacist']).optional(),
});

export type User = z.infer<typeof userSchema>;

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