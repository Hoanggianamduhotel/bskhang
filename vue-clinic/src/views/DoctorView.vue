<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <div class="flex flex-col h-0 flex-1 bg-green-800">
          <div class="flex items-center h-16 flex-shrink-0 px-4 bg-green-900">
            <h1 class="text-white text-lg font-semibold">Bác sĩ</h1>
          </div>
          <div class="flex-1 flex flex-col overflow-y-auto">
            <nav class="flex-1 px-2 py-4 space-y-1">
              <button 
                @click="activeTab = 'waiting'"
                :class="[
                  activeTab === 'waiting' ? 'bg-green-700 text-white' : 'text-green-100 hover:bg-green-700',
                  'group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md'
                ]"
              >
                <Users class="text-green-200 mr-3 h-5 w-5" />
                Danh sách chờ
              </button>
              <button 
                @click="activeTab = 'examination'"
                :class="[
                  activeTab === 'examination' ? 'bg-green-700 text-white' : 'text-green-100 hover:bg-green-700',
                  'group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md'
                ]"
              >
                <Stethoscope class="text-green-200 mr-3 h-5 w-5" />
                Khám bệnh
              </button>
            </nav>
          </div>
          <div class="flex-shrink-0 flex border-t border-green-700 p-4">
            <button
              @click="authStore.signOut"
              class="flex-shrink-0 w-full group block text-left"
            >
              <div class="flex items-center">
                <LogOut class="text-green-200 mr-3 h-5 w-5" />
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
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 md:hidden"
        >
          <Menu class="h-6 w-6" />
        </button>
        <div class="flex-1 px-4 flex justify-between items-center">
          <div>
            <h1 class="text-xl font-semibold text-gray-900">
              {{ activeTab === 'waiting' ? 'Danh sách bệnh nhân chờ khám' : 'Khám bệnh' }}
            </h1>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <!-- Waiting List Tab -->
        <div v-if="activeTab === 'waiting'" class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
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
                            Cân nặng
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số điện thoại
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
                            {{ patient.can_nang }} kg
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ patient.so_dien_thoai }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              @click="startExamination(patient)"
                              class="text-green-600 hover:text-green-900"
                            >
                              <Stethoscope class="h-4 w-4" />
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

        <!-- Examination Tab -->
        <div v-if="activeTab === 'examination'" class="py-6">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
            <div v-if="!currentPatient" class="text-center text-gray-500">
              Chọn bệnh nhân từ danh sách chờ để bắt đầu khám
            </div>
            
            <div v-else class="bg-white shadow rounded-lg p-6">
              <h2 class="text-lg font-medium text-gray-900 mb-4">
                Khám bệnh: {{ currentPatient.ho_ten }}
              </h2>
              
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Tuổi</label>
                  <div class="mt-1 text-sm text-gray-900">{{ formatAge(currentPatient.ngay_sinh) }}</div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Cân nặng</label>
                  <div class="mt-1 text-sm text-gray-900">{{ currentPatient.can_nang }} kg</div>
                </div>
              </div>

              <form @submit.prevent="saveExamination" class="mt-6 space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Triệu chứng</label>
                  <textarea
                    v-model="examination.trieu_chung"
                    rows="4"
                    class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Mô tả triệu chứng của bệnh nhân..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Chẩn đoán</label>
                  <textarea
                    v-model="examination.chan_doan"
                    rows="3"
                    class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Chẩn đoán bệnh..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Bác sĩ</label>
                  <input
                    v-model="examination.bac_si"
                    type="text"
                    class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Tên bác sĩ"
                    required
                  />
                </div>

                <div class="flex space-x-3">
                  <button
                    type="submit"
                    :disabled="clinicStore.loading"
                    class="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {{ clinicStore.loading ? 'Đang lưu...' : 'Lưu khám bệnh' }}
                  </button>
                  <button
                    type="button"
                    @click="finishExamination"
                    class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Hoàn thành
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useClinicStore } from '@/stores/clinic'
import { calculateAge, type DanhSachCho } from '@/types'
import { Users, LogOut, Menu, Stethoscope } from 'lucide-vue-next'

const authStore = useAuthStore()
const clinicStore = useClinicStore()

const sidebarOpen = ref(false)
const activeTab = ref<'waiting' | 'examination'>('waiting')
const currentPatient = ref<DanhSachCho | null>(null)

const examination = ref({
  trieu_chung: '',
  chan_doan: '',
  bac_si: 'BS. Khang'
})

const formatAge = (birthDate: string): string => {
  return calculateAge(birthDate).display
}

const startExamination = (patient: DanhSachCho) => {
  currentPatient.value = patient
  activeTab.value = 'examination'
  
  // Reset examination form
  examination.value = {
    trieu_chung: '',
    chan_doan: '',
    bac_si: 'BS. Khang'
  }
}

const saveExamination = async () => {
  if (!currentPatient.value) return
  
  try {
    const khamBenh = {
      benhnhan_id: currentPatient.value.benhnhan_id,
      ngay_kham: new Date().toISOString().split('T')[0],
      trieu_chung: examination.value.trieu_chung,
      chan_doan: examination.value.chan_doan,
      bac_si: examination.value.bac_si
    }
    
    await clinicStore.luuKhamBenh(khamBenh)
    alert('Đã lưu thông tin khám bệnh')
  } catch (error) {
    alert('Có lỗi xảy ra khi lưu thông tin khám bệnh')
    console.error(error)
  }
}

const finishExamination = async () => {
  if (!currentPatient.value) return
  
  if (confirm('Hoàn thành khám bệnh và xóa khỏi danh sách chờ?')) {
    // Save examination if not saved yet
    if (examination.value.trieu_chung && examination.value.chan_doan) {
      await saveExamination()
    }
    
    // Remove from waiting list
    await clinicStore.xoaKhoiDanhSachCho(currentPatient.value.benhnhan_id)
    
    // Reset current patient and go back to waiting list
    currentPatient.value = null
    activeTab.value = 'waiting'
  }
}

onMounted(() => {
  clinicStore.fetchDanhSachCho()
})
</script>