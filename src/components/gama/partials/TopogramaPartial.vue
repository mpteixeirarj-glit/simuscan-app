<template>
  <div class="topo-wrapper">
    <div class="center-strip">
      <div class="side-box">
        <img :src="BASE_URL + 'imagens/mesaGE.png'" alt="Posicionamento do Paciente" style="width:100%;height:100%;object-fit:contain;border-radius:6px;">
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
          <tr v-for="(row, ri) in series" :key="ri">
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
import { reactive, ref } from 'vue'
defineProps({ patient: { type: Object, default: null } })
defineEmits(['cancel', 'accept'])
defineExpose({ newSeries, deleteSeries })

const BASE_URL = import.meta.env.BASE_URL

const seriesDesc = ref('SCOUT')
const toggles = reactive({ om: false, autoStore: false, autoPacs: false, doseReport: false, doseSr: false })

const defaultRow = () => ({ scanType: 'Scout', startLoc: 'S150.00', endLoc: 'I100.00', kv: '120', ma: '10', scoutPlane: '90', voice: 'N', lights: 'N', wwwl: '400/50' })
const series = reactive([defaultRow(), defaultRow()])
series[1].scoutPlane = '0'

function newSeries() {
  const src = series[0]
  Object.assign(series[1], { ...src })
}

function deleteSeries() {
  Object.assign(series[1], { scanType: '', startLoc: '', endLoc: '', kv: '120', ma: '', scoutPlane: '90', voice: 'N', lights: 'N', wwwl: '' })
}
</script>

<style scoped>
.topo-wrapper { width: 100%; height: 100%; display: flex; flex-direction: column; gap: 2px; padding: 12px; box-sizing: border-box; overflow: auto; }
.center-strip { display: flex; align-items: stretch; gap: 24px; flex-grow: 1; margin-bottom: 2px; min-height: 180px; }
.side-box { flex: 1 1 0; border-radius: 10px; background: rgba(0,0,0,.25); outline: 1px dashed rgba(255,255,255,.3); outline-offset: -4px; padding: 10px; }
.topo-patient-data { font-size: 14px; color: #ccc; height: 100%; overflow-y: auto; }
.data-item { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,.1); }
.data-item span:first-child { font-weight: bold; }
.data-item span:last-child { color: #f39c12; font-weight: bold; }
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
