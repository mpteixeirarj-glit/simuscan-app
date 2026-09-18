<template>
  <div class="sigma-old-console">
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
  </div>
</template>

<script setup>
const BASE_URL = import.meta.env.BASE_URL
</script>

<style scoped>
@import '@/assets/css/coming-soon.css';

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
