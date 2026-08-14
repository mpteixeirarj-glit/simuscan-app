import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/sistemas',
    name: 'sistemas',
    component: () => import('@/views/SystemSelect.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/simulador/gama',
    name: 'gama',
    component: () => import('@/views/simulator/GamaSimulator.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  // Aguarda Firebase resolver o estado de autenticação
  if (auth.loading) {
    await new Promise(resolve => {
      const stop = setInterval(() => {
        if (!auth.loading) { clearInterval(stop); resolve() }
      }, 50)
    })
  }

  if (to.meta.requiresAuth && !auth.user) {
    return { name: 'login' }
  }
})

export default router
