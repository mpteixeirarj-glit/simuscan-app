<template>
  <div class="sigma-lock">
    <div class="lock-card">
      <div class="lock-logo">
        <span class="lock-sigma">Σ</span>
        <span class="lock-name">Sigma Healthcare</span>
      </div>

      <div class="lock-icon">🔒</div>
      <h2>Sistema Bloqueado</h2>
      <p>Digite a senha para continuar</p>

      <div class="lock-form">
        <div class="pin-dots">
          <span class="pin-dot" v-for="i in 4" :key="i" :class="{ filled: pin.length >= i }"></span>
        </div>
        <div class="pin-keypad">
          <button
            class="key-btn"
            v-for="k in ['1','2','3','4','5','6','7','8','9','⌫','0','OK']"
            :key="k"
            :class="{ 'key-btn--ok': k === 'OK', 'key-btn--back': k === '⌫' }"
            @click="handleKey(k)"
          >{{ k }}</button>
        </div>
        <p v-if="error" class="lock-error">Senha incorreta</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['unlocked'])
const pin = ref('')
const error = ref(false)
const CORRECT_PIN = '1234'

function handleKey(k) {
  error.value = false
  if (k === '⌫') { pin.value = pin.value.slice(0, -1); return }
  if (k === 'OK') { validate(); return }
  if (pin.value.length < 4) pin.value += k
  if (pin.value.length === 4) validate()
}

function validate() {
  if (pin.value === CORRECT_PIN) {
    emit('unlocked')
  } else {
    error.value = true
    pin.value = ''
  }
}
</script>

<style scoped>
.sigma-lock {
  position: absolute; inset: 0;
  background: var(--sigma-bg);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}

.lock-card {
  background: var(--sigma-card);
  border: 1px solid var(--sigma-border);
  border-radius: 16px;
  padding: 36px 40px;
  display: flex; flex-direction: column; align-items: center;
  gap: 16px;
  min-width: 280px;
}

.lock-logo { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.lock-sigma { font-size: 1.8rem; font-weight: 700; color: var(--sigma-accent); line-height: 1; }
.lock-name { font-size: 0.78rem; color: var(--sigma-text-muted); text-transform: uppercase; letter-spacing: 0.08em; }

.lock-icon { font-size: 2rem; }
h2 { font-size: 1.1rem; font-weight: 700; color: var(--sigma-text); margin: 0; }
p { font-size: 0.78rem; color: var(--sigma-text-muted); margin: 0; }

.lock-form { display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; }

.pin-dots { display: flex; gap: 12px; }
.pin-dot {
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--sigma-border);
  border: 2px solid var(--sigma-border);
  transition: background 0.15s, border-color 0.15s;
}
.pin-dot.filled { background: var(--sigma-accent); border-color: var(--sigma-accent); }

.pin-keypad {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 8px; width: 200px;
}

.key-btn {
  background: var(--sigma-card-hover);
  border: 1px solid var(--sigma-border);
  color: var(--sigma-text);
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem; font-weight: 600;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s;
}
.key-btn:hover { background: var(--sigma-bar); border-color: var(--sigma-accent); }
.key-btn--ok { background: var(--sigma-accent); color: #000; border-color: var(--sigma-accent); }
.key-btn--ok:hover { opacity: 0.88; }
.key-btn--back { color: var(--sigma-text-muted); }

.lock-error { color: #e74c3c; font-size: 0.72rem; margin: 0; }
</style>
