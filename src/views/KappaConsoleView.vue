<template>
  <div class="kappa-console">
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
        <p class="rotate-desc">O console Kappa Healthcare foi projetado para uso em <strong>modo paisagem</strong>.</p>
        <p class="rotate-hint">Gire seu dispositivo horizontalmente para continuar.</p>
        <button class="rotate-btn-back" @click="$router.push('/escolha')">← Voltar à escolha de sistema</button>
      </div>
    </div>
    <template v-else>
    <div class="kappa-menubar">
      <div class="menubar-left">
        <img :src="BASE_URL + 'imagens/kappa-icone.png'" alt="Kappa" class="console-logo-sm" @error="$event.target.style.display='none'" />
        <span class="console-title">SimuScan — Kappa Healthcare</span>
      </div>
      <div class="menubar-right">
        <button class="kappa-tab active">Scan</button>
        <button class="kappa-tab">MPR</button>
        <button class="kappa-tab">3D</button>
        <button class="kappa-tab" @click="$router.push('/escolha')">Return System</button>
      </div>
    </div>

    <div class="kappa-center">
      <div class="coming-soon-panel kappa-panel">
        <img :src="BASE_URL + 'imagens/kappa-icone.png'" alt="Kappa" class="coming-soon-icon" @error="$event.target.style.display='none'" />
        <h2>Kappa Healthcare</h2>
        <p class="coming-soon-subtitle">Kappa Healthcare CT</p>
        <p class="coming-soon-desc">
          Console em desenvolvimento.<br />
          Interface de alta produtividade para grandes volumes de exames,
          com fluxo completo de aquisição.
        </p>
        <span class="coming-soon-badge kappa-badge">Em breve</span>
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

.kappa-console {
  width: 100vw;
  height: 100vh;
  background: #05070b;
  color: #eee;
  font-family: "Arial Narrow", Arial, sans-serif;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.kappa-menubar {
  height: 52px;
  background: linear-gradient(90deg, #0f0408, #2a0a15);
  border-bottom: 1px solid rgba(158,61,82,0.4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  flex-shrink: 0;
}
.menubar-left { display: flex; align-items: center; gap: 10px; }
.console-logo-sm { width: 32px; height: 32px; object-fit: contain; }
.console-title { font-size: 14px; font-weight: 700; color: #f0d0d8; }
.menubar-right { display: flex; align-items: center; }
.kappa-tab {
  padding: 8px 14px;
  background: linear-gradient(#c9c9dc, #9a9ab2);
  border: 2px outset #d6d6e6;
  border-radius: 4px;
  color: #111;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 6px;
  transition: background 0.2s;
}
.kappa-tab:hover { background: linear-gradient(#d8d8e8, #a9a9c0); }
.kappa-tab.active { border: 3px solid #f0a800; }
.kappa-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.kappa-panel { border-color: #9e3d52; }
.kappa-badge {
  background: rgba(90,26,46,0.3);
  color: #f0d0d8;
  border-color: #9e3d52;
}
</style>
