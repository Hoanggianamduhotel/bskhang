import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'
import type { BenhNhan, DanhSachCho, KhamBenh, ToaThuoc, Thuoc } from '@/types'
import { capitalizeVietnameseName } from '@/types'

export const useClinicStore = defineStore('clinic', () => {
  const danhSachCho = ref<DanhSachCho[]>([])
  const benhNhanList = ref<BenhNhan[]>([])
  const thuocList = ref<Thuoc[]>([])
  const loading = ref(false)

  // Fetch waiting list
  const fetchDanhSachCho = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('danhsachcho')
        .select('benhnhan_id, ho_ten, ngay_sinh, dia_chi, so_dien_thoai, can_nang, thang_tuoi')
        .order('ngay_tao', { ascending: true })

      if (error) throw error
      danhSachCho.value = data || []
    } catch (error) {
      console.error('Lỗi khi lấy danh sách chờ:', error)
    } finally {
      loading.value = false
    }
  }

  // Add patient to waiting list with name capitalization
  const themBenhNhanVaoDanhSach = async (benhNhan: BenhNhan) => {
    loading.value = true
    try {
      // Capitalize patient name
      const formattedBenhNhan = {
        ...benhNhan,
        ho_ten: capitalizeVietnameseName(benhNhan.ho_ten)
      }

      // First insert into benhnhan table
      const { data: insertedBenhNhan, error: benhNhanError } = await supabase
        .from('benhnhan')
        .insert([formattedBenhNhan])
        .select()
        .single()

      if (benhNhanError) throw benhNhanError

      // Then add to waiting list
      const { error: danhSachError } = await supabase
        .from('danhsachcho')
        .insert([{
          benhnhan_id: insertedBenhNhan.benhnhan_id,
          ho_ten: formattedBenhNhan.ho_ten,
          ngay_sinh: formattedBenhNhan.ngay_sinh,
          dia_chi: formattedBenhNhan.dia_chi,
          so_dien_thoai: formattedBenhNhan.so_dien_thoai,
          can_nang: formattedBenhNhan.can_nang,
          thang_tuoi: calculateMonthsFromBirth(formattedBenhNhan.ngay_sinh)
        }])

      if (danhSachError) throw danhSachError

      await fetchDanhSachCho()
      return { success: true }
    } catch (error: any) {
      console.error('Lỗi khi thêm bệnh nhân:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  // Calculate months from birth date
  const calculateMonthsFromBirth = (birthDate: string): number => {
    const birth = new Date(birthDate)
    const now = new Date()
    return (now.getFullYear() - birth.getFullYear()) * 12 + 
           (now.getMonth() - birth.getMonth())
  }

  // Remove from waiting list
  const xoaKhoiDanhSachCho = async (benhNhanId: number) => {
    try {
      const { error } = await supabase
        .from('danhsachcho')
        .delete()
        .eq('benhnhan_id', benhNhanId)

      if (error) throw error
      await fetchDanhSachCho()
    } catch (error) {
      console.error('Lỗi khi xóa khỏi danh sách chờ:', error)
    }
  }

  // Fetch medications
  const fetchThuoc = async () => {
    try {
      const { data, error } = await supabase
        .from('thuoc')
        .select('*')
        .order('ten_thuoc')

      if (error) throw error
      thuocList.value = data || []
    } catch (error) {
      console.error('Lỗi khi lấy danh sách thuốc:', error)
    }
  }

  // Save examination record
  const luuKhamBenh = async (khamBenh: KhamBenh) => {
    try {
      const { data, error } = await supabase
        .from('khambenh')
        .insert([khamBenh])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Lỗi khi lưu khám bệnh:', error)
      throw error
    }
  }

  // Save prescription
  const luuToaThuoc = async (toaThuoc: ToaThuoc[]) => {
    try {
      const { error } = await supabase
        .from('toathuoc')
        .insert(toaThuoc)

      if (error) throw error
    } catch (error) {
      console.error('Lỗi khi lưu toa thuốc:', error)
      throw error
    }
  }

  return {
    danhSachCho,
    benhNhanList,
    thuocList,
    loading,
    fetchDanhSachCho,
    themBenhNhanVaoDanhSach,
    xoaKhoiDanhSachCho,
    fetchThuoc,
    luuKhamBenh,
    luuToaThuoc,
    calculateMonthsFromBirth
  }
})