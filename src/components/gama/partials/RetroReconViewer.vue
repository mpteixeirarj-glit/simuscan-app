<template>
  <div class="retro-viewer">

    <!-- Patient banner -->
    <div class="retro-viewer-patient-banner">
      <div class="banner-field">
        <label>Paciente</label>
        <span>{{ exam?.patientName || '—' }}</span>
      </div>
      <div class="banner-field">
        <label>ID</label>
        <span>{{ exam?.patientId || '—' }}</span>
      </div>
      <div class="banner-field">
        <label>Exam#</label>
        <span>{{ exam?.examNum || '—' }}</span>
      </div>
      <div class="banner-field">
        <label>Data</label>
        <span>{{ exam?.date || '—' }}</span>
      </div>
      <div class="banner-field">
        <label>Série</label>
        <span>{{ series?.desc || '—' }}</span>
      </div>
    </div>

    <!-- Main area -->
    <div class="retro-viewer-main">

      <!-- Left: patient image -->
      <div class="retro-viewer-left">
        <div class="patient-img-label">Patient Position</div>
        <div class="patient-img-wrap">
          <img :src="BASE_URL + 'imagens/HFsupine.png'" alt="Patient Position" class="patient-img" />
        </div>
      </div>

      <!-- Right: function buttons + video -->
      <div class="retro-viewer-right">

        <!-- Function buttons (all disabled) -->
        <div class="func-btns-grid">
          <button class="func-btn" disabled>Copy Pt.Orient.</button>
          <button class="func-btn" disabled>Pt.Position</button>
          <button class="func-btn" disabled>Anat.Ref.</button>
          <button class="func-btn" disabled>Auto Store</button>
          <button class="func-btn" disabled>Auto Transfer PACS</button>
          <button class="func-btn" disabled>Dose Report</button>
          <button class="func-btn" disabled>Show Localizer</button>
          <button class="func-btn" disabled>Auto Film</button>
          <button class="func-btn" disabled>Impressora</button>
          <button class="func-btn" disabled>Smart Prep Rx</button>
        </div>

        <!-- Video player -->
        <div class="retro-video-area">
          <video
            v-show="!videoError"
            ref="videoPlayer"
            class="retro-video"
            :src="currentVideoSrc"
            preload="metadata"
            @error="onVideoError"
          ></video>
          <div v-if="videoError" class="retro-video-placeholder">
            <div class="placeholder-icon">▶</div>
            <div class="placeholder-text">Vídeo em produção</div>
            <div class="placeholder-exam">{{ exam?.examDesc }}</div>
          </div>
        </div>

      </div>
    </div>

    <!-- Technical table (read-only) -->
    <div class="retro-tech-table">
      <table class="tech-table">
        <thead>
          <tr>
            <th>kV</th><th>mAs</th><th>Pitch</th>
            <th>Colimação</th><th>Recon</th><th>FOV</th>
            <th>Janela</th><th>Rotação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span>120</span></td>
            <td><span>300</span></td>
            <td><span>0.6</span></td>
            <td><span>0.6 mm</span></td>
            <td><span>1.0 mm</span></td>
            <td><span>250 mm</span></td>
            <td><span>Cérebro</span></td>
            <td><span>0.75 s</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tabs (visual only, disabled) -->
    <div class="retro-tabs-bar">
      <div class="retro-tab">⏱ Scan Time</div>
      <div class="retro-tab">◎ Topograma</div>
      <div class="retro-tab">📷 Imagens</div>
    </div>

    <!-- Bottom bar -->
    <div class="retro-viewer-bottom">
      <div class="bottom-left">
        <button class="rv-btn rv-btn-quit" @click="handleQuit">Quit</button>
      </div>
      <div class="bottom-center">
        <button class="rv-btn" disabled>Prior Series</button>
        <button class="rv-btn" disabled>Next Series</button>
        <button class="rv-btn" disabled>Create New</button>
        <button class="rv-btn" disabled>Delete</button>
        <button class="rv-btn" disabled>Priority Recon</button>
        <button class="rv-btn" disabled>Auto Scan</button>
      </div>
      <div class="bottom-right">
        <button
          class="rv-btn rv-btn-accept"
          :disabled="videoError"
          @click="handleAccept"
        >{{ acceptLabel }}</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { retroReconState } from '@/stores/retroReconState.js'

const emit = defineEmits(['back'])

const BASE_URL = import.meta.env.BASE_URL

const exam = computed(() => retroReconState.selectedExam)
const series = computed(() => retroReconState.selectedSeries)

const videoPlayer = ref(null)
const videoError = ref(false)
const acceptLabel = ref('▶ Play')

