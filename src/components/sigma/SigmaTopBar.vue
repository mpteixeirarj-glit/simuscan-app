<template>
  <div class="sigma-top-bar">
    <div class="top-left">
      <div class="sigma-logo">
        <span class="logo-sigma">Σ</span>
        <span class="logo-text">Sigma Healthcare</span>
      </div>
    </div>

    <div class="top-center">
      <div class="top-clock">{{ currentTime }}</div>
      <div class="top-date">{{ currentDate }}</div>
    </div>

    <div class="top-right">
      <button class="top-btn" @click="$emit('openHelp')" title="Ajuda">?</button>
      <button class="top-btn" @click="$emit('openUserMenu')" title="Usuário">
        <span class="user-icon">👤</span>
      </button>
      <button class="top-btn top-btn--accent" @click="$emit('openSettings')" title="Configurações">⚙</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineEmits(['openHelp', 'openUserMenu', 'openSettings'])

const currentTime = ref('')
const currentDate = ref('')
let clockInterval = null

function updateClock() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  currentDate.value = now.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })
}

onMounted(() => {
  updateClock()
  clockInterval = setInterval(updateClock, 1000)
})

onBeforeUnmount(() => clearInterval(clockInterval))
</script>

<style scoped>
.sigma-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background: var(--sigma-bar);
  border-bottom: 1px solid var(--sigma-border);
  padding: 0 16px;
  flex-shrink: 0;
}

.top-left { display: flex; align-items: center; }
.sigma-logo { display: flex; align-items: center; gap: 8px; }
.logo-sigma {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--sigma-accent);
  line-height: 1;
}
.logo-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--sigma-text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.top-center { display: flex; flex-direction: column; align-items: center; }
.top-clock { font-size: 1.1rem; font-weight: 700; color: var(--sigma-text); letter-spacing: 0.05em; line-height: 1.1; }
.top-date { font-size: 0.65rem; color: var(--sigma-text-muted); }

.top-right { display: flex; align-items: center; gap: 6px; }
.top-btn {
  background: var(--sigma-card);
  border: 1px solid var(--sigma-border);
  color: var(--sigma-text-muted);
  width: 32px; height: 32px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.top-btn:hover { background: var(--sigma-card-hover); color: var(--sigma-text); border-color: var(--sigma-accent); }
.top-btn--accent { color: var(--sigma-accent); border-color: var(--sigma-accent); }
.user-icon { font-size: 0.8rem; }
</style>
