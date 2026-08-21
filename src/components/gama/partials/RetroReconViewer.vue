<template>
  <div class="retro-viewer-container">

    <!-- BANNER -->
    <div class="retro-banner">
      <span class="banner-label">Name:</span>
      <span class="banner-value">{{ selectedExam?.patientName || '—' }}</span>
      <span class="banner-label">ID:</span>
      <span class="banner-value">{{ selectedExam?.patientId || '—' }}</span>
      <span class="banner-label">Exam:</span>
      <span class="banner-value">{{ selectedExam?.examNum || '—' }}</span>
      <span class="banner-label">Series:</span>
      <span class="banner-value">{{ seriesNumber }}</span>
    </div>

    <!-- MAIN AREA: image + controls -->
    <div class="retro-main-area">

      <!-- LEFT: patient position image -->
      <div class="retro-left-col">
        <img v-if="!mesaImgError" :src="mesaImageSrc" alt="Patient Position" class="retro-mesa-img" @error="mesaImgError = true">
        <div v-else class="mesa-fallback">
          <span>HF · Supine</span>
        </div>
      </div>

      <!-- RIGHT: controls -->
      <div class="retro-right-col">

        <div class="retro-field-row">
          <label class="retro-label">Anatomical Reference</label>
          <input type="text" class="retro-input-sm" v-model="anatomRef" maxlength="4">
        </div>

        <div class="retro-field-row">
          <label class="retro-label">Series Description</label>
          <input type="text" class="retro-input-lg" v-model="seriesDescription">
        </div>

        <div class="retro-field-row">
          <label class="retro-label">Series Number</label>
          <input type="text" class="retro-input-sm" :value="seriesNumber" readonly>
          <button class="retro-btn-toggle" :class="{ active: newSeriesActive }" @click="generateNewSeriesNumber">New Series Number</button>
        </div>

        <!-- Retro toggle + params table -->
        <div class="retro-main-row">

          <div class="retro-btn-col">
            <div class="retro-btn-label">Retro</div>
            <button class="retro-btn-toggle sm" :class="{ active: retroActive }" @click="retroActive = !retroActive">
              {{ retroActive ? 'Y' : 'N' }}
            </button>
          </div>

          <div class="retro-params-table">

            <!-- Pre-header: axial image above Recon Type + Matrix Size -->
            <div class="retro-params-preheader">
              <span v-for="n in 11" :key="n" class="retro-param-spacer"></span>
              <div class="retro-axial-image-wrap" v-show="axialImgVisible">
                <img :src="BASE_URL + 'imagens/abd_recon.png'" alt="Corte Axial TC" class="retro-axial-img" @error="axialImgVisible = false">
              </div>
              <span class="retro-param-spacer"></span>
              <span class="retro-param-spacer"></span>
              <span class="retro-param-spacer"></span>
            </div>

            <!-- Headers -->
            <div class="retro-params-header">
              <span>Scan Type</span>
              <span>Retro Start</span>
              <span>Retro End</span>
              <span>No. of Images</span>
              <span>Thick (mm)</span>
              <span>Interval</span>
              <span>Time</span>
              <span>Gantry Tilt</span>
              <span>SFOV (cm)</span>
              <span>R/L Center</span>
              <span>A/P Center</span>
              <span>Recon Type</span>
              <span>Matrix Size</span>
              <span>Recon Option</span>
              <span>Graphic Retro</span>
            </div>

            <!-- Values -->
            <div class="retro-params-values">
              <span class="retro-param-text">Helical Plus 0.6s</span>
              <input type="text" class="retro-param-input" :value="retroStart" @input="onRetroStartInput" placeholder="I000.000">
              <input type="text" class="retro-param-input" :value="retroEnd"   @input="onRetroEndInput"   placeholder="I000.000">
              <input type="text" class="retro-param-input" :value="noOfImages" readonly>
              <select class="retro-param-select" v-model="thick" @change="recalcImages">
                <option>0.6</option>
                <option>1.25</option>
                <option>2.5</option>
                <option>3.75</option>
                <option>5.0</option>
                <option>10.0</option>
              </select>
              <span class="retro-param-text">7.5</span>
              <span class="retro-param-text">0.6s</span>
              <input type="text" class="retro-param-input" :value="gantryTilt" @input="onGantryTiltInput" placeholder="0.0">
              <input type="text" class="retro-param-input" :value="sfov" readonly>
              <input type="text" class="retro-param-input" :value="rlCenter" @input="onRLCenterInput" placeholder="0.0">
              <input type="text" class="retro-param-input" :value="apCenter" @input="onAPCenterInput" placeholder="0.0">
              <select class="retro-param-select" v-model="reconType">
                <option>Soft</option>
                <option>Standard</option>
                <option>Lung</option>
                <option>Chest</option>
                <option>Detail</option>
                <option>Bone</option>
                <option>Bone Plus</option>
                <option>Edge</option>
              </select>
              <span class="retro-param-text">512</span>
              <button class="retro-btn-toggle" @click="showReconOptionsModal = true">Plus 400/40 SS30</button>
              <button class="retro-btn-toggle" :class="{ active: graphicRetro }" @click="graphicRetro = !graphicRetro">
                {{ graphicRetro ? 'Y' : 'N' }}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- VIDEO SECTION -->
    <div class="retro-video-section">
      <video
        ref="videoPlayer"
        class="retro-video"
        :src="currentVideoSrc"
        preload="metadata"
        @error="videoError = true"
        @loadeddata="videoError = false"
        v-show="!videoError && currentVideoSrc"
      ></video>
      <div v-if="videoError || !currentVideoSrc" class="retro-video-placeholder">
        <span class="placeholder-icon">▶</span>
        <span class="placeholder-text">Vídeo em produção</span>
        <span class="placeholder-exam">{{ selectedExam?.examDesc }}</span>
      </div>
    </div>

    <!-- BOTTOM BAR -->
    <div class="retro-bottom-bar">
      <div class="retro-bottom-left">
        <button class="retro-btn-quit" @click="handleQuit">Quit</button>
        <button class="retro-btn-action" @click="handleListExams">List Exams</button>
        <button class="retro-btn-toggle" :class="{ active: autoViewOff }" @click="autoViewOff = !autoViewOff">Auto View Off</button>
      </div>
      <div class="retro-bottom-right">
        <button class="retro-btn-play" :disabled="videoError || !currentVideoSrc" @click="handlePlay">
          {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
        </button>
      </div>
    </div>

    <!-- MODAL: Recon Options -->
    <div v-if="showReconOptionsModal" class="modal-overlay" @click.self="showReconOptionsModal = false">
      <div class="modal-content">
        <h3 class="modal-title">Recon Options</h3>
        <div class="recon-opt-row">
          <label class="recon-opt-label">Filtro-Plus</label>
          <input type="text" class="recon-opt-input" v-model="reconOpts.filtroPlus">
        </div>
        <div class="recon-opt-row">
          <label class="recon-opt-label">Janela</label>
          <input type="number" class="recon-opt-input" v-model="reconOpts.janela">
        </div>
        <div class="recon-opt-row">
          <label class="recon-opt-label">Center</label>
          <input type="number" class="recon-opt-input" v-model="reconOpts.center">
        </div>
        <div class="recon-opt-row">
          <label class="recon-opt-label">Filtro de Ruído</label>
          <input type="text" class="recon-opt-input" v-model="reconOpts.filtroRuido">
        </div>
        <div class="recon-opt-row">
          <label class="recon-opt-label">Ativo</label>
          <button class="retro-btn-toggle" :class="{ active: reconOpts.ativo }" @click="reconOpts.ativo = !reconOpts.ativo">
            {{ reconOpts.ativo ? 'Y' : 'N' }}
          </button>
        </div>
        <div class="modal-actions">
          <button class="retro-btn-action" @click="showReconOptionsModal = false">OK</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { retroReconState } from '@/stores/retroReconState.js'

const emit = defineEmits(['back', 'quit'])

const BASE_URL = import.meta.env.BASE_URL

const selectedExam   = computed(() => retroReconState.selectedExam)
const selectedSeries = computed(() => retroReconState.selectedSeries)

// Banner
const seriesNumber    = ref('')
const newSeriesActive = ref(false)

// Controls
const anatomRef           = ref('XY')
const seriesDescription   = ref('')
const retroActive         = ref(false)
const graphicRetro        = ref(false)
const autoViewOff         = ref(false)
const showReconOptionsModal = ref(false)

// Params
const retroStart = ref('I41.750')
const retroEnd   = ref('I519.000')
const noOfImages = ref('')
const thick      = ref('1.25')
const gantryTilt = ref('0.0')
const sfov       = ref('')
const rlCenter   = ref('0.0')
const apCenter   = ref('0.0')
const reconType  = ref('Standard')

const reconOpts = reactive({
  filtroPlus: 'Plus',
  janela: 400,
  center: 40,
  filtroRuido: 'SS30',
  ativo: false
})

// Images
const mesaImgError   = ref(false)
const axialImgVisible = ref(true)
const mesaImageSrc   = computed(() => BASE_URL + 'imagens/HFsupine.png')

// Video
const videoPlayer = ref(null)
const videoError  = ref(false)
const isPlaying   = ref(false)

const VIDEO_MAP = {
  cranio:    'videos/cranio.mp4',
  face:      'videos/face.mp4',
  pescoco:   'videos/pescoco.mp4',
  torax:     'videos/torax.mp4',
  abd_sc:    'videos/abdomen_sc.mp4',
  abd_cc:    'videos/abdomen_cc.mp4',
  col_cerv:  'videos/col_cervical.mp4',
  col_dors:  'videos/col_dorsal.mp4',
  col_lomb:  'videos/col_lombar.mp4',
  bacia:     'videos/bacia.mp4',
  joelho:    'videos/joelho.mp4',
  tornozelo: 'videos/tornozelo.mp4',
  pe:        'videos/pe.mp4',
}

const currentVideoSrc = computed(() => {
  const file = VIDEO_MAP[selectedExam.value?.examType]
  return file ? BASE_URL + file : ''
})

const SFOV_OPTIONS = ['Large Body', 'Small Body', 'Head']

onMounted(() => {
  sfov.value          = SFOV_OPTIONS[Math.floor(Math.random() * SFOV_OPTIONS.length)]
  seriesNumber.value  = String(Math.floor(Math.random() * 900) + 100)
  seriesDescription.value = selectedSeries.value?.seriesDesc || selectedSeries.value?.desc || 'SCOUT'
  recalcImages()
})

onBeforeUnmount(() => {
  if (videoPlayer.value) videoPlayer.value.pause()
})

function generateNewSeriesNumber() {
  seriesNumber.value  = String(Math.floor(Math.random() * 900) + 100)
  newSeriesActive.value = true
}

function recalcImages() {
  const start = parseFloat(retroStart.value.replace(/[^0-9.]/g, '')) || 0
  const end   = parseFloat(retroEnd.value.replace(/[^0-9.]/g, ''))   || 0
  const t     = parseFloat(thick.value) || 1.25
  const calc  = Math.round(Math.abs(end - start) / t)
  noOfImages.value = String(Math.min(Math.max(calc, 100), 999)).padStart(3, '0')
}

function onRetroStartInput(e) {
  retroStart.value = e.target.value.toUpperCase().replace(/[^IS0-9.]/g, '')
  recalcImages()
}
function onRetroEndInput(e) {
  retroEnd.value = e.target.value.toUpperCase().replace(/[^IS0-9.]/g, '')
  recalcImages()
}
function onGantryTiltInput(e) {
  gantryTilt.value = e.target.value.toUpperCase().replace(/[^SI0-9.]/g, '')
}
function onRLCenterInput(e) {
  rlCenter.value = e.target.value.toUpperCase().replace(/[^RL0-9.]/g, '')
}
function onAPCenterInput(e) {
  apCenter.value = e.target.value.toUpperCase().replace(/[^AP0-9.]/g, '')
}

function handlePlay() {
  const video = videoPlayer.value
  if (!video || videoError.value || !currentVideoSrc.value) return
  if (video.paused) {
    video.play().catch(() => { videoError.value = true })
    isPlaying.value = true
  } else {
    video.pause()
    isPlaying.value = false
  }
}

function handleListExams() {
  if (videoPlayer.value) videoPlayer.value.pause()
  emit('back')
}

function handleQuit() {
  if (videoPlayer.value) videoPlayer.value.pause()
  emit('quit')
}
</script>

<style scoped>
/* Container */
.retro-viewer-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #003366;
  color: #e0e0e0;
  font-family: Arial, sans-serif;
  font-size: 12px;
  padding: 10px;
  box-sizing: border-box;
  gap: 8px;
  overflow: hidden;
}