const videoMap = {
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
  const file = videoMap[exam.value?.examType]
  return file ? BASE_URL + file : ''
})

function onVideoError() {
  videoError.value = true
}

function handleAccept() {
  const video = videoPlayer.value
  if (!video || videoError.value) return
  if (video.paused) {
    video.play().catch(() => { videoError.value = true })
    acceptLabel.value = '⏸ Pause'
  } else {
    video.pause()
    acceptLabel.value = '▶ Play'
  }
}

function handleQuit() {
  if (videoPlayer.value) videoPlayer.value.pause()
  emit('back')
}

onBeforeUnmount(() => {
  if (videoPlayer.value) videoPlayer.value.pause()
})
</script>

<style scoped>
.retro-viewer {
  width: 100%;
  height: 100%;
  background: #003366;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  font-size: 12px;
  gap: 8px;
}

/* Patient banner */
.retro-viewer-patient-banner {
  background: #0b2c5d;
  border: 1px solid #3c6eac;
  border-radius: 6px;
  padding: 10px 16px;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  font-size: 12px;
  flex-shrink: 0;
}
.banner-field { display: flex; flex-direction: column; gap: 2px; }
.banner-field label { color: #aaa; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
.banner-field span { color: #f39c12; font-weight: bold; font-size: 13px; }

/* Main area */
.retro-viewer-main {
  display: flex;
  gap: 10px;
  flex: 1;
  min-height: 0;
}

/* Left: patient position image */
.retro-viewer-left {
  width: 160px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.patient-img-label {
  font-size: 11px;
  color: #aaa;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.patient-img-wrap {
  flex: 1;
  background: #0b2c5d;
  border: 1px solid #3c6eac;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}
.patient-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: invert(0) brightness(0.9);
}

/* Right: functions + video */
.retro-viewer-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

/* Function buttons grid */
.func-btns-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  flex-shrink: 0;
}
.func-btn {
  background: #1c3a6a;
  border: 1px solid #3c6eac;
  color: #777;
  padding: 6px 4px;
  border-radius: 4px;
  font-size: 10px;
  cursor: not-allowed;
  opacity: 0.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Video player */
.retro-video-area {
  flex: 1;
  background: #000;
  border: 1px solid #3c6eac;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  position: relative;
}
.retro-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
.retro-video-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #001a33;
}
.placeholder-icon { font-size: 40px; color: #3c6eac; opacity: 0.5; }
.placeholder-text { color: #666; font-size: 13px; }
.placeholder-exam { color: #f39c12; font-size: 12px; font-style: italic; }

/* Technical table */
.retro-tech-table {
  flex-shrink: 0;
  background: #0b2c5d;
  border: 1px solid #3c6eac;
  border-radius: 6px;
  overflow: hidden;
}
.tech-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}
.tech-table th {
  background: #1c4e8c;
  color: #aaa;
  padding: 5px 8px;
  text-align: center;
  border-right: 1px solid #3c6eac;
  font-size: 10px;
  letter-spacing: 0.3px;
}
.tech-table th:last-child { border-right: none; }
.tech-table td {
  padding: 6px 8px;
  text-align: center;
  border-right: 1px solid #1a3a6a;
}
.tech-table td:last-child { border-right: none; }
.tech-table td span { color: #e0e0e0; font-weight: 500; }

/* Tabs (visual only) */
.retro-tabs-bar {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
  pointer-events: none;
}
.retro-tab {
  background: #0b2c5d;
  border: 1px solid #3c6eac;
  border-radius: 5px 5px 0 0;
  padding: 5px 16px;
  font-size: 11px;
  color: #666;
  opacity: 0.5;
}

/* Bottom bar */
.retro-viewer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-shrink: 0;
}
.bottom-left, .bottom-right { flex-shrink: 0; }
.bottom-center {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
}

.rv-btn {
  padding: 7px 14px;
  border: 1px solid #3c6eac;
  border-radius: 5px;
  background: #1c4e8c;
  color: white;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}
.rv-btn:disabled {
  background: #222;
  border-color: #333;
  color: #555;
  cursor: not-allowed;
  opacity: 0.4;
}
.rv-btn-quit { background: #dc3545; border-color: #b73a47; }
.rv-btn-quit:hover { background: #c82333; }
.rv-btn-accept { background: #f39c12; border-color: #c5860e; color: #000; min-width: 90px; }
.rv-btn-accept:hover:not(:disabled) { background: #e08e0b; }
.rv-btn-accept:disabled { background: #444; color: #666; border-color: #555; }
</style>
