<template>
  <div class="sigma-modal-backdrop" @click.self="$emit('close')">
    <div class="sigma-modal">
      <div class="modal-header">
        <h2>⚙ Configurações</h2>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body">

        <div class="settings-group">
          <div class="settings-label">Exibição</div>
          <div class="settings-row">
            <span>Brilho da Tela</span>
            <input type="range" min="20" max="100" v-model="brightness" class="range-input" />
            <span class="range-val">{{ brightness }}%</span>
          </div>
          <div class="settings-row">
            <span>Volume do Sistema</span>
            <input type="range" min="0" max="100" v-model="volume" class="range-input" />
            <span class="range-val">{{ volume }}%</span>
          </div>
        </div>

        <div class="settings-group">
          <div class="settings-label">Idioma e Região</div>
          <div class="settings-row">
            <span>Idioma</span>
            <select v-model="language" class="settings-select">
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div class="settings-row">
            <span>Formato de Data</span>
            <select v-model="dateFormat" class="settings-select">
              <option value="DD/MM/YYYY">DD/MM/AAAA</option>
              <option value="MM/DD/YYYY">MM/DD/AAAA</option>
            </select>
          </div>
        </div>

        <div class="settings-group">
          <div class="settings-label">Rede</div>
          <div class="settings-row">
            <span>Endereço IP (PACS)</span>
            <input type="text" v-model="pacsIp" class="settings-input" />
          </div>
          <div class="settings-row">
            <span>Porta DICOM</span>
            <input type="text" v-model="dicomPort" class="settings-input settings-input--sm" />
          </div>
        </div>

        <div class="settings-footer">
          <button class="sf-btn sf-btn--primary" @click="$emit('close')">Salvar</button>
          <button class="sf-btn" @click="$emit('close')">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['close'])

const brightness = ref(80)
const volume = ref(60)
const language = ref('pt-BR')
const dateFormat = ref('DD/MM/YYYY')
const pacsIp = ref('192.168.1.100')
const dicomPort = ref('4242')
</script>

<style scoped>
.sigma-modal-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.65);
  display: flex; align-items: center; justify-content: center; z-index: 200;
}
.sigma-modal {
  background: var(--sigma-card); border: 1px solid var(--sigma-border);
  border-radius: 14px; width: min(480px, 90vw); max-height: 80vh;
  display: flex; flex-direction: column;
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid var(--sigma-border);
  flex-shrink: 0;
}
.modal-header h2 { font-size: 0.95rem; font-weight: 700; color: var(--sigma-text); margin: 0; }
.modal-close { background: none; border: none; color: var(--sigma-text-muted); font-size: 1rem; cursor: pointer; padding: 4px 8px; border-radius: 4px; }
.modal-close:hover { color: var(--sigma-text); }

.modal-body { padding: 20px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto; }

.settings-group { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--sigma-border); border-radius: 8px; overflow: hidden; }
.settings-label {
  padding: 7px 14px; font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--sigma-accent); background: var(--sigma-bar); border-bottom: 1px solid var(--sigma-border);
}
.settings-row {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; font-size: 0.8rem; color: var(--sigma-text-muted);
  border-bottom: 1px solid var(--sigma-border);
}
.settings-row:last-child { border-bottom: none; }
.settings-row > span:first-child { flex: 1; }
.range-val { font-size: 0.7rem; color: var(--sigma-text); min-width: 32px; text-align: right; }

.range-input { flex: 1; accent-color: var(--sigma-accent); }
.settings-select, .settings-input {
  background: var(--sigma-bar); border: 1px solid var(--sigma-border);
  color: var(--sigma-text); padding: 4px 8px; border-radius: 5px;
  font-size: 0.75rem;
}
.settings-input { width: 140px; }
.settings-input--sm { width: 80px; }

.settings-footer { display: flex; gap: 10px; }
.sf-btn {
  flex: 1; padding: 10px;
  border-radius: 8px; font-size: 0.82rem; font-weight: 600;
  cursor: pointer; border: 1px solid var(--sigma-border);
  background: var(--sigma-card-hover); color: var(--sigma-text);
}
.sf-btn:hover { border-color: var(--sigma-accent); }
.sf-btn--primary { background: var(--sigma-accent); border-color: var(--sigma-accent); color: #000; }
.sf-btn--primary:hover { opacity: 0.88; border-color: var(--sigma-accent); }
</style>
