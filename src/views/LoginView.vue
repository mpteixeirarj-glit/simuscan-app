<template>
  <div class="login-page">
    <div class="login-card">
      <RouterLink :to="{ name: 'landing' }" class="back-link">← Voltar</RouterLink>

      <div class="logo">
        <span class="p">Simu</span><span class="b">Scan</span>
      </div>

      <p class="login-sub">
        {{ resetMode ? 'Informe seu e-mail para redefinir a senha' : 'Acesse sua conta para entrar no simulador' }}
      </p>

      <!-- GOOGLE -->
      <button v-if="!resetMode" type="button" class="btn-google" @click="handleGoogle" :disabled="loading">
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        Entrar com Google
      </button>

      <div v-if="!resetMode" class="divisor"><span>ou</span></div>

      <!-- MODO LOGIN -->
      <form v-if="!resetMode" @submit.prevent="handleLogin">
        <div class="field">
          <label for="email">E-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="seu@email.com"
            autocomplete="email"
            required
          />
        </div>

        <div class="field">
          <label for="senha">Senha</label>
          <div class="input-wrap">
            <input
              id="senha"
              v-model="senha"
              :type="showSenha ? 'text' : 'password'"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            />
            <button type="button" class="btn-olho" @click="showSenha = !showSenha" :title="showSenha ? 'Ocultar senha' : 'Ver senha'">
              <svg v-if="!showSenha" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
        </div>

        <p v-if="auth.error" class="error-msg">{{ auth.error }}</p>

        <button type="submit" :disabled="loading" class="btn-entrar">
          <span v-if="loading">Entrando…</span>
          <span v-else>Entrar</span>
        </button>

        <button type="button" class="btn-esqueci" @click="abrirReset">Esqueci minha senha</button>
      </form>

      <!-- MODO REDEFINIR SENHA -->
      <form v-else @submit.prevent="handleReset">
        <div class="field">
          <label for="reset-email">E-mail cadastrado</label>
          <input
            id="reset-email"
            v-model="resetEmail"
            type="email"
            placeholder="seu@email.com"
            autocomplete="email"
            required
          />
        </div>

        <p v-if="resetMsg" class="success-msg">{{ resetMsg }}</p>
        <p v-if="resetError" class="error-msg">{{ resetError }}</p>

        <button type="submit" :disabled="loadingReset" class="btn-entrar">
          <span v-if="loadingReset">Enviando…</span>
          <span v-else>Enviar link de redefinição</span>
        </button>

        <button type="button" class="btn-esqueci" @click="resetMode = false; resetMsg = ''; resetError = ''">
          ← Voltar ao login
        </button>
      </form>
    </div>

    <audio ref="somSucesso" :src="BASE_URL + 'sons/sucesso.mp3'" preload="auto"></audio>
    <audio ref="somErro" :src="BASE_URL + 'sons/erro.mp3'" preload="auto"></audio>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth as firebaseAuth } from '@/firebase'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const BASE_URL = import.meta.env.BASE_URL

const email = ref('')
const senha = ref('')
const showSenha = ref(false)
const loading = ref(false)

const resetMode = ref(false)
const resetEmail = ref('')
const resetMsg = ref('')
const resetError = ref('')
const loadingReset = ref(false)

const somSucesso = ref(null)
const somErro = ref(null)

function abrirReset() {
  resetMode.value = true
  resetEmail.value = email.value
  resetMsg.value = ''
  resetError.value = ''
  auth.error = ''
}

async function handleGoogle() {
  loading.value = true
  try {
    await auth.loginWithGoogle()
    somSucesso.value?.play()
    setTimeout(() => router.push({ name: 'sistemas' }), 300)
  } catch {
    // erro já tratado no store
  } finally {
    loading.value = false
  }
}

async function handleLogin() {
  loading.value = true
  auth.error = ''
  try {
    await auth.login(email.value, senha.value)
    somSucesso.value?.play()
    setTimeout(() => router.push({ name: 'sistemas' }), 300)
  } catch {
    somErro.value?.play()
  } finally {
    loading.value = false
  }
}

