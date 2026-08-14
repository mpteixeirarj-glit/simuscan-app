import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '@/firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)
  const error = ref('')

  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
    loading.value = false
  })

  async function login(email, password) {
    error.value = ''
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      const code = e?.code || ''
      if (code === 'auth/too-many-requests') {
        error.value = 'Muitas tentativas. Aguarde alguns minutos ou redefina sua senha.'
      } else if (code === 'auth/user-disabled') {
        error.value = 'Conta desativada. Entre em contato com o suporte.'
      } else if (code === 'auth/network-request-failed') {
        error.value = 'Erro de conexão. Verifique sua internet e tente novamente.'
      } else {
        error.value = 'E-mail ou senha incorretos.'
      }
      throw e
    }
  }

  async function logout() {
    await signOut(auth)
  }

  return { user, loading, error, login, logout }
})
