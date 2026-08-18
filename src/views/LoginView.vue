<template>
  <div class="login-page">
    <div class="login-card" :class="{ 'shake': shakeError }">
      <RouterLink to="/" class="back-link">← Voltar</RouterLink>

      <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="logo-img">
      <p class="simulador-label">SIMULADOR DE TOMOGRAFIA</p>
      <div class="divider"></div>

      <!-- SUCESSO -->
      <div v-if="success" class="success-screen">
        <div class="check">✓</div>
        <p class="success-name">{{ auth.user?.displayName || auth.user?.email }}</p>
        <p class="success-msg">Redirecionando...</p>
      </div>

      <template v-else>
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

        <!-- DIVISOR -->
        <div v-if="!resetMode" class="sep"><span>ou</span></div>

        <!-- FORM LOGIN -->
        <form v-if="!resetMode" @submit.prevent="handleLogin">
          <div class="field">
            <label for="email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
            </label>
            <input id="email" v-model="email" type="email" placeholder="E-mail" autocomplete="email" required>
          </div>
          <div class="field">
            <label for="senha">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </label>
            <input id="senha" v-model="senha" :type="showSenha ? 'text' : 'password'" placeholder="Senha" autocomplete="current-password" required>
            <button type="button" class="btn-olho" @click="showSenha = !showSenha">
              <svg v-if="!showSenha" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>

          <transition name="err">
            <p v-if="auth.error" class="error-msg">{{ auth.error }}</p>
          </transition>

          <button type="submit" class="btn-entrar" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-else>ENTRAR</span>
          </button>

          <button type="button" class="btn-esqueci" @click="abrirReset">Esqueci minha senha</button>
        </form>

        <!-- FORM RESET -->
        <form v-else @submit.prevent="handleReset">
          <p class="reset-hint">Informe seu e-mail para receber o link de redefinição.</p>
          <div class="field">
            <label for="reset-email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
            </label>
            <input id="reset-email" v-model="resetEmail" type="email" placeholder="seu@email.com" autocomplete="email" required>
          </div>
          <transition name="err">
            <p v-if="resetMsg" class="success-inline">{{ resetMsg }}</p>
            <p v-else-if="resetError" class="error-msg">{{ resetError }}</p>
          </transition>
          <button type="submit" class="btn-entrar" :disabled="loadingReset">
            <span v-if="loadingReset" class="spinner"></span>
            <span v-else>ENVIAR LINK</span>
          </button>
          <button type="button" class="btn-esqueci" @click="resetMode = false; resetMsg = ''; resetError = ''">← Voltar ao login</button>
        </form>
      </template>

      <p class="login-footer">SimuScan <span>{{ version }}</span> &nbsp;·&nbsp; Treinamento de Operadores</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth as firebaseAuth } from '@/firebase'
import { useAuthStore } from '@/stores/auth'
import { APP_VERSION } from '@/version.js'

const router = useRouter()
const auth = useAuthStore()
const BASE_URL = import.meta.env.BASE_URL
const version = APP_VERSION

const email = ref('')
const senha = ref('')
const showSenha = ref(false)
const loading = ref(false)
const success = ref(false)
const shakeError = ref(false)

const resetMode = ref(false)
const resetEmail = ref('')
const resetMsg = ref('')
const resetError = ref('')
const loadingReset = ref(false)

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
    success.value = true
    setTimeout(() => router.push({ name: 'escolha' }), 1200)
  } catch { /* erro tratado no store */ }
  finally { loading.value = false }
}

