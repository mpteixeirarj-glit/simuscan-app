<template>
  <div class="login-page">
    <div class="login-card">
      <a href="#/" class="back-link">← Voltar</a>

      <div class="logo">
        <span class="p">Simu</span><span class="b">Scan</span>
      </div>

      <p class="login-sub">Acesse sua conta para entrar no simulador</p>

      <form @submit.prevent="handleLogin">
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
          <input
            id="senha"
            v-model="senha"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
            required
          />
        </div>

        <p v-if="auth.error" class="error-msg">{{ auth.error }}</p>

        <button type="submit" :disabled="loading" class="btn-entrar">
          <span v-if="loading">Entrando…</span>
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>

    <audio ref="somSucesso" src="/sons/sucesso.mp3" preload="auto"></audio>
    <audio ref="somErro" src="/sons/erro.mp3" preload="auto"></audio>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const senha = ref('')
const loading = ref(false)

const somSucesso = ref(null)
const somErro = ref(null)

async function handleLogin() {
  loading.value = true
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
}
.field input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px var(--blue-lo);
}

.error-msg {
  font-size: 0.83rem; color: var(--pink);
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
</style>
