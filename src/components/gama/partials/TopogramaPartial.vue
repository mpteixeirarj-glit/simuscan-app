<template>
  <div class="topo-wrapper">
    <div class="center-strip">

      <!-- Left: interactive patient positioning -->
      <div class="side-box mesa-box">
        <div class="mesa-label">{{ patientDirLabel }} · {{ patientPosLabel }}</div>
        <div class="mesa-interactive">
          <div class="mesa-zone mesa-zone-top"    @click="cyclePosition"  title="Clique para girar posição"></div>
          <div class="mesa-zone mesa-zone-bottom" @click="cyclePosition"  title="Clique para girar posição"></div>
          <div class="mesa-zone mesa-zone-left"   @click="toggleDirection" title="Clique para Head/Feet First"></div>
          <div class="mesa-zone mesa-zone-right"  @click="toggleDirection" title="Clique para Head/Feet First"></div>
          <img :src="patientImgSrc" alt="Posicionamento do Paciente" class="mesa-img" @error="imgError = true">
          <div v-if="imgError" class="mesa-fallback">
            <div>{{ patientDirLabel }}</div>
            <div>{{ patientPosLabel }}</div>
          </div>
        </div>
      </div>

      <table class="center-table">
        <tbody>
          <tr>
            <td><button class="toggle-btn" :class="{ active: toggles.om }" @click="toggles.om = !toggles.om" data-tooltip="Orientação do Paciente">OM</button></td>
            <td><button class="toggle-btn" :class="{ active: toggles.autoStore }" @click="toggles.autoStore = !toggles.autoStore" data-tooltip="Armazenamento Automático">AUTO STORE</button></td>
            <td><button class="toggle-btn" :class="{ active: toggles.autoPacs }" @click="toggles.autoPacs = !toggles.autoPacs" data-tooltip="Transferência Automática para PACS">Auto Transfer PACS</button></td>
          </tr>
          <tr>
            <td><button class="toggle-btn" :class="{ active: toggles.doseReport }" @click="toggles.doseReport = !toggles.doseReport" data-tooltip="Transferência Automática do Relatório de Dose">Dose Report Auto Transfer</button></td>
            <td><button class="toggle-btn" :class="{ active: toggles.doseSr }" @click="toggles.doseSr = !toggles.doseSr" data-tooltip="Transferência do Relatório de Dose SR">Dose SR Report Transfer</button></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div class="side-box">
        <div class="topo-patient-data" v-if="patient">
          <div class="data-item"><span>Paciente:</span><span>{{ patient.name }}</span></div>
          <div class="data-item"><span>ID:</span><span>{{ patient.id }}</span></div>
          <div class="data-item"><span>Nascimento:</span><span>{{ patient.birthdate }}</span></div>
          <div class="data-item"><span>Idade:</span><span>{{ patient.age }}</span></div>
          <div class="data-item"><span>Sexo:</span><span>{{ patient.sex }}</span></div>
          <div class="data-item"><span>Médico:</span><span>{{ patient.physician }}</span></div>
          <div class="data-item"><span>Protocolo:</span><span>{{ patient.protocol }}</span></div>
        </div>
      </div>
    </div>

    <div class="series-row">
      <label for="seriesDesc">Series Description</label>
      <input id="seriesDesc" type="text" v-model="seriesDesc">
    </div>

    <div class="series-grid-wrap">
      <table class="series-grid">
        <tbody>
          <tr>
            <td class="grid-header scout">Scout Number</td>
            <td class="grid-header">Scan Type</td>
            <td class="grid-header">Start Loc.</td>
            <td class="grid-header">End Loc.</td>
            <td class="grid-header">kV</td>
            <td class="grid-header">mA</td>
            <td class="grid-header">Scout Plane</td>
            <td class="grid-header">Voice</td>
            <td class="grid-header">Lights</td>
            <td class="grid-header">WW/WL</td>
          </tr>
          <tr v-for="(row, ri) in seriesData" :key="ri">
            <td><input type="text" :value="ri + 1" readonly></td>
            <td><input type="text" v-model="row.scanType"></td>
            <td><input type="text" v-model="row.startLoc"></td>
            <td><input type="text" v-model="row.endLoc"></td>
            <td>
              <select v-model="row.kv">
                <option>80</option><option>110</option><option>120</option>
              </select>
            </td>
            <td><input type="text" v-model="row.ma"></td>
            <td>
              <select v-model="row.scoutPlane">
                <option>0</option><option>90</option><option>180</option>
              </select>
            </td>
            <td><select v-model="row.voice"><option value="S">S</option><option value="N">N</option></select></td>
            <td><select v-model="row.lights"><option value="S">S</option><option value="N">N</option></select></td>
            <td><input type="text" v-model="row.wwwl"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

