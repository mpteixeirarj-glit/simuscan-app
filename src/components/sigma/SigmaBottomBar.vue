<template>
  <div class="sigma-bottom-bar">
    <div class="bottom-left">
      <span class="status-dot" :class="{ active: systemReady }"></span>
      <span class="status-label">{{ systemReady ? 'Sistema Pronto' : 'Inicializando...' }}</span>
    </div>

    <div class="bottom-center">
      <button class="bottom-btn" @click="$emit('openRestart')" title="Reiniciar">↺ Reiniciar</button>
      <button class="bottom-btn bottom-btn--danger" @click="$emit('openShutdown')" title="Desligar">⏻ Desligar</button>
    </div>

    <div class="bottom-right">
      <span class="version-label">Sigma OS v4.2.1</span>
      <span class="sep">|</span>
      <button class="bottom-btn bottom-btn--sm" @click="$emit('openAbout')">Sobre</button>
    </div>
  </div>
</template>

<script setup>
defineProps({ systemReady: { type: Boolean, default: false } })
defineEmits(['openRestart', 'openShutdown', 'openAbout'])
</script>

<style scoped>
.sigma-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  background: var(--sigma-bar);
  border-top: 1px solid var(--sigma-border);
  padding: 0 16px;
  flex-shrink: 0;
}

.bottom-left { display: flex; align-items: center; gap: 8px; }
.status-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--sigma-text-muted);
  transition: background 0.3s;
}
.status-dot.active { background: var(--sigma-accent); box-shadow: 0 0 6px var(--sigma-accent); }
.status-label { font-size: 0.75rem; color: var(--sigma-text-muted); }

.bottom-center { display: flex; gap: 8px; }

.bottom-btn {
  background: var(--sigma-card);
  border: 1px solid var(--sigma-border);
  color: var(--sigma-text-muted);
  padding: 4px 12px;
  border-radius: 5px;
  font-size: 0.72rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.bottom-btn:hover { background: var(--sigma-card-hover); color: var(--sigma-text); border-color: var(--sigma-accent); }
.bottom-btn--danger:hover { border-color: #e74c3c; color: #e74c3c; }
.bottom-btn--sm { padding: 3px 10px; }

.bottom-right { display: flex; align-items: center; gap: 8px; }
.version-label { font-size: 0.68rem; color: var(--sigma-text-muted); opacity: 0.6; }
.sep { color: var(--sigma-border); font-size: 0.7rem; }
</style>
