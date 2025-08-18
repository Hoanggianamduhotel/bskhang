<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          Hệ Thống Bệnh Nhi
        </h1>
        <p class="text-gray-600">
          Đăng nhập để tiếp tục
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu
          </label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div v-if="errorMessage" class="text-red-600 text-sm">
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!authStore.loading">
            {{ isLogin ? 'Đăng nhập' : 'Đăng ký' }}
          </span>
          <span v-else>Đang xử lý...</span>
        </button>

        <div class="text-center">
          <button
            type="button"
            @click="isLogin = !isLogin"
            class="text-blue-600 hover:text-blue-800 text-sm"
          >
            {{ isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const isLogin = ref(true)
const errorMessage = ref('')

const handleSubmit = async () => {
  errorMessage.value = ''
  
  let result
  if (isLogin.value) {
    result = await authStore.signIn(email.value, password.value)
  } else {
    result = await authStore.signUp(email.value, password.value)
  }

  if (result.success) {
    // Redirect based on user role
    const userRole = authStore.user?.role
    if (userRole === 'receptionist') {
      router.push('/receptionist')
    } else {
      router.push('/doctor')
    }
  } else {
    errorMessage.value = result.error || 'Có lỗi xảy ra'
  }
}
</script>