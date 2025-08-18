import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: () => import('@/views/DoctorView.vue'),
      meta: { requiresAuth: true, role: 'doctor' }
    },
    {
      path: '/receptionist',
      name: 'receptionist',
      component: () => import('@/views/ReceptionistView.vue'),
      meta: { requiresAuth: true, role: 'receptionist' }
    }
  ]
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  
  // Initialize auth state
  if (!authStore.initialized) {
    await authStore.initialize()
  }

  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.user?.role

  // Check authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login'
  }

  // Check guest routes
  if (to.meta.requiresGuest && isAuthenticated) {
    return userRole === 'receptionist' ? '/receptionist' : '/doctor'
  }

  // Check role-based access
  if (to.meta.role && userRole !== to.meta.role) {
    return userRole === 'receptionist' ? '/receptionist' : '/doctor'
  }
})

export default router