async function handleLogin() {
  loading.value = true
  auth.error = ''
  try {
    await auth.login(email.value, senha.value)
    success.value = true
    setTimeout(() => router.push({ name: 'escolha' }), 1200)
  } catch {
    shakeError.value = true
    setTimeout(() => { shakeError.value = false }, 500)
  } finally { loading.value = false }
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
    if (code === 'auth/user-not-found') resetError.value = 'Nenhuma conta encontrada com esse e-mail.'
    else resetError.value = 'Não foi possível enviar o e-mail. Tente novamente.'
  } finally { loadingReset.value = false }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background: var(--cor-fundo);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.login-page::before {
  content: '';
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(52,152,219,.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(52,152,219,.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.login-card {
  background: var(--cor-card);
  border: 0.5px solid var(--cor-card-borda);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  width: min(400px, 100%);
  box-shadow: 0 20px 60px rgba(0,0,0,.5);
  position: relative;
  animation: fadeUp .45s ease both;
}

.login-card.shake { animation: shake .4s ease; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes shake {
  0%,100% { transform: translateX(0); }
  20%,60% { transform: translateX(-6px); }
  40%,80% { transform: translateX(6px); }
}

.back-link { font-size: .8rem; color: var(--cor-texto-muted); text-decoration: none; display: inline-block; margin-bottom: 1.5rem; transition: color .2s; }
.back-link:hover { color: var(--cor-texto); }

.logo-img { display: block; width: 120px; margin: 0 auto 1rem; filter: drop-shadow(0 0 12px rgba(52,152,219,.35)); }

.simulador-label { text-align: center; font-size: .72rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--cor-texto-muted); margin-bottom: 1.2rem; }

.divider { height: 1px; background: var(--cor-card-borda); margin-bottom: 1.5rem; }

/* SUCESSO */
.success-screen { text-align: center; padding: 1.5rem 0; }
.check { font-size: 3rem; color: var(--cor-verde); margin-bottom: .8rem; }
.success-name { font-weight: 700; margin-bottom: .4rem; }
.success-msg { color: var(--cor-texto-muted); font-size: .9rem; }

/* GOOGLE */
.btn-google {
  width: 100%; padding: .75rem 1rem;
  display: flex; align-items: center; justify-content: center; gap: .7rem;
  background: #fff; border: 1.5px solid #dadce0;
  border-radius: 8px; font-size: .95rem; font-weight: 600;
  color: #3c4043; cursor: pointer; margin-bottom: .5rem;
  transition: background .15s, box-shadow .15s;
}
.btn-google:hover { background: #f8f9fa; box-shadow: 0 1px 6px rgba(0,0,0,.2); }
.btn-google:disabled { opacity: .5; cursor: not-allowed; }
.btn-google svg { width: 20px; height: 20px; flex-shrink: 0; }

.sep { display: flex; align-items: center; gap: .8rem; margin: 1rem 0; color: var(--cor-texto-muted); font-size: .8rem; }
.sep::before, .sep::after { content: ''; flex: 1; height: 1px; background: var(--cor-card-borda); }

/* FIELDS */
.field { position: relative; display: flex; align-items: center; margin-bottom: 1rem; background: var(--cor-fundo); border: 1px solid #2e2e33; border-radius: 8px; transition: border-color .2s, box-shadow .2s; }
.field:focus-within { border-color: var(--cor-azul); box-shadow: 0 0 0 3px rgba(52,152,219,.18); }
.field label { display: flex; align-items: center; padding: 0 .7rem; color: var(--cor-texto-muted); flex-shrink: 0; }
.field label svg { width: 18px; height: 18px; }
.field input { flex: 1; padding: .75rem .5rem; background: none; border: none; color: var(--cor-texto); font-size: .95rem; outline: none; }
.field input::placeholder { color: var(--cor-texto-muted); }

.btn-olho { background: none; border: none; padding: 0 .7rem; cursor: pointer; color: var(--cor-texto-muted); display: flex; align-items: center; transition: color .2s; }
.btn-olho:hover { color: var(--cor-texto); }
.btn-olho svg { width: 18px; height: 18px; }

/* ERROR */
.error-msg { font-size: .83rem; color: var(--cor-pink); text-align: center; margin-bottom: .8rem; font-weight: 600; }
.success-inline { font-size: .83rem; color: var(--cor-verde); text-align: center; margin-bottom: .8rem; font-weight: 600; }
.reset-hint { font-size: .85rem; color: var(--cor-texto-muted); text-align: center; margin-bottom: 1.2rem; }

.err-enter-active, .err-leave-active { transition: opacity .3s, transform .3s; }
.err-enter-from { opacity: 0; transform: translateY(-4px); }
.err-leave-to { opacity: 0; }

/* BOTÕES */
.btn-entrar {
  width: 100%; padding: .85rem;
  background: var(--cor-azul); border: none;
  color: #fff; border-radius: 8px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem; font-weight: 700; letter-spacing: .08em;
  cursor: pointer; margin-top: .5rem;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 20px rgba(52,152,219,.25);
  transition: opacity .2s;
}
.btn-entrar:hover { opacity: .87; }
.btn-entrar:disabled { opacity: .5; cursor: not-allowed; }

.spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.btn-esqueci { width: 100%; padding: .6rem; background: none; border: none; color: var(--cor-texto-muted); font-size: .83rem; cursor: pointer; margin-top: .6rem; transition: color .2s; }
.btn-esqueci:hover { color: var(--cor-azul); }

.login-footer { text-align: center; font-size: .72rem; color: var(--cor-texto-muted); margin-top: 1.5rem; opacity: .7; }
.login-footer span { color: var(--cor-azul); font-weight: 600; }
</style>
