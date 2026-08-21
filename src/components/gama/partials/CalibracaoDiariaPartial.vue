<template>
  <div class="calib-root">

    <!-- ══════════════════════════════ POPUP AVISO INICIAL ══════ -->
    <div v-if="showWarningPopup" class="modal-backdrop" @click.self="showWarningPopup = false">
      <div class="modal-box">
        <div class="modal-header warn">⚠️ ATENÇÃO</div>
        <div class="modal-body">
          <p><strong>Nenhum aquecimento do tubo foi realizado nas últimas 96 horas.</strong></p>
          <p>Antes de realizar a calibração diária, é obrigatório realizar o aquecimento do tubo de raios X.</p>
          <hr class="modal-divider">
          <p class="modal-sub">Por que o aquecimento é importante?</p>
          <p class="modal-text">O filamento do tubo de raios X opera em temperaturas extremas. Quando o equipamento fica inativo por longos períodos, o tubo esfria completamente. Iniciar exposições de alta tensão sem aquecimento prévio causa estresse térmico severo nos filamentos, reduzindo drasticamente sua vida útil. O aquecimento gradual prolonga a durabilidade do tubo e garante estabilidade da dose.</p>
        </div>
        <div class="modal-footer">
          <button class="btn-modal-ok" @click="showWarningPopup = false">Entendido</button>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════ POPUP CONFIRMAÇÃO AQUECIMENTO ══════ -->
    <div v-if="showWarmupPopup" class="modal-backdrop" @click.self="showWarmupPopup = false">
      <div class="modal-box">
        <div class="modal-header fire">🔥 AQUECIMENTO DO TUBO</div>
        <div class="modal-body">
          <p>O aquecimento gradual do tubo de raios X é essencial para prolongar a vida útil dos filamentos.</p>
          <p>Serão realizadas <strong>4 exposições progressivas</strong> de 5 segundos cada, aumentando gradualmente kV e mA para preparar o tubo com segurança.</p>
          <p><em>Não interrompa o processo durante a execução.</em></p>
        </div>
        <div class="modal-footer two-btn">
          <button class="btn-modal-cancel" @click="showWarmupPopup = false">Cancelar</button>
          <button class="btn-modal-ok" @click="confirmWarmup">Iniciar</button>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════ POPUP AQUECIMENTO CONCLUÍDO ══════ -->
    <div v-if="showWarmupDonePopup" class="modal-backdrop">
      <div class="modal-box">
        <div class="modal-header success">✅ AQUECIMENTO CONCLUÍDO</div>
        <div class="modal-body">
          <p>O tubo de raios X está aquecido e em condições ideais de operação.</p>
          <p><strong>A calibração diária está liberada.</strong></p>
        </div>
        <div class="modal-footer">
          <button class="btn-modal-ok" @click="onWarmupDoneClose">OK</button>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════ POPUP CALIBRAÇÃO CONCLUÍDA ══════ -->
    <div v-if="showCalibDonePopup" class="modal-backdrop">
      <div class="modal-box">
        <div class="modal-header success">✅ CALIBRAÇÃO CONCLUÍDA</div>
        <div class="modal-body">
          <p>A calibragem de ar diária foi concluída com sucesso.</p>
          <p>O sistema está calibrado e pronto para exames.</p>
        </div>
        <div class="modal-footer">
          <button class="btn-modal-ok" @click="showCalibDonePopup = false">OK</button>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════ LAYOUT PRINCIPAL ══════ -->
    <div class="calib-layout">

      <!-- COLUNA ESQUERDA -->
      <div class="left-col">

        <!-- Botões de modo -->
        <div class="mode-buttons">
          <button
            class="mode-btn"
            :class="{ active: activeMode === 'warmup', disabled: isRunning && activeMode !== 'warmup' }"
            :disabled="isRunning && activeMode !== 'warmup'"
            @click="openWarmupPopup"
          >
            <span class="btn-label">Aquecimento</span>
            <span class="btn-desc">Aquecimento do Tubo Frio</span>
          </button>

          <button
            class="mode-btn"
            :class="{ active: activeMode === 'calibration', disabled: !warmupDone || (isRunning && activeMode !== 'calibration') }"
            :disabled="!warmupDone || (isRunning && activeMode !== 'calibration')"
            @click="setCalibrationMode"
          >
            <span class="btn-label">Daily Prep</span>
            <span class="btn-desc">{{ warmupDone ? 'Calibragem de Ar Diária' : 'Realize o aquecimento primeiro' }}</span>
          </button>
        </div>

        <div class="divider-line"></div>

        <!-- Título da lista -->
        <div class="scan-list-title">
          {{ activeMode === 'warmup'
            ? 'Lista de Varreduras — Aquecimento a Frio'
            : 'Lista de Varreduras — Calibragem de Ar' }}
        </div>

        <!-- Cabeçalho da tabela -->
        <div class="scan-header">
          <span>kV</span>
          <span>mA</span>
          <span>Esp</span>
          <span>Filtro</span>
          <span>Tempo</span>
          <span>Pt</span>
          <span>Scan</span>
        </div>

        <!-- Linhas da tabela -->
        <div class="scan-list">
          <div
            v-for="(scan, i) in currentScans"
            :key="i"
            class="scan-row"
            :class="{
              active: currentScanIndex === i && isRunning,
              completed: i < currentScanIndex || (i === currentScanIndex && scanStatus === 'sucesso' && !isRunning)
            }"
          >
            <span>{{ scan.kv }}</span>
            <span>{{ scan.ma }}</span>
            <span>{{ scan.espessura }}</span>
            <span>{{ scan.filtro }}</span>
            <span>{{ scan.tempo }}.00</span>
            <span>{{ scan.tamPonto === 'Small' ? 'Sm' : 'Lg' }}</span>
            <span>{{ scan.scanNum }}</span>
          </div>
        </div>

        <!-- Scans Restantes -->
        <div class="scans-restantes-area">
          <span class="sr-label">Scans Restante</span>
          <div class="scans-restantes-box">{{ String(scansRestantes).padStart(2, '0') }}</div>
        </div>
      </div>

      <!-- COLUNA DIREITA -->
      <div class="right-col">
        <div class="realtime-panel">
          <div>
            <div class="info-label">Colocação do Paciente</div>
            <div class="info-box">Fantoma de Calibração</div>
          </div>

          <div>
            <div class="info-label">Fazendo Scan</div>
            <div class="info-box" :class="{ 'status-running': scanStatus === 'executando', 'status-success': scanStatus === 'sucesso' }">
              {{ scanStatus === 'executando' ? 'Executando...' : scanStatus === 'sucesso' ? 'Sucesso ✓' : '—' }}
            </div>
          </div>

          <div>
            <div class="info-label">Tempo de Atraso</div>
            <div class="countdown-box">{{ isRunning || isPaused ? String(countdown).padStart(2, '0') : '—' }}</div>
          </div>
        </div>

        <!-- Controles -->
        <div class="control-buttons">
          <button
            v-if="!isRunning || isPaused"
            class="btn-start"
            :disabled="currentScanIndex < 0 || allDone"
            @click="startOrResume"
          >Start</button>
          <button
            v-if="isRunning && !isPaused"
            class="btn-pause"
            @click="togglePause"
          >Pause</button>
          <button
            class="btn-stop"
            :disabled="!isRunning && !isPaused && currentScanIndex < 0"
            @click="stopAll"
          >Stop</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

