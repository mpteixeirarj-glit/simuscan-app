<template>
  <div class="sigma-modal-backdrop" @click.self="$emit('close')">
    <div class="sigma-modal-full">
      <div class="modal-header">
        <div class="header-left">
          <span class="patient-tag">Paciente: <strong>{{ patientName }}</strong></span>
          <span class="sep">|</span>
          <span class="exam-tag">Exame: <strong>{{ examType }}</strong></span>
        </div>
        <div class="tab-bar">
          <button
            class="tab-btn"
            v-for="tab in tabs"
            :key="tab.key"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >{{ tab.label }}</button>
        </div>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>

      <!-- Tab content -->
      <div class="modal-body">

        <!-- Topograma -->
        <div v-if="activeTab === 'topo'" class="tab-content tab-topo">
          <div class="topo-view">
            <div class="topo-label">Vista Lateral</div>
            <div class="topo-body">
              <div class="topo-ruler">
                <span v-for="n in 10" :key="n">{{ (n - 1) * 10 }}</span>
              </div>
              <div class="topo-image">
                <div class="topo-scan-line" :style="{ top: scanLinePos + '%' }"></div>
                <div class="topo-body-silhouette">
                  <svg viewBox="0 0 120 240" fill="none">
                    <ellipse cx="60" cy="22" rx="16" ry="18" stroke="#00C800" stroke-width="1.2" fill="rgba(0,200,0,0.04)"/>
                    <rect x="40" y="42" width="40" height="60" rx="6" stroke="#00C800" stroke-width="1.2" fill="rgba(0,200,0,0.04)"/>
                    <rect x="44" y="104" width="32" height="54" rx="4" stroke="#00C800" stroke-width="1.2" fill="rgba(0,200,0,0.04)"/>
                    <rect x="44" y="160" width="13" height="50" rx="4" stroke="#00C800" stroke-width="1.2" fill="rgba(0,200,0,0.04)"/>
                    <rect x="63" y="160" width="13" height="50" rx="4" stroke="#00C800" stroke-width="1.2" fill="rgba(0,200,0,0.04)"/>
                  </svg>
                </div>
                <div class="topo-roi" :style="{ top: roi.start + '%', height: (roi.end - roi.start) + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="topo-controls">
            <div class="tc-group">
              <div class="tc-label">Início</div>
              <div class="tc-val">{{ roi.startMm }} mm</div>
            </div>
            <div class="tc-group">
              <div class="tc-label">Fim</div>
              <div class="tc-val">{{ roi.endMm }} mm</div>
            </div>
            <div class="tc-group">
              <div class="tc-label">Cobertura</div>
              <div class="tc-val">{{ roi.endMm - roi.startMm }} mm</div>
            </div>
            <button class="topo-btn" @click="startScan" :disabled="scanning">{{ scanning ? 'Adquirindo...' : '▶ Iniciar Aquisição' }}</button>
          </div>
        </div>

        <!-- Protocolos -->
        <div v-if="activeTab === 'proto'" class="tab-content tab-proto">
          <div class="proto-list">
            <button
              class="proto-item"
              v-for="p in protocols"
              :key="p.name"
              :class="{ selected: selectedProtocol === p.name }"
              @click="selectedProtocol = p.name"
            >
              <div class="proto-name">{{ p.name }}</div>
              <div class="proto-params">{{ p.kv }}kV / {{ p.mas }}mAs</div>
            </button>
          </div>
          <div class="proto-detail" v-if="selectedProtocolData">
            <div class="pd-title">{{ selectedProtocolData.name }}</div>
            <div class="pd-rows">
              <div class="pd-row"><span>kV</span><span>{{ selectedProtocolData.kv }}</span></div>
              <div class="pd-row"><span>mAs</span><span>{{ selectedProtocolData.mas }}</span></div>
              <div class="pd-row"><span>Pitch</span><span>{{ selectedProtocolData.pitch }}</span></div>
              <div class="pd-row"><span>Colimação</span><span>{{ selectedProtocolData.coll }} mm</span></div>
              <div class="pd-row"><span>Reconstrução</span><span>{{ selectedProtocolData.recon }} mm</span></div>
              <div class="pd-row"><span>Janela</span><span>{{ selectedProtocolData.window }}</span></div>
            </div>
          </div>
        </div>

        <!-- Paciente -->
        <div v-if="activeTab === 'patient'" class="tab-content tab-patient">
          <div class="patient-form">
            <div class="pf-row"><label>Nome</label><input class="pf-input" v-model="patientName" /></div>
            <div class="pf-row"><label>ID do Exame</label><input class="pf-input" v-model="examId" /></div>
            <div class="pf-row"><label>Data de Nascimento</label><input class="pf-input" type="date" v-model="birthdate" /></div>
            <div class="pf-row"><label>Sexo</label>
              <select class="pf-input">
                <option>Masculino</option><option>Feminino</option><option>Não informado</option>
              </select>
            </div>
            <div class="pf-row"><label>Peso (kg)</label><input class="pf-input pf-input--sm" v-model="weight" type="number" /></div>
            <div class="pf-row"><label>Altura (cm)</label><input class="pf-input pf-input--sm" v-model="height" type="number" /></div>
            <div class="pf-row"><label>Tipo de Exame</label><input class="pf-input" v-model="examType" /></div>
            <div class="pf-row">
              <label>Posicionamento</label>
              <div class="pos-btns">
                <button class="pos-btn" :class="{ active: orientation === 'Head First' }" @click="orientation = 'Head First'">Head First</button>
                <button class="pos-btn" :class="{ active: orientation === 'Feet First' }" @click="orientation = 'Feet First'">Feet First</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Parâmetros -->
        <div v-if="activeTab === 'params'" class="tab-content tab-params">
          <div class="params-grid">
            <div class="param-card" v-for="p in paramCards" :key="p.label">
              <div class="param-label">{{ p.label }}</div>
              <div class="param-value">{{ p.value }}</div>
              <div class="param-unit">{{ p.unit }}</div>
            </div>
          </div>
        </div>

        <!-- Imagens -->
        <div v-if="activeTab === 'images'" class="tab-content tab-images">
          <div class="images-placeholder">
            <div class="ip-icon">🖼</div>
            <div class="ip-text">Nenhuma imagem adquirida nesta sessão</div>
            <div class="ip-sub">Inicie uma aquisição na aba Topograma</div>
          </div>
        </div>

        <!-- Qualidade -->
        <div v-if="activeTab === 'quality'" class="tab-content tab-quality">
          <div class="quality-metrics">
            <div class="qm-item" v-for="q in qualityItems" :key="q.name">
              <div class="qm-name">{{ q.name }}</div>
              <div class="qm-bar-wrap"><div class="qm-bar" :style="{ width: q.val + '%', background: q.color }"></div></div>
              <div class="qm-val">{{ q.val }}%</div>
            </div>
          </div>
        </div>

        <!-- Dose -->
        <div v-if="activeTab === 'dose'" class="tab-content tab-dose">
          <div class="dose-grid">
            <div class="dose-card"><div class="dc-label">CTDIvol</div><div class="dc-val">12.4 <span>mGy</span></div></div>
            <div class="dose-card"><div class="dc-label">DLP</div><div class="dc-val">248 <span>mGy·cm</span></div></div>
            <div class="dose-card"><div class="dc-label">SSDE</div><div class="dc-val">15.2 <span>mGy</span></div></div>
            <div class="dose-card"><div class="dc-label">Dose Efetiva Est.</div><div class="dc-val">3.5 <span>mSv</span></div></div>
          </div>
          <div class="dose-note">Valores estimados baseados nos parâmetros do protocolo selecionado.</div>
        </div>

        <!-- DICOM -->
        <div v-if="activeTab === 'dicom'" class="tab-content tab-dicom">
          <div class="dicom-rows">
            <div class="dicom-row"><span>Servidor PACS</span><span>192.168.1.100</span></div>
            <div class="dicom-row"><span>AE Title</span><span>SIGMA_CT</span></div>
            <div class="dicom-row"><span>Porta</span><span>4242</span></div>
            <div class="dicom-row"><span>Status</span><span class="status-ok">Conectado</span></div>
            <div class="dicom-row"><span>Modalidade</span><span>CT</span></div>
            <div class="dicom-row"><span>Protocolo</span><span>DICOM 3.0</span></div>
          </div>
          <button class="dicom-btn">Testar Conexão</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineEmits(['close'])

