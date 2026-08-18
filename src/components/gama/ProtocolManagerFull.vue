<template>
  <div class="pm-page">
    <div class="pm-header">
      <svg class="icon" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>
      SIMULADOR DE TC : SISTEMA GAMA HEALTHCARE — GERENCIADOR DE PROTOCOLOS
      <svg class="icon" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>
    </div>

    <div class="pm-body">
      <!-- LISTA LATERAL -->
      <div class="pm-side">
        <div class="pm-tabs">
          <button v-for="tab in ['gama','user','service']" :key="tab" :class="{ active: activeTab === tab }" @click="setTab(tab)">
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
          </button>
        </div>
        <div class="pm-list-wrap">
          <ul class="pm-list">
            <li v-for="p in visibleProtocols" :key="p" :class="{ selected: selectedProtocol === p }" @click="select(p)">
              {{ p }}
            </li>
          </ul>
        </div>
      </div>

      <!-- DETALHES -->
      <div class="pm-main">
        <h3>Detalhes do Protocolo</h3>
        <div v-if="!selectedProtocol" class="pm-empty">
          Selecione um protocolo na lista para ver os detalhes.
        </div>
        <div v-else class="pm-detail">
          <div class="pm-detail-header">
            <h4>{{ selectedProtocol }}</h4>
            <p class="pm-detail-sub">Sistema: Gama Healthcare — Série: Rotina de Aquisição</p>
          </div>

          <div class="pm-params">
            <table class="param-table">
              <thead><tr><th>Parâmetro</th><th>Valor</th></tr></thead>
              <tbody>
                <tr><td>kV</td><td><select v-model="params.kv"><option>80</option><option>100</option><option>110</option><option>120</option><option>140</option></select></td></tr>
                <tr><td>mA</td><td><input type="text" v-model="params.ma"></td></tr>
                <tr><td>FOV (mm)</td><td><input type="text" v-model="params.fov"></td></tr>
                <tr><td>Pitch</td><td><input type="text" v-model="params.pitch"></td></tr>
                <tr><td>Rotação (s)</td><td><select v-model="params.rotation"><option>0.5</option><option>0.75</option><option>1.0</option><option>1.5</option></select></td></tr>
                <tr><td>Espessura (mm)</td><td><input type="text" v-model="params.thickness"></td></tr>
                <tr><td>Intervalo (mm)</td><td><input type="text" v-model="params.interval"></td></tr>
                <tr><td>Filtro</td><td><select v-model="params.filter"><option>STANDARD</option><option>BONE</option><option>LUNG</option><option>BRAIN</option></select></td></tr>
                <tr><td>WW</td><td><input type="text" v-model="params.ww"></td></tr>
                <tr><td>WL</td><td><input type="text" v-model="params.wl"></td></tr>
              </tbody>
            </table>
          </div>

          <div class="pm-patient-pos">
            <h5>Posicionamento do Paciente</h5>
            <div class="pos-row">
              <img :src="BASE_URL + 'imagens/ffsupine.jpg.png'" alt="FF Supine" class="pos-img" :class="{ selected: params.position === 'ffsupine' }" @click="params.position = 'ffsupine'">
              <img :src="BASE_URL + 'imagens/hfsupine.png'" alt="HF Supine" class="pos-img" :class="{ selected: params.position === 'hfsupine' }" @click="params.position = 'hfsupine'">
              <img :src="BASE_URL + 'imagens/hfprone.jpg.png'" alt="HF Prone" class="pos-img" :class="{ selected: params.position === 'hfprone' }" @click="params.position = 'hfprone'">
              <img :src="BASE_URL + 'imagens/hfRight.png'" alt="HF Right" class="pos-img" :class="{ selected: params.position === 'hfright' }" @click="params.position = 'hfright'">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BOTÕES -->
    <div class="pm-footer">
      <button @click="novoProtocolo">Novo</button>
      <button :disabled="!selectedProtocol" @click="editarProtocolo">Editar</button>
      <button class="btn-delete" :disabled="!selectedProtocol" @click="excluirProtocolo">Excluir</button>
      <button class="cancel" @click="router.push({ name: 'gama' })">Fechar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const BASE_URL = import.meta.env.BASE_URL

const allProtocols = {
  cranio:  ['1.1 CRANIO ROTINA','1.2 SEIOS DA FACE / FACE','1.3 ORBITAS','1.4 MASTOIDES','1.5 ATM','1.6 HIPOFISE'],
  torax:   ['2.1 COL CERVICAL','2.2 TORAX ROTINA','2.3 TORAX TRAUMA','2.4 COL DORSAL','2.5 ANGIO TEP','2.6 ANGIO AORTA TOTAL'],
  abd_plv: ['3.1 ABD PELVE ROTINA','3.2 ABD PELVE TRIFASICO','3.3 COL LOMBAR','3.4 PELVE/BACIA/QUADRIL','3.5 TC TX ABD PELVE C/C'],
  joelhos: ['4.1 JOELHOS','4.2 TAGT','4.3 COXA','4.4 PERNAS','4.5 MMII'],
  pes:     ['5.1 TORNOZELO','5.2 PÉ'],
  ombros:  ['6.1 OMBROS','6.2 BRAÇO','6.3 COTOVELOS','6.4 ANTEBRAÇO','6.5 MÃOS E PUNHOS'],
  service: ['DAILY CALIBRATION','TUBE WARMUP','SYSTEM DIAGNOSTICS']
}