defineEmits(['back'])

const BASE_URL = import.meta.env.BASE_URL

// ── Dados ───────────────────────────────────────────────────────
const warmupScans = [
  { kv: 80,  ma: 50,  espessura: '4.00', filtro: 'Standard', tempo: 5, tamPonto: 'Small', scanNum: 1 },
  { kv: 100, ma: 80,  espessura: '4.00', filtro: 'Standard', tempo: 5, tamPonto: 'Small', scanNum: 2 },
  { kv: 120, ma: 120, espessura: '4.00', filtro: 'Standard', tempo: 5, tamPonto: 'Small', scanNum: 3 },
  { kv: 120, ma: 200, espessura: '4.00', filtro: 'Standard', tempo: 5, tamPonto: 'Small', scanNum: 4 },
]

const calibrationScans = [
  { kv: 80,  ma: 50,  espessura: '0.5',  filtro: 'Standard', tempo: 5, tamPonto: 'Small', scanNum: 1  },
  { kv: 80,  ma: 80,  espessura: '1.0',  filtro: 'Bone',     tempo: 5, tamPonto: 'Small', scanNum: 2  },
  { kv: 80,  ma: 120, espessura: '2.0',  filtro: 'Lung',     tempo: 5, tamPonto: 'Large', scanNum: 3  },
  { kv: 80,  ma: 200, espessura: '3.0',  filtro: 'Standard', tempo: 5, tamPonto: 'Large', scanNum: 4  },
  { kv: 100, ma: 50,  espessura: '5.0',  filtro: 'Bone',     tempo: 5, tamPonto: 'Small', scanNum: 5  },
  { kv: 100, ma: 80,  espessura: '10.0', filtro: 'Lung',     tempo: 5, tamPonto: 'Small', scanNum: 6  },
  { kv: 100, ma: 120, espessura: '20.0', filtro: 'Standard', tempo: 5, tamPonto: 'Large', scanNum: 7  },
  { kv: 100, ma: 200, espessura: '0.5',  filtro: 'Bone',     tempo: 5, tamPonto: 'Large', scanNum: 8  },
  { kv: 120, ma: 50,  espessura: '1.0',  filtro: 'Lung',     tempo: 5, tamPonto: 'Small', scanNum: 9  },
  { kv: 120, ma: 80,  espessura: '2.0',  filtro: 'Standard', tempo: 5, tamPonto: 'Small', scanNum: 10 },
  { kv: 120, ma: 120, espessura: '3.0',  filtro: 'Bone',     tempo: 5, tamPonto: 'Large', scanNum: 11 },
  { kv: 120, ma: 200, espessura: '5.0',  filtro: 'Lung',     tempo: 5, tamPonto: 'Large', scanNum: 12 },
]

