<template>
  <div class="retro-recon-container">
    <div class="retro-recon-title">RETRO RECON LIST SELECT</div>

    <div class="retro-recon-body">
      <!-- EXAMS panel -->
      <div class="retro-list-panel">
        <div class="retro-list-header">EXAMS</div>
        <div class="retro-list-scroll">
          <table class="retro-list-table">
            <thead>
              <tr>
                <th>PATIENT ID</th>
                <th>PATIENT NAME</th>
                <th>EXAM#</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>SUITE</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(exam, i) in visibleExams"
                :key="exam.examNum"
                :class="{ selected: selectedExamIndex === examOffset + i }"
                @click="selectExam(examOffset + i)"
              >
                <td>{{ exam.patientId }}</td>
                <td>{{ exam.patientName }}</td>
                <td>{{ exam.examNum }}</td>
                <td>{{ exam.date }}</td>
                <td>{{ exam.time }}</td>
                <td>{{ exam.suite }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="retro-scroll-btns">
          <button class="retro-scroll-btn" :disabled="examOffset === 0" @click="examOffset--">▲</button>
          <button class="retro-scroll-btn" :disabled="examOffset + PAGE >= examList.length" @click="examOffset++">▼</button>
        </div>
      </div>

      <!-- SERIES panel -->
      <div class="retro-list-panel">
        <div class="retro-list-header">SERIES</div>
        <div class="retro-list-scroll">
          <table class="retro-list-table">
            <thead>
              <tr>
                <th>SERIES#</th>
                <th>SERIES DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(s, i) in visibleSeries"
                :key="s.n"
                :class="{ selected: selectedSeriesIndex === seriesOffset + i }"
                @click="selectSeries(seriesOffset + i)"
              >
                <td>{{ s.n }}</td>
                <td>{{ s.desc }}</td>
              </tr>
              <tr v-if="currentSeries.length === 0">
                <td colspan="2" style="color:#666; text-align:center; padding: 16px;">
                  Selecione um exame
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="retro-scroll-btns">
          <button class="retro-scroll-btn" :disabled="seriesOffset === 0" @click="seriesOffset--">▲</button>
          <button class="retro-scroll-btn" :disabled="seriesOffset + PAGE >= currentSeries.length" @click="seriesOffset++">▼</button>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="retro-bottom-bar">
      <button class="retro-btn retro-btn-quit" @click="$emit('back')">Quit</button>
      <button
        class="retro-btn retro-btn-select"
        :disabled="!canSelect"
        @click="handleSelectSeries"
      >Select Series</button>
      <button class="retro-btn retro-btn-update" @click="generateList">Update</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { retroReconState } from '@/stores/retroReconState.js'

const emit = defineEmits(['back', 'openViewer'])

const PAGE = 8

// Exam list
const examList = ref([])
const examOffset = ref(0)
const selectedExamIndex = ref(-1)

// Series
const seriesOffset = ref(0)
const selectedSeriesIndex = ref(-1)

// Visible slices
const visibleExams = computed(() => examList.value.slice(examOffset.value, examOffset.value + PAGE))
const visibleSeries = computed(() => currentSeries.value.slice(seriesOffset.value, seriesOffset.value + PAGE))

const canSelect = computed(() => selectedExamIndex.value >= 0 && selectedSeriesIndex.value >= 0)

// --- Data generation ---
const firstNames = ['João','Maria','Pedro','Ana','Carlos','Mariana','Ricardo','Camila','Felipe','Juliana','Rafael','Helena','Heitor','Arthur','Aurora','Gustavo','Rebeca','Iris','Ravi','Sandra']
const lastNames = ['Nascimento Silva','Silva Santos','Oliveira Machado','Souza Lima','Pereira Gomes','Ferreira Lima','Almeida da Silva','Rodrigues Gomes','Gomes Lima','Pereira Alves','Teixeira da Silva','Amaral Lopes']

const examTypes = [
  { type: 'cranio',    desc: 'Crânio S/C',         video: 'cranio.mp4' },
  { type: 'face',      desc: 'Face',                video: 'face.mp4' },
  { type: 'pescoco',   desc: 'Pescoço S/C',         video: 'pescoco.mp4' },
  { type: 'torax',     desc: 'Tórax',               video: 'torax.mp4' },
  { type: 'abd_sc',    desc: 'Abdômen e Pelve S/C', video: 'abdomen_sc.mp4' },
  { type: 'abd_cc',    desc: 'Abdômen e Pelve C/C', video: 'abdomen_cc.mp4' },
  { type: 'col_cerv',  desc: 'Col. Cervical',       video: 'col_cervical.mp4' },
  { type: 'col_dors',  desc: 'Col. Dorsal',         video: 'col_dorsal.mp4' },
  { type: 'col_lomb',  desc: 'Col. Lombar',         video: 'col_lombar.mp4' },
  { type: 'bacia',     desc: 'Bacia',               video: 'bacia.mp4' },
  { type: 'joelho',    desc: 'Joelho',              video: 'joelho.mp4' },
  { type: 'tornozelo', desc: 'Tornozelo',           video: 'tornozelo.mp4' },
  { type: 'pe',        desc: 'Pé',                  video: 'pe.mp4' },
]

const seriesPorTipo = {
  cranio:    [{ n: 1, desc: 'Ax S/C' }, { n: 2, desc: 'Ax Osso' }],
  face:      [{ n: 1, desc: 'Ax PM'  }, { n: 2, desc: 'Ax Osso' }],
  pescoco:   [{ n: 1, desc: 'Ax S/C' }, { n: 2, desc: 'Ax C/C'  }],
  torax:     [{ n: 1, desc: 'Ax Mediastino' }, { n: 2, desc: 'Ax Pulmão' }],
  abd_sc:    [{ n: 1, desc: 'Ax Sem Contraste' }],
  abd_cc:    [
    { n: 1, desc: 'Ax Sem Contraste' },
    { n: 2, desc: 'Arterial' },
    { n: 3, desc: 'Portal' },
    { n: 4, desc: 'Tardia' },
  ],
  col_cerv:  [{ n: 1, desc: 'Ax PM'  }, { n: 2, desc: 'Ax Osso' }],
  col_dors:  [{ n: 1, desc: 'Ax PM'  }, { n: 2, desc: 'Ax Osso' }],
  col_lomb:  [{ n: 1, desc: 'Ax PM'  }, { n: 2, desc: 'Ax Osso' }],
  bacia:     [{ n: 1, desc: 'Ax PM'  }, { n: 2, desc: 'Ax Osso' }],
  joelho:    [{ n: 1, desc: 'Ax PM'  }, { n: 2, desc: 'Ax Osso' }],
  tornozelo: [{ n: 1, desc: 'Ax PM'  }, { n: 2, desc: 'Ax Osso' }],
  pe:        [{ n: 1, desc: 'Ax PM'  }, { n: 2, desc: 'Ax Osso' }],
}

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function dataOffset(dias) {
  const d = new Date()
  d.setDate(d.getDate() - dias)
  return d.toLocaleDateString('pt-BR')
}

function horaAleatoria() {
  const h = String(Math.floor(Math.random() * 16) + 6).padStart(2, '0')
  const m = String(Math.floor(Math.random() * 60)).padStart(2, '0')
  return `${h}:${m}`
}

function generateList() {
  // Distribution: 20 today, 20 yesterday, 10 day-2, 30 day-3, 20 day-4
  const distribution = [
    { dias: 0, count: 20 },
    { dias: 1, count: 20 },
    { dias: 2, count: 10 },
    { dias: 3, count: 30 },
    { dias: 4, count: 20 },
  ]

  const list = []
  for (const { dias, count } of distribution) {
    const dateStr = dataOffset(dias)
    for (let i = 0; i < count; i++) {
      const fn = rand(firstNames)
      const ln = rand(lastNames)
      const et = rand(examTypes)
      list.push({
        patientId:   `P${Math.floor(Math.random() * 9000) + 1000}`,
        patientName: `${fn} ${ln}`,
        examNum:     String(Math.floor(Math.random() * 90000) + 10000),
        date:        dateStr,
        time:        horaAleatoria(),
        suite:       'Gama Healthcare',
        examType:    et.type,
        examDesc:    et.desc,
        videoFile:   et.video,
      })
    }
  }

  // Shuffle
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]]
  }

  examList.value = list
  retroReconState.examList = list

  // Reset selection
  selectedExamIndex.value = -1
  selectedSeriesIndex.value = -1
  examOffset.value = 0
  seriesOffset.value = 0
}

