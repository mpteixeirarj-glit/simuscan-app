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
</style>
