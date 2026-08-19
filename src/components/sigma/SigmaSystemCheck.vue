<template>
  <div class="system-check">
    <div class="check-header">
      <h2>Verificação do Sistema</h2>
      <p class="check-sub">Diagnóstico completo de todos os subsistemas</p>
    </div>

    <div class="check-list">
      <div
        class="check-item"
        v-for="(item, i) in checkItems"
        :key="item.name"
      >
        <div class="check-status-icon" :class="item.status">
          <span v-if="item.status === 'running'">⏳</span>
          <span v-else-if="item.status === 'ok'">✓</span>
          <span v-else-if="item.status === 'warn'">⚠</span>
          <span v-else-if="item.status === 'err'">✕</span>
          <span v-else>–</span>
        </div>
        <div class="check-info">
          <span class="check-name">{{ item.name }}</span>
          <span class="check-detail">{{ item.detail }}</span>
        </div>
        <div class="check-value" :class="item.status">{{ item.value }}</div>
      </div>
    </div>

    <div class="check-footer">
      <button class="check-btn" @click="runDiagnostics" :disabled="running">
        {{ running ? 'Verificando...' : 'Executar Diagnóstico' }}
      </button>
      <button class="check-btn check-btn--outline" @click="$emit('close')">Fechar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

defineEmits(['close'])

const running = ref(false)

const checkItems = reactive([
  { name: 'Gerador de Alta Tensão', detail: 'Verificar kV e mA', value: '120 kVp / 250 mA', status: 'ok' },
  { name: 'Sistema de Refrigeração', detail: 'Temperatura e fluxo do tubo', value: '42°C — Normal', status: 'ok' },
  { name: 'Detector de Raios X', detail: 'Calibração e ganho dos canais', value: '2048 canais', status: 'ok' },
  { name: 'Gantry e Rotação', detail: 'Velocidade e balanceamento', value: '0.75s/rot', status: 'ok' },
  { name: 'Mesa de Paciente', detail: 'Movimento e posicionamento', value: 'Posição zero', status: 'ok' },
  { name: 'Rede DICOM', detail: 'Conectividade com PACS', value: 'Conectado', status: 'ok' },
  { name: 'Armazenamento', detail: 'Espaço em disco disponível', value: '78% livre', status: 'warn' },
  { name: 'UPS / Energia', detail: 'Alimentação ininterrupta', value: '100% — Normal', status: 'ok' },
])

async function runDiagnostics() {
  running.value = true
  for (const item of checkItems) {
    item.status = 'running'
    await new Promise(r => setTimeout(r, 300 + Math.random() * 400))
    item.status = item.value.includes('78%') ? 'warn' : 'ok'
  }
  running.value = false
}
</script>

<style scoped>
.system-check {
  display: flex; flex-direction: column; gap: 20px;
  max-width: 600px; width: 100%;
  background: var(--sigma-card);
  border: 1px solid var(--sigma-border);
  border-radius: 14px;
  padding: 28px;
}

.check-header h2 { font-size: 1.1rem; font-weight: 700; color: var(--sigma-text); margin: 0 0 4px; }
.check-sub { font-size: 0.75rem; color: var(--sigma-text-muted); margin: 0; }

.check-list { display: flex; flex-direction: column; gap: 6px; }

.check-item {
  display: flex; align-items: center; gap: 12px;
  background: var(--sigma-card-hover);
  border: 1px solid var(--sigma-border);
  border-radius: 8px; padding: 10px 14px;
}

.check-status-icon {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 700; flex-shrink: 0;
}
.check-status-icon.ok { background: rgba(0,200,0,.15); color: var(--sigma-accent); }
.check-status-icon.warn { background: rgba(243,156,18,.15); color: #f39c12; }
.check-status-icon.err { background: rgba(231,76,60,.15); color: #e74c3c; }
.check-status-icon.running { background: rgba(52,152,219,.15); color: #3498db; }
.check-status-icon.idle { background: var(--sigma-bar); color: var(--sigma-text-muted); }

.check-info { flex: 1; }
.check-name { display: block; font-size: 0.82rem; font-weight: 600; color: var(--sigma-text); }
.check-detail { font-size: 0.68rem; color: var(--sigma-text-muted); }

.check-value { font-size: 0.72rem; font-weight: 600; }
.check-value.ok { color: var(--sigma-accent); }
.check-value.warn { color: #f39c12; }
.check-value.err { color: #e74c3c; }
.check-value.running { color: #3498db; }

.check-footer { display: flex; gap: 10px; }

.check-btn {
  flex: 1; padding: 10px 0;
  border-radius: 8px; font-size: 0.82rem; font-weight: 600;
  cursor: pointer; border: 1px solid var(--sigma-accent);
  background: var(--sigma-accent); color: #000;
  transition: opacity 0.15s;
}
.check-btn:disabled { opacity: 0.5; cursor: default; }
.check-btn--outline { background: transparent; color: var(--sigma-text-muted); border-color: var(--sigma-border); }
.check-btn--outline:hover { border-color: var(--sigma-accent); color: var(--sigma-text); }
</style>
