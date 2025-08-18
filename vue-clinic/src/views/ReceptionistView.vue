<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <div class="flex flex-col h-0 flex-1 bg-blue-800">
          <div class="flex items-center h-16 flex-shrink-0 px-4 bg-blue-900">
            <h1 class="text-white text-lg font-semibold">Lễ tân</h1>
          </div>
          <div class="flex-1 flex flex-col overflow-y-auto">
            <nav class="flex-1 px-2 py-4 space-y-1">
              <a href="#" class="text-blue-100 hover:bg-blue-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <Users class="text-blue-200 mr-3 h-5 w-5" />
                Danh sách chờ
              </a>
            </nav>
          </div>
          <div class="flex-shrink-0 flex border-t border-blue-700 p-4">
            <button
              @click="authStore.signOut"
              class="flex-shrink-0 w-full group block text-left"
            >
              <div class="flex items-center">
                <LogOut class="text-blue-200 mr-3 h-5 w-5" />
                <div class="text-sm">
                  <p class="text-white">Đăng xuất</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <!-- Top bar -->
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          @click="sidebarOpen = true"
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
        >
          <Menu class="h-6 w-6" />
        </button>
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex">
            <div class="w-full flex md:ml-0">
              <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <Search class="h-5 w-5" />
                </div>
                <input
                  class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent"
                  placeholder="Tìm kiếm bệnh nhân..."
                  type="search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <!-- Page header -->
            <div class="md:flex md:items-center md:justify-between">
              <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Danh sách chờ khám
                </h2>
              </div>
              <div class="mt-4 flex md:mt-0 md:ml-4">
                <button
                  @click="openAddDialog"
                  class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus class="mr-2 h-4 w-4" />
                  Thêm bệnh nhân
                </button>
              </div>
            </div>

            <!-- Patients waiting list -->
            <div class="mt-8">
              <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                          <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Họ tên
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tuổi
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Số điện thoại
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Địa chỉ
                            </th>
                            <th class="relative px-6 py-3">
                              <span class="sr-only">Hành động</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          <tr v-for="patient in clinicStore.danhSachCho" :key="patient.benhnhan_id">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {{ patient.ho_ten }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {{ formatAge(patient.ngay_sinh) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {{ patient.so_dien_thoai }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {{ patient.dia_chi }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                @click="removeFromWaitingList(patient.benhnhan_id)"
                                class="text-red-600 hover:text-red-900"
                              >
                                <Trash2 class="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Add Patient Dialog -->
    <div v-if="showAddDialog" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 text-center mb-4">Thêm bệnh nhân mới</h3>
          <form @submit.prevent="addPatient" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Họ tên</label>
              <input
                v-model="newPatient.ho_ten"
                type="text"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập họ tên bệnh nhân"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Ngày sinh</label>
              <input
                v-model="newPatient.ngay_sinh"
                type="date"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Địa chỉ</label>
              <input
                v-model="newPatient.dia_chi"
                type="text"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập địa chỉ"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Số điện thoại</label>
              <input
                v-model="newPatient.so_dien_thoai"
                type="tel"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Cân nặng (kg)</label>
              <input
                v-model="newPatient.can_nang"
                type="number"
                step="0.1"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập cân nặng"
              />
            </div>
            <div class="flex space-x-2">
              <button
                type="submit"
                :disabled="clinicStore.loading"
                class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {{ clinicStore.loading ? 'Đang xử lý...' : 'Thêm' }}
              </button>
              <button
                type="button"
                @click="closeAddDialog"
                class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useClinicStore } from '@/stores/clinic'
import { calculateAge, type BenhNhan } from '@/types'
import { Users, LogOut, Menu, Search, Plus, Trash2 } from 'lucide-vue-next'

const authStore = useAuthStore()
const clinicStore = useClinicStore()

const sidebarOpen = ref(false)
const showAddDialog = ref(false)
const newPatient = ref<BenhNhan>({
  ho_ten: '',
  ngay_sinh: '',
  dia_chi: '',
  so_dien_thoai: '',
  can_nang: ''
})

const formatAge = (birthDate: string): string => {
  return calculateAge(birthDate).display
}

const openAddDialog = () => {
  showAddDialog.value = true
  // Reset form
  newPatient.value = {
    ho_ten: '',
    ngay_sinh: '',
    dia_chi: '',
    so_dien_thoai: '',
    can_nang: ''
  }
}

const closeAddDialog = () => {
  showAddDialog.value = false
}

const addPatient = async () => {
  const result = await clinicStore.themBenhNhanVaoDanhSach(newPatient.value)
  if (result.success) {
    closeAddDialog()
  } else {
    alert('Có lỗi xảy ra: ' + result.error)
  }
}

const removeFromWaitingList = async (benhNhanId: number) => {
  if (confirm('Bạn có chắc muốn xóa bệnh nhân khỏi danh sách chờ?')) {
    await clinicStore.xoaKhoiDanhSachCho(benhNhanId)
  }
}

onMounted(() => {
  clinicStore.fetchDanhSachCho()
})
</script>