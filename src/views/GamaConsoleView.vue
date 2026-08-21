<template>
  <div class="gama-root">
    <div id="master-container" :class="{ 'viewer-active': state.viewerMode }">
      <!-- TELA DE AQUISIÇÃO -->
      <div class="main" id="screen-acquisition">
        <div class="header" id="header-acq" style="position:relative">
          <svg class="icon" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>
          SIMULADOR DE TC : SISTEMA GAMA HEALTHCARE (MODO DE AQUISIÇÃO)
          <svg class="icon" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>
          <span class="console-version">{{ version }}</span>
          <button class="hdr-view-toggle" @click="toggleViewMode" title="Alternar para modo de Visualização">⇌ Viewer</button>
        </div>

        <div class="screen">
          <InitialPartial v-if="state.panel === 'initial'" />
          <PatientPanel
            v-else-if="state.panel === 'patient'"
            :prefill="state.prefill"
            @cancel="state.panel = 'initial'"
            @ok="onPatientOk"
          />
          <WorklistPanel
            v-else-if="state.panel === 'worklist'"
            @close="state.panel = 'initial'"
            @start-exam="onStartFromWorklist"
          />
          <TopogramaPartial
            v-else-if="state.panel === 'topograma'"
            ref="topoRef"
            :patient="state.currentPatient"
            @cancel="state.panel = 'initial'"
            @accept="state.panel = 'protocolo_scout'"
          />
          <ProtocoloScoutPartial v-else-if="state.panel === 'protocolo_scout'" @back="state.panel = 'initial'" />
          <DataScreenPartial v-else-if="state.panel === 'data_screen'" @back="state.panel = 'initial'" />
          <ReconManagerPartial v-else-if="state.panel === 'recon_manager'" @back="state.panel = 'initial'" />
          <RetroReconList v-else-if="state.panel === 'retro_recon'" @back="state.panel = 'initial'" @openViewer="state.panel = 'retro_recon_viewer'" />
          <RetroReconViewer v-else-if="state.panel === 'retro_recon_viewer'" @back="state.panel = 'retro_recon'" @quit="state.panel = 'initial'" />
          <CalibracaoDiariaPartial v-else-if="state.panel === 'calibracao_diaria'" @back="state.panel = 'initial'" />
          <ScannerUtilPartial v-else-if="state.panel === 'scanner_util'" @back="state.panel = 'initial'" />
        </div>

        <!-- BARRA PRINCIPAL -->
        <div class="bottom-bar" v-if="!isTopoBar">
          <button @click="state.panel = 'patient'; state.prefill = null" data-tooltip="Inicia cadastro do paciente.">Examination</button>
          <button @click="state.panel = 'worklist'" data-tooltip="Visualiza a lista de agendamentos.">Patient Schedule</button>
          <button @click="router.push({ name: 'protocolos' })" data-tooltip="Gerencia protocolos de aquisição.">Protocol Manager</button>
          <button @click="state.panel = 'data_screen'" data-tooltip="Analisa as imagens.">Data Screen</button>
          <button @click="state.panel = 'retro_recon'" id="btn-recon-manager" data-tooltip="Acessa a lista de exames para reconstrução retroativa.">Retro Recon</button>
          <button @click="state.panel = 'calibracao_diaria'" data-tooltip="Realiza calibração diária.">Daily Prep</button>
          <button @click="state.panel = 'scanner_util'" data-tooltip="Acessa utilitários.">Scanner Util</button>
          <button @click="router.push({ name: 'escolha' })" data-tooltip="Retorna à escolha de Sistemas.">Return System</button>
        </div>

        <!-- BARRA TOPOGRAMA -->
        <div class="bottom-bar" id="bottom-bar-topogram" v-else role="toolbar">
          <div class="group-left">
            <button class="btn-cancel" @click="state.panel = 'initial'" data-tooltip="Cancelar e voltar à tela inicial.">Cancel</button>
          </div>
          <div class="group-center">
            <button class="btn-disabled" data-tooltip="Ir para a série anterior (desativado).">Prior Series</button>
            <button data-tooltip="Ir para a próxima série.">Next Series</button>
            <button @click="topoNewSeries" data-tooltip="Cria uma nova série baseada na primeira.">Create New Series</button>
            <button @click="topoRepeatSeries" data-tooltip="Repete os dados da primeira série na segunda.">Repeat Series</button>
            <button @click="topoDeleteSeries" data-tooltip="Remove a última série.">Delete Series</button>
            <button class="toggle-btn" :class="{ active: topoAutoTransfer }" @click="topoAutoTransfer = !topoAutoTransfer" data-tooltip="Ativa/Desativa a transferência automática.">Series Auto Transfer</button>
          </div>
          <div class="group-right">
            <button class="btn-accept" @click="state.panel = 'protocolo_scout'" data-tooltip="Confirma a configuração das séries.">Accept</button>
          </div>
        </div>
      </div>

      <!-- TELA DE VISUALIZAÇÃO -->
      <div class="main" id="screen-viewer">
        <div class="header" style="background-color: #005f9e; position: relative;">
          <svg class="icon" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>
          SIMULADOR DE TC : SISTEMA GAMA HEALTHCARE (MODO DE VISUALIZAÇÃO)
          <svg class="icon" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>
          <button class="hdr-view-toggle" @click="toggleViewMode" title="Voltar ao modo de Aquisição">⇌ Aquisição</button>
        </div>
        <div class="screen">
          <h1 style="color:white;text-align:center;margin:auto;">Área de Visualização e Edição de Exames</h1>
        </div>
        <div class="bottom-bar"></div>
      </div>
    </div>

    <audio ref="sndIn" :src="BASE_URL + 'sons/swoosh_in.mp3'" preload="auto"></audio>
    <audio ref="sndOut" :src="BASE_URL + 'sons/swoosh_out.mp3'" preload="auto"></audio>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { APP_VERSION } from '@/version.js'
