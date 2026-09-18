<template>
  <div class="sigma-old-console">
    <div v-if="isMobile && isPortrait" class="rotate-overlay">
      <div class="rotate-content">
        <div class="rotate-icon">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="28" y="8" width="24" height="40" rx="3" stroke="#3498db" stroke-width="2.5" fill="none"/>
            <rect x="32" y="12" width="16" height="28" rx="1" fill="rgba(52,152,219,0.1)"/>
            <circle cx="40" cy="44" r="2" fill="#3498db"/>
            <path d="M16 40 A24 24 0 0 1 64 40" stroke="#e91e8c" stroke-width="2.5" stroke-linecap="round" fill="none" stroke-dasharray="6 3"/>
            <polyline points="60,34 64,40 58,42" stroke="#e91e8c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2 class="rotate-title">Gire o dispositivo</h2>
        <p class="rotate-desc">O console Sigma Old CT foi projetado para uso em <strong>modo paisagem</strong>.</p>
        <p class="rotate-hint">Gire seu dispositivo horizontalmente para continuar.</p>
        <button class="rotate-btn-back" @click="$router.push('/escolha')">← Voltar à escolha de sistema</button>
      </div>
    </div>
    <template v-else>
    <div class="sigma-old-menubar">
      <div class="menubar-left">
        <img :src="BASE_URL + 'imagens/sigma-icone.png'" alt="Sigma Old" class="console-logo-sm" @error="$event.target.style.display='none'" />
        <span class="console-title">SimuScan — Sigma Old CT</span>
      </div>
      <div class="menubar-right">
        <button class="sigma-old-tab active">Patient Browser</button>
        <button class="sigma-old-tab">Exam</button>
        <button class="sigma-old-tab">3D</button>
        <button class="sigma-old-tab" @click="$router.push('/escolha')">Return System</button>
      </div>
    </div>

    <div class="sigma-old-center">
      <div class="coming-soon-panel">
        <img :src="BASE_URL + 'imagens/sigma-icone.png'" alt="Sigma Old" class="coming-soon-icon" @error="$event.target.style.display='none'" />
        <h2>Sigma Old CT</h2>
        <p class="coming-soon-subtitle">Sigma Old CT — versão legado</p>
        <p class="coming-soon-desc">
          Console em desenvolvimento.<br />
          Interface clássica do console de geração anterior,
          com fluxo completo de gerenciamento de protocolos,
          worklist, topograma e aquisição.
        </p>
        <span class="coming-soon-badge">Em breve</span>
      </div>
    </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const BASE_URL = import.meta.env.BASE_URL

const isPortrait = ref(false)
const isMobile   = ref(false)

function checkOrientation() {
  const w = window.innerWidth
  const h = window.innerHeight
  isMobile.value   = w < 1024
  isPortrait.value = h > w
}

onMounted(() => {
  checkOrientation()
  window.addEventListener('resize', checkOrientation)
  window.addEventListener('orientationchange', checkOrientation)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkOrientation)
  window.removeEventListener('orientationchange', checkOrientation)
})
</script>

<style scoped>
@import '@/assets/css/coming-soon.css';
@import '@/assets/css/rotate-overlay.css';

.sigma-old-console {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #000 0%, #0b2a4a 50%, #222428 100%);
  color: #fff;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.sigma-old-menubar {
  height: 52px;
  background: linear-gradient(90deg, #0b2a4a, #222428);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  flex-shrink: 0;
}
.menubar-left { display: flex; align-items: center; gap: 10px; }
.console-logo-sm { width: 32px; height: 32px; object-fit: contain; }
.console-title { font-size: 14px; font-weight: 700; }
.menubar-right { display: flex; align-items: center; }
.sigma-old-tab {
  padding: 8px 14px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 6px;
  color: #dbe8ff;
  font-size: 13px;
  cursor: pointer;
  margin-left: 6px;
  transition: background 0.2s;
}
.sigma-old-tab:hover, .sigma-old-tab.active {
  background: #1e90ff;
  color: white;
  border-color: #1e90ff;
}
.sigma-old-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