defineProps({ patient: { type: Object, default: null } })
defineEmits(['cancel', 'accept'])

const BASE_URL = import.meta.env.BASE_URL

const seriesDesc = ref('SCOUT')
const toggles = reactive({ om: false, autoStore: false, autoPacs: false, doseReport: false, doseSr: false })

const POSITIONS = ['Supine', 'Left Lateral', 'Prone', 'Right Lateral']
const patientDir = ref('HF')
const patientPosIdx = ref(0)
const imgError = ref(false)

const patientDirLabel = computed(() => patientDir.value === 'HF' ? 'Head First' : 'Feet First')
const patientPosLabel = computed(() => POSITIONS[patientPosIdx.value])

const IMG_MAP = {
  'HF-Supine':        'HFsupine.png',
  'HF-Left Lateral':  'HFlateral_L.png',
  'HF-Prone':         'HFprone.png',
  'HF-Right Lateral': 'HFlateral_R.png',
  'FF-Supine':        'FFsupine.png',
  'FF-Left Lateral':  'FFlateral_L.png',
  'FF-Prone':         'FFprone.png',
  'FF-Right Lateral': 'FFlateral_R.png',
}

const patientImgSrc = computed(() => {
  const key = `${patientDir.value}-${POSITIONS[patientPosIdx.value]}`
  return BASE_URL + 'imagens/' + (IMG_MAP[key] || 'HFsupine.png')
})

function toggleDirection() {
  imgError.value = false
  patientDir.value = patientDir.value === 'HF' ? 'FF' : 'HF'
}

function cyclePosition() {
  imgError.value = false
  patientPosIdx.value = (patientPosIdx.value + 1) % POSITIONS.length
}

const defaultRow = () => ({ scanType: 'Scout', startLoc: 'S150.00', endLoc: 'I100.00', kv: '120', ma: '10', scoutPlane: '90', voice: 'N', lights: 'N', wwwl: '400/50' })

const seriesData = ref([defaultRow(), defaultRow()])
seriesData.value[1].scoutPlane = '0'

function createNewSeries() {
  if (seriesData.value.length >= 4) return
  seriesData.value.push({ ...seriesData.value[seriesData.value.length - 1] })
}

function repeatSeries() {
  if (seriesData.value.length < 2) return
  const src = { ...seriesData.value[0] }
  for (let i = 1; i < seriesData.value.length; i++) {
    Object.assign(seriesData.value[i], src)
  }
}

function deleteSeries() {
  if (seriesData.value.length <= 1) return
  seriesData.value.pop()
}

defineExpose({ createNewSeries, repeatSeries, deleteSeries })
</script>

<style scoped>
.topo-wrapper { width: 100%; height: 100%; display: flex; flex-direction: column; gap: 2px; padding: 12px; box-sizing: border-box; overflow: auto; }
.center-strip { display: flex; align-items: stretch; gap: 24px; flex-grow: 1; margin-bottom: 2px; min-height: 180px; }
.side-box { flex: 1 1 0; border-radius: 10px; background: rgba(0,0,0,.25); outline: 1px dashed rgba(255,255,255,.3); outline-offset: -4px; padding: 10px; }