const activeTab = ref('topo')
const tabs = [
  { key: 'topo',    label: 'Topograma' },
  { key: 'proto',   label: 'Protocolo' },
  { key: 'patient', label: 'Paciente' },
  { key: 'params',  label: 'Parâmetros' },
  { key: 'images',  label: 'Imagens' },
  { key: 'quality', label: 'Qualidade' },
  { key: 'dose',    label: 'Dose' },
  { key: 'dicom',   label: 'DICOM' },
]

// Patient
const patientName = ref('João da Silva')
const examId = ref('EX-2024-001')
const birthdate = ref('1980-05-14')
const weight = ref(78)
const height = ref(175)
const examType = ref('Crânio com Contraste')
const orientation = ref('Head First')

// Topograma
const scanning = ref(false)
const scanLinePos = ref(0)
const roi = ref({ start: 20, end: 80, startMm: 0, endMm: 180 })

async function startScan() {
  scanning.value = true
  for (let i = 0; i <= 100; i += 2) {
    await new Promise(r => setTimeout(r, 40))
    scanLinePos.value = i
  }
  scanning.value = false
}

// Protocols
const selectedProtocol = ref('Crânio Padrão')
const protocols = [
  { name: 'Crânio Padrão',   kv: 120, mas: 300, pitch: 0.6, coll: 0.6, recon: 1.0, window: 'Cérebro' },
  { name: 'Crânio Alta Res.', kv: 120, mas: 400, pitch: 0.5, coll: 0.3, recon: 0.6, window: 'Osso' },
  { name: 'Abdome',           kv: 120, mas: 250, pitch: 1.2, coll: 0.6, recon: 1.5, window: 'Abdome' },
  { name: 'Tórax',            kv: 100, mas: 150, pitch: 1.5, coll: 0.6, recon: 1.5, window: 'Pulmão' },
  { name: 'Coluna Lombar',    kv: 120, mas: 200, pitch: 0.8, coll: 0.6, recon: 1.0, window: 'Osso' },
]
const selectedProtocolData = computed(() => protocols.find(p => p.name === selectedProtocol.value))