import InitialPartial from '@/components/gama/partials/InitialPartial.vue'
import PatientPanel from '@/components/gama/PatientPanel.vue'
import WorklistPanel from '@/components/gama/WorklistPanel.vue'
import TopogramaPartial from '@/components/gama/partials/TopogramaPartial.vue'
import ProtocoloScoutPartial from '@/components/gama/partials/ProtocoloScoutPartial.vue'
import DataScreenPartial from '@/components/gama/partials/DataScreenPartial.vue'
import ReconManagerPartial from '@/components/gama/partials/ReconManagerPartial.vue'
import CalibracaoDiariaPartial from '@/components/gama/partials/CalibracaoDiariaPartial.vue'
import ScannerUtilPartial from '@/components/gama/partials/ScannerUtilPartial.vue'
import RetroReconList from '@/components/gama/partials/RetroReconList.vue'
import RetroReconViewer from '@/components/gama/partials/RetroReconViewer.vue'

const router = useRouter()
const BASE_URL = import.meta.env.BASE_URL
const version = APP_VERSION

const state = reactive({
  panel: 'initial',
  currentPatient: null,
  prefill: null,
  viewerMode: false
})

const topoAutoTransfer = ref(false)
const sndIn = ref(null)
const sndOut = ref(null)

const isTopoBar = computed(() => ['topograma', 'protocolo_scout'].includes(state.panel))

function toggleViewMode() {
  if (state.viewerMode) sndOut.value?.play()
  else sndIn.value?.play()
  state.viewerMode = !state.viewerMode
}

function onPatientOk(patientData) {
  state.currentPatient = patientData
  state.panel = 'topograma'
}

function onStartFromWorklist(patientData) {
  state.prefill = patientData
  state.panel = 'patient'
}

// Topogram series manipulation — delegated to TopogramaPartial via a provide/inject or ref
// The topogram component handles its own internal series state
const topoRef = ref(null)
function topoNewSeries() { topoRef.value?.createNewSeries() }
function topoRepeatSeries() { topoRef.value?.repeatSeries() }
function topoDeleteSeries() { topoRef.value?.deleteSeries() }
</script>

<style>
/* Estilos globais do simulador Gama */
.gama-root { margin: 0; padding: 0; overflow: hidden; height: 100vh; }
body:has(.gama-root) { margin: 0; font-family: Arial, sans-serif; background-color: #f0f0f0; height: 100vh; overflow: hidden; }

#master-container { width: 200%; height: 100vh; display: flex; transform: translateX(0); transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1); }
#master-container.viewer-active { transform: translateX(-50%); }
.main { width: 50%; height: 100%; flex-shrink: 0; display: flex; flex-direction: column; background: #003366; }
.header { background: #cc0000; color: white; text-align: center; padding: 0.5rem; font-weight: bold; font-size: 16px; display: flex; justify-content: center; align-items: center; gap: 5px; }
.header .icon { width: 15px; height: 15px; fill: #87CEEB; }
.screen { flex-grow: 1; background: linear-gradient(to bottom right, #0b2c5d, #1c4e8c); border: 1px solid #000; margin: 1rem; position: relative; display: flex; overflow: hidden; }
#screen-viewer .screen { justify-content: center; align-items: center; }

.bottom-bar { display: flex; flex-wrap: wrap; justify-content: center; gap: .8rem; background: #003366; padding: .8rem; }
.bottom-bar button { background: #ffffff10; color: white; border: 1px solid #ccc; padding: .7rem 1.2rem; border-radius: 5px; font-size: 13px; cursor: pointer; width: 150px; height: 50px; position: relative; transition: background .3s ease; display: flex; align-items: center; justify-content: center; }
.bottom-bar button:hover { background: #ffffff30; }
.bottom-bar button::after { content: attr(data-tooltip); position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%) translateY(-5px); background-color: #333; color: #fff; padding: 6px 10px; border-radius: 4px; border: 1px solid #555; font-size: 13px; white-space: nowrap; z-index: 20; opacity: 0; pointer-events: none; transition: opacity .2s ease, transform .2s ease; }
.bottom-bar button:hover::after { opacity: 1; transform: translateX(-50%) translateY(-10px); }

.btn-disabled { background: #555 !important; color: #999 !important; cursor: not-allowed !important; border-color: #777 !important; }
.btn-disabled:hover { background: #555 !important; }

#bottom-bar-topogram { margin: 0 12px 12px; border-radius: 6px; border-top: 1px solid rgba(255,255,255,.08); justify-content: space-between; }
.group-left, .group-center, .group-right { display: flex; gap: 10px; }
#bottom-bar-topogram button { min-width: 140px; height: 44px; border-radius: 8px; }
.btn-cancel { background: #dc3545; border-color: #b73a47; }
.btn-cancel:hover { background: #c82333; }
.btn-accept { background: #f39c12; border-color: #c5860e; }
.btn-accept:hover { background: #e08e0b; }

.hdr-view-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.35); color: white; padding: 4px 12px; border-radius: 5px; font-size: 12px; font-weight: bold; cursor: pointer; transition: background .2s; }
.hdr-view-toggle:hover { background: rgba(255,255,255,.3); }

.toggle-btn { background: rgba(0,0,0,.25) !important; border: 1px solid rgba(255,255,255,.2) !important; }
.toggle-btn.active { background-color: #f39c12 !important; color: #000 !important; border-color: #f39c12 !important; }

.console-version { position: absolute; right: 12px; bottom: 4px; font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1px; }
</style>
