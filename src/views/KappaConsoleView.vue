<template>
  <div class="kappa-console">
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
  </div>
</template>

<script setup>
const BASE_URL = import.meta.env.BASE_URL
</script>

<style scoped>
@import '@/assets/css/coming-soon.css';

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
