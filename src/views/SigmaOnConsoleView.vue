<template>
  <div class="sigma-on-console">
    <div class="sigma-on-menubar">
      <div class="menubar-left">
        <img :src="BASE_URL + 'imagens/sigma-on.png'" alt="Sigma ON" class="console-logo-sm" @error="$event.target.style.display='none'" />
        <span class="console-title">SimuScan — Sigma ON CT</span>
      </div>
      <div class="menubar-right">
        <button class="sigma-on-tab active">Patient Browser</button>
        <button class="sigma-on-tab">Exam</button>
        <button class="sigma-on-tab">3D</button>
        <button class="sigma-on-tab" @click="$router.push('/escolha')">Return System</button>
      </div>
    </div>

    <div class="sigma-on-center">
      <div class="coming-soon-panel">
        <img :src="BASE_URL + 'imagens/sigma-on.png'" alt="Sigma ON" class="coming-soon-icon" @error="$event.target.style.display='none'" />
        <h2>Sigma ON CT</h2>
        <p class="coming-soon-subtitle">Sigma ON CT — versão atual</p>
        <p class="coming-soon-desc">
          Console em desenvolvimento.<br />
          Interface moderna com fluxo avançado completo de
          gerenciamento de protocolos, worklist, topograma e aquisição.
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

.sigma-on-console {
  width: 100vw;
  height: 100vh;
  background: #04100a;
  color: #fff;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.sigma-on-menubar {
  height: 52px;
  background: #1c6020;
  border-bottom: 1px solid rgba(255,255,255,0.1);
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
.sigma-on-tab {
  padding: 8px 14px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 6px;
  color: #c8f5d8;
  font-size: 13px;
  cursor: pointer;
  margin-left: 6px;
  transition: background 0.2s;
}
.sigma-on-tab:hover, .sigma-on-tab.active {
  background: #2ecc71;
  color: #000;
  border-color: #2ecc71;
}
.sigma-on-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