// Current series for selected exam
const currentSeries = computed(() => {
  if (selectedExamIndex.value < 0) return []
  const exam = examList.value[selectedExamIndex.value]
  return seriesPorTipo[exam?.examType] || []
})

function selectExam(i) {
  selectedExamIndex.value = i
  selectedSeriesIndex.value = -1
  seriesOffset.value = 0
}

function selectSeries(i) {
  selectedSeriesIndex.value = i
}

function handleSelectSeries() {
  if (!canSelect.value) return
  const exam = examList.value[selectedExamIndex.value]
  const series = currentSeries.value[selectedSeriesIndex.value]
  retroReconState.selectedExam = exam
  retroReconState.selectedSeries = series
  emit('openViewer')
}

onMounted(() => {
  if (retroReconState.examList.length > 0) {
    examList.value = retroReconState.examList
  } else {
    generateList()
  }
})
</script>

<style scoped>
.retro-recon-container {
  width: 100%;
  height: 100%;
  background: #003366;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  padding: 12px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  font-size: 13px;
}

.retro-recon-title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #f39c12;
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.retro-recon-body {
  display: flex;
  gap: 12px;
  flex: 1;
  overflow: hidden;
}

.retro-list-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0b2c5d;
  border: 1px solid #3c6eac;
  border-radius: 6px;
  overflow: hidden;
}

