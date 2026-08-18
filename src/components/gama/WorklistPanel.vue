<template>
  <div class="worklist-panel">
    <div class="worklist-header">
      <h3>Patient Worklist</h3>
      <div class="actions">
        <button @click="refresh">Refresh</button>
        <button @click="$emit('close')">Close</button>
      </div>
    </div>
    <div class="worklist-content">
      <div class="worklist-table-container">
        <table class="worklist-table">
          <thead>
            <tr><th>Patient Name</th><th>Patient ID</th><th>Exam Description</th><th>Referring Physician</th></tr>
          </thead>
          <tbody>
            <tr
              v-for="(p, i) in patients"
              :key="i"
              :class="{ selected: selectedIndex === i }"
              @click="select(i)"
            >
              <td>{{ p.name }}</td>
              <td>{{ p.id }}</td>
              <td>{{ p.examDescription }}</td>
              <td>{{ p.referringPhysician }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="worklist-details">
        <h4>Patient Details</h4>
        <template v-if="selected">
          <p><strong>Patient Name:</strong> {{ selected.name }}</p>
          <p><strong>Patient ID:</strong> {{ selected.id }}</p>
          <p><strong>Birthdate:</strong> {{ selected.birthdate }}</p>
          <p><strong>Age:</strong> {{ selected.age }}</p>
          <p><strong>Sex:</strong> {{ selected.sex }}</p>
          <p><strong>Weight:</strong> {{ selected.weight }} kg</p>
          <p><strong>Height:</strong> {{ selected.height }} cm</p>
          <p><strong>Exam Description:</strong> {{ selected.examDescription }}</p>
          <p><strong>Referring Physician:</strong> {{ selected.referringPhysician }}</p>
          <p><strong>Radiologist:</strong> {{ selected.radiologist }}</p>
          <p><strong>Operator:</strong> {{ selected.operator }}</p>
          <p><strong>History:</strong> {{ selected.history }}</p>
          <p><strong>Protocol Number:</strong> {{ selected.protocol }}</p>
          <p><strong>Accession Number:</strong> {{ selected.accession }}</p>
          <p><strong>Req. Proc. ID:</strong> {{ selected.reqProcId }}</p>
        </template>
        <div class="worklist-actions-bottom">
          <button :disabled="!selected" @click="startExam">Start Exam</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const emit = defineEmits(['close', 'start-exam'])

const firstNames = ['João','Maria','Pedro','Ana','Carlos','Mariana','Ricardo','Camila','Felipe','Juliana','Rafael','Helena','Heitor','Arthur','Aurora','Gustav','Rebeca','Iris','Ravi']
const lastNames = ['Nascimento Silva','Silva Santos','Oliveira Machado','Souza Lima','Pereira Gomes','Ferreira Lima','Almeida da Silva','Rodrigues Gomes','Gomes Lima','Pereira Alves','Teixeira da Silva','Amaral Lopes']
const referringPhysicians = ['Dr. Rafael','Dr. Leticia','Dra. Renata','Dr. Bruno','Dra. Fernando']
const radiologist = ['Dr. Grance','Dra. Virgilio']
const operator = ['Marcos','Raquel','Oliver']
const histories = ['Dor abdominal','Trauma na cabeça','Acompanhamento pós-cirúrgico','Dores no joelho','Suspeita de fratura']
const examDescriptions = [
  { desc: 'CRANIO', protocol: '1.1 CRANIO ROTINA' },
  { desc: 'TORAX', protocol: '2.2 TORAX ROTINA' },
  { desc: 'ABDOME TOTAL', protocol: '3.1 ABD PELVE ROTINA' },
  { desc: 'JOELHO DIREITO', protocol: '4.1 JOELHOS' },
  { desc: 'OMBRO ESQUERDO', protocol: '6.1 OMBROS' }
]

const patients = ref([])
const selectedIndex = ref(-1)
const selected = computed(() => selectedIndex.value >= 0 ? patients.value[selectedIndex.value] : null)

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function generatePatient() {
  const fn = rand(firstNames), ln = rand(lastNames)
  const exam = rand(examDescriptions)
  const year = 1945 + Math.floor(Math.random() * 50)
  return {
    name: `${fn} ${ln}`,
    id: `P${Math.floor(Math.random() * 9000) + 1000}`,
    accession: `A${Math.floor(Math.random() * 900000) + 100000}`,
    reqProcId: `R${Math.floor(Math.random() * 90000) + 10000}`,
    sex: Math.random() < .5 ? 'M' : 'F',
    birthdate: `${String(Math.floor(Math.random() * 28) + 1).padStart(2,'0')}/${String(Math.floor(Math.random() * 12) + 1).padStart(2,'0')}/${year}`,
    age: new Date().getFullYear() - year,
    weight: (Math.random() * 50 + 50).toFixed(1),
    height: (Math.random() * 50 + 150).toFixed(0),
    examDescription: exam.desc,
    protocol: exam.protocol,
    referringPhysician: rand(referringPhysicians),
    radiologist: rand(radiologist),
    operator: rand(operator),
    history: rand(histories)
  }
}

function generate() {
  const n = 5 + Math.floor(Math.random() * 4)
  patients.value = Array.from({ length: n }, generatePatient)
  selectedIndex.value = -1
}

function refresh() { generate() }

function select(i) { selectedIndex.value = i }

function startExam() {
  if (!selected.value) return
  emit('start-exam', { ...selected.value })
}

onMounted(() => generate())
</script>

<style scoped>
.worklist-panel { background-color: #3b3b3b; border-radius: 8px; box-shadow: 0 0 20px rgba(0,0,0,.5); color: #e0e0e0; position: absolute; inset: 10px; padding: 15px; display: flex; flex-direction: column; }
.worklist-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,.1); }
.worklist-header h3 { margin: 0; color: #f39c12; font-size: 1.2em; }
.worklist-header .actions { display: flex; gap: 10px; }
.worklist-header button { background-color: #007bff; color: white; border: none; padding: 5px 15px; border-radius: 5px; cursor: pointer; font-size: .9em; }
.worklist-content { display: flex; flex-grow: 1; gap: 15px; margin-top: 15px; overflow: hidden; }
.worklist-table-container { flex: 2; background-color: #4a4a4a; border-radius: 6px; overflow-y: auto; }
.worklist-table { width: 100%; border-collapse: collapse; font-size: .8em; }
.worklist-table th, .worklist-table td { padding: 8px; border-bottom: 1px solid #555; text-align: left; white-space: nowrap; }
.worklist-table th { background-color: #666; color: #f39c12; position: sticky; top: 0; z-index: 1; }
.worklist-table tbody tr { cursor: pointer; transition: background-color .2s; }
.worklist-table tbody tr:hover { background-color: #5c5c5c; }
.worklist-table tbody tr.selected { background-color: #007bff; color: white; }
.worklist-details { flex: 1; background-color: #4a4a4a; border-radius: 6px; padding: 15px; overflow-y: auto; }
.worklist-details h4 { margin-top: 0; color: #f39c12; font-size: 1.1em; border-bottom: 1px solid rgba(255,255,255,.1); padding-bottom: 10px; }
.worklist-details p { margin: 5px 0; font-size: .9em; }
.worklist-details p strong { color: #c0c0c0; margin-right: 4px; }
.worklist-actions-bottom { display: flex; justify-content: flex-end; margin-top: 15px; }
.worklist-actions-bottom button { background-color: #007bff; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: .9em; }
.worklist-actions-bottom button:disabled { background-color: #555; cursor: not-allowed; color: #bbb; }
</style>
