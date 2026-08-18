<template>
  <div class="patient-panel">
    <div class="panel-sections-container">

      <!-- COLUNA ESQUERDA: Patient Information -->
      <div class="panel-section patient-info">
        <h3>Patient Information</h3>
        <div class="form-group">
          <label>Exam Number:</label>
          <input type="text" :value="form.examNumber" readonly>
        </div>
        <div class="form-group">
          <label>Accession Number:</label>
          <input type="text" v-model="form.accession" @input="validate">
          <span class="tooltip-error" v-if="errors.accession">Apenas números</span>
        </div>
        <div class="form-group">
          <label>Patient ID:</label>
          <input type="text" v-model="form.patientId" @input="validate">
        </div>
        <div class="form-group">
          <label>Patient Name:</label>
          <input type="text" v-model="form.name" @input="validate">
        </div>
        <div class="form-group">
          <label>Birthdate:</label>
          <div class="date-inputs">
            <input type="text" placeholder="Dia" maxlength="2" v-model="form.birthdateDay" @input="onBirthdateChange">
            <input type="text" placeholder="Mês" maxlength="2" v-model="form.birthdateMonth" @input="onBirthdateChange">
            <input type="text" placeholder="Ano" maxlength="4" v-model="form.birthdateYear" @input="onBirthdateChange">
          </div>
        </div>
        <div class="form-row">
          <label>Sex:</label>
          <input type="text" style="max-width:40px" maxlength="1" v-model="form.sex" @input="onSexInput">
          <label>Age:</label>
          <input type="text" :value="form.age" readonly>
          <label class="unit-label">Years</label>
        </div>
        <div class="form-row">
          <label>Weight:</label>
          <input type="text" maxlength="3" v-model="form.weight" @input="validate">
          <label class="unit-label">Kg</label>
          <label>Height:</label>
          <input type="text" maxlength="3" v-model="form.height" @input="validate">
          <label class="unit-label">cm</label>
        </div>
        <div class="form-group"><label>Referring Physician:</label><input type="text" v-model="form.physician" @input="validate"></div>
        <div class="form-group"><label>Radiologist:</label><input type="text" v-model="form.radiologist" @input="validate"></div>
        <div class="form-group"><label>Operator:</label><input type="text" v-model="form.operator" @input="validate"></div>
        <div class="form-group"><label>History:</label><input type="text" v-model="form.history" @input="validate"></div>
        <div class="form-group"><label>Exam Description:</label><input type="text" v-model="form.examDescription" @input="onExamDescInput"></div>
        <div class="form-group">
          <label>Protocol Number:</label>
          <input type="text" :value="selectedProtocol" readonly>
        </div>
        <div class="form-group"><label>Req. Proc. ID:</label><input type="text" v-model="form.reqProcId" @input="validate"></div>
        <button class="btn-end" @click="$emit('cancel')">End Exam</button>
      </div>

      <!-- COLUNA DIREITA: Protocol Selection -->
      <div class="panel-section protocol-selection">
        <div class="protocol-tabs">
          <span class="protocol-title">Protocol Selection</span>
          <button v-for="tab in ['gama','user','service']" :key="tab" :class="{ active: activeTab === tab }" @click="setTab(tab)">{{ tab.charAt(0).toUpperCase() + tab.slice(1) }}</button>
          <button :class="{ active: activeTab === 'recent' }" @click="setTab('recent')">Most Recent</button>
        </div>
        <div class="protocol-content-area">
          <div class="human-body-diagram">
            <div class="image-control-buttons">
              <button :class="{ active: bodyImg === 'esqueleto' }" @click="bodyImg = 'esqueleto'">Esqueleto</button>
              <button :class="{ active: bodyImg === 'marcacao' }" @click="bodyImg = 'marcacao'">Marcação</button>
            </div>
            <img
              :src="bodyImg === 'esqueleto' ? BASE_URL + 'imagens/esqueleto-simples.png' : BASE_URL + 'imagens/marcacaoesesqueleto.png'"
              alt="Diagrama do Corpo Humano"
              usemap="#skeletonmap"
              style="width:150px;height:auto;"
            >
            <map name="skeletonmap">
              <area shape="rect" coords="60,3,94,44"    href="#" data-area="cranio"  alt="Crânio"       @click.prevent="filterByArea('cranio')">
              <area shape="rect" coords="59,76,97,127"  href="#" data-area="torax"   alt="Tórax"        @click.prevent="filterByArea('torax')">
              <area shape="rect" coords="53,141,98,194" href="#" data-area="abd_plv" alt="Abdômen/Pelve" @click.prevent="filterByArea('abd_plv')">
              <area shape="rect" coords="50,272,101,305" href="#" data-area="joelhos" alt="Joelhos"     @click.prevent="filterByArea('joelhos')">
              <area shape="rect" coords="40,358,114,389" href="#" data-area="pes"    alt="Pés"          @click.prevent="filterByArea('pes')">
              <area shape="rect" coords="127,64,147,177" href="#" data-area="ombros" alt="Ombros"       @click.prevent="filterByArea('ombros')">
              <area shape="rect" coords="0,64,20,177"   href="#" data-area="ombros" alt="Ombros"        @click.prevent="filterByArea('ombros')">
            </map>
          </div>
          <div class="protocol-list">
            <ul>
              <li v-for="p in visibleProtocols" :key="p" :class="{ selected: selectedProtocol === p }" @click="selectProtocol(p)">{{ p }}</li>
              <li v-if="visibleProtocols.length === 0" style="text-align:center;color:#888;">Nenhum protocolo.</li>
            </ul>
          </div>
        </div>
        <div class="panel-buttons">
          <button class="cancel" @click="$emit('cancel')">Cancel</button>
          <button :disabled="!isValid" @click="handleOk">OK</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'

