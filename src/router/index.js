import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'landing', component: () => import('@/views/LandingView.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
  { path: '/escolha', name: 'escolha', component: () => import('@/views/SistemaEscolhaView.vue'), meta: { requiresAuth: true } },
  { path: '/gama', name: 'gama', component: () => import('@/views/GamaConsoleView.vue'), meta: { requiresAuth: true } },
  { path: '/gama/protocolos', name: 'protocolos', component: () => import('@/components/gama/ProtocolManagerFull.vue'), meta: { requiresAuth: true } },
  { path: '/sigma', name: 'sigma', component: () => import('@/views/SigmaConsoleView.vue'), meta: { requiresAuth: true } },
  // legacy redirects
  { path: '/sistemas', redirect: '/escolha' },
  { path: '/simulador/gama', redirect: '/gama' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (auth.loading) {
    await new Promise(resolve => {
      const stop = setInterval(() => { if (!auth.loading) { clearInterval(stop); resolve() } }, 50)
    })
  }
  if (to.meta.requiresAuth && !auth.user) return { name: 'login' }
})

export default router
