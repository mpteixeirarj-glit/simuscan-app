import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'landing', component: () => import('@/views/LandingWrapper.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
  { path: '/escolha', name: 'escolha', component: () => import('@/views/SistemaEscolhaView.vue'), meta: { requiresAuth: true } },
  { path: '/gama', name: 'gama', component: () => import('@/views/GamaConsoleView.vue'), meta: { requiresAuth: true } },
  { path: '/gama/protocolos', name: 'protocolos', component: () => import('@/components/gama/ProtocolManagerFull.vue'), meta: { requiresAuth: true } },
  { path: '/sigma', name: 'sigma', component: () => import('@/views/SigmaConsoleView.vue'), meta: { requiresAuth: true } },
  // Public pages
  { path: '/documentacao', name: 'Documentacao', component: () => import('@/views/pages/DocumentacaoView.vue') },
  { path: '/contato', name: 'Contato', component: () => import('@/views/pages/ContatoView.vue') },
  { path: '/termos', name: 'Termos', component: () => import('@/views/pages/TermosView.vue') },
  { path: '/privacidade', name: 'Privacidade', component: () => import('@/views/pages/PrivacidadeView.vue') },
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

router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})

export default router