// Params
const paramCards = [
  { label: 'Tensão (kV)',   value: '120', unit: 'kVp' },
  { label: 'Corrente',      value: '250', unit: 'mA' },
  { label: 'mAs',           value: '300', unit: 'mAs' },
  { label: 'Pitch',         value: '0.6', unit: '' },
  { label: 'Colimação',     value: '0.6', unit: 'mm' },
  { label: 'Reconstrução',  value: '1.0', unit: 'mm' },
  { label: 'Rotação',       value: '0.75', unit: 's' },
  { label: 'FOV',           value: '250', unit: 'mm' },
]

// Quality
const qualityItems = [
  { name: 'SNR',      val: 88, color: '#00C800' },
  { name: 'CNR',      val: 82, color: '#00C800' },
  { name: 'Nitidez',  val: 91, color: '#00C800' },
  { name: 'Artefato', val: 5,  color: '#e74c3c' },
]
</script>

<style scoped>
.sigma-modal-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.75);
  display: flex; align-items: center; justify-content: center; z-index: 200;
}
.sigma-modal-full {
  background: var(--sigma-card); border: 1px solid var(--sigma-border);
  border-radius: 14px; width: min(900px, 96vw); height: min(620px, 92vh);
  display: flex; flex-direction: column;
}
.modal-header {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px; border-bottom: 1px solid var(--sigma-border);
  flex-shrink: 0; flex-wrap: wrap;
}
.header-left { display: flex; align-items: center; gap: 8px; font-size: 0.78rem; color: var(--sigma-text-muted); }
.patient-tag strong, .exam-tag strong { color: var(--sigma-text); }
.sep { color: var(--sigma-border); }