.retro-list-header {
  background: #1c4e8c;
  padding: 8px 10px;
  font-weight: bold;
  color: #f39c12;
  font-size: 13px;
  letter-spacing: 1px;
  border-bottom: 1px solid #3c6eac;
}

.retro-list-scroll {
  flex: 1;
  overflow: hidden;
}

.retro-list-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.retro-list-table th {
  background: #0b2c5d;
  color: #aaa;
  padding: 6px 8px;
  text-align: left;
  border-bottom: 1px solid #3c6eac;
  white-space: nowrap;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.5px;
  position: sticky;
  top: 0;
  z-index: 1;
}

.retro-list-table td {
  padding: 7px 8px;
  border-bottom: 1px solid #1a3a6a;
  white-space: nowrap;
  cursor: pointer;
}

.retro-list-table tr:hover td { background: #1c4e8c; }
.retro-list-table tr.selected td { background: #f39c12; color: #000; font-weight: bold; }

.retro-scroll-btns {
  display: flex;
  gap: 8px;
  padding: 6px 10px;
  background: #0b2c5d;
  border-top: 1px solid #3c6eac;
}

.retro-scroll-btn {
  background: #1c4e8c;
  border: 1px solid #3c6eac;
  color: white;
  border-radius: 3px;
  width: 28px;
  height: 24px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.retro-scroll-btn:hover:not(:disabled) { background: #2a5e9c; }
.retro-scroll-btn:disabled { background: #333; color: #666; cursor: not-allowed; }

.retro-bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 0;
}

.retro-btn {
  padding: 8px 24px;
  border: none;
  border-radius: 5px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.retro-btn-quit   { background: #dc3545; color: white; }
.retro-btn-quit:hover { background: #c82333; }
.retro-btn-select { background: #3c6eac; color: white; }
.retro-btn-select:disabled { background: #444; color: #777; cursor: not-allowed; }
.retro-btn-select:not(:disabled):hover { background: #5c8ebc; }
.retro-btn-update { background: #f39c12; color: #000; }
.retro-btn-update:hover { background: #e67e22; }
</style>
