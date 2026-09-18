<template>
  <div class="sigma-on-root">
    <!-- ROTATE OVERLAY (mobile portrait) -->
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
        <p class="rotate-desc">O console Sigma ON CT foi projetado para uso em <strong>modo paisagem</strong>.</p>
        <p class="rotate-hint">Gire seu dispositivo horizontalmente para continuar.</p>
        <button class="rotate-btn-back" @click="$router.push('/escolha')">← Voltar à escolha de sistema</button>
      </div>
    </div>

    <template v-else>
      <!-- ══════════ BOOT SCREEN ══════════ -->
      <div v-if="currentScreen === 'boot'" class="boot-screen">
        <div class="boot-left">
          <div class="boot-on-watermark">ON</div>
          <img :src="BASE_URL + 'imagens/sigma-on.png'" alt="Sigma ON" class="boot-logo" @error="$event.target.style.display='none'" />
          <div class="boot-brand">Sigma ON CT</div>
          <div class="boot-brand-sub">Sigma Healthcare Imaging Systems</div>
        </div>
        <div class="boot-right">
          <div class="boot-right-inner">
            <div class="boot-sys-label">SISTEMA</div>
            <div class="boot-sys-name">Sigma ON CT Console</div>
            <div class="boot-sys-version">{{ version }}</div>
            <div class="boot-progress-wrap">
              <div class="boot-progress-bar" :style="{ width: bootProgress + '%' }"></div>
            </div>
            <div class="boot-status-text">{{ bootStatusText }}</div>
            <div class="boot-copyright">© Sigma Healthcare Imaging Systems</div>
          </div>
        </div>
      </div>

      <!-- ══════════ PATIENT BROWSER ══════════ -->
      <div v-else-if="currentScreen === 'patient-browser'" class="pb-root">
        <!-- menubar -->
        <div class="so-menubar">
          <div class="so-menubar-left">
            <img :src="BASE_URL + 'imagens/sigma-on.png'" alt="Sigma ON" class="so-logo" @error="$event.target.style.display='none'" />
            <span class="so-title">SimuScan — Sigma ON CT</span>
          </div>
          <div class="so-menubar-tabs">
            <button class="so-tab active">Patient Browser</button>
            <button class="so-tab">Exam</button>
            <button class="so-tab">MPR</button>
            <button class="so-tab">3D</button>
            <button class="so-tab" @click="$router.push('/escolha')">Return System</button>
          </div>
        </div>

        <!-- main area -->
        <div class="pb-body">
          <!-- left: table panel -->
          <div class="pb-table-panel">
            <div class="pb-toolbar">
              <div class="pb-tab-group">
                <button
                  v-for="tab in pbTabs" :key="tab.key"
                  class="pb-filter-tab"
                  :class="{ active: pbActiveTab === tab.key }"
                  @click="pbActiveTab = tab.key"
                >{{ tab.label }}</button>
              </div>
              <input
                v-model="pbSearch"
                class="pb-search"
                placeholder="Buscar paciente..."
                type="text"
              />
            </div>
            <div class="pb-table-wrap">
              <table class="pb-table">
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>ID</th>
                    <th>Nascimento</th>
                    <th>Data Exame</th>
                    <th>Descrição</th>
                    <th>Mod.</th>
                    <th>Séries</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="p in filteredPatients"
                    :key="p.patientId"
                    :class="{ selected: selectedPatient?.patientId === p.patientId }"
                    @click="selectedPatient = p"
                    @dblclick="openStudy(p)"
                  >
                    <td>{{ p.name }}</td>
                    <td class="mono">{{ p.patientId }}</td>
                    <td class="mono">{{ p.dob }}</td>
                    <td class="mono">{{ p.studyDate }}</td>
                    <td>{{ p.studyDesc }}</td>
                    <td class="mono">{{ p.modality }}</td>
                    <td class="mono center">{{ p.seriesCount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- right: series panel -->
          <div class="pb-series-panel">
            <div class="pb-series-header">Séries do Estudo</div>
            <template v-if="selectedPatient">
              <div class="pb-patient-info">
                <div class="pb-pi-name">{{ selectedPatient.name }}</div>
                <div class="pb-pi-sub">{{ selectedPatient.patientId }} · {{ selectedPatient.dob }}</div>
                <div class="pb-pi-study">{{ selectedPatient.studyDesc }}</div>
                <div class="pb-pi-date">{{ selectedPatient.studyDate }}</div>
              </div>
              <div class="pb-series-list">
                <div
                  v-for="(s, i) in selectedPatient.series"
                  :key="i"
                  class="pb-series-item"
                  :class="{ 'series-selected': selectedSeriesIndex === i }"
                  @click="selectedSeriesIndex = i"
                >
                  <div class="pb-series-thumb">
                    <div class="pb-series-thumb-inner">{{ i + 1 }}</div>
                  </div>
                  <div class="pb-series-info">
                    <div class="pb-series-name">{{ s.name }}</div>
                    <div class="pb-series-meta">{{ s.images }} imagens · {{ s.thickness }}mm · {{ s.kv }}kV/{{ s.mas }}mAs</div>
                  </div>
                </div>
              </div>
              <button class="pb-open-btn" @click="openStudy(selectedPatient)">Abrir Estudo</button>
            </template>
            <div v-else class="pb-no-selection">
              <span>Selecione um paciente</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ══════════ SCAN CONSOLE ══════════ -->
      <div v-else-if="currentScreen === 'scan'" class="scan-root">
        <!-- header -->
        <div class="scan-header">
          <div class="scan-hdr-left">
            <img :src="BASE_URL + 'imagens/sigma-on.png'" alt="Sigma ON" class="scan-logo" @error="$event.target.style.display='none'" />
            <span class="scan-title">Sigma ON CT</span>
          </div>
          <div class="scan-hdr-patient" v-if="scanPatient">
            <span class="scan-hdr-label">Paciente:</span>
            <span class="scan-hdr-name">{{ scanPatient.name }}</span>
            <span class="scan-hdr-sep">·</span>
            <span class="scan-hdr-id">{{ scanPatient.patientId }}</span>
            <span class="scan-hdr-sep">·</span>
            <span class="scan-hdr-study">{{ scanPatient.studyDesc }}</span>
          </div>
          <div class="scan-hdr-right">
            <span class="scan-version">{{ version }}</span>
            <button class="scan-back-btn" @click="currentScreen = 'patient-browser'">← Patient Browser</button>
            <button class="scan-return-btn" @click="$router.push('/escolha')">Return System</button>
          </div>
        </div>

        <!-- body -->
        <div class="scan-body">
          <!-- sidebar left -->
          <div class="scan-sidebar-left">
            <div class="ssl-section-title">Protocolos / Séries</div>
            <div class="ssl-series-list">
              <div
                v-for="(s, i) in scanSeriesList"
                :key="i"
                class="ssl-series-item"
                :class="{ active: activeSeries === i }"
                @click="activeSeries = i"
              >
                <div class="ssl-series-num">{{ i + 1 }}</div>
                <div class="ssl-series-name">{{ s.name }}</div>
              </div>
            </div>

            <div class="ssl-divider"></div>

            <div class="ssl-section-title">Posição do Paciente</div>
            <div class="ssl-positions">
              <div
                v-for="pos in positions"
                :key="pos.key"
                class="ssl-pos-btn"
                :class="{ active: activePosition === pos.key }"
                @click="activePosition = pos.key"
              >
                <img :src="BASE_URL + 'imagens/' + pos.img" :alt="pos.label" class="ssl-pos-img" @error="$event.target.style.display='none'" />
                <span>{{ pos.label }}</span>
              </div>
            </div>

            <div class="ssl-divider"></div>

            <div class="ssl-section-title">Parâmetros</div>
            <div class="ssl-params">
              <div class="ssl-param-row">
                <span class="ssl-param-label">kV</span>
                <select v-model="scanParams.kv" class="ssl-param-select">
                  <option v-for="v in [80,100,120,140]" :key="v" :value="v">{{ v }}</option>
                </select>
              </div>
              <div class="ssl-param-row">
                <span class="ssl-param-label">mAs</span>
                <input v-model.number="scanParams.mas" type="number" min="10" max="800" step="10" class="ssl-param-input" />
              </div>
              <div class="ssl-param-row">
                <span class="ssl-param-label">Rot (s)</span>
                <select v-model="scanParams.rot" class="ssl-param-select">
                  <option v-for="v in [0.3, 0.5, 0.75, 1.0]" :key="v" :value="v">{{ v }}</option>
                </select>
              </div>
              <div class="ssl-param-row">
                <span class="ssl-param-label">Pitch</span>
                <select v-model="scanParams.pitch" class="ssl-param-select">
                  <option v-for="v in [0.5, 0.75, 1.0, 1.5]" :key="v" :value="v">{{ v }}</option>
                </select>
              </div>
              <div class="ssl-param-row">
                <span class="ssl-param-label">Espess. (mm)</span>
                <select v-model="scanParams.thickness" class="ssl-param-select">
                  <option v-for="v in [0.5, 1.0, 2.0, 3.0, 5.0]" :key="v" :value="v">{{ v }}</option>
                </select>
              </div>
            </div>

            <div class="ssl-divider"></div>

            <div class="ssl-actions">
              <button class="ssl-btn ssl-btn-scout">Scout</button>
              <button class="ssl-btn ssl-btn-scan" @click="startScan">Scan</button>
              <button class="ssl-btn ssl-btn-pause" :disabled="!scanning">Pause</button>
            </div>
          </div>

          <!-- center image area -->
          <div class="scan-center">
            <div class="scan-image-area">
              <div v-if="scanning" class="scan-progress-overlay">
                <div class="scan-progress-bar" :style="{ width: scanProgress + '%' }"></div>
                <span class="scan-progress-text">Adquirindo... {{ Math.round(scanProgress) }}%</span>
              </div>
              <div class="scan-image-grid">
                <div
                  v-for="(frame, fi) in displayFrames"
                  :key="fi"
                  class="scan-image-cell"
                  :class="{ active: activeFrame === fi }"
                  @click="activeFrame = fi"
                >
                  <div class="scan-image-placeholder">
                    <span class="scan-img-num">{{ fi + 1 }}</span>
                  </div>
                  <div class="scan-img-overlay-info">
                    <span>{{ scanParams.kv }}kV</span>
                    <span>{{ scanParams.mas }}mAs</span>
                  </div>
                </div>
              </div>
              <div class="scan-image-info-bar">
                <span>kV: {{ scanParams.kv }}</span>
                <span>mAs: {{ scanParams.mas }}</span>
                <span>Rot: {{ scanParams.rot }}s</span>
                <span>Pitch: {{ scanParams.pitch }}</span>
                <span>Espessura: {{ scanParams.thickness }}mm</span>
                <span>Posição: {{ activePositionLabel }}</span>
              </div>
            </div>
          </div>

          <!-- sidebar right -->
          <div class="scan-sidebar-right">
            <div class="ssr-section-title">Reconstruções</div>
            <div class="ssr-thumb-list">
              <div
                v-for="(s, i) in scanPatient?.series ?? []"
                :key="i"
                class="ssr-thumb"
                :class="{ active: activeRecon === i }"
                @click="activeRecon = i"
              >
                <div class="ssr-thumb-img">{{ i + 1 }}</div>
                <div class="ssr-thumb-label">{{ s.name }}</div>
              </div>
            </div>

            <div class="ssl-divider"></div>

            <div class="ssr-section-title">Pós-Proc.</div>
            <div class="ssr-pp-btns">
              <button class="ssr-pp-btn">MPR</button>
              <button class="ssr-pp-btn">MIP</button>
              <button class="ssr-pp-btn">3D VR</button>
              <button class="ssr-pp-btn">Seg.</button>
            </div>

            <div class="ssl-divider"></div>

            <div class="ssr-section-title">W/L</div>
            <div class="ssr-wl-row">
              <label>W</label>
              <input v-model.number="windowWidth" type="range" min="1" max="4000" class="ssr-slider" />
              <span>{{ windowWidth }}</span>
            </div>
            <div class="ssr-wl-row">
              <label>L</label>
              <input v-model.number="windowLevel" type="range" min="-1000" max="1000" class="ssr-slider" />
              <span>{{ windowLevel }}</span>
            </div>
            <div class="ssr-wl-presets">
              <button class="ssr-preset-btn" @click="windowWidth=400; windowLevel=40">Soft</button>
              <button class="ssr-preset-btn" @click="windowWidth=1500; windowLevel=-600">Pulmão</button>
              <button class="ssr-preset-btn" @click="windowWidth=2000; windowLevel=400">Osso</button>
            </div>
          </div>
        </div>

        <!-- timeline -->
        <div class="scan-timeline">
          <div class="scan-tl-label">Timeline</div>
          <div class="scan-tl-track">
            <div
              v-for="(f, fi) in timelineFrames"
              :key="fi"
              class="scan-tl-frame"
              :class="{ active: activeFrame === fi, acquired: fi < acquiredFrames }"
              @click="activeFrame = fi"
            ></div>
          </div>
          <div class="scan-tl-info">{{ acquiredFrames }}/{{ timelineFrames.length }} frames</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { APP_VERSION } from '@/version.js'

const BASE_URL = import.meta.env.BASE_URL
const version = APP_VERSION

// ── orientation ──
const isPortrait = ref(false)
const isMobile = ref(false)
function checkOrientation() {
  isMobile.value = window.innerWidth < 1024
  isPortrait.value = window.innerHeight > window.innerWidth
}
onMounted(() => {
  checkOrientation()
  window.addEventListener('resize', checkOrientation)
  window.addEventListener('orientationchange', checkOrientation)
  startBoot()
})
onUnmounted(() => {
  window.removeEventListener('resize', checkOrientation)
  window.removeEventListener('orientationchange', checkOrientation)
  if (scanTimer) clearInterval(scanTimer)
})

// ── screens ──
const currentScreen = ref('boot')

// ── boot ──
const bootProgress = ref(0)
const bootMessages = [
  'Inicializando sistema...', 'Carregando drivers de hardware...', 'Verificando detector...',
  'Calibrando gantry...', 'Carregando protocolos...', 'Conectando ao servidor DICOM...', 'Pronto.'
]
const bootStatusText = ref(bootMessages[0])
function startBoot() {
  let step = 0
  const total = 2000
  const interval = 40
  const steps = total / interval
  const timer = setInterval(() => {
    step++
    bootProgress.value = Math.min(100, (step / steps) * 100)
    const msgIdx = Math.floor((bootProgress.value / 100) * (bootMessages.length - 1))
    bootStatusText.value = bootMessages[Math.min(msgIdx, bootMessages.length - 1)]
    if (bootProgress.value >= 100) {
      clearInterval(timer)
      setTimeout(() => { currentScreen.value = 'patient-browser' }, 300)
    }
  }, interval)
}

// ── patient data ──
const firstNames = ['Ana','Carlos','Maria','João','Fernanda','Pedro','Beatriz','Lucas','Juliana','Rafael',
  'Camila','Marcelo','Larissa','Rodrigo','Patrícia','Felipe','Amanda','Bruno','Vanessa','Gustavo',
  'Simone','Thiago','Daniela','Eduardo','Priscila','Diego','Letícia','André','Renata','Fábio']
const lastNames = ['Silva','Santos','Oliveira','Souza','Costa','Ferreira','Alves','Pereira','Ribeiro','Lima',
  'Gomes','Martins','Rocha','Carvalho','Nunes','Mendes','Araújo','Freitas','Barbosa','Vieira']
const examTypes = [
  { desc: 'TC Crânio', series: ['Axial Cerebral', 'Janela Óssea', 'Reconstrução 3D'], region: 'cranio' },
  { desc: 'TC Tórax', series: ['Axial Pulmão', 'Mediastino', 'Alta Resolução', 'Coronal Recon'], region: 'torax' },
  { desc: 'TC Abdome e Pelve', series: ['Pré-Contraste', 'Fase Arterial', 'Fase Portal', 'Fase Tardia'], region: 'abdome' },
  { desc: 'TC Coluna Lombar', series: ['Axial Discos', 'Sagital Recon', 'Coronal Recon'], region: 'coluna' },
  { desc: 'TC Pescoço', series: ['Axial', 'Coronal', 'Sagital'], region: 'pescoco' },
  { desc: 'TC Tórax + Abdome + Pelve', series: ['Fase Arterial', 'Fase Portal', 'Fase Tardia', 'Coronária'], region: 'tap' },
]
function padZero(n) { return String(n).padStart(2, '0') }
function randomDate(startYear, endYear) {
  const y = startYear + Math.floor(Math.random() * (endYear - startYear))
  const m = 1 + Math.floor(Math.random() * 12)
  const d = 1 + Math.floor(Math.random() * 28)
  return `${padZero(d)}/${padZero(m)}/${y}`
}
function randomStudyDate() {
  const base = new Date(2024, 0, 1)
  const offset = Math.floor(Math.random() * 365)
  const d = new Date(base.getTime() + offset * 86400000)
  return `${padZero(d.getDate())}/${padZero(d.getMonth()+1)}/${d.getFullYear()}`
}
function makeSeries(names) {
  return names.map(name => ({
    name,
    images: 60 + Math.floor(Math.random() * 200),
    thickness: [0.5, 1.0, 2.0, 3.0, 5.0][Math.floor(Math.random() * 5)],
    kv: [80, 100, 120, 140][Math.floor(Math.random() * 4)],
    mas: 50 + Math.floor(Math.random() * 300),
  }))
}
function makePatientId() {
  return 'SG' + String(100000 + Math.floor(Math.random() * 899999))
}
const allPatients = Array.from({ length: 30 }, (_, i) => {
  const fn = firstNames[i % firstNames.length]
  const ln = lastNames[Math.floor(Math.random() * lastNames.length)]
  const exam = examTypes[Math.floor(Math.random() * examTypes.length)]
  return {
    name: `${fn} ${ln}`,
    patientId: makePatientId(),
    dob: randomDate(1940, 2005),
    studyDate: randomStudyDate(),
    studyDesc: exam.desc,
    modality: 'CT',
    seriesCount: exam.series.length,
    series: makeSeries(exam.series),
  }
})

// ── patient browser ──
const pbTabs = [
  { key: 'all', label: 'Todos' },
  { key: 'today', label: 'Hoje' },
  { key: 'week', label: 'Esta Semana' },
  { key: 'scheduled', label: 'Agendados' },
]
const pbActiveTab = ref('all')
const pbSearch = ref('')
const selectedPatient = ref(null)
const selectedSeriesIndex = ref(0)
const filteredPatients = computed(() => {
  const q = pbSearch.value.toLowerCase().trim()
  return allPatients.filter(p => {
    if (q && !p.name.toLowerCase().includes(q) && !p.patientId.toLowerCase().includes(q) && !p.studyDesc.toLowerCase().includes(q)) return false
    return true
  })
})

// ── scan console ──
const scanPatient = ref(null)
const activeSeries = ref(0)
const activePosition = ref('HF-Supine')
const positions = [
  { key: 'HF-Supine', label: 'HF-Supine', img: 'HFsupine.png' },
  { key: 'HF-Prone',  label: 'HF-Prone',  img: 'HFprone.png' },
  { key: 'FF-Supine', label: 'FF-Supine', img: 'FFsupine.png' },
  { key: 'FF-Prone',  label: 'FF-Prone',  img: 'FFprone.png' },
]
const activePositionLabel = computed(() => activePosition.value)
const scanParams = reactive({ kv: 120, mas: 200, rot: 0.5, pitch: 1.0, thickness: 1.0 })
const scanning = ref(false)
const scanProgress = ref(0)
let scanTimer = null
const activeFrame = ref(0)
const acquiredFrames = ref(0)
const activeRecon = ref(0)
const windowWidth = ref(400)
const windowLevel = ref(40)

const displayFrames = computed(() => Array.from({ length: 9 }))
const timelineFrames = computed(() => Array.from({ length: 20 }))

const scanSeriesList = computed(() => scanPatient.value?.series ?? [])

function startScan() {
  if (scanning.value) return
  scanning.value = true
  scanProgress.value = 0
  acquiredFrames.value = 0
  const total = timelineFrames.value.length
  scanTimer = setInterval(() => {
    scanProgress.value += 5
    acquiredFrames.value = Math.floor((scanProgress.value / 100) * total)
    if (scanProgress.value >= 100) {
      clearInterval(scanTimer)
      scanning.value = false
      acquiredFrames.value = total
    }
  }, 100)
}

function openStudy(patient) {
  scanPatient.value = patient
  activeSeries.value = 0
  activeFrame.value = 0
  acquiredFrames.value = 0
  currentScreen.value = 'scan'
}
</script>

<style scoped>
@import '@/assets/css/rotate-overlay.css';

/* ── root ── */
.sigma-on-root {
  width: 100vw; height: 100vh; overflow: hidden;
  background: #1a1a1a; color: #e8e8ea;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  display: flex; flex-direction: column;
}

/* ════════ BOOT ════════ */
.boot-screen {
  width: 100%; height: 100%;
  display: flex;
}
.boot-left {
  width: 38%; height: 100%;
  background: #1a5c1e;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.boot-on-watermark {
  position: absolute; font-size: 240px; font-weight: 900; letter-spacing: -8px;
  color: rgba(255,255,255,0.06); user-select: none; pointer-events: none;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
}
.boot-logo { width: 96px; height: 96px; object-fit: contain; z-index: 1; }
.boot-brand {
  font-size: 28px; font-weight: 700; color: #fff; margin-top: 20px; z-index: 1;
  letter-spacing: 1px;
}
.boot-brand-sub { font-size: 13px; color: rgba(255,255,255,0.55); margin-top: 6px; z-index: 1; }

.boot-right {
  flex: 1; height: 100%;
  background: #060e06;
  display: flex; align-items: center; justify-content: center;
}
.boot-right-inner { display: flex; flex-direction: column; gap: 14px; width: 360px; }
.boot-sys-label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.35); }
.boot-sys-name { font-size: 22px; font-weight: 700; color: #e8e8ea; }
.boot-sys-version { font-size: 12px; color: rgba(255,255,255,0.3); margin-top: -8px; }
.boot-progress-wrap {
  height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; margin-top: 8px;
}
.boot-progress-bar {
  height: 100%; background: #2ecc71; border-radius: 2px;
  transition: width 0.05s linear;
}
.boot-status-text { font-size: 12px; color: rgba(255,255,255,0.4); min-height: 18px; }
.boot-copyright { font-size: 11px; color: rgba(255,255,255,0.2); margin-top: 24px; }

/* ════════ SHARED MENUBAR ════════ */
.so-menubar {
  height: 48px; background: #1c6020;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px; flex-shrink: 0;
}
.so-menubar-left { display: flex; align-items: center; gap: 10px; }
.so-logo { width: 28px; height: 28px; object-fit: contain; }
.so-title { font-size: 14px; font-weight: 700; color: #c8f5d8; }
.so-menubar-tabs { display: flex; align-items: center; gap: 4px; }
.so-tab {
  padding: 6px 14px; background: transparent;
  border: 1px solid rgba(255,255,255,0.2); border-radius: 5px;
  color: #c8f5d8; font-size: 12px; cursor: pointer;
  transition: background 0.15s;
}
.so-tab:hover, .so-tab.active { background: #2ecc71; color: #000; border-color: #2ecc71; }

/* ════════ PATIENT BROWSER ════════ */
.pb-root {
  flex: 1; display: flex; flex-direction: column; height: 100%; overflow: hidden;
  background: #1a1a1a;
}
.pb-body { flex: 1; display: flex; overflow: hidden; }

.pb-table-panel {
  flex: 1; display: flex; flex-direction: column; overflow: hidden;
  border-right: 1px solid rgba(255,255,255,0.1);
}
.pb-toolbar {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 14px; background: #222; border-bottom: 1px solid rgba(255,255,255,0.1);
  flex-shrink: 0;
}
.pb-tab-group { display: flex; gap: 4px; }
.pb-filter-tab {
  padding: 5px 14px; border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.15); background: transparent;
  color: rgba(255,255,255,0.6); font-size: 12px; cursor: pointer;
  transition: all 0.15s;
}
.pb-filter-tab.active { background: #2ecc71; color: #000; border-color: #2ecc71; font-weight: 700; }
.pb-search {
  margin-left: auto; padding: 6px 12px;
  background: #2a2a2a; border: 1px solid rgba(255,255,255,0.15);
  border-radius: 6px; color: #e8e8ea; font-size: 12px;
  width: 200px; outline: none;
}
.pb-search:focus { border-color: #2ecc71; }

.pb-table-wrap { flex: 1; overflow-y: auto; }
.pb-table { width: 100%; border-collapse: collapse; }
.pb-table thead tr { background: #2a2a2a; position: sticky; top: 0; z-index: 2; }
.pb-table th {
  padding: 8px 12px; text-align: left; font-size: 11px; font-weight: 700;
  letter-spacing: 0.5px; text-transform: uppercase; color: rgba(255,255,255,0.45);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.pb-table tbody tr { cursor: pointer; transition: background 0.1s; }
.pb-table tbody tr:hover { background: rgba(255,255,255,0.04); }
.pb-table tbody tr.selected { background: rgba(46,204,113,0.12); }
.pb-table td {
  padding: 7px 12px; border-bottom: 1px solid rgba(255,255,255,0.06);
  font-size: 12px; color: #d0d0d0;
}
.mono { font-family: monospace; font-size: 11px; }
.center { text-align: center; }

/* series panel */
.pb-series-panel {
  width: 260px; flex-shrink: 0; display: flex; flex-direction: column;
  background: #202020; overflow: hidden;
}
.pb-series-header {
  padding: 12px 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px;
  text-transform: uppercase; color: rgba(255,255,255,0.35);
  border-bottom: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;
}
.pb-patient-info {
  padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.08); flex-shrink: 0;
}
.pb-pi-name { font-weight: 700; color: #e8e8ea; font-size: 13px; }
.pb-pi-sub { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 3px; }
.pb-pi-study { font-size: 12px; color: #2ecc71; margin-top: 6px; }
.pb-pi-date { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 2px; }

.pb-series-list { flex: 1; overflow-y: auto; padding: 8px; display: flex; flex-direction: column; gap: 4px; }
.pb-series-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px; border-radius: 6px; cursor: pointer;
  border: 1px solid transparent; transition: all 0.15s;
}
.pb-series-item:hover { background: rgba(255,255,255,0.05); }
.pb-series-item.series-selected { background: rgba(46,204,113,0.1); border-color: rgba(46,204,113,0.3); }
.pb-series-thumb { width: 40px; height: 40px; background: #111; border-radius: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.pb-series-thumb-inner { font-size: 14px; font-weight: 700; color: #2ecc71; }
.pb-series-name { font-size: 12px; font-weight: 600; color: #d0d0d0; }
.pb-series-meta { font-size: 10px; color: rgba(255,255,255,0.35); margin-top: 2px; }
.pb-open-btn {
  margin: 12px; padding: 10px;
  background: #2ecc71; color: #000; border: none; border-radius: 8px;
  font-size: 13px; font-weight: 700; cursor: pointer; transition: opacity 0.15s;
  flex-shrink: 0;
}
.pb-open-btn:hover { opacity: 0.85; }
.pb-no-selection {
  flex: 1; display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.2); font-size: 13px;
}

/* ════════ SCAN CONSOLE ════════ */
.scan-root { flex: 1; display: flex; flex-direction: column; height: 100%; overflow: hidden; }

.scan-header {
  height: 48px; background: #1c6020; border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; padding: 0 14px; gap: 16px; flex-shrink: 0;
}
.scan-hdr-left { display: flex; align-items: center; gap: 8px; }
.scan-logo { width: 26px; height: 26px; object-fit: contain; }
.scan-title { font-size: 13px; font-weight: 700; color: #c8f5d8; white-space: nowrap; }
.scan-hdr-patient { display: flex; align-items: center; gap: 6px; font-size: 12px; flex: 1; overflow: hidden; }
.scan-hdr-label { color: rgba(255,255,255,0.45); }
.scan-hdr-name { color: #e8e8ea; font-weight: 600; }
.scan-hdr-id { color: rgba(255,255,255,0.5); font-family: monospace; font-size: 11px; }
.scan-hdr-sep { color: rgba(255,255,255,0.2); }
.scan-hdr-study { color: #2ecc71; }
.scan-hdr-right { display: flex; align-items: center; gap: 8px; margin-left: auto; flex-shrink: 0; }
.scan-version { font-size: 10px; color: rgba(255,255,255,0.25); letter-spacing: 1px; }
.scan-back-btn, .scan-return-btn {
  padding: 5px 12px; border-radius: 5px; font-size: 11px; cursor: pointer;
  border: 1px solid rgba(255,255,255,0.2); background: transparent;
  color: #c8f5d8; transition: background 0.15s;
}
.scan-back-btn:hover, .scan-return-btn:hover { background: rgba(255,255,255,0.1); }

.scan-body { flex: 1; display: flex; overflow: hidden; min-height: 0; }

/* sidebar left */
.scan-sidebar-left {
  width: 264px; flex-shrink: 0; background: #1e1e1e;
  border-right: 1px solid rgba(255,255,255,0.1);
  display: flex; flex-direction: column; overflow-y: auto; padding: 10px 0;
}
.ssl-section-title {
  padding: 6px 14px 4px; font-size: 10px; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; color: rgba(255,255,255,0.3);
}
.ssl-series-list { padding: 0 8px; display: flex; flex-direction: column; gap: 2px; }
.ssl-series-item {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 10px; border-radius: 5px; cursor: pointer;
  border: 1px solid transparent; transition: all 0.15s;
}
.ssl-series-item:hover { background: rgba(255,255,255,0.04); }
.ssl-series-item.active { background: rgba(46,204,113,0.1); border-color: rgba(46,204,113,0.25); }
.ssl-series-num {
  width: 22px; height: 22px; background: #2a2a2a; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: #2ecc71; flex-shrink: 0;
}
.ssl-series-name { font-size: 12px; color: #c8c8c8; }
.ssl-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 10px 0; }
.ssl-positions { display: flex; flex-wrap: wrap; gap: 6px; padding: 4px 10px; }
.ssl-pos-btn {
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 6px 8px; border-radius: 6px; cursor: pointer;
  border: 1px solid rgba(255,255,255,0.15); background: transparent;
  color: rgba(255,255,255,0.5); font-size: 10px; transition: all 0.15s;
  min-width: 60px;
}
.ssl-pos-btn:hover { background: rgba(255,255,255,0.06); }
.ssl-pos-btn.active { background: rgba(46,204,113,0.12); border-color: #2ecc71; color: #2ecc71; }
.ssl-pos-img { width: 32px; height: 32px; object-fit: contain; opacity: 0.7; }
.ssl-pos-btn.active .ssl-pos-img { opacity: 1; }
.ssl-params { padding: 4px 12px; display: flex; flex-direction: column; gap: 6px; }
.ssl-param-row { display: flex; align-items: center; gap: 8px; }
.ssl-param-label { font-size: 11px; color: rgba(255,255,255,0.45); width: 80px; flex-shrink: 0; }
.ssl-param-select, .ssl-param-input {
  flex: 1; padding: 4px 6px; background: #2a2a2a; border: 1px solid rgba(255,255,255,0.15);
  border-radius: 4px; color: #e8e8ea; font-size: 12px; outline: none;
}
.ssl-param-select:focus, .ssl-param-input:focus { border-color: #2ecc71; }
.ssl-actions { padding: 8px 10px; display: flex; flex-direction: column; gap: 6px; }
.ssl-btn {
  padding: 8px; border-radius: 6px; font-size: 12px; font-weight: 700;
  cursor: pointer; border: none; transition: opacity 0.15s;
}
.ssl-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.ssl-btn-scout { background: #2a5a8a; color: #fff; }
.ssl-btn-scan { background: #2ecc71; color: #000; }
.ssl-btn-pause { background: #e07b00; color: #fff; }
.ssl-btn-scout:hover:not(:disabled) { opacity: 0.85; }
.ssl-btn-scan:hover:not(:disabled) { opacity: 0.85; }
.ssl-btn-pause:hover:not(:disabled) { opacity: 0.85; }

/* center */
.scan-center { flex: 1; display: flex; flex-direction: column; background: #111; overflow: hidden; }
.scan-image-area { flex: 1; display: flex; flex-direction: column; position: relative; overflow: hidden; }
.scan-progress-overlay {
  position: absolute; top: 0; left: 0; right: 0; height: 6px; z-index: 10;
  background: rgba(0,0,0,0.5);
}
.scan-progress-bar { height: 100%; background: #2ecc71; transition: width 0.1s linear; }
.scan-progress-text {
  position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
  font-size: 12px; color: #2ecc71; font-weight: 700; white-space: nowrap;
}
.scan-image-grid {
  flex: 1; display: grid; grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr); gap: 2px; padding: 2px; overflow: hidden;
}
.scan-image-cell {
  background: #0a0a0a; border: 1px solid rgba(255,255,255,0.06);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer; position: relative; transition: border-color 0.15s;
}
.scan-image-cell.active { border-color: #2ecc71; }
.scan-image-placeholder {
  width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
  background: radial-gradient(ellipse at center, #0f1a0f 0%, #050a05 100%);
}
.scan-img-num { font-size: 28px; font-weight: 700; color: rgba(46,204,113,0.15); }
.scan-img-overlay-info {
  position: absolute; bottom: 4px; right: 4px;
  display: flex; gap: 4px; font-size: 9px; color: rgba(255,255,255,0.3); font-family: monospace;
}
.scan-image-info-bar {
  height: 28px; background: #1a1a1a; border-top: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: center; gap: 20px; padding: 0 14px;
  font-size: 11px; color: rgba(255,255,255,0.4); flex-shrink: 0;
}
.scan-image-info-bar span::before { content: ''; }

/* sidebar right */
.scan-sidebar-right {
  width: 180px; flex-shrink: 0; background: #1e1e1e;
  border-left: 1px solid rgba(255,255,255,0.1);
  display: flex; flex-direction: column; overflow-y: auto; padding: 10px 0;
}
.ssr-section-title {
  padding: 6px 12px 4px; font-size: 10px; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; color: rgba(255,255,255,0.3);
}
.ssr-thumb-list { padding: 4px 8px; display: flex; flex-direction: column; gap: 4px; }
.ssr-thumb {
  display: flex; align-items: center; gap: 8px;
  padding: 6px; border-radius: 5px; cursor: pointer;
  border: 1px solid transparent; transition: all 0.15s;
}
.ssr-thumb:hover { background: rgba(255,255,255,0.04); }
.ssr-thumb.active { background: rgba(46,204,113,0.1); border-color: rgba(46,204,113,0.25); }
.ssr-thumb-img {
  width: 36px; height: 36px; background: #111; border-radius: 3px;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: #2ecc71; flex-shrink: 0;
}
.ssr-thumb-label { font-size: 10px; color: rgba(255,255,255,0.5); line-height: 1.3; }
.ssr-pp-btns { display: flex; flex-wrap: wrap; gap: 4px; padding: 4px 10px; }
.ssr-pp-btn {
  padding: 5px 10px; background: #2a2a2a; border: 1px solid rgba(255,255,255,0.15);
  border-radius: 4px; color: rgba(255,255,255,0.6); font-size: 11px; cursor: pointer;
  transition: all 0.15s;
}
.ssr-pp-btn:hover { background: rgba(255,255,255,0.1); color: #e8e8ea; }
.ssr-wl-row {
  display: flex; align-items: center; gap: 6px;
  padding: 4px 10px; font-size: 11px;
}
.ssr-wl-row label { width: 12px; color: rgba(255,255,255,0.4); flex-shrink: 0; }
.ssr-wl-row span { width: 36px; color: rgba(255,255,255,0.5); text-align: right; flex-shrink: 0; font-family: monospace; font-size: 10px; }
.ssr-slider { flex: 1; accent-color: #2ecc71; }
.ssr-wl-presets { display: flex; flex-wrap: wrap; gap: 4px; padding: 4px 10px; }
.ssr-preset-btn {
  padding: 4px 8px; background: #2a2a2a; border: 1px solid rgba(255,255,255,0.12);
  border-radius: 4px; color: rgba(255,255,255,0.5); font-size: 10px; cursor: pointer;
  transition: all 0.15s;
}
.ssr-preset-btn:hover { border-color: #2ecc71; color: #2ecc71; }

/* ════════ TIMELINE ════════ */
.scan-timeline {
  height: 48px; background: #1a1a1a; border-top: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; gap: 10px; padding: 0 14px; flex-shrink: 0;
}
.scan-tl-label { font-size: 10px; color: rgba(255,255,255,0.3); letter-spacing: 1px; text-transform: uppercase; flex-shrink: 0; width: 56px; }
.scan-tl-track { flex: 1; display: flex; gap: 2px; height: 24px; align-items: center; }
.scan-tl-frame {
  flex: 1; height: 18px; background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 2px;
  cursor: pointer; transition: all 0.1s;
}
.scan-tl-frame.acquired { background: rgba(46,204,113,0.2); border-color: rgba(46,204,113,0.3); }
.scan-tl-frame.active { background: #2ecc71; border-color: #2ecc71; }
.scan-tl-info { font-size: 11px; color: rgba(255,255,255,0.3); flex-shrink: 0; font-family: monospace; width: 64px; text-align: right; }

/* tablet landscape */
@media (max-width: 1023px) and (orientation: landscape) {
  .scan-sidebar-left { width: 200px; }
  .scan-sidebar-right { width: 150px; }
}
</style>