/* Banner */
.retro-banner {
  display: flex;
  gap: 20px;
  align-items: center;
  background: #0b2c5d;
  border-bottom: 1px solid #3c6eac;
  padding: 8px 16px;
  font-size: 13px;
  flex-shrink: 0;
  border-radius: 4px;
}
.banner-label { color: #aaa; font-size: 11px; }
.banner-value { color: #f39c12; font-weight: bold; }

/* Main area */
.retro-main-area {
  display: flex;
  gap: 12px;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

/* Left: patient image */
.retro-left-col {
  width: 200px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.retro-mesa-img {
  width: 200px;
  height: auto;
  object-fit: contain;
  border: 1px solid #3c6eac;
  border-radius: 4px;
  background: #0b2c5d;
}
.mesa-fallback {
  width: 200px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #3c6eac;
  border-radius: 4px;
  background: #0b2c5d;
  color: #f39c12;
  font-weight: bold;
  font-size: 13px;
}

/* Right: controls */
.retro-right-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
}
.retro-right-col::-webkit-scrollbar { width: 4px; }
.retro-right-col::-webkit-scrollbar-track { background: transparent; }
.retro-right-col::-webkit-scrollbar-thumb { background: rgba(255,255,255,.25); border-radius: 2px; }

/* Field rows */
.retro-field-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.retro-label {
  color: #aaa;
  font-size: 11px;
  white-space: nowrap;
  min-width: 130px;
}
.retro-input-sm {
  width: 80px;
  background: #1c4e8c;
  border: 1px solid #3c6eac;
  color: white;
  padding: 4px 6px;
  font-size: 12px;
  border-radius: 3px;
  text-align: center;
}
.retro-input-lg {
  flex: 1;
  background: #1c4e8c;
  border: 1px solid #3c6eac;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 3px;
}

/* Retro toggle row */
.retro-main-row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  overflow-x: auto;
  flex-shrink: 0;
}
.retro-main-row::-webkit-scrollbar { height: 4px; }
.retro-main-row::-webkit-scrollbar-track { background: transparent; }
.retro-main-row::-webkit-scrollbar-thumb { background: rgba(255,255,255,.25); border-radius: 2px; }

.retro-btn-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  flex-shrink: 0;
}
.retro-btn-label {
  padding: 5px 12px;
  background: #0b2c5d;
  border: 1px solid #3c6eac;
  color: #f39c12;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
}

/* Params table */
.retro-params-table {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.retro-params-preheader,
.retro-params-header,
.retro-params-values {
  display: flex;
  gap: 4px;
  align-items: center;
}

.retro-param-spacer {
  min-width: 74px;
  flex-shrink: 0;
}

.retro-params-header span {
  font-size: 10px;
  color: #aaa;
  text-align: center;
  white-space: nowrap;
  min-width: 74px;
  flex-shrink: 0;
}

.retro-param-input {
  min-width: 74px;
  max-width: 80px;
  background: #1c4e8c;
  border: 1px solid #3c6eac;
  color: white;
  text-align: center;
  padding: 5px 4px;
  font-size: 12px;
  border-radius: 3px;
  flex-shrink: 0;
}
.retro-param-input:read-only { background: #0d2e5e; color: #aaa; }

.retro-param-select {
  min-width: 74px;
  background: #1c4e8c;
  border: 1px solid #3c6eac;
  color: white;
  padding: 5px 2px;
  font-size: 12px;
  border-radius: 3px;
  flex-shrink: 0;
}

.retro-param-text {
  min-width: 74px;
  text-align: center;
  font-size: 12px;
  color: #e0e0e0;
  flex-shrink: 0;
  padding: 5px 4px;
}

/* Axial image above Recon Type + Matrix Size */
.retro-axial-image-wrap {
  min-width: 152px; /* 74px * 2 + 4px gap */
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}
.retro-axial-img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  border-radius: 50%;
  border: 1px solid #3c6eac;
  background: #001a33;
}

/* Toggle buttons */
.retro-btn-toggle {
  padding: 5px 10px;
  background: #1c4e8c;
  border: 1px solid #3c6eac;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
}
.retro-btn-toggle.sm { min-width: 44px; }
.retro-btn-toggle.active {
  background: #f39c12;
  color: #000;
  font-weight: bold;
}

/* Video section */
.retro-video-section {
  width: 100%;
  height: 200px;
  flex-shrink: 0;
  background: #000;
  border: 1px solid #3c6eac;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.retro-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.retro-video-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #001a33;
}
.placeholder-icon  { font-size: 32px; color: #3c6eac; opacity: 0.5; }
.placeholder-text  { color: #666; font-size: 12px; }
.placeholder-exam  { color: #f39c12; font-size: 11px; font-style: italic; }

/* Bottom bar */
.retro-bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}
.retro-bottom-left  { display: flex; gap: 8px; align-items: center; }
.retro-bottom-right { display: flex; gap: 8px; align-items: center; }

.retro-btn-quit {
  padding: 7px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
}
.retro-btn-quit:hover { background: #c82333; }

.retro-btn-action {
  padding: 7px 16px;
  background: #3c6eac;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
}
.retro-btn-action:hover { background: #2e5a8e; }

.retro-btn-play {
  padding: 7px 24px;
  background: #f39c12;
  color: #000;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
}
.retro-btn-play:hover:not(:disabled) { background: #e08e0b; }
.retro-btn-play:disabled { background: #555; color: #999; cursor: not-allowed; }

/* Modal: Recon Options */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background: #0b2c5d;
  border: 2px solid #f39c12;
  border-radius: 8px;
  padding: 24px 32px;
  width: 420px;
  color: #e0e0e0;
  font-family: Arial, sans-serif;
}
.modal-title {
  color: #f39c12;
  font-size: 15px;
  margin: 0 0 16px;
}
.recon-opt-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.recon-opt-label {
  min-width: 140px;
  font-size: 13px;
  color: #ccc;
}
.recon-opt-input {
  flex: 1;
  background: #1c4e8c;
  border: 1px solid #3c6eac;
  color: white;
  padding: 5px 8px;
  font-size: 12px;
  border-radius: 3px;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