// ── Estado reativo ───────────────────────────────────────────────
const showWarningPopup  = ref(false)
const showWarmupPopup   = ref(false)
const showWarmupDonePopup = ref(false)
const showCalibDonePopup = ref(false)
const warmupDone        = ref(false)
const activeMode        = ref('warmup')
const isRunning         = ref(false)
const isPaused          = ref(false)
const currentScanIndex  = ref(-1)
const countdown         = ref(0)
const scanStatus        = ref('')
const scansRestantes    = ref(0)
const allDone           = ref(false)

const currentScans = computed(() =>
  activeMode.value === 'warmup' ? warmupScans : calibrationScans
)

// ── Som ─────────────────────────────────────────────────────────
let rxAudio = null

function startRxSound() {
  rxAudio = new Audio(BASE_URL + 'sons/rx_siemens.mp3')
  rxAudio.loop = false
  rxAudio.play().catch(() => {})
}

function stopRxSound() {
  if (rxAudio) {
    rxAudio.pause()
    rxAudio.currentTime = 0
    rxAudio = null
  }
}

// ── Timer ────────────────────────────────────────────────────────
let timerInterval = null
let afterScanTimeout = null

function clearTimers() {
  clearInterval(timerInterval)
  clearTimeout(afterScanTimeout)
  timerInterval = null
  afterScanTimeout = null
}

function startCountdown(seconds) {
  countdown.value = seconds
  timerInterval = setInterval(() => {
    if (isPaused.value) return
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timerInterval)
      timerInterval = null
      onScanComplete()
    }
  }, 1000)
}

function onScanComplete() {
  scanStatus.value = 'sucesso'
  stopRxSound()
  afterScanTimeout = setTimeout(() => {
    if (isPaused.value) return
    const scans = currentScans.value
    scansRestantes.value = Math.max(0, scansRestantes.value - 1)
    const next = currentScanIndex.value + 1
    if (next < scans.length) {
      currentScanIndex.value = next
      runScan()
    } else {
      isRunning.value = false
      allDone.value = true
      if (activeMode.value === 'warmup') {
        showWarmupDonePopup.value = true
      } else {
        showCalibDonePopup.value = true
      }
    }
  }, 4000)
}

function runScan() {
  scanStatus.value = 'executando'
  startRxSound()
  startCountdown(5)
}

// ── Controles ────────────────────────────────────────────────────
function startOrResume() {
  if (isPaused.value) {
    isPaused.value = false
    startRxSound()
    startCountdown(countdown.value)
    return
  }
  isRunning.value = true
  isPaused.value = false
  allDone.value = false
  scansRestantes.value = currentScans.value.length - currentScanIndex.value
  runScan()
}

