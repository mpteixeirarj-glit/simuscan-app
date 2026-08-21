<template>
  <div class="retro-viewer-container">

    <!-- 1. BANNER -->
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

    <!-- 2. MAIN AREA: 3 columns (Mesa | Controls | Video) -->
    <div class="retro-main-area">

      <!-- Col 1: patient image -->
      <div class="retro-col-mesa">
        <img v-if="!mesaImgError" :src="mesaImageSrc" alt="Patient Position" class="retro-mesa-img" @error="mesaImgError = true">
        <div v-else class="mesa-fallback">HF · Supine</div>
      </div>

      <!-- Col 2: controls -->
      <div class="retro-col-controls">
        <div class="retro-field-row">
          <label class="retro-label">Anatomical Reference</label>
          <input type="text" class="retro-input-sm" v-model="anatRef" maxlength="4">
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
      </div>

      <!-- Col 3: video (280×180, fixed — never covers banner or bottom bar) -->
      <div class="retro-col-video">
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

    </div>

    <!-- 3. PARAMS TABLE (16 colunas com scroll horizontal) -->
    <div class="retro-params-section">
      <div class="retro-params-row">

        <!-- Retro toggle vertical -->
        <div class="retro-btn-vertical">
          <div class="retro-label-btn">Retro</div>
          <button class="retro-btn-toggle" :class="{ active: retroActive }" @click="retroActive = !retroActive">
            {{ retroActive ? 'Y' : 'N' }}
          </button>
        </div>

        <!-- Tabela com scroll horizontal -->
        <div class="retro-table-wrap">

          <!-- Pré-header: aba com abd_recon.png acima de Recon Type + Matrix Size (cols 13-14) -->
          <div class="retro-table-preheader">
            <div class="retro-th" v-for="n in 12" :key="'sp1-'+n"></div>
            <div class="retro-axial-tab">
              <img
                v-show="!axialImgError"
                :src="BASE_URL + 'imagens/abd_recon.png'"
                alt="Corte Axial TC"
                class="retro-axial-img"
                @error="axialImgError = true"
              >
            </div>
            <div class="retro-th" v-for="n in 2" :key="'sp2-'+n"></div>
          </div>

          <!-- Cabeçalhos — 16 colunas -->
          <div class="retro-table-header">
            <div class="retro-th">Scan Type</div>
            <div class="retro-th">Retro Start</div>
            <div class="retro-th">Retro End</div>
            <div class="retro-th">No. of Images</div>
            <div class="retro-th">Thick (mm)</div>
            <div class="retro-th">Interval</div>
            <div class="retro-th">Time</div>
            <div class="retro-th">Gantry Tilt</div>
            <div class="retro-th">SFOV (cm)</div>
            <div class="retro-th">DFOV (cm)</div>
            <div class="retro-th">R/L Center (mm)</div>
            <div class="retro-th">A/P Center (mm)</div>
            <div class="retro-th">Recon Type</div>
            <div class="retro-th">Matrix Size</div>
            <div class="retro-th">Recon Option</div>
            <div class="retro-th">Graphic Retro</div>
          </div>

          <!-- Valores — 16 colunas -->
          <div class="retro-table-values">
            <div class="retro-td"><span class="retro-param-text">Helical Plus</span></div>
            <div class="retro-td">
              <input type="text" class="retro-param-input" :value="retroStart" @input="onRetroStartInput" placeholder="I47.750">
            </div>
            <div class="retro-td">
              <input type="text" class="retro-param-input" :value="retroEnd" @input="onRetroEndInput" placeholder="I519.000">
            </div>
            <div class="retro-td">
              <input type="text" class="retro-param-input" :value="noOfImages" readonly>
            </div>
            <div class="retro-td">
              <select class="retro-param-select" v-model="thick" @change="recalcImages">
                <option>0.6</option><option>1.25</option><option>2.5</option>
                <option>3.75</option><option>5.0</option><option>10.0</option>
              </select>
            </div>
            <div class="retro-td"><span class="retro-param-text">1.250</span></div>
            <div class="retro-td"><span class="retro-param-text">7.5</span></div>
            <div class="retro-td">
              <input type="text" class="retro-param-input" :value="gantryTilt" @input="onGantryTiltInput" placeholder="S0.0">
            </div>
            <div class="retro-td">
              <input type="text" class="retro-param-input" :value="sfov" readonly>
            </div>
            <div class="retro-td">
              <input type="text" class="retro-param-input" :value="dfov" @input="onDFOVInput" placeholder="37.5">
            </div>
            <div class="retro-td">
              <input type="text" class="retro-param-input" :value="rlCenter" @input="onRLCenterInput" placeholder="R3.4">
            </div>
            <div class="retro-td">
              <input type="text" class="retro-param-input" :value="apCenter" @input="onAPCenterInput" placeholder="P35.6">
            </div>
            <div class="retro-td">
              <select class="retro-param-select" v-model="reconType">
                <option>Soft</option><option>Standard</option><option>Lung</option><option>Chest</option>
                <option>Detail</option><option>Bone</option><option>Bone Plus</option><option>Edge</option>
              </select>
            </div>
            <div class="retro-td"><span class="retro-param-text">512</span></div>
            <div class="retro-td">
              <button class="retro-btn-toggle" @click="showReconOptionsModal = true">Plus 400/40 SS30</button>
            </div>
            <div class="retro-td">
              <button class="retro-btn-toggle" :class="{ active: graphicRetro }" @click="graphicRetro = !graphicRetro">
                {{ graphicRetro ? 'Y' : 'N' }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 4. BOTTOM BAR -->
    <div class="retro-bottom-bar">
      <div class="retro-bottom-left">
        <button class="retro-btn-quit" @click="handleQuit">Quit</button>
        <button class="retro-btn-action" @click="handleListExams">List Exams</button>
        <button class="retro-btn-toggle" :class="{ active: autoViewOff }" @click="autoViewOff = !autoViewOff">Auto View Off</button>
      </div>
      <div class="retro-bottom-right">
        <button class="retro-btn-play" :disabled="videoError && !currentVideoSrc" @click="handlePlay">
          {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
        </button>
      </div>
    </div>

    <!-- MODAL: Recon Options -->
    <div v-if="showReconOptionsModal" class="recon-options-modal" @click.self="showReconOptionsModal = false">
      <div class="recon-options-box">
        <h3>Recon Options</h3>
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
          <label class="recon-opt-label">Filtro de Ruído SS30</label>
          <input type="text" class="recon-opt-input" v-model="reconOpts.filtroRuido">
        </div>
        <div class="recon-opt-row">
          <label class="recon-opt-label">Ativo</label>
          <button class="retro-btn-toggle" :class="{ active: reconOpts.ativo }" @click="reconOpts.ativo = !reconOpts.ativo">
            {{ reconOpts.ativo ? 'Y' : 'N' }}
          </button>
        </div>
        <button class="recon-opt-btn-ok" @click="showReconOptionsModal = false">OK</button>
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
const anatRef             = ref('XY')
const seriesDescription   = ref('')
const autoViewOff         = ref(false)
const showReconOptionsModal = ref(false)

// Params
const retroActive  = ref(false)
const retroStart   = ref('I47.750')
const retroEnd     = ref('I519.000')
const noOfImages   = ref('')
const thick        = ref('1.25')
const gantryTilt   = ref('S0.0')
const sfov         = ref('')
const dfov         = ref('37.5')
const rlCenter     = ref('R3.4')
const apCenter     = ref('P35.6')
const reconType    = ref('Standard')
const graphicRetro = ref(false)

const reconOpts = reactive({
  filtroPlus: 'Plus',
  janela: 400,
  center: 40,
  filtroRuido: 'SS30',
  ativo: false
})

// Images
const mesaImgError   = ref(false)
const axialImgError  = ref(false)
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
  sfov.value              = SFOV_OPTIONS[Math.floor(Math.random() * SFOV_OPTIONS.length)]
  seriesNumber.value      = String(Math.floor(Math.random() * 900) + 100)
  seriesDescription.value = selectedSeries.value?.seriesDesc || selectedSeries.value?.desc || 'SCOUT'
  recalcImages()
})