const props = defineProps({ prefill: { type: Object, default: null } })
const emit = defineEmits(['cancel', 'ok'])

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

const allFlat = computed(() => Object.entries(allProtocols).filter(([k]) => k !== 'service').flatMap(([,v]) => v))

const activeTab = ref('recent')
const bodyImg = ref('esqueleto')
const selectedProtocol = ref('')
const errors = reactive({})

const form = reactive({
  examNumber: String(Math.floor(1000 + Math.random() * 9000)),
  accession: '', patientId: '', name: '',
  birthdateDay: '', birthdateMonth: '', birthdateYear: '',
  age: '', sex: '',
  weight: '', height: '',
  physician: '', radiologist: '', operator: '',
  history: '', examDescription: '', reqProcId: ''
})

onMounted(() => {
  if (props.prefill) {
    const p = props.prefill
    form.accession = p.accession || ''
    form.patientId = p.id || ''
    form.name = p.name || ''
    const [d, m, y] = (p.birthdate || '').split('/')
    form.birthdateDay = d || ''; form.birthdateMonth = m || ''; form.birthdateYear = y || ''
    form.age = String(p.age || '')
    form.sex = p.sex || ''
    form.weight = String(p.weight || '')
    form.height = String(p.height || '')
    form.physician = p.referringPhysician || ''
    form.radiologist = p.radiologist || ''
    form.operator = p.operator || ''
    form.history = p.history || ''
    form.examDescription = p.examDescription || ''
    form.reqProcId = p.reqProcId || ''
    selectedProtocol.value = p.protocol || ''
    form.examNumber = String(Math.floor(1000 + Math.random() * 9000))
  }
  validate()
})

const visibleProtocols = computed(() => {
  if (activeTab.value === 'gama') return allFlat.value
  if (activeTab.value === 'service') return allProtocols.service
  return allFlat.value
})

function setTab(tab) {
  activeTab.value = tab
  selectedProtocol.value = ''
  validate()
}

function filterByArea(area) {
  activeTab.value = 'gama'
  const protos = allProtocols[area] || []
  if (protos.length > 0) selectProtocol(protos[0])
}

function selectProtocol(p) {
  selectedProtocol.value = p
  validate()
}

function onBirthdateChange() {
  const { birthdateDay: d, birthdateMonth: m, birthdateYear: y } = form
  if (d && m && y && y.length === 4) {
    const birth = new Date(Number(y), Number(m) - 1, Number(d))
    const now = new Date()
    let age = now.getFullYear() - birth.getFullYear()
    if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) age--
    form.age = String(age)
  } else {
    form.age = ''
  }
  validate()
}

function onSexInput() {
  form.sex = form.sex.toUpperCase().replace(/[^MF]/g, '')
  validate()
}

function onExamDescInput() {
  validate()
}

function validate() {
  const required = ['accession','patientId','name','birthdateDay','birthdateMonth','birthdateYear','sex','weight','height','physician','radiologist','operator','history','examDescription','reqProcId']
  const allFilled = required.every(k => String(form[k] || '').trim() !== '')
  isValidInner.value = allFilled && !!selectedProtocol.value
}

const isValidInner = ref(false)
const isValid = computed(() => isValidInner.value)