function togglePause() {
  if (!isPaused.value) {
    isPaused.value = true
    stopRxSound()
    clearInterval(timerInterval)
    timerInterval = null
    clearTimeout(afterScanTimeout)
    afterScanTimeout = null
  } else {
    isPaused.value = false
    if (scanStatus.value === 'executando') {
      startRxSound()
      startCountdown(countdown.value)
    }
  }
}

function stopAll() {
  clearTimers()
  stopRxSound()
  isRunning.value = false
  isPaused.value = false
  currentScanIndex.value = -1
  scanStatus.value = ''
  countdown.value = 0
  allDone.value = false
  scansRestantes.value = currentScans.value.length
}

// ── Modos ────────────────────────────────────────────────────────
function openWarmupPopup() {
  if (isRunning.value) return
  activeMode.value = 'warmup'
  showWarmupPopup.value = true
}

function confirmWarmup() {
  showWarmupPopup.value = false
  stopAll()
  currentScanIndex.value = 0
  scansRestantes.value = warmupScans.length
  allDone.value = false
}

function setCalibrationMode() {
  if (!warmupDone.value || isRunning.value) return
  activeMode.value = 'calibration'
  stopAll()
  currentScanIndex.value = 0
  scansRestantes.value = calibrationScans.length
  allDone.value = false
}

function onWarmupDoneClose() {
  showWarmupDonePopup.value = false
  sessionStorage.setItem('tubewarmup_done', 'true')
  warmupDone.value = true
}

// ── Montagem ─────────────────────────────────────────────────────
onMounted(() => {
  const done = sessionStorage.getItem('tubewarmup_done') === 'true'
  warmupDone.value = done
  if (!done) showWarningPopup.value = true
  scansRestantes.value = warmupScans.length
})

onBeforeUnmount(() => {
  clearTimers()
  stopRxSound()
})
</script>

<style scoped>
.calib-root {
  width: 100%; height: 100%;
  color: #e0e0e0;
  display: flex; flex-direction: column;
  overflow: hidden;
  position: relative;
}

/* ══ LAYOUT ══════════════════════════════════════════════════ */
.calib-layout {
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 0;
  height: 100%;
  overflow: hidden;
}

/* ══ COLUNA ESQUERDA ══════════════════════════════════════════ */
.left-col {
  display: flex; flex-direction: column;
  padding: 12px;
  gap: 8px;
  overflow: hidden;
  border-right: 1px solid #2a4a7c;
}

.mode-buttons { display: flex; flex-direction: row; flex-wrap: wrap; gap: 8px; }