onBeforeUnmount(() => {
  if (videoPlayer.value) videoPlayer.value.pause()
})

function generateNewSeriesNumber() {
  seriesNumber.value    = String(Math.floor(Math.random() * 900) + 100)
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
  const clean = e.target.value.toUpperCase().replace(/[^IS0-9.]/g, '')
  retroStart.value = clean; e.target.value = clean; recalcImages()
}
function onRetroEndInput(e) {
  const clean = e.target.value.toUpperCase().replace(/[^IS0-9.]/g, '')
  retroEnd.value = clean; e.target.value = clean; recalcImages()
}
function onGantryTiltInput(e) {
  const clean = e.target.value.toUpperCase().replace(/[^SI0-9.]/g, '')
  gantryTilt.value = clean; e.target.value = clean
}
function onDFOVInput(e) {
  const clean = e.target.value.replace(/[^0-9.]/g, '')
  dfov.value = clean; e.target.value = clean
}
function onRLCenterInput(e) {
  const clean = e.target.value.toUpperCase().replace(/[^RL0-9.]/g, '')
  rlCenter.value = clean; e.target.value = clean
}
function onAPCenterInput(e) {
  const clean = e.target.value.toUpperCase().replace(/[^AP0-9.]/g, '')
  apCenter.value = clean; e.target.value = clean
}