.tab-bar { display: flex; gap: 2px; flex: 1; flex-wrap: wrap; }
.tab-btn {
  padding: 6px 12px; border-radius: 6px; border: 1px solid transparent;
  background: none; color: var(--sigma-text-muted);
  font-size: 0.72rem; font-weight: 600; cursor: pointer;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
  white-space: nowrap;
}
.tab-btn:hover { background: var(--sigma-card-hover); color: var(--sigma-text); }
.tab-btn.active { background: rgba(0,200,0,.15); color: var(--sigma-accent); border-color: rgba(0,200,0,.3); }

.modal-close { background: none; border: none; color: var(--sigma-text-muted); font-size: 1.1rem; cursor: pointer; padding: 4px 8px; border-radius: 4px; margin-left: auto; }
.modal-close:hover { color: var(--sigma-text); }

.modal-body { flex: 1; overflow: hidden; }
.tab-content { height: 100%; overflow-y: auto; padding: 20px; }

/* Topograma */
.tab-topo { display: flex; gap: 20px; }
.topo-view { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.topo-label { font-size: 0.7rem; color: var(--sigma-text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
.topo-body { display: flex; gap: 8px; height: 100%; }
.topo-ruler {
  display: flex; flex-direction: column; justify-content: space-between;
  width: 28px; font-size: 0.6rem; color: var(--sigma-text-muted); padding: 4px 0;
}
.topo-image {
  flex: 1; background: #000; border: 1px solid var(--sigma-border);
  border-radius: 8px; position: relative; overflow: hidden; min-height: 280px;
}
.topo-scan-line {
  position: absolute; left: 0; right: 0; height: 2px;
  background: var(--sigma-accent); box-shadow: 0 0 8px var(--sigma-accent);
  transition: top 0.04s linear;
}
.topo-body-silhouette {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center; opacity: 0.7;
}
.topo-body-silhouette svg { height: 90%; }
.topo-roi {
  position: absolute; left: 0; right: 0;
  background: rgba(0,200,0,.12); border-top: 1px dashed var(--sigma-accent); border-bottom: 1px dashed var(--sigma-accent);
}
.topo-controls { width: 180px; display: flex; flex-direction: column; gap: 12px; }
.tc-group { background: var(--sigma-card-hover); border: 1px solid var(--sigma-border); border-radius: 8px; padding: 10px 12px; }
.tc-label { font-size: 0.65rem; color: var(--sigma-text-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
.tc-val { font-size: 0.95rem; font-weight: 700; color: var(--sigma-text); }
.topo-btn {
  padding: 12px; border-radius: 8px; border: 1px solid var(--sigma-accent);
  background: var(--sigma-accent); color: #000; font-size: 0.82rem; font-weight: 700; cursor: pointer;
  margin-top: auto;
}
.topo-btn:disabled { opacity: 0.5; cursor: default; }

/* Protocols */
.tab-proto { display: flex; gap: 16px; }
.proto-list { width: 220px; display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; }
.proto-item {
  padding: 10px 12px; border-radius: 8px; border: 1px solid var(--sigma-border);
  background: var(--sigma-card-hover); cursor: pointer; text-align: left;
  transition: border-color 0.12s;
}
.proto-item:hover { border-color: var(--sigma-accent); }
.proto-item.selected { border-color: var(--sigma-accent); background: rgba(0,200,0,.1); }
.proto-name { font-size: 0.8rem; font-weight: 600; color: var(--sigma-text); margin-bottom: 2px; }
.proto-params { font-size: 0.68rem; color: var(--sigma-text-muted); }

.proto-detail { flex: 1; }
.pd-title { font-size: 0.95rem; font-weight: 700; color: var(--sigma-text); margin-bottom: 12px; }
.pd-rows { display: flex; flex-direction: column; border: 1px solid var(--sigma-border); border-radius: 8px; overflow: hidden; }
.pd-row {
  display: flex; justify-content: space-between;
  padding: 9px 14px; font-size: 0.8rem;
  border-bottom: 1px solid var(--sigma-border);
}
.pd-row:last-child { border-bottom: none; }
.pd-row span:first-child { color: var(--sigma-text-muted); }
.pd-row span:last-child { color: var(--sigma-text); font-weight: 600; }

/* Patient */
.patient-form { display: flex; flex-direction: column; gap: 10px; max-width: 480px; }
.pf-row { display: flex; align-items: center; gap: 12px; }
.pf-row label { font-size: 0.78rem; color: var(--sigma-text-muted); min-width: 140px; }
.pf-input {
  flex: 1; background: var(--sigma-bar); border: 1px solid var(--sigma-border);
  color: var(--sigma-text); padding: 7px 10px; border-radius: 6px; font-size: 0.8rem;
}
.pf-input--sm { flex: unset; width: 90px; }
.pos-btns { display: flex; gap: 6px; }
.pos-btn {
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--sigma-border);
  background: var(--sigma-card-hover); color: var(--sigma-text-muted);
  font-size: 0.75rem; cursor: pointer;
}
.pos-btn.active { border-color: var(--sigma-accent); color: var(--sigma-accent); background: rgba(0,200,0,.1); }

/* Params */
.params-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
.param-card {
  background: var(--sigma-card-hover); border: 1px solid var(--sigma-border);
  border-radius: 10px; padding: 14px 16px;
}
.param-label { font-size: 0.68rem; color: var(--sigma-text-muted); margin-bottom: 6px; }
.param-value { font-size: 1.4rem; font-weight: 700; color: var(--sigma-accent); line-height: 1; }
.param-unit { font-size: 0.65rem; color: var(--sigma-text-muted); margin-top: 3px; }

/* Images */
.images-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 10px; }
.ip-icon { font-size: 3rem; opacity: 0.4; }
.ip-text { font-size: 0.9rem; font-weight: 600; color: var(--sigma-text-muted); }
.ip-sub { font-size: 0.75rem; color: var(--sigma-text-muted); opacity: 0.7; }

/* Quality */
.quality-metrics { display: flex; flex-direction: column; gap: 14px; max-width: 400px; }
.qm-item { display: flex; align-items: center; gap: 12px; }
.qm-name { font-size: 0.78rem; color: var(--sigma-text-muted); width: 80px; }
.qm-bar-wrap { flex: 1; background: var(--sigma-bar); border-radius: 4px; height: 10px; overflow: hidden; }
.qm-bar { height: 100%; border-radius: 4px; transition: width 0.4s; }
.qm-val { font-size: 0.78rem; font-weight: 700; color: var(--sigma-text); width: 36px; text-align: right; }

/* Dose */
.dose-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 14px; }
.dose-card {
  background: var(--sigma-card-hover); border: 1px solid var(--sigma-border);
  border-radius: 10px; padding: 18px 20px;
}
.dc-label { font-size: 0.7rem; color: var(--sigma-text-muted); margin-bottom: 8px; }
.dc-val { font-size: 1.5rem; font-weight: 700; color: var(--sigma-text); }
.dc-val span { font-size: 0.75rem; color: var(--sigma-text-muted); font-weight: 400; margin-left: 4px; }
.dose-note { font-size: 0.72rem; color: var(--sigma-text-muted); }

/* DICOM */
.dicom-rows { display: flex; flex-direction: column; border: 1px solid var(--sigma-border); border-radius: 8px; overflow: hidden; margin-bottom: 14px; }
.dicom-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 9px 14px; font-size: 0.8rem;
  border-bottom: 1px solid var(--sigma-border);
}
.dicom-row:last-child { border-bottom: none; }
.dicom-row span:first-child { color: var(--sigma-text-muted); }
.dicom-row span:last-child { color: var(--sigma-text); font-weight: 600; }
.status-ok { color: var(--sigma-accent) !important; }
.dicom-btn {
  padding: 10px 20px; border-radius: 8px; border: 1px solid var(--sigma-accent);
  background: transparent; color: var(--sigma-accent); font-size: 0.82rem;
  font-weight: 600; cursor: pointer;
}
.dicom-btn:hover { background: rgba(0,200,0,.1); }
</style>