async function handleReset() {
  loadingReset.value = true
  resetMsg.value = ''
  resetError.value = ''
  try {
    await sendPasswordResetEmail(firebaseAuth, resetEmail.value)
    resetMsg.value = 'Link enviado! Verifique sua caixa de entrada (e o spam).'
  } catch (e) {
    const code = e?.code || ''
    if (code === 'auth/user-not-found') {
      resetError.value = 'Nenhuma conta encontrada com esse e-mail.'
    } else {
      resetError.value = 'Não foi possível enviar o e-mail. Tente novamente.'
    }
  } finally {
    loadingReset.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg);
  padding: 1rem;
  position: relative;
}

.login-page::before {
  content: '';
  position: fixed; inset: 0;
  background:
    radial-gradient(ellipse 50% 60% at 20% 50%, var(--pink-lo), transparent),
    radial-gradient(ellipse 50% 60% at 80% 50%, var(--blue-lo), transparent);
  pointer-events: none;
}

.login-card {
  background: var(--surf);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 2.5rem 2rem;
  width: min(400px, 100%);
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
  position: relative;
}

.back-link {
  font-size: 0.8rem; color: var(--muted); text-decoration: none;
  display: inline-block; margin-bottom: 1.8rem;
  transition: color .2s;
}
.back-link:hover { color: var(--text); }

.logo {
  font-size: 2rem; font-weight: 900; letter-spacing: -0.04em;
  text-align: center; margin-bottom: 0.4rem;
}
.logo .p { color: var(--pink); }
.logo .b { color: var(--blue); }

.login-sub {
  text-align: center; font-size: 0.875rem;
  color: var(--muted); margin-bottom: 2rem;
}

.field { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.1rem; }

.field label {
  font-size: 0.78rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: .06em;
  color: var(--muted);
}

.field input {
  padding: 0.8rem 1rem;
  background: var(--surf2); border: 1px solid var(--border);
  color: var(--text); border-radius: 8px;
  font-size: 0.95rem; outline: none;
  transition: border-color .2s, box-shadow .2s;
  width: 100%;
}
.field input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px var(--blue-lo);
}

.input-wrap {
  position: relative;
  display: flex; align-items: center;
}
.input-wrap input { padding-right: 2.8rem; }

.btn-olho {
  position: absolute; right: 0.75rem;
  background: none; border: none; padding: 0;
  cursor: pointer; color: var(--muted);
  display: flex; align-items: center;
  transition: color .2s;
}
.btn-olho:hover { color: var(--text); }
.btn-olho svg { width: 18px; height: 18px; }

.error-msg {
  font-size: 0.83rem; color: var(--pink);
  text-align: center; margin-bottom: 0.8rem;
  font-weight: 600;
}

.success-msg {
  font-size: 0.83rem; color: #22c55e;
  text-align: center; margin-bottom: 0.8rem;
  font-weight: 600;
}

.btn-entrar {
  width: 100%; padding: 0.85rem;
  background: var(--pink); border: none;
  color: #fff; border-radius: 8px;
  font-size: 1rem; font-weight: 700;
  cursor: pointer; margin-top: 0.5rem;
  box-shadow: 0 0 20px var(--pink-md);
  transition: opacity .2s;
}
.btn-entrar:hover { opacity: .87; }
.btn-entrar:disabled { opacity: .5; cursor: not-allowed; }

.btn-esqueci {
  width: 100%; padding: 0.6rem;
  background: none; border: none;
  color: var(--muted); font-size: 0.83rem;
  cursor: pointer; margin-top: 0.6rem;
  transition: color .2s;
}
.btn-esqueci:hover { color: var(--blue); }

.btn-google {
  width: 100%; padding: 0.75rem 1rem;
  display: flex; align-items: center; justify-content: center; gap: 0.7rem;
  background: #fff; border: 1.5px solid #dadce0;
  border-radius: 8px; font-size: 0.95rem; font-weight: 600;
  color: #3c4043; cursor: pointer;
  transition: background .15s, box-shadow .15s;
  margin-bottom: 0;
}
.btn-google:hover { background: #f8f9fa; box-shadow: 0 1px 6px rgba(0,0,0,0.12); }
.btn-google:disabled { opacity: .5; cursor: not-allowed; }
.btn-google svg { width: 20px; height: 20px; flex-shrink: 0; }

.divisor {
  display: flex; align-items: center; gap: 0.8rem;
  margin: 1rem 0; color: var(--muted); font-size: 0.8rem;
}
.divisor::before, .divisor::after {
  content: ''; flex: 1; height: 1px; background: var(--border);
}
</style>