function handleOk() {
  if (!isValid.value) return
  emit('ok', {
    examNumber: form.examNumber,
    name: form.name,
    id: form.patientId,
    birthdate: `${form.birthdateDay}/${form.birthdateMonth}/${form.birthdateYear}`,
    age: form.age,
    sex: form.sex,
    physician: form.physician,
    protocol: selectedProtocol.value
  })
}
</script>

<style scoped>
.patient-panel { background-color: #3b3b3b; border-radius: 8px; box-shadow: 0 0 20px rgba(0,0,0,.5); color: #e0e0e0; position: absolute; inset: 10px; padding: 15px; display: flex; flex-direction: column; }
.panel-sections-container { display: flex; flex-grow: 1; gap: 15px; overflow: hidden; }
.panel-section { flex: 1; padding: 15px; background-color: #4a4a4a; border-radius: 6px; display: flex; flex-direction: column; gap: 10px; box-shadow: inset 0 0 5px rgba(0,0,0,.2); overflow-y: auto; }
.panel-section h3 { color: #f39c12; margin: 0 0 10px; text-align: center; font-size: 1.2em; padding-bottom: 5px; border-bottom: 1px solid rgba(255,255,255,.1); }
.form-group { display: flex; align-items: center; margin-bottom: 5px; flex-wrap: wrap; position: relative; }
.form-row { display: flex; align-items: center; gap: 10px; margin-bottom: 5px; }
.form-group label, .form-row label { font-size: .9em; color: #c0c0c0; }
.form-group label { flex-basis: 140px; padding-right: 10px; white-space: nowrap; text-align: right; }
.form-row label { padding-right: 5px; }
.form-group input, .form-row input, .date-inputs input { padding: 4px 8px; border: 1px solid #666; background-color: #2e2e2e; color: #fff; border-radius: 4px; font-size: .9em; }
.form-group input { flex-grow: 1; min-width: 80px; }
.form-row input { flex-grow: 1; max-width: 70px; }
.form-group input[readonly] { background-color: #3b3b3b; color: #888; cursor: not-allowed; }
.date-inputs { display: flex; gap: 5px; flex-grow: 1; }
.date-inputs input { flex-grow: 1; max-width: 54px; }
.unit-label { flex-basis: 30px !important; }
.tooltip-error { font-size: .75em; color: #e74c3c; margin-left: 5px; }

.btn-end { align-self: flex-start; margin-top: 10px; background-color: #007bff; color: white; padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; }

/* Protocol side */
.protocol-selection { flex: 1; display: flex; flex-direction: column; align-items: flex-start; }
.protocol-tabs { display: flex; align-items: center; width: 100%; margin-bottom: 10px; gap: 10px; }
.protocol-title { color: #f39c12; font-size: 1.1em; font-weight: bold; margin-right: 5px; }
.protocol-tabs button { background-color: #666; color: white; border: 1px solid #888; padding: 5px 10px; cursor: pointer; font-size: .8em; border-radius: 5px; }
.protocol-tabs button.active { background-color: #f39c12; color: #2e2e2e; border-color: #f39c12; }
.protocol-content-area { display: flex; flex-grow: 1; width: 100%; gap: 15px; align-items: flex-start; padding-top: 5px; }
.human-body-diagram { width: 150px; flex-shrink: 0; align-self: flex-start; }
.human-body-diagram img { max-width: 100%; display: block; }
.image-control-buttons { display: flex; gap: 5px; margin-bottom: 10px; }
.image-control-buttons button { background-color: #666; color: white; border: 1px solid #888; padding: 3px 8px; cursor: pointer; font-size: .7em; border-radius: 3px; }
.image-control-buttons button.active { background-color: #f39c12; color: #2e2e2e; }
.protocol-list { flex-grow: 1; max-height: 100%; overflow-y: auto; border: 1px solid #666; border-radius: 5px; background-color: #2e2e2e; }
.protocol-list ul { list-style: none; padding: 0; margin: 0; }
.protocol-list li { padding: 8px 10px; border-bottom: 1px solid #3b3b3b; font-size: .9em; cursor: pointer; transition: background-color .2s; text-align: right; }
.protocol-list li:hover { background-color: #5c5c5c; }
.protocol-list li.selected { background-color: #007bff; color: white; }
.panel-buttons { display: flex; justify-content: flex-end; gap: 15px; margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,.1); }
.panel-buttons button { background-color: #007bff; color: white; padding: 8px 15px; border: none; border-radius: 5px; cursor: pointer; font-size: .9em; }
.panel-buttons button.cancel { background-color: #dc3545; }
.panel-buttons button:disabled { background-color: #555; cursor: not-allowed; color: #bbb; }
</style>