const userProtocols = ref(['MEUS PROTOCOLOS (VAZIO)'])

const activeTab = ref('gama')
const selectedProtocol = ref('')
const params = reactive({ kv: '120', ma: '200', fov: '500', pitch: '0.984', rotation: '0.5', thickness: '5', interval: '5', filter: 'STANDARD', ww: '400', wl: '40', position: 'ffsupine' })

const visibleProtocols = computed(() => {
  if (activeTab.value === 'gama') return Object.entries(allProtocols).filter(([k]) => k !== 'service').flatMap(([,v]) => v)
  if (activeTab.value === 'user') return userProtocols.value
  return allProtocols.service
})

function setTab(tab) { activeTab.value = tab; selectedProtocol.value = '' }
function select(p) { selectedProtocol.value = p }
function novoProtocolo() { alert('Funcionalidade em desenvolvimento') }
function editarProtocolo() { alert('Funcionalidade em desenvolvimento') }
function excluirProtocolo() { if (confirm('Excluir este protocolo?')) selectedProtocol.value = '' }
</script>

<style>
/* Estilos globais do Protocol Manager */
.pm-page {
  min-height: 100vh;
  display: flex; flex-direction: column;
  background: #003366; color: #e0e0e0;
  font-family: Arial, sans-serif;
}
.pm-header { background: #cc0000; color: white; text-align: center; padding: .5rem; font-weight: bold; font-size: 16px; display: flex; justify-content: center; align-items: center; gap: 5px; }
.pm-header .icon { width: 15px; height: 15px; fill: #87CEEB; }
.pm-body { display: flex; flex: 1; gap: 20px; padding: 20px; overflow: hidden; }
.pm-side { width: 220px; flex-shrink: 0; display: flex; flex-direction: column; gap: 15px; }
.pm-tabs { display: flex; gap: 5px; }
.pm-tabs button { flex-grow: 1; padding: 8px; background-color: #4a4a4a; color: #fff; border: 1px solid #666; border-radius: 5px; cursor: pointer; }
.pm-tabs button.active { background-color: #f39c12; color: #000; }
.pm-list-wrap { flex-grow: 1; background-color: #1c1c1c; border: 1px solid #444; border-radius: 5px; padding: 5px; overflow-y: auto; }
.pm-list { list-style: none; padding: 0; margin: 0; }
.pm-list li { padding: 10px; border-bottom: 1px solid #333; cursor: pointer; font-size: .9em; }
.pm-list li:hover { background-color: #3f3f3f; }
.pm-list li.selected { background-color: #007bff; color: white; }
.pm-main { flex-grow: 1; display: flex; flex-direction: column; background: #0b2c5d; border-radius: 8px; padding: 20px; overflow-y: auto; }
.pm-main h3 { text-align: center; color: #f39c12; margin: 0 0 15px; }
.pm-empty { color: #888; text-align: center; margin-top: 2rem; }
.pm-detail-header h4 { color: #f39c12; font-size: 1.2em; margin: 0 0 5px; }
.pm-detail-sub { font-size: .85em; color: #999; margin-bottom: 20px; }
.param-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
.param-table th, .param-table td { padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,.1); font-size: .9em; }
.param-table th { color: #f39c12; text-align: left; }
.param-table td:nth-child(2) { width: 180px; }
.param-table input, .param-table select { background: #2e2e2e; border: 1px solid #555; color: #fff; padding: 4px 8px; border-radius: 4px; width: 100%; }
.pm-patient-pos h5 { color: #f39c12; margin-bottom: 10px; }
.pos-row { display: flex; gap: 15px; flex-wrap: wrap; }
.pos-img { height: 80px; width: auto; cursor: pointer; border-radius: 6px; border: 2px solid transparent; opacity: .6; transition: opacity .2s, border-color .2s; }
.pos-img:hover { opacity: .85; }
.pos-img.selected { border-color: #f39c12; opacity: 1; }
.pm-footer { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; padding: 15px; background: #003366; border-top: 1px solid rgba(255,255,255,.1); }
.pm-footer button { padding: 8px 20px; border-radius: 5px; border: 1px solid #666; background-color: #4a4a4a; color: #fff; cursor: pointer; font-size: .95em; }
.pm-footer button:hover:not(:disabled) { background-color: #5f5f5f; }
.pm-footer button:disabled { background-color: #3a3a3a; color: #777; cursor: not-allowed; }
.pm-footer .btn-delete { background-color: #dc3545; border-color: #c82333; }
.pm-footer .cancel { background-color: #666; }
</style>
