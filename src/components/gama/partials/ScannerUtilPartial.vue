<template>
  <div class="su-container">

    <!-- TELA 1: MENU -->
    <div v-if="currentView === 'menu'" class="su-screen">
      <div class="su-title">Scanner Utilities</div>
      <div class="su-menu-grid">
        <div class="su-menu-item" @click="currentView = 'phantom'">
          <div class="su-menu-icon">⊕</div>
          <div class="su-menu-label">Center Phantom</div>
          <div class="su-menu-desc">Centraliza o phantom de calibração no isocentro do gantry.</div>
        </div>
        <div class="su-menu-item" @click="currentView = 'air'">
          <div class="su-menu-icon">⟳</div>
          <div class="su-menu-label">Air Calibration</div>
          <div class="su-menu-desc">Executa calibração de ar para normalização dos detectores.</div>
        </div>
      </div>
      <div class="su-bottom-bar">
        <button class="su-btn-cancel" @click="$emit('back')">Quit</button>
        <button class="su-btn-service" @click="openServicePin">Service Mode</button>
      </div>
    </div>

    <!-- TELA 2: PHANTOM CENTERING -->
    <div v-else-if="currentView === 'phantom'" class="su-screen">
      <div class="su-title">Center Phantom</div>
      <p class="su-instruction">Insira os valores de offset e selecione a direção de movimento para centralizar o phantom.</p>

      <div class="phantom-grid">
        <div class="ph-header"></div>
        <div class="ph-header">Offset (mm)</div>
        <div class="ph-header">Move Direction</div>

        <div class="ph-label">X-Center</div>
        <div class="ph-cell">
          <input type="number" v-model.number="phantom.xOffset" class="ph-input" min="-50" max="50" step="0.1">
        </div>
        <div class="ph-cell">
          <select v-model="phantom.xDir" class="ph-select">
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div class="ph-label">Y-Center</div>
        <div class="ph-cell">
          <input type="number" v-model.number="phantom.yOffset" class="ph-input" min="-50" max="50" step="0.1">
        </div>
        <div class="ph-cell">
          <select v-model="phantom.yDir" class="ph-select">
            <option value="up">Up</option>
            <option value="down">Down</option>
          </select>
        </div>
      </div>

      <!-- Success overlay -->
      <div v-if="showPhantomSuccess" class="su-success-overlay">
        <div class="su-success-box">
          <div class="su-success-icon">✔</div>
          <div class="su-success-msg">Phantom centralizado com sucesso!</div>
        </div>
      </div>

      <div class="su-bottom-bar">
        <button class="su-btn-cancel" @click="currentView = 'menu'">Cancel</button>
        <button class="su-btn-confirm" @click="confirmPhantom">Confirm</button>
        <button class="su-btn-service" @click="openServicePin">Service Mode</button>
      </div>
    </div>

    <!-- TELA 3: AIR CALIBRATION -->
    <div v-else-if="currentView === 'air'" class="su-screen">
      <div class="su-title">Air Calibration</div>
      <p class="su-instruction">Selecione os parâmetros e inicie a calibração de ar.</p>

      <div class="air-params">
        <div class="air-row">
          <span class="air-label">kV</span>
          <div class="air-options">
            <label v-for="opt in ['80kV','100kV','120kV','140kV']" :key="opt" class="air-radio">
              <input type="radio" :value="opt" v-model="airParams.kv"> {{ opt }}
            </label>
          </div>
        </div>
        <div class="air-row">
          <span class="air-label">SFOV</span>
          <div class="air-options">
            <label v-for="opt in ['Small','Medium','Large']" :key="opt" class="air-radio">
              <input type="radio" :value="opt" v-model="airParams.sfov"> {{ opt }}
            </label>
          </div>
        </div>
        <div class="air-row">
          <span class="air-label">Focal Spot</span>
          <div class="air-options">
            <label v-for="opt in ['Small','Large']" :key="opt" class="air-radio">
              <input type="radio" :value="opt" v-model="airParams.focalSpot"> {{ opt }}
            </label>
          </div>
        </div>
        <div class="air-row">
          <span class="air-label">Slice Colim.</span>
          <div class="air-options">
            <label v-for="opt in ['2x0.625','4x0.625','8x0.625','16x0.625','32x0.625','64x0.625']" :key="opt" class="air-radio">
              <input type="radio" :value="opt" v-model="airParams.sliceColim"> {{ opt }}
            </label>
          </div>
        </div>
      </div>

      <!-- Progress overlay -->
      <div v-if="showAirProgress" class="su-success-overlay">
        <div class="su-success-box su-progress-box">
          <div class="su-success-msg">Calibrando... {{ airProgress }}%</div>
          <div class="su-progress-bar-wrap">
            <div class="su-progress-bar-fill" :style="{ width: airProgress + '%' }"></div>
          </div>
          <div v-if="airProgress >= 100" class="su-success-icon" style="margin-top:12px;">✔ Calibração concluída!</div>
        </div>
      </div>

      <div class="su-bottom-bar">
        <button class="su-btn-cancel" @click="cancelAir">Cancel</button>
        <button class="su-btn-confirm" :disabled="showAirProgress" @click="startAirCalibration">Start Calibration</button>
        <button class="su-btn-service" @click="openServicePin">Service Mode</button>
      </div>
    </div>

    <!-- TELA 4: SERVICE MODE -->
    <div v-else-if="currentView === 'service'" class="su-screen">
      <div class="su-title su-title-service">⚙ Service Mode</div>

      <div class="svc-grid">
        <div class="svc-section">
          <div class="svc-section-title">System Status</div>
          <div class="svc-row" v-for="item in serviceStatus" :key="item.label">
            <span class="svc-label">{{ item.label }}</span>
            <span class="svc-value" :class="item.ok ? 'svc-ok' : 'svc-fail'">{{ item.value }}</span>
          </div>
        </div>

        <div class="svc-section">
          <div class="svc-section-title">Detector Channels</div>
          <div class="svc-channel-grid">
            <div
              v-for="ch in 32" :key="ch"
              class="svc-channel"
              :class="faultChannels.includes(ch) ? 'svc-ch-fault' : 'svc-ch-ok'"
              :title="'CH ' + ch"
            >{{ ch }}</div>
          </div>
        </div>

        <div class="svc-section">
          <div class="svc-section-title">Error Log</div>
          <div class="svc-log">
            <div class="svc-log-entry" v-for="entry in errorLog" :key="entry.id">
              <span class="svc-log-time">{{ entry.time }}</span>
              <span class="svc-log-code" :class="entry.level === 'WARN' ? 'svc-warn' : 'svc-info'">{{ entry.level }}</span>
              <span class="svc-log-msg">{{ entry.msg }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="su-bottom-bar">
        <button class="su-btn-cancel" @click="currentView = 'menu'">Exit Service</button>
      </div>
    </div>

    <!-- MODAL: PIN de Acesso -->
    <div v-if="showServicePin" class="su-modal-backdrop" @click.self="closeServicePin">
      <div class="su-modal">
        <div class="su-modal-title">⚙ Service Mode</div>
        <p class="su-modal-desc">Digite o PIN de acesso ao modo de serviço.</p>
        <div class="su-pin-row">
          <input
            ref="pinInputRef"
            type="password"
            v-model="servicePin"
            class="su-pin-input"
            maxlength="6"
            placeholder="PIN"
            @keyup.enter="submitPin"
          >
        </div>
        <div v-if="servicePinError" class="su-pin-error">PIN incorreto. Tente novamente.</div>
        <div class="su-modal-actions">
          <button class="su-btn-cancel" @click="closeServicePin">Cancelar</button>
          <button class="su-btn-confirm" @click="submitPin">Confirmar</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'

defineEmits(['back'])

const currentView = ref('menu')

// --- Phantom Centering ---
const phantom = reactive({ xOffset: 0, yOffset: 0, xDir: 'left', yDir: 'up' })
const showPhantomSuccess = ref(false)

function confirmPhantom() {
  showPhantomSuccess.value = true
  setTimeout(() => {
    showPhantomSuccess.value = false
    currentView.value = 'menu'
  }, 2000)
}

// --- Air Calibration ---
const airParams = reactive({ kv: '120kV', sfov: 'Large', focalSpot: 'Small', sliceColim: '16x0.625' })
const showAirProgress = ref(false)
const airProgress = ref(0)
let airTimer = null

function startAirCalibration() {
  showAirProgress.value = true
  airProgress.value = 0
  airTimer = setInterval(() => {
    airProgress.value += 10
    if (airProgress.value >= 100) {
      clearInterval(airTimer)
      airTimer = null
      setTimeout(() => {
        showAirProgress.value = false
        airProgress.value = 0
        currentView.value = 'menu'
      }, 1500)
    }
  }, 300)
}

function cancelAir() {
  if (airTimer) { clearInterval(airTimer); airTimer = null }
  showAirProgress.value = false
  airProgress.value = 0
  currentView.value = 'menu'
}

// --- Service Mode PIN ---
const SERVICE_PIN = '1234'
const showServicePin = ref(false)
const servicePin = ref('')
const servicePinError = ref(false)
const pinInputRef = ref(null)

function openServicePin() {
  servicePin.value = ''
  servicePinError.value = false
  showServicePin.value = true
  nextTick(() => pinInputRef.value?.focus())
}

function closeServicePin() {
  showServicePin.value = false
  servicePin.value = ''
  servicePinError.value = false
}

function submitPin() {
  if (servicePin.value === SERVICE_PIN) {
    closeServicePin()
    currentView.value = 'service'
  } else {
    servicePinError.value = true
    servicePin.value = ''
    nextTick(() => pinInputRef.value?.focus())
  }
}

// --- Service Mode data ---
const serviceStatus = [
  { label: 'Gantry Temperature',  value: '38.2 °C', ok: true  },
  { label: 'Tube Voltage',        value: '120 kV',  ok: true  },
  { label: 'Coolant Pressure',    value: '1.8 bar', ok: true  },
  { label: 'Detector Array',      value: '29/32 OK',ok: false },
  { label: 'Table Motor',         value: 'OK',      ok: true  },
  { label: 'HV Generator',        value: 'OK',      ok: true  },
  { label: 'Anode Rotation',      value: 'OK',      ok: true  },
  { label: 'Data Link',           value: 'OK',      ok: true  },
]

const faultChannels = [7, 19, 26]

const errorLog = [
  { id: 1, time: '08:14:03', level: 'WARN', msg: 'CH07 signal below threshold' },
  { id: 2, time: '08:14:04', level: 'WARN', msg: 'CH19 signal below threshold' },
  { id: 3, time: '08:14:04', level: 'WARN', msg: 'CH26 signal below threshold' },
  { id: 4, time: '08:10:11', level: 'INFO', msg: 'Air calibration completed OK' },
  { id: 5, time: '07:55:00', level: 'INFO', msg: 'System boot sequence completed' },
]
</script>

<style scoped>
.su-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
  box-sizing: border-box;
  overflow: hidden;
}