.mode-btn {
  width: auto; padding: 10px 20px;
  background: #1c4e8c; border: 1px solid #3c6eac; border-radius: 8px;
  color: white; font-size: 13px; font-weight: bold; cursor: pointer;
  text-align: left; display: inline-flex; flex-direction: column; gap: 3px;
  transition: background .2s; white-space: nowrap;
}
.mode-btn .btn-label { font-size: 13px; font-weight: bold; }
.mode-btn .btn-desc  { font-size: 11px; color: #aaa; font-weight: normal; }
.mode-btn.active { background: #f39c12; color: #000; border-color: #f39c12; }
.mode-btn.active .btn-desc { color: #333; }
.mode-btn.disabled,
.mode-btn:disabled { background: #1a1a1e; color: #555; cursor: not-allowed; border-color: #2a2a2e; }
.mode-btn.disabled .btn-desc { color: #444; }

.divider-line { height: 1px; background: #2a4a7c; margin: 2px 0; }

.scan-list-title { font-size: 11px; font-weight: bold; color: #7fb3e0; letter-spacing: .5px; padding: 2px 0; }

/* Tabela */
.scan-header, .scan-row {
  display: grid;
  grid-template-columns: 50px 55px 60px 90px 65px 45px 55px;
  gap: 0;
  padding: 6px 10px;
  font-size: 12px;
}
.scan-header {
  color: #7fb3e0; font-weight: bold; font-size: 11px;
  border-bottom: 1px solid #3c6eac;
  background: rgba(28, 78, 140, .4);
}
.scan-list { overflow-y: auto; flex: 1; }
.scan-row {
  border-bottom: 1px solid rgba(60, 110, 172, .3);
  color: #c8d8ec;
  transition: background-color .3s, color .3s;
}
.scan-row.active {
  background-color: #f39c12; color: #000; font-weight: bold; border-radius: 4px;
}
.scan-row.completed {
  background-color: rgba(46, 204, 113, .12); color: #2ecc71;
}

/* Scans Restantes */
.scans-restantes-area { display: flex; align-items: center; gap: 10px; padding-top: 4px; }
.sr-label { font-size: 11px; color: #7fb3e0; text-transform: uppercase; letter-spacing: .5px; }
.scans-restantes-box {
  background: white; color: #003366;
  border-radius: 4px; font-size: 24px; font-weight: bold;
  width: 56px; height: 48px;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #3c6eac;
}

/* ══ COLUNA DIREITA ════════════════════════════════════════════ */
.right-col {
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 12px 10px;
  gap: 10px;
}

.realtime-panel { display: flex; flex-direction: column; gap: 14px; }

.info-label {
  font-size: 10px; color: #7fb3e0;
  text-transform: uppercase; letter-spacing: .8px; margin-bottom: 4px;
}
.info-box {
  background: white; color: #003366; border-radius: 4px;
  padding: 7px 10px; font-size: 12px; font-weight: bold;
  min-height: 32px; display: flex; align-items: center;
}
.info-box.status-running { color: #e67e22; }
.info-box.status-success { color: #27ae60; }

.countdown-box {
  background: white; color: #003366; border-radius: 4px;
  padding: 6px 10px; font-size: 26px; font-weight: bold;
  min-width: 70px; text-align: center;
}

/* Botões de controle */
.control-buttons { display: flex; flex-direction: column; gap: 6px; }
.btn-start { background: #2ecc71; color: #000; border: none; border-radius: 6px; padding: 10px 0; font-weight: bold; cursor: pointer; font-size: 13px; width: 100%; }
.btn-pause { background: #f39c12; color: #000; border: none; border-radius: 6px; padding: 10px 0; font-weight: bold; cursor: pointer; font-size: 13px; width: 100%; }
.btn-stop  { background: #e74c3c; color: #fff; border: none; border-radius: 6px; padding: 10px 0; font-weight: bold; cursor: pointer; font-size: 13px; width: 100%; }
.btn-start:disabled, .btn-pause:disabled, .btn-stop:disabled { background: #444; color: #777; cursor: not-allowed; }

/* ══ MODAIS ════════════════════════════════════════════════════ */
.modal-backdrop {
  position: absolute; inset: 0; z-index: 50;
  background: rgba(0,0,0,.7);
  display: flex; align-items: center; justify-content: center;
}
.modal-box {
  background: #0b2c5d; border: 2px solid #f39c12; border-radius: 10px;
  max-width: 440px; width: 90%; color: #e0e0e0; overflow: hidden;
}
.modal-header {
  font-size: 15px; font-weight: bold; padding: 14px 20px;
  background: rgba(243,156,18,.15); border-bottom: 1px solid #f39c12;
}
.modal-header.warn    { background: rgba(231,76,60,.15); border-color: #e74c3c; }
.modal-header.fire    { background: rgba(243,156,18,.15); border-color: #f39c12; }
.modal-header.success { background: rgba(46,204,113,.15); border-color: #2ecc71; }
.modal-body { padding: 16px 20px; display: flex; flex-direction: column; gap: 10px; font-size: 13px; line-height: 1.55; }
.modal-divider { border: none; border-top: 1px solid rgba(255,255,255,.15); margin: 4px 0; }
.modal-sub { font-weight: bold; color: #7fb3e0; margin-bottom: -4px; }
.modal-text { font-size: 12px; color: #b0c4d8; }
.modal-footer { padding: 12px 20px; display: flex; justify-content: center; }
.modal-footer.two-btn { justify-content: space-between; }
.btn-modal-ok { background: #f39c12; color: #000; border: none; border-radius: 6px; padding: 9px 28px; font-weight: bold; cursor: pointer; font-size: 13px; }
.btn-modal-ok:hover { opacity: .88; }
.btn-modal-cancel { background: rgba(255,255,255,.08); color: #ccc; border: 1px solid rgba(255,255,255,.2); border-radius: 6px; padding: 9px 28px; font-weight: bold; cursor: pointer; font-size: 13px; }
.btn-modal-cancel:hover { background: rgba(255,255,255,.15); }
</style>