function handlePlay() {
  const video = videoPlayer.value
  if (!video || !currentVideoSrc.value) return
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
/* ── Container ── */
.retro-viewer-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #003366;
  color: #e0e0e0;
  font-family: Arial, sans-serif;
  font-size: 12px;
  padding: 8px;
  box-sizing: border-box;
  gap: 8px;
  overflow: hidden;
}

/* ── 1. Banner ── */
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

/* ── 2. Main area: 3 columns ── */
.retro-main-area {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
  align-items: flex-start;
}

/* Col 1: mesa image */
.retro-col-mesa { width: 160px; flex-shrink: 0; }
.retro-mesa-img {
  width: 160px;
  height: auto;
  max-height: 180px;
  object-fit: contain;
  border: 1px solid #3c6eac;
  border-radius: 4px;
  background: #0b2c5d;
  display: block;
}
.mesa-fallback {
  width: 160px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #3c6eac;
  border-radius: 4px;
  background: #0b2c5d;
  color: #f39c12;
  font-weight: bold;
  font-size: 12px;
}

/* Col 2: controls */
.retro-col-controls {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.retro-field-row { display: flex; align-items: center; gap: 8px; }
.retro-label { color: #aaa; font-size: 11px; white-space: nowrap; min-width: 120px; }
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

/* Col 3: video — fixed 280×180, never covers banner or bottom bar */
.retro-col-video {
  width: 280px;
  height: 180px;
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
.retro-video { width: 100%; height: 100%; object-fit: contain; }
.retro-video-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: #001a33;
}
.placeholder-icon { font-size: 28px; color: #3c6eac; opacity: 0.5; }
.placeholder-text { color: #666; font-size: 11px; }
.placeholder-exam { color: #f39c12; font-size: 10px; font-style: italic; }

/* ── 3. Params section ── */
.retro-params-section { flex-shrink: 0; }
.retro-params-row { display: flex; gap: 6px; align-items: flex-start; }

/* Retro toggle vertical */
.retro-btn-vertical {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
  padding-top: 40px; /* alinha com a linha de valores */
}
.retro-label-btn {
  padding: 6px 10px;
  background: #0b2c5d;
  border: 1px solid #3c6eac;
  color: #f39c12;
  border-radius: 3px;
  font-size: 11px;
  font-weight: bold;
  white-space: nowrap;
  text-align: center;
}

/* Tabela com scroll horizontal */
.retro-table-wrap {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  min-width: 0;
}
.retro-table-wrap::-webkit-scrollbar { height: 4px; }
.retro-table-wrap::-webkit-scrollbar-track { background: transparent; }
.retro-table-wrap::-webkit-scrollbar-thumb { background: rgba(255,255,255,.25); border-radius: 2px; }

/* Grid de 16 colunas — preheader, header e values */
.retro-table-preheader,
.retro-table-header,
.retro-table-values {
  display: grid;
  grid-template-columns: repeat(16, minmax(72px, auto));
  gap: 2px;
  min-width: max-content;
}
.retro-table-preheader { margin-bottom: 2px; }

/* Aba da imagem axial (span 2 = colunas Recon Type + Matrix Size) */
.retro-axial-tab {
  grid-column: span 2;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: #0b2c5d;
  border: 1px solid #3c6eac;
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  padding: 4px;
  min-height: 62px;
}
.retro-axial-img {
  width: 52px;
  height: 52px;
  object-fit: contain;
  border-radius: 50%;
}

/* Células da tabela */
.retro-th {
  background: #0b2c5d;
  color: #aaa;
  font-size: 10px;
  text-align: center;
  padding: 4px 2px;
  border: 1px solid #1a3a6a;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
}
.retro-td {
  background: #1c4e8c;
  border: 1px solid #3c6eac;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  min-height: 32px;
}

/* Inputs e selects dentro da tabela */
.retro-param-input {
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  text-align: center;
  font-size: 11px;
  padding: 4px 2px;
  outline: none;
  font-family: Arial, sans-serif;
}
.retro-param-input:focus { background: rgba(255,255,255,.1); border-radius: 2px; }
.retro-param-input:read-only { color: #aaa; cursor: default; }

.retro-param-select {
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  font-size: 11px;
  text-align: center;
  cursor: pointer;
  appearance: none;
  font-family: Arial, sans-serif;
}
.retro-param-select option { background: #1c4e8c; color: white; }

.retro-param-text {
  font-size: 11px;
  color: #e0e0e0;
  text-align: center;
  white-space: nowrap;
  padding: 0 4px;
}

/* Toggle buttons (usados no params e nos controles) */
.retro-btn-toggle {
  padding: 5px 10px;
  background: #1c4e8c;
  border: 1px solid #3c6eac;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
}
.retro-btn-toggle.active { background: #f39c12; color: #000; font-weight: bold; }

/* ── 4. Bottom bar ── */
.retro-bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}
.retro-bottom-left  { display: flex; gap: 8px; align-items: center; }
.retro-bottom-right { display: flex; }

.retro-btn-quit {
  padding: 7px 18px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 12px;
}
.retro-btn-quit:hover { background: #c82333; }
.retro-btn-action {
  padding: 7px 14px;
  background: #3c6eac;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}
.retro-btn-action:hover { background: #2e5a8e; }
.retro-btn-play {
  padding: 7px 22px;
  background: #f39c12;
  color: #000;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 12px;
}
.retro-btn-play:hover:not(:disabled) { background: #e08e0b; }
.retro-btn-play:disabled { background: #555; color: #999; cursor: not-allowed; }

/* ── Modal: Recon Options ── */
.recon-options-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.recon-options-box {
  background: #0b2c5d;
  border: 2px solid #f39c12;
  border-radius: 8px;
  padding: 20px 24px;
  width: 360px;
  max-width: 90vw;
  overflow: visible;
}
.recon-options-box h3 {
  color: #f39c12;
  font-size: 14px;
  margin: 0 0 16px;
  text-align: center;
  letter-spacing: 1px;
}
.recon-opt-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}
.recon-opt-label {
  color: #aaa;
  font-size: 12px;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 140px;
}
.recon-opt-input {
  flex: 1;
  background: #1c4e8c;
  border: 1px solid #3c6eac;
  color: white;
  border-radius: 3px;
  padding: 5px 8px;
  font-size: 12px;
  text-align: center;
  min-width: 80px;
  max-width: 120px;
}
.recon-opt-btn-ok {
  width: 100%;
  margin-top: 16px;
  padding: 8px;
  background: #f39c12;
  color: #000;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
}
</style>