.su-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 32px 0;
  overflow: hidden;
}

.su-title {
  font-size: 20px;
  font-weight: bold;
  color: #f39c12;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,.15);
  padding-bottom: 12px;
}

.su-title-service { color: #e74c3c; }

.su-instruction {
  font-size: 13px;
  color: rgba(255,255,255,.75);
  margin-bottom: 20px;
  text-align: center;
}

/* ---- Menu ---- */
.su-menu-grid {
  display: flex;
  gap: 32px;
  justify-content: center;
  flex: 1;
  align-items: center;
}

.su-menu-item {
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 12px;
  padding: 32px 28px;
  width: 200px;
  text-align: center;
  cursor: pointer;
  transition: background .2s, border-color .2s;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.su-menu-item:hover {
  background: rgba(243,156,18,.15);
  border-color: #f39c12;
}

.su-menu-icon { font-size: 36px; color: #f39c12; }
.su-menu-label { font-size: 15px; font-weight: bold; }
.su-menu-desc { font-size: 11px; color: rgba(255,255,255,.55); line-height: 1.4; }

/* ---- Phantom grid ---- */
.phantom-grid {
  display: grid;
  grid-template-columns: 100px 140px 160px;
  gap: 8px;
  align-items: center;
  margin: 0 auto;
  flex: 1;
  align-content: center;
}

.ph-header { font-size: 11px; font-weight: bold; color: #f39c12; text-align: center; }
.ph-label { font-size: 13px; font-weight: bold; text-align: right; padding-right: 8px; }
.ph-cell { display: flex; justify-content: center; }

.ph-input {
  width: 110px; height: 34px;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.3);
  border-radius: 6px; color: #fff; text-align: center; font-size: 14px;
  padding: 0 6px; outline: none;
}
.ph-input:focus { border-color: #f39c12; background: rgba(255,255,255,.15); }

.ph-select {
  width: 130px; height: 34px;
  background: rgba(0,0,0,.4); border: 1px solid rgba(255,255,255,.3);
  border-radius: 6px; color: #fff; font-size: 13px; text-align: center;
  padding: 0 6px; outline: none; cursor: pointer;
}
.ph-select:focus { border-color: #f39c12; }

/* ---- Air Calibration ---- */
.air-params {
  flex: 1; display: flex; flex-direction: column; gap: 14px;
  justify-content: center; max-width: 700px; margin: 0 auto; width: 100%;
}

.air-row {
  display: flex; align-items: center; gap: 20px;
  background: rgba(255,255,255,.05); border-radius: 8px;
  padding: 10px 16px; border: 1px solid rgba(255,255,255,.1);
}

.air-label { font-size: 13px; font-weight: bold; color: #f39c12; min-width: 90px; flex-shrink: 0; }
.air-options { display: flex; flex-wrap: wrap; gap: 16px; }

.air-radio { display: flex; align-items: center; gap: 5px; font-size: 12px; color: rgba(255,255,255,.85); cursor: pointer; }
.air-radio input[type="radio"] { accent-color: #f39c12; cursor: pointer; }

/* ---- Service Mode screen ---- */
.svc-grid {
  flex: 1; display: flex; gap: 16px; overflow: hidden; padding-bottom: 4px;
}

.svc-section {
  flex: 1; background: rgba(0,0,0,.25); border: 1px solid rgba(255,255,255,.12);
  border-radius: 10px; padding: 12px; display: flex; flex-direction: column; overflow: hidden;
}

.svc-section-title {
  font-size: 12px; font-weight: bold; color: #e74c3c; letter-spacing: 1px;
  text-transform: uppercase; margin-bottom: 10px; padding-bottom: 6px;
  border-bottom: 1px solid rgba(255,255,255,.1);
}

.svc-row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,.06); font-size: 12px; }
.svc-label { color: rgba(255,255,255,.7); }
.svc-value { font-weight: bold; }
.svc-ok { color: #2ecc71; }
.svc-fail { color: #e74c3c; }

.svc-channel-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px; }
.svc-channel { padding: 6px 0; text-align: center; border-radius: 4px; font-size: 11px; font-weight: bold; }
.svc-ch-ok { background: rgba(46,204,113,.25); color: #2ecc71; border: 1px solid rgba(46,204,113,.4); }
.svc-ch-fault { background: rgba(231,76,60,.3); color: #e74c3c; border: 1px solid rgba(231,76,60,.5); }

.svc-log { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
.svc-log::-webkit-scrollbar { width: 4px; }
.svc-log::-webkit-scrollbar-thumb { background: rgba(255,255,255,.2); border-radius: 2px; }
.svc-log-entry { display: flex; gap: 8px; font-size: 11px; padding: 4px 6px; border-radius: 4px; background: rgba(255,255,255,.04); }
.svc-log-time { color: rgba(255,255,255,.45); white-space: nowrap; }
.svc-log-code { font-weight: bold; min-width: 36px; text-align: center; border-radius: 3px; padding: 0 3px; }
.svc-warn { background: rgba(243,156,18,.2); color: #f39c12; }
.svc-info { background: rgba(52,152,219,.2); color: #3498db; }
.svc-log-msg { color: rgba(255,255,255,.8); }

/* ---- Bottom bar ---- */
.su-bottom-bar {
  display: flex; justify-content: center; gap: 20px;
  padding: 16px 0; flex-shrink: 0;
  border-top: 1px solid rgba(255,255,255,.08); margin-top: 16px;
}

.su-btn-cancel, .su-btn-confirm, .su-btn-service {
  padding: 9px 28px; border-radius: 6px; border: none;
  font-size: 13px; font-weight: bold; cursor: pointer;
  transition: opacity .2s; min-width: 120px;
}

.su-btn-cancel { background: #dc3545; color: #fff; }
.su-btn-cancel:hover { opacity: .85; }

.su-btn-confirm { background: #f39c12; color: #000; }
.su-btn-confirm:hover { opacity: .85; }
.su-btn-confirm:disabled { opacity: .45; cursor: not-allowed; }

.su-btn-service { background: rgba(231,76,60,.2); color: #e74c3c; border: 1px solid rgba(231,76,60,.5); }
.su-btn-service:hover { background: rgba(231,76,60,.35); }

/* ---- Overlays ---- */
.su-success-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,.65);
  display: flex; align-items: center; justify-content: center; z-index: 10; border-radius: 4px;
}

.su-success-box {
  background: #0b2c5d; border: 1px solid #3c6eac; border-radius: 12px;
  padding: 32px 48px; text-align: center; min-width: 280px;
}

.su-progress-box { min-width: 360px; }

.su-success-icon { font-size: 36px; color: #2ecc71; margin-bottom: 10px; }
.su-success-msg { font-size: 16px; font-weight: bold; color: #fff; margin-bottom: 16px; }

.su-progress-bar-wrap { width: 100%; height: 14px; background: rgba(255,255,255,.15); border-radius: 7px; overflow: hidden; }
.su-progress-bar-fill { height: 100%; background: #f39c12; border-radius: 7px; transition: width .25s linear; }

/* ---- PIN Modal ---- */
.su-modal-backdrop {
  position: absolute; inset: 0; background: rgba(0,0,0,.7);
  display: flex; align-items: center; justify-content: center; z-index: 20;
}

.su-modal {
  background: #0b2c5d; border: 1px solid #3c6eac; border-radius: 12px;
  padding: 32px 40px; min-width: 320px; text-align: center;
  display: flex; flex-direction: column; gap: 16px;
}

.su-modal-title { font-size: 18px; font-weight: bold; color: #e74c3c; letter-spacing: 1px; }
.su-modal-desc { font-size: 13px; color: rgba(255,255,255,.7); margin: 0; }

.su-pin-row { display: flex; justify-content: center; }

.su-pin-input {
  width: 140px; height: 44px; text-align: center; letter-spacing: 6px;
  font-size: 22px; font-weight: bold; background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,255,255,.3); border-radius: 8px;
  color: #fff; outline: none; padding: 0 12px;
}
.su-pin-input:focus { border-color: #f39c12; background: rgba(255,255,255,.15); }

.su-pin-error { font-size: 12px; color: #e74c3c; font-weight: bold; }

.su-modal-actions { display: flex; justify-content: center; gap: 16px; }
</style>
