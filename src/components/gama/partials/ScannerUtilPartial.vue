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
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

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
  width: 110px;
  height: 34px;
  background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,255,255,.3);
  border-radius: 6px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  padding: 0 6px;
  outline: none;
}
.ph-input:focus { border-color: #f39c12; background: rgba(255,255,255,.15); }

.ph-select {
  width: 130px;
  height: 34px;
  background: rgba(0,0,0,.4);
  border: 1px solid rgba(255,255,255,.3);
  border-radius: 6px;
  color: #fff;
  font-size: 13px;
  text-align: center;
  padding: 0 6px;
  outline: none;
  cursor: pointer;
}
.ph-select:focus { border-color: #f39c12; }

/* ---- Air Calibration ---- */
.air-params {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: center;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
}

.air-row {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255,255,255,.05);
  border-radius: 8px;
  padding: 10px 16px;
  border: 1px solid rgba(255,255,255,.1);
}

.air-label {
  font-size: 13px;
  font-weight: bold;
  color: #f39c12;
  min-width: 90px;
  flex-shrink: 0;
}

.air-options { display: flex; flex-wrap: wrap; gap: 16px; }

.air-radio {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: rgba(255,255,255,.85);
  cursor: pointer;
}
.air-radio input[type="radio"] { accent-color: #f39c12; cursor: pointer; }

/* ---- Bottom bar ---- */
.su-bottom-bar {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 16px 0;
  flex-shrink: 0;
  border-top: 1px solid rgba(255,255,255,.08);
  margin-top: 16px;
}

.su-btn-cancel,
.su-btn-confirm {
  padding: 9px 28px;
  border-radius: 6px;
  border: none;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity .2s;
  min-width: 120px;
}

.su-btn-cancel { background: #dc3545; color: #fff; }
.su-btn-cancel:hover { opacity: .85; }

.su-btn-confirm { background: #f39c12; color: #000; }
.su-btn-confirm:hover { opacity: .85; }
.su-btn-confirm:disabled { opacity: .45; cursor: not-allowed; }

/* ---- Overlays ---- */
.su-success-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 4px;
}

.su-success-box {
  background: #0b2c5d;
  border: 1px solid #3c6eac;
  border-radius: 12px;
  padding: 32px 48px;
  text-align: center;
  min-width: 280px;
}

.su-progress-box { min-width: 360px; }

.su-success-icon { font-size: 36px; color: #2ecc71; margin-bottom: 10px; }
.su-success-msg { font-size: 16px; font-weight: bold; color: #fff; margin-bottom: 16px; }

.su-progress-bar-wrap {
  width: 100%;
  height: 14px;
  background: rgba(255,255,255,.15);
  border-radius: 7px;
  overflow: hidden;
}

.su-progress-bar-fill {
  height: 100%;
  background: #f39c12;
  border-radius: 7px;
  transition: width .25s linear;
}
</style>