/* Patient data panel — ERRO 8 fix */
.topo-patient-data { font-size: 14px; color: #ccc; height: 100%; overflow-y: auto; padding-right: 4px; }
.topo-patient-data::-webkit-scrollbar { width: 4px; }
.topo-patient-data::-webkit-scrollbar-track { background: transparent; }
.topo-patient-data::-webkit-scrollbar-thumb { background: rgba(255,255,255,.3); border-radius: 2px; }
.data-item { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,.1); }
.data-item span:first-child { font-weight: bold; }
.data-item span:last-child { color: #f39c12; font-weight: bold; }

/* Mesa interactive — ERRO 7 */
.mesa-box { display: flex; flex-direction: column; gap: 6px; }
.mesa-label { text-align: center; font-size: 11px; color: #f39c12; font-weight: bold; letter-spacing: 0.5px; flex-shrink: 0; }
.mesa-interactive { position: relative; flex: 1; display: flex; align-items: center; justify-content: center; }
.mesa-img { width: 100%; height: 100%; object-fit: contain; border-radius: 6px; user-select: none; }
.mesa-zone { position: absolute; z-index: 2; cursor: pointer; border-radius: 4px; transition: background .15s; }
.mesa-zone:hover { background: rgba(243,156,18,.18); }
.mesa-zone-top    { top: 0;    left: 20%; right: 20%; height: 22%; }
.mesa-zone-bottom { bottom: 0; left: 20%; right: 20%; height: 22%; }
.mesa-zone-left   { left: 0;  top: 22%; bottom: 22%; width: 20%; }
.mesa-zone-right  { right: 0; top: 22%; bottom: 22%; width: 20%; }
.mesa-fallback { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #f39c12; font-size: 13px; font-weight: bold; background: rgba(0,0,0,.4); border-radius: 6px; pointer-events: none; }

.center-table { flex: 0 0 auto; align-self: center; border-collapse: separate; border-spacing: 10px; background: rgba(255,255,255,.06); padding: 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,.15); }
.center-table td { width: 150px; height: 50px; padding: 0; }
.toggle-btn { width: 100%; height: 100%; background: rgba(0,0,0,.25); border-radius: 8px; border: 1px solid rgba(255,255,255,.2); color: #fff; font-size: 11px; font-weight: bold; cursor: pointer; transition: background-color .2s; }
.toggle-btn.active { background-color: #f39c12; color: #000; border-color: #f39c12; }

.series-row { display: flex; align-items: center; gap: 10px; margin-bottom: 2px; flex-shrink: 0; }
.series-row label { color: #fff; font-size: 13px; white-space: nowrap; }
.series-row input { flex: 1; min-width: 240px; max-width: 720px; height: 32px; border-radius: 6px; border: 1px solid #ddd; background: #fff; color: #000; padding: 0 10px; outline: none; }

.series-grid-wrap { flex-shrink: 0; overflow: auto; }
.series-grid { border-collapse: separate; border-spacing: 4px; margin: 0 auto; }
.series-grid td { width: 68px; height: 80px; padding: 0; text-align: center; vertical-align: middle; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); border-radius: 8px; color: #fff; font-size: 12px; }
.series-grid td.scout { white-space: nowrap; padding: 0 8px; font-weight: bold; }
.series-grid input, .series-grid select { appearance: none; -webkit-appearance: none; width: 100%; height: 100%; background-color: transparent; border: none; color: white; text-align: center; font-size: 12px; font-family: Arial, sans-serif; padding: 0 4px; }
.series-grid input:focus, .series-grid select:focus { outline: 1px solid #f39c12; background-color: #2e2e2e; }
.grid-header { font-weight: bold; color: #f39c12; font-size: 11px; text-align: center; vertical-align: middle; }
</style>
