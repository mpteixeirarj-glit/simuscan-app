<template>
  <div class="sigma-center">
    <div class="cards-grid">

      <!-- Card 1: Worklist / Paciente -->
      <button class="sigma-card" @click="$emit('openJob')">
        <div class="card-icon card-icon--blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <rect x="3" y="4" width="18" height="16" rx="2"/>
            <path d="M7 9h10M7 13h7"/>
          </svg>
        </div>
        <div class="card-body">
          <h3>Worklist</h3>
          <p>Gerenciar exames e pacientes</p>
        </div>
        <div class="card-arrow">›</div>
      </button>

      <!-- Card 2: Protocolos -->
      <button class="sigma-card" @click="$emit('openProtocols')">
        <div class="card-icon card-icon--green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div class="card-body">
          <h3>Protocolos</h3>
          <p>Gerenciar protocolos de aquisição</p>
        </div>
        <div class="card-arrow">›</div>
      </button>

      <!-- Card 3: Calibração -->
      <button class="sigma-card" @click="$emit('openCalibration')">
        <div class="card-icon card-icon--yellow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
          </svg>
        </div>
        <div class="card-body">
          <h3>Calibração Diária</h3>
          <p>Preparação e calibração do sistema</p>
        </div>
        <div class="card-arrow">›</div>
      </button>

      <!-- Card 4: Verificação do Sistema -->
      <button class="sigma-card" @click="$emit('openSystemCheck')">
        <div class="card-icon card-icon--purple">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <path d="M9 12l2 2 4-4"/>
            <path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z"/>
          </svg>
        </div>
        <div class="card-body">
          <h3>Verificação</h3>
          <p>Diagnóstico e status do sistema</p>
        </div>
        <div class="card-arrow">›</div>
      </button>

    </div>

    <!-- System Status Panel -->
    <div class="status-panel">
      <div class="status-item" v-for="item in statusItems" :key="item.label">
        <span class="status-dot" :class="item.status"></span>
        <span class="status-name">{{ item.label }}</span>
        <span class="status-value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const statusItems = [
  { label: 'Tensão do Tubo', value: '120 kVp', status: 'ok' },
  { label: 'Corrente', value: '250 mA', status: 'ok' },
  { label: 'Temperatura do Tubo', value: '42°C', status: 'ok' },
  { label: 'Refrigeração', value: 'Normal', status: 'ok' },
  { label: 'Rede', value: 'Conectado', status: 'ok' },
  { label: 'Armazenamento', value: '78% livre', status: 'warn' },
]

defineEmits(['openJob', 'openProtocols', 'openCalibration', 'openSystemCheck'])
</script>

<style scoped>
.sigma-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px;
  overflow-y: auto;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 700px;
}

.sigma-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--sigma-card);
  border: 1px solid var(--sigma-border);
  border-radius: 12px;
  padding: 20px 18px;
  cursor: pointer;
  text-align: left;
  transition: transform 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.sigma-card:hover {
  transform: translateY(-2px);
  border-color: var(--sigma-accent);
  box-shadow: 0 6px 24px rgba(0, 200, 0, 0.12);
}

.card-icon {
  width: 46px; height: 46px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.card-icon svg { width: 22px; height: 22px; }
.card-icon--blue { background: rgba(52,152,219,.15); color: #3498db; border: 1px solid rgba(52,152,219,.3); }
.card-icon--green { background: rgba(0,200,0,.15); color: var(--sigma-accent); border: 1px solid rgba(0,200,0,.3); }
.card-icon--yellow { background: rgba(243,156,18,.15); color: #f39c12; border: 1px solid rgba(243,156,18,.3); }
.card-icon--purple { background: rgba(155,89,182,.15); color: #9b59b6; border: 1px solid rgba(155,89,182,.3); }

.card-body { flex: 1; }
.card-body h3 { font-size: 0.92rem; font-weight: 700; color: var(--sigma-text); margin: 0 0 3px; }
.card-body p { font-size: 0.72rem; color: var(--sigma-text-muted); margin: 0; }

.card-arrow { font-size: 1.3rem; color: var(--sigma-text-muted); font-weight: 300; }
.sigma-card:hover .card-arrow { color: var(--sigma-accent); }

/* Status panel */
.status-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  max-width: 700px;
  width: 100%;
  background: var(--sigma-card);
  border: 1px solid var(--sigma-border);
  border-radius: 10px;
  padding: 14px 18px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: var(--sigma-text-muted);
  min-width: 180px;
}

.status-dot {
  width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
}
.status-dot.ok { background: var(--sigma-accent); box-shadow: 0 0 4px var(--sigma-accent); }
.status-dot.warn { background: #f39c12; box-shadow: 0 0 4px #f39c12; }
.status-dot.err { background: #e74c3c; box-shadow: 0 0 4px #e74c3c; }

.status-name { flex: 1; }
.status-value { font-weight: 600; color: var(--sigma-text); }
</style>
