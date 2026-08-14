<template>
  <div class="gama-root">
    <div id="screen-toggle-switch" title="Mudar para modo de Visualização/Edição">
      <div class="knob"></div>
    </div>

    <div id="master-container">
      <!-- TELA DE AQUISIÇÃO -->
      <div class="main" id="screen-acquisition">
        <div class="header">
          <svg class="icon" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>
          SIMULADOR DE TC : SISTEMA GAMA HEALTHCARE (MODO DE AQUISIÇÃO)
          <svg class="icon" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>
        </div>

        <div class="screen" id="main-screen">
          <!-- PAINEL PACIENTE/PROTOCOLO -->
          <div id="patientProtocolPanel" style="display: none;">
            <div class="panel-sections-container">
              <div class="panel-section patient-info">
                <h3 data-tooltip="Informações do Paciente">Patient Information</h3>
                <div class="form-group"><label for="examNumberInput" data-tooltip="Número do Exame.">Exam Number:</label><input type="text" id="examNumberInput" readonly></div>
                <div class="form-group"><label for="accessionNumberInput" data-tooltip="Número de Acesso.">Accession Number:</label><input type="text" id="accessionNumberInput" data-input-type="number" class="validate-input"><span class="tooltip-error"></span></div>
                <div class="form-group"><label for="patientIdInput" data-tooltip="ID do Paciente.">Patient ID:</label><input type="text" id="patientIdInput" data-input-type="number" class="validate-input"><span class="tooltip-error"></span></div>
                <div class="form-group"><label for="patientNameInput" data-tooltip="Nome do paciente.">Patient Name:</label><input type="text" id="patientNameInput" data-input-type="text" class="validate-input"><span class="tooltip-error"></span></div>
                <div class="form-group"><label data-tooltip="Data de nascimento.">Birthdate:</label><div class="date-inputs"><input type="text" placeholder="Dia" id="birthdate-day" data-input-type="number" class="validate-input" data-max-length="2"><input type="text" placeholder="Mês" id="birthdate-month" data-input-type="number" class="validate-input" data-max-length="2"><input type="text" placeholder="Ano" id="birthdate-year" data-input-type="number" class="validate-input" data-max-length="4"></div></div>
                <div class="form-row"><label for="sexInput" data-tooltip="Sexo (M ou F)">Sex:</label><input type="text" style="max-width: 40px;" id="sexInput" data-input-type="sex" class="validate-input" maxlength="1"><label for="patient-age" data-tooltip="Idade.">Age:</label><input type="text" id="patient-age" readonly><label class="unit-label">Years</label></div>
                <div class="form-row"><label for="weightInput" data-tooltip="Peso.">Weight:</label><input type="text" id="weightInput" data-input-type="number" class="validate-input" data-max-length="3"><label class="unit-label">Kg</label><label for="heightInput" data-tooltip="Altura.">Height:</label><input type="text" id="heightInput" data-input-type="number" class="validate-input" data-max-length="3"><label class="unit-label">cm</label></div>
                <div class="form-group"><label for="referringPhysicianInput" data-tooltip="Médico solicitante.">Referring Physician:</label><input type="text" id="referringPhysicianInput" data-input-type="text" class="validate-input"><span class="tooltip-error"></span></div>
                <div class="form-group"><label for="radiologistInput" data-tooltip="Radiologista.">Radiologist:</label><input type="text" id="radiologistInput" data-input-type="text" class="validate-input"><span class="tooltip-error"></span></div>
                <div class="form-group"><label for="operatorInput" data-tooltip="Operador.">Operator:</label><input type="text" id="operatorInput" data-input-type="text" class="validate-input"><span class="tooltip-error"></span></div>
                <div class="form-group"><label for="historyInput" data-tooltip="Histórico.">History:</label><input type="text" id="historyInput" data-input-type="text" class="validate-input"><span class="tooltip-error"></span></div>
                <div class="form-group"><label for="examDescriptionInput" data-tooltip="Descrição do exame.">Exam Description:</label><input type="text" id="examDescriptionInput" data-input-type="text" class="validate-input"><span class="tooltip-error"></span></div>
                <div class="form-group"><label for="protocolNumberInput" data-tooltip="Protocolo selecionado.">Protocol Number:</label><input type="text" id="protocolNumberInput" readonly></div>
                <div class="form-group"><label for="reqProcIdInput" data-tooltip="ID do Procedimento.">Req. Proc. ID:</label><input type="text" id="reqProcIdInput" data-input-type="number" class="validate-input"><span class="tooltip-error"></span></div>
                <button id="btn-end-exam" style="align-self: flex-start; margin-top: 15px; background-color: #007bff; color: white; padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer;">End Exam</button>
              </div>
              <div class="panel-section protocol-selection">
                <div class="protocol-tabs"><span class="protocol-title" data-tooltip="Seleção de Protocolo">Protocol Selection</span><button data-area="gama">Gama</button><button data-area="user">User</button><button data-area="service">Service</button><button data-area="recent" class="active">Most Recent</button></div>
                <div class="protocol-content-area">
                  <div class="human-body-diagram">
                    <div class="image-control-buttons"><button id="showSkeletonBtn" class="active">Esqueleto</button><button id="showMarkedSkeletonBtn">Marcação</button></div>
                    <img id="bodyImage" :src="BASE_URL + 'imagens/esqueleto-simples.png'" alt="Diagrama do Corpo Humano" usemap="#skeletonmap" style="width: 150px; height: auto;">
                    <map name="skeletonmap">
                      <area shape="rect" coords="60, 3, 94, 44" href="#" data-area="cranio" alt="Crânio">
                      <area shape="rect" coords="59, 76, 97, 127" href="#" data-area="torax" alt="Tórax">
                      <area shape="rect" coords="53, 141, 98, 194" href="#" data-area="abd_plv" alt="Abdômen/Pelve">
                      <area shape="rect" coords="50, 272, 101, 305" href="#" data-area="joelhos" alt="Joelhos">
                      <area shape="rect" coords="40, 358, 114, 389" href="#" data-area="pes" alt="Pés">
                      <area shape="rect" coords="127, 64, 147, 177" href="#" data-area="ombros" alt="Ombros">
                      <area shape="rect" coords="0, 64, 20, 177" href="#" data-area="ombros" alt="Ombros">
                    </map>
                  </div>
                  <div class="protocol-list"><ul id="protocolList"></ul></div>
                </div>
                <div class="panel-buttons"><button id="btn-cancel" class="cancel">Cancel</button><button id="okButton" disabled>OK</button></div>
              </div>
            </div>
          </div>

          <!-- PAINEL WORKLIST -->
          <div id="worklistPanel" style="display: none;">
            <div class="worklist-header"><h3>Patient Worklist</h3><div class="actions"><button id="refreshWorklistBtn">Refresh</button><button id="closeWorklistBtn">Close</button></div></div>
            <div class="worklist-content">
              <div class="worklist-table-container"><table class="worklist-table"><thead><tr><th>Patient Name</th><th>Patient ID</th><th>Exam Description</th><th>Referring Physician</th></tr></thead><tbody id="worklistTableBody"></tbody></table></div>
              <div class="worklist-details" id="worklistDetailsPanel">
                <h4>Patient Details</h4>
                <p><strong>Patient Name:</strong> <span id="detailPatientName"></span></p>
                <p><strong>Patient ID:</strong> <span id="detailPatientId"></span></p>
                <p><strong>Birthdate:</strong> <span id="detailBirthdate"></span></p>
                <p><strong>Age:</strong> <span id="detailAge"></span></p>
                <p><strong>Sex:</strong> <span id="detailSex"></span></p>
                <p><strong>Weight:</strong> <span id="detailWeight"></span></p>
                <p><strong>Height:</strong> <span id="detailHeight"></span></p>
                <p><strong>Exam Description:</strong> <span id="detailExamDesc"></span></p>
                <p><strong>Referring Physician:</strong> <span id="detailRefPhy"></span></p>
                <p><strong>Radiologist:</strong> <span id="detailRadiologist"></span></p>
                <p><strong>Operator:</strong> <span id="detailOperator"></span></p>
                <p><strong>History:</strong> <span id="detailHistory"></span></p>
                <p><strong>Protocol Number:</strong> <span id="detailProtocolNumber"></span></p>
                <p><strong>Accession Number:</strong> <span id="detailAccNumber"></span></p>
                <p><strong>Req. Proc. ID:</strong> <span id="detailReqProcId"></span></p>
                <div class="worklist-actions-bottom"><button id="startExamFromWorklistBtn" disabled>Start Exam</button></div>
              </div>
            </div>
          </div>

          <!-- PAINEL PROTOCOL MANAGER (inline) -->
          <div id="protocolManagerPanel" style="display: none;">
            <div id="protocol-manager-wrapper" style="width:100%;height:100%;background:#003366;color:#e0e0e0;font-family:Arial,sans-serif;box-sizing:border-box;overflow:hidden;">
              <div id="protocolManagerListView">
                <div class="protocol-manager-container">
                  <div class="side-panel">
                    <div class="protocol-tabs-manager">
                      <button data-area="gama" class="active">Gama</button>
                      <button data-area="user">User</button>
                      <button data-area="service">Service</button>
                    </div>
                    <div class="protocol-list-container-manager">
                      <ul id="protocol-list-manager"></ul>
                    </div>
                  </div>
                  <div class="main-panel-manager">
                    <h3>Detalhes do Protocolo</h3>
                    <div id="protocol-details-view"><p>Selecione um protocolo na lista para ver os detalhes.</p></div>
                  </div>
                </div>
                <div class="mgmt-buttons">
                  <button id="proto-btn-new">Novo</button>
                  <button id="proto-btn-edit" disabled>Editar</button>
                  <button id="proto-btn-delete" class="btn-delete" disabled>Excluir</button>
                  <button id="proto-btn-close-mgmt" class="cancel">Fechar</button>
                </div>
              </div>
            </div>
          </div>

          <!-- EXAMINATION DETAILS -->
          <div id="examinationDetails" style="display: none;">
            <h3>Examination Details</h3>
            <p><span>Exam Number:</span> <span id="displayExamNumber"></span></p>
            <p><span>Accession Number:</span> <span id="displayAccessionNumber"></span></p>
            <p><span>Patient Name:</span> <span id="displayPatientName"></span></p>
            <p><span>Patient ID:</span> <span id="displayPatientId"></span></p>
            <p><span>Birthdate:</span> <span id="displayBirthdate"></span></p>
            <p><span>Age:</span> <span id="displayAge"></span></p>
            <p><span>Sex:</span> <span id="displaySex"></span></p>
            <p><span>Weight:</span> <span id="displayWeight"></span></p>
            <p><span>Height:</span> <span id="displayHeight"></span></p>
            <p><span>Protocol:</span> <span id="displayProtocol"></span></p>
          </div>

          <div id="page-content-wrapper"></div>
        </div>

        <!-- BARRA PRINCIPAL -->
        <div class="bottom-bar" id="bottom-bar-main">
          <button id="btn-examination" data-tooltip="Inicia cadastro do paciente.">Examination</button>
          <button id="btn-patient-schedule" data-tooltip="Visualiza a lista de agendamentos.">Patient Schedule</button>
          <button id="btn-protocol-manager" data-tooltip="Gerencia protocolos de aquisição.">Protocol Manager</button>
          <button id="btn-data-screen" data-tooltip="Analisa as imagens.">Data Screen</button>
          <button id="btn-recon-manager" data-tooltip="Gerencia reconstrução.">Recon Manager</button>
          <button id="btn-daily-prep" data-tooltip="Realiza calibração diária.">Daily Prep</button>
          <button id="btn-scanner-util" data-tooltip="Acessa utilitários.">Scanner Util</button>
          <button id="btn-return-system" data-tooltip="Retorna à escolha de Sistemas.">Return System</button>
        </div>

        <!-- BARRA TOPOGRAMA -->
        <div class="bottom-bar" id="bottom-bar-topogram" style="display: none;" role="toolbar">
          <div class="group-left">
            <button id="topo-btn-cancel" class="btn-cancel" data-tooltip="Cancelar e voltar à tela inicial.">Cancel</button>
          </div>
          <div class="group-center">
            <button id="topo-btn-prior" class="btn-disabled" data-tooltip="Ir para a série anterior (desativado).">Prior Series</button>
            <button id="topo-btn-next" data-tooltip="Ir para a próxima série.">Next Series</button>
            <button id="topo-btn-new" data-tooltip="Cria uma nova série baseada na primeira.">Create New Series</button>
            <button id="topo-btn-repeat" data-tooltip="Repete os dados da primeira série na segunda.">Repeat Series</button>
            <button id="topo-btn-delete" data-tooltip="Limpa os dados da segunda série.">Delete Series</button>
            <button id="topo-btn-transfer" class="toggle-btn" data-tooltip="Ativa/Desativa a transferência automática.">Series Auto Transfer</button>
          </div>
          <div class="group-right">
            <button id="topo-btn-accept" class="btn-accept" data-tooltip="Confirma a configuração das séries.">Accept</button>
          </div>
        </div>
      </div>

      <!-- TELA DE VISUALIZAÇÃO -->
      <div class="main" id="screen-viewer">
        <div class="header" style="background-color: #005f9e;">
          <svg class="icon" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>
          SIMULADOR DE TC : SISTEMA GAMA HEALTHCARE (MODO DE VISUALIZAÇÃO)
          <svg class="icon" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>
        </div>
        <div class="screen">
          <h1 style="color: white; text-align: center;">Área de Visualização e Edição de Exames</h1>
        </div>
        <div class="bottom-bar"></div>
      </div>
    </div>

    <audio id="sound-slide-in" :src="BASE_URL + 'sons/swoosh_in.mp3'" preload="auto"></audio>
    <audio id="sound-slide-out" :src="BASE_URL + 'sons/swoosh_out.mp3'" preload="auto"></audio>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const BASE_URL = import.meta.env.BASE_URL

onMounted(() => {
  const pageContentWrapper = document.getElementById('page-content-wrapper')
  const bottomBarMain = document.getElementById('bottom-bar-main')
  const bottomBarTopogram = document.getElementById('bottom-bar-topogram')
  const patientProtocolPanel = document.getElementById('patientProtocolPanel')
  const worklistPanel = document.getElementById('worklistPanel')
  const examinationDetails = document.getElementById('examinationDetails')
  const protocolManagerPanel = document.getElementById('protocolManagerPanel')
  const okButton = document.getElementById('okButton')
  const worklistTableBody = document.getElementById('worklistTableBody')
  const startExamFromWorklistBtn = document.getElementById('startExamFromWorklistBtn')
  const protocolListElement = document.getElementById('protocolList')
  const examNumberInput = document.getElementById('examNumberInput')
  const protocolNumberInput = document.getElementById('protocolNumberInput')
  const bodyImage = document.getElementById('bodyImage')
  const allInputs = document.querySelectorAll('#patientProtocolPanel input')

  const btnExamination = document.getElementById('btn-examination')
  const btnPatientSchedule = document.getElementById('btn-patient-schedule')
  const btnReturnSystem = document.getElementById('btn-return-system')
  const btnProtocolManager = document.getElementById('btn-protocol-manager')
  const btnDataScreen = document.getElementById('btn-data-screen')
  const btnReconManager = document.getElementById('btn-recon-manager')
  const btnDailyPrep = document.getElementById('btn-daily-prep')
  const btnScannerUtil = document.getElementById('btn-scanner-util')
  const btnRefreshWorklist = document.getElementById('refreshWorklistBtn')
  const btnCloseWorklist = document.getElementById('closeWorklistBtn')
  const btnShowSkeleton = document.getElementById('showSkeletonBtn')
  const btnShowMarkedSkeleton = document.getElementById('showMarkedSkeletonBtn')
  const btnEndExam = document.getElementById('btn-end-exam')
  const btnCancel = document.getElementById('btn-cancel')
  const topoBtnCancel = document.getElementById('topo-btn-cancel')
  const topoBtnAccept = document.getElementById('topo-btn-accept')
  const topoBtnDelete = document.getElementById('topo-btn-delete')
  const topoBtnNew = document.getElementById('topo-btn-new')
  const topoBtnRepeat = document.getElementById('topo-btn-repeat')
  const topoBtnTransfer = document.getElementById('topo-btn-transfer')
  const protocolTabButtons = document.querySelectorAll('.protocol-tabs button')
  const skeletonMapAreas = document.querySelectorAll('map[name="skeletonmap"] area')
  const screenToggleSwitch = document.getElementById('screen-toggle-switch')
  const body = document.body
  const soundSlideIn = document.getElementById('sound-slide-in')
  const soundSlideOut = document.getElementById('sound-slide-out')

  const allProtocols = {
    cranio: ['1.1 CRANIO ROTINA', '1.2 SEIOS DA FACE / FACE', '1.3 ORBITAS', '1.4 MASTOIDES', '1.5 ATM', '1.6 HIPOFISE'],
    torax: ['2.1 COL CERVICAL', '2.2 TORAX ROTINA', '2.3 TORAX TRAUMA', '2.4 COL DORSAL', '2.5 ANGIO TEP', '2.6 ANGIO AORTA TOTAL'],
    abd_plv: ['3.1 ABD PELVE ROTINA', '3.2 ABD PELVE TRIFASICO', '3.3 COL LOMBAR', '3.4 PELVE/BACIA/QUADRIL', '3.5 TC TX ABD PELVE C/C'],
    joelhos: ['4.1 JOELHOS', '4.2 TAGT', '4.3 COXA', '4.4 PERNAS', '4.5 MMII'],
    pes: ['5.1 TORNOZELO', '5.2 PÉ'],
    ombros: ['6.1 OMBROS', '6.2 BRAÇO', '6.3 COTOVELOS', '6.4 ANTEBRAÇO', '6.5 MÃOS E PUNHOS'],
    service: ['DAILY CALIBRATION', 'TUBE WARMUP', 'SYSTEM DIAGNOSTICS']
  }
  const firstNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Mariana', 'Ricardo', 'Camila', 'Felipe', 'Juliana', 'Rafael', 'Helena', 'Heitor', 'Arthur', 'Aurora', 'Gustav', 'Rebeca', 'Iris', 'Ravi']
  const lastNames = ['Nascimento Silva', 'Silva Santos', 'Oliveira Machado', 'Souza Lima', 'Pereira Gomes', 'Ferreira Lima', 'Almeida da Silva', 'Rodrigues Gomes', 'Gomes Lima', 'Pereira Alves', 'Teixeira da Silva', 'Amaral Lopes']
  const referringPhysicians = ['Dr. Rafael', 'Dr. Leticia', 'Dra. Renata', 'Dr. Bruno', 'Dra. Fernando']
  const radiologist = ['Dr. Grance', 'Dra. Virgilio']
  const operator = ['Marcos', 'Raquel', 'Oliver']
  const histories = ['Dor abdominal', 'Trauma na cabeça', 'Acompanhamento pós-cirúrgico', 'Dores no joelho', 'Suspeita de fratura']
  const examDescriptions = [
    { desc: 'CRANIO', protocol: '1.1 CRANIO ROTINA' },
    { desc: 'TORAX', protocol: '2.2 TORAX ROTINA' },
    { desc: 'ABDOME TOTAL', protocol: '3.1 ABD PELVE ROTINA' },
    { desc: 'JOELHO DIREITO', protocol: '4.1 JOELHOS' },
    { desc: 'OMBRO ESQUERDO', protocol: '6.1 OMBROS' }
  ]
  let currentProtocol = null
  let worklistPatients = []

  function toggleViewMode() {
    if (body.classList.contains('viewer-active')) {
      if (soundSlideOut) soundSlideOut.play()
    } else {
      if (soundSlideIn) soundSlideIn.play()
    }
    body.classList.toggle('viewer-active')
  }

  function hideAllOverlays() {
    if (patientProtocolPanel) patientProtocolPanel.style.display = 'none'
    if (worklistPanel) worklistPanel.style.display = 'none'
    if (examinationDetails) examinationDetails.style.display = 'none'
    if (protocolManagerPanel) protocolManagerPanel.style.display = 'none'
  }

  async function loadPage(pageName) {
    hideAllOverlays()
    if (pageName === 'topograma' || pageName === 'protocolo_scout') {
      bottomBarMain.style.display = 'none'
      bottomBarTopogram.style.display = 'flex'
    } else {
      bottomBarTopogram.style.display = 'none'
      bottomBarMain.style.display = 'flex'
    }
    try {
      const response = await fetch(`${BASE_URL}partials/${pageName}.html`)
      if (!response.ok) throw new Error(`Arquivo partials/${pageName}.html não encontrado.`)
      pageContentWrapper.innerHTML = await response.text()
      if (pageName === 'topograma') {
        populateTopogramData()
      }
    } catch (error) {
      pageContentWrapper.innerHTML = `<h1 style="color:red; text-align:center;">${error.message}</h1>`
    }
  }

  function showPatientPanel() {
    hideAllOverlays()
    pageContentWrapper.innerHTML = ''
    patientProtocolPanel.style.display = 'flex'
    okButton.disabled = true
    document.getElementById('accessionNumberInput').focus()
  }

  function showWorklist() {
    hideAllOverlays()
    pageContentWrapper.innerHTML = ''
    worklistPanel.style.display = 'flex'
    renderWorklist()
  }

  function showProtocolManager() {
    hideAllOverlays()
    pageContentWrapper.innerHTML = ''
    if (protocolManagerPanel) {
      protocolManagerPanel.style.display = 'flex'
    }
  }

  function getOrGenerateWorklist() {
    const storedList = sessionStorage.getItem('gamaWorklist')
    if (storedList) {
      worklistPatients = JSON.parse(storedList)
    } else {
      worklistPatients = Array.from({ length: 20 }, generateRandomPatient)
      sessionStorage.setItem('gamaWorklist', JSON.stringify(worklistPatients))
    }
  }

  function renderWorklist() {
    getOrGenerateWorklist()
    worklistTableBody.innerHTML = ''
    worklistPatients.forEach((patient, i) => {
      const tr = document.createElement('tr')
      tr.innerHTML = `<td>${patient.name}</td><td>${patient.id}</td><td>${patient.examDescription}</td><td>${patient.referringPhysician}</td>`
      tr.dataset.patientIndex = i
      tr.addEventListener('click', () => selectPatientFromWorklist(i))
      worklistTableBody.appendChild(tr)
    })
    selectPatientFromWorklist(-1)
  }

  function refreshWorklist() {
    sessionStorage.removeItem('gamaWorklist')
    renderWorklist()
  }

  function generateRandomPatient() {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const exam = examDescriptions[Math.floor(Math.random() * examDescriptions.length)]
    const year = 1945 + Math.floor(Math.random() * 50)
    return {
      name: `${firstName} ${lastName}`,
      id: `P${Math.floor(Math.random() * 9000) + 1000}`,
      accession: `A${Math.floor(Math.random() * 900000) + 100000}`,
      reqProcId: `R${Math.floor(Math.random() * 90000) + 10000}`,
      sex: Math.random() < 0.5 ? 'M' : 'F',
      birthdate: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}/${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}/${year}`,
      age: new Date().getFullYear() - year,
      weight: (Math.random() * 50 + 50).toFixed(1),
      height: (Math.random() * 50 + 150).toFixed(0),
      examDescription: exam.desc,
      protocol: exam.protocol,
      referringPhysician: referringPhysicians[Math.floor(Math.random() * referringPhysicians.length)],
      radiologist: radiologist[Math.floor(Math.random() * radiologist.length)],
      operator: operator[Math.floor(Math.random() * operator.length)],
      history: histories[Math.floor(Math.random() * histories.length)]
    }
  }

  function selectPatientFromWorklist(index) {
    document.querySelectorAll('#worklistTableBody tr').forEach(tr => tr.classList.remove('selected'))
    startExamFromWorklistBtn.disabled = true
    document.querySelectorAll('#worklistDetailsPanel span').forEach(span => span.textContent = '')
    if (index > -1) {
      const p = worklistPatients[index]
      worklistTableBody.querySelector(`tr[data-patient-index="${index}"]`).classList.add('selected')
      document.getElementById('detailPatientName').textContent = p.name
      document.getElementById('detailPatientId').textContent = p.id
      document.getElementById('detailBirthdate').textContent = p.birthdate
      document.getElementById('detailAge').textContent = p.age
      document.getElementById('detailSex').textContent = p.sex
      document.getElementById('detailWeight').textContent = `${p.weight} kg`
      document.getElementById('detailHeight').textContent = `${p.height} cm`
      document.getElementById('detailExamDesc').textContent = p.examDescription
      document.getElementById('detailRefPhy').textContent = p.referringPhysician
      document.getElementById('detailRadiologist').textContent = p.radiologist
      document.getElementById('detailOperator').textContent = p.operator
      document.getElementById('detailHistory').textContent = p.history
      document.getElementById('detailProtocolNumber').textContent = p.protocol
      document.getElementById('detailAccNumber').textContent = p.accession
      document.getElementById('detailReqProcId').textContent = p.reqProcId
      startExamFromWorklistBtn.disabled = false
    }
  }

  function startExamFromWorklist() {
    const selectedRow = document.querySelector('#worklistTableBody tr.selected')
    if (!selectedRow) return
    const patientData = worklistPatients[selectedRow.dataset.patientIndex]
    hideAllOverlays()
    patientProtocolPanel.style.display = 'flex'
    document.getElementById('accessionNumberInput').value = patientData.accession
    document.getElementById('patientIdInput').value = patientData.id
    document.getElementById('patientNameInput').value = patientData.name
    const [day, month, year] = patientData.birthdate.split('/')
    document.getElementById('birthdate-day').value = day
    document.getElementById('birthdate-month').value = month
    document.getElementById('birthdate-year').value = year
    document.getElementById('patient-age').value = patientData.age
    document.getElementById('sexInput').value = patientData.sex
    document.getElementById('weightInput').value = patientData.weight
    document.getElementById('heightInput').value = patientData.height
    document.getElementById('referringPhysicianInput').value = patientData.referringPhysician
    document.getElementById('radiologistInput').value = patientData.radiologist
    document.getElementById('operatorInput').value = patientData.operator
    document.getElementById('historyInput').value = patientData.history
    document.getElementById('examDescriptionInput').value = patientData.examDescription
    document.getElementById('protocolNumberInput').value = patientData.protocol
    document.getElementById('reqProcIdInput').value = patientData.reqProcId
    currentProtocol = patientData.protocol
    fillExamNumberField()
    checkFormValidity()
  }

  function renderProtocolList(protocols) {
    if (!protocolListElement) return
    protocolListElement.innerHTML = ''
    if (!protocols || protocols.length === 0) {
      protocolListElement.innerHTML = '<li style="text-align:center; color: #888;">Nenhum protocolo.</li>'
      return
    }
    protocols.forEach(protocol => {
      const li = document.createElement('li')
      li.textContent = protocol
      li.addEventListener('click', () => {
        document.querySelectorAll('#protocolList li').forEach(item => item.classList.remove('selected'))
        li.classList.add('selected')
        fillExamNumberField()
        protocolNumberInput.value = protocol
        currentProtocol = protocol
        checkFormValidity()
      })
      protocolListElement.appendChild(li)
    })
  }

  function filterProtocolsByArea(area) {
    filterProtocolsByTab('gama')
    const protocolsToShow = allProtocols[area] || []
    renderProtocolList(protocolsToShow)
    if (protocolsToShow.length > 0) protocolListElement.querySelector('li')?.click()
    else { currentProtocol = null; checkFormValidity() }
  }

  function filterProtocolsByTab(tabName) {
    if (!protocolTabButtons) return
    protocolTabButtons.forEach(btn => btn.classList.remove('active'))
    const activeButton = document.querySelector(`.protocol-tabs button[data-area="${tabName}"]`)
    if (activeButton) activeButton.classList.add('active')
    let protocolsToRender = []
    if (tabName === 'gama') {
      protocolsToRender = Object.values(allProtocols).filter(p => p !== allProtocols.service).flat()
    } else if (tabName === 'service') {
      protocolsToRender = allProtocols.service || []
    }
    renderProtocolList(protocolsToRender)
  }

  function fillExamNumberField() {
    if (examNumberInput && examNumberInput.value === '') {
      examNumberInput.value = Math.floor(1000 + Math.random() * 9000)
    }
  }

  function checkFormValidity() {
    if (!okButton) return
    const requiredIds = ['accessionNumberInput', 'patientIdInput', 'patientNameInput', 'birthdate-day', 'birthdate-month', 'birthdate-year', 'sexInput', 'weightInput', 'heightInput', 'referringPhysicianInput', 'radiologistInput', 'operatorInput', 'historyInput', 'examDescriptionInput', 'reqProcIdInput']
    const allFilled = requiredIds.every(id => {
      const input = document.getElementById(id)
      return input && input.value.trim() !== ''
    })
    okButton.disabled = !(allFilled && currentProtocol)
  }

  function handleOkButtonClick() {
    if (okButton.disabled) return
    const patientData = {
      name: document.getElementById('patientNameInput').value,
      id: document.getElementById('patientIdInput').value,
      birthdate: `${document.getElementById('birthdate-day').value}/${document.getElementById('birthdate-month').value}/${document.getElementById('birthdate-year').value}`,
      age: document.getElementById('patient-age').value,
      sex: document.getElementById('sexInput').value,
      physician: document.getElementById('referringPhysicianInput').value,
      protocol: document.getElementById('protocolNumberInput').value
    }
    sessionStorage.setItem('currentPatientData', JSON.stringify(patientData))
    loadPage('topograma')
  }

  function populateTopogramData() {
    const patientDataString = sessionStorage.getItem('currentPatientData')
    if (patientDataString) {
      const pData = JSON.parse(patientDataString)
      const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val }
      set('topo-data-name', pData.name)
      set('topo-data-id', pData.id)
      set('topo-data-birthdate', pData.birthdate)
      set('topo-data-age', pData.age)
      set('topo-data-sex', pData.sex)
      set('topo-data-physician', pData.physician)
      set('topo-data-protocol', pData.protocol)
    }
  }

  function changeBodyImage(imageSrc) {
    if (bodyImage) bodyImage.src = imageSrc
  }

  function topoAccept() { loadPage('protocolo_scout') }

  function topoDeleteSeries() {
    const grid = document.getElementById('series-grid-table')
    if (!grid) return
    const secondDataRow = grid.querySelectorAll('tbody > tr')[2]
    if (!secondDataRow) return
    const fields = secondDataRow.querySelectorAll('input, select')
    fields.forEach((field, index) => { if (index > 0) field.value = '' })
  }

  function topoCreateOrRepeatSeries() {
    const grid = document.getElementById('series-grid-table')
    if (!grid) return
    const firstDataRow = grid.querySelectorAll('tbody > tr')[1]
    const secondDataRow = grid.querySelectorAll('tbody > tr')[2]
    if (!firstDataRow || !secondDataRow) return
    const sourceFields = firstDataRow.querySelectorAll('input, select')
    const targetFields = secondDataRow.querySelectorAll('input, select')
    sourceFields.forEach((sourceField, index) => { if (index > 0) targetFields[index].value = sourceField.value })
    targetFields[0].value = '2'
  }

  // Event listeners
  if (btnExamination) btnExamination.addEventListener('click', showPatientPanel)
  if (btnPatientSchedule) btnPatientSchedule.addEventListener('click', showWorklist)
  if (btnReturnSystem) btnReturnSystem.addEventListener('click', () => router.push({ name: 'sistemas' }))
  if (btnProtocolManager) btnProtocolManager.addEventListener('click', showProtocolManager)
  if (btnDataScreen) btnDataScreen.addEventListener('click', () => loadPage('data_screen'))
  if (btnReconManager) btnReconManager.addEventListener('click', () => loadPage('recon_manager'))
  if (btnDailyPrep) btnDailyPrep.addEventListener('click', () => loadPage('calibracao_diaria'))
  if (btnScannerUtil) btnScannerUtil.addEventListener('click', () => loadPage('scanner_util'))
  if (topoBtnCancel) topoBtnCancel.addEventListener('click', () => loadPage('initial'))
  if (topoBtnAccept) topoBtnAccept.addEventListener('click', topoAccept)
  if (topoBtnDelete) topoBtnDelete.addEventListener('click', topoDeleteSeries)
  if (topoBtnNew) topoBtnNew.addEventListener('click', topoCreateOrRepeatSeries)
  if (topoBtnRepeat) topoBtnRepeat.addEventListener('click', topoCreateOrRepeatSeries)
  if (topoBtnTransfer) topoBtnTransfer.addEventListener('click', () => topoBtnTransfer.classList.toggle('active'))
  if (okButton) okButton.addEventListener('click', handleOkButtonClick)
  if (btnCloseWorklist) btnCloseWorklist.addEventListener('click', () => loadPage('initial'))
  if (btnCancel) btnCancel.addEventListener('click', () => loadPage('initial'))
  if (btnEndExam) btnEndExam.addEventListener('click', () => loadPage('initial'))
  if (btnRefreshWorklist) btnRefreshWorklist.addEventListener('click', refreshWorklist)
  if (startExamFromWorklistBtn) startExamFromWorklistBtn.addEventListener('click', startExamFromWorklist)
  if (btnShowSkeleton) btnShowSkeleton.addEventListener('click', () => {
    changeBodyImage(BASE_URL + 'imagens/esqueleto-simples.png')
    btnShowSkeleton.classList.add('active')
    btnShowMarkedSkeleton.classList.remove('active')
  })
  if (btnShowMarkedSkeleton) btnShowMarkedSkeleton.addEventListener('click', () => {
    changeBodyImage(BASE_URL + 'imagens/marcacaoesesqueleto.png')
    btnShowMarkedSkeleton.classList.add('active')
    btnShowSkeleton.classList.remove('active')
  })
  if (protocolTabButtons) protocolTabButtons.forEach(button => {
    button.addEventListener('click', () => filterProtocolsByTab(button.dataset.area))
  })
  if (skeletonMapAreas) skeletonMapAreas.forEach(area => {
    area.addEventListener('click', (e) => { e.preventDefault(); filterProtocolsByArea(area.dataset.area) })
  })
  if (allInputs) allInputs.forEach(input => input.addEventListener('input', checkFormValidity))
  pageContentWrapper.addEventListener('click', (event) => {
    if (event.target.classList.contains('toggle-btn')) event.target.classList.toggle('active')
  })
  if (screenToggleSwitch) screenToggleSwitch.addEventListener('click', toggleViewMode)

  // Inicialização
  loadPage('initial')
})

onUnmounted(() => {
  // Remove viewer-active class from body when leaving the simulator
  document.body.classList.remove('viewer-active')
})
</script>

<style>
/* Estilos globais do simulador Gama (não scoped pois o JS manipula body) */
.gama-root {
  margin: 0;
  padding: 0;
}

body:has(.gama-root) {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  height: 100vh;
  overflow: hidden;
}

#master-container { width: 200%; height: 100%; display: flex; transform: translateX(0); transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1); }
.main { width: 50%; height: 100%; flex-shrink: 0; display: flex; flex-direction: column; background: #003366; }
.header { background: #cc0000; color: white; text-align: center; padding: 0.5rem; font-weight: bold; font-size: 16px; display: flex; justify-content: center; align-items: center; gap: 5px; }
.header .icon { width: 15px; height: 15px; fill: #87CEEB; }
.screen { flex-grow: 1; background: linear-gradient(to bottom right, #0b2c5d, #1c4e8c); border: 1px solid #000; margin: 1rem; position: relative; display: flex; overflow: hidden; }
#page-content-wrapper { width: 100%; height: 100%; }
#patientProtocolPanel, #worklistPanel, #examinationDetails, #protocolManagerPanel { background-color: #3b3b3b; border-radius: 8px; box-shadow: 0 0 20px rgba(0,0,0,.5); color: #e0e0e0; position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px; padding: 15px; display: none; flex-direction: column; z-index: 10; }
#patientProtocolPanel, #worklistPanel { justify-content: space-between; }
.panel-sections-container { display: flex; flex-grow: 1; gap: 15px; overflow: hidden; }
.panel-section { flex: 1; padding: 15px; background-color: #4a4a4a; border-radius: 6px; display: flex; flex-direction: column; gap: 10px; box-shadow: inset 0 0 5px rgba(0,0,0,.2); overflow-y: auto; }
.panel-section h3 { color: #f39c12; margin-top: 0; margin-bottom: 15px; text-align: center; font-size: 1.2em; padding-bottom: 5px; border-bottom: 1px solid rgba(255,255,255,.1); }
.form-group, .form-row { display: flex; align-items: center; margin-bottom: 5px; position: relative; }
.form-group { flex-wrap: wrap; }
.form-row { gap: 10px; }
.form-group label, .form-row label { font-size: .9em; color: #c0c0c0; text-align: right; position: relative; }
.form-group label { flex-basis: 120px; padding-right: 10px; white-space: nowrap; }
.form-row label { padding-right: 5px; }
.form-group input, .form-group .date-inputs input, .form-row input { padding: 4px 8px; border: 1px solid #666; background-color: #2e2e2e; color: #fff; border-radius: 4px; font-size: .9em; }
.form-group input { flex-grow: 1; min-width: 80px; }
.form-group input:read-only { background-color: #3b3b3b; color: #888; cursor: not-allowed; }
.form-group .date-inputs { display: flex; gap: 5px; flex-grow: 1; }
.form-group .date-inputs input { width: auto; flex-grow: 1; max-width: 50px; }
.form-row input { flex-grow: 1; max-width: 70px; }
.form-row .unit-label { flex-basis: 30px; padding-right: 0; }
.protocol-selection { flex: 1; display: flex; flex-direction: column; align-items: flex-start; }
.protocol-tabs { display: flex; align-items: center; width: 100%; margin-bottom: 10px; gap: 10px; }
.protocol-tabs .protocol-title { color: #f39c12; font-size: 1.2em; font-weight: bold; position: relative; padding: 5px 0; margin-right: 10px; }
.protocol-tabs button { background-color: #666; color: white; border: 1px solid #888; padding: 5px 10px; cursor: pointer; font-size: .8em; border-radius: 5px; transition: background-color .2s; position: relative; }
.protocol-tabs button:hover { background-color: #777; }
.protocol-tabs button.active { background-color: #f39c12; color: #2e2e2e; border-color: #f39c12; }
.protocol-content-area { display: flex; flex-grow: 1; width: 100%; gap: 15px; align-items: flex-start; padding-top: 5px; }
.human-body-diagram { width: 150px; flex-shrink: 0; align-self: flex-start; position: relative; }
.human-body-diagram img { max-width: 100%; height: auto; display: block; }
.image-control-buttons { display: flex; gap: 5px; margin-bottom: 10px; }
.image-control-buttons button { background-color: #666; color: white; border: 1px solid #888; padding: 3px 8px; cursor: pointer; font-size: .7em; border-radius: 3px; }
.image-control-buttons button.active { background-color: #f39c12; color: #2e2e2e; }
.protocol-list { flex-grow: 1; max-height: 100%; overflow-y: auto; border: 1px solid #666; border-radius: 5px; background-color: #2e2e2e; margin-top: 0; }
.protocol-list ul { list-style: none; padding: 0; margin: 0; }
.protocol-list li { padding: 8px 10px; border-bottom: 1px solid #3b3b3b; font-size: .9em; cursor: pointer; transition: background-color .2s; text-align: right; }
.protocol-list li:hover { background-color: #5c5c5c; }
.protocol-list li.selected { background-color: #007bff; color: white; }
.protocol-list li:last-child { border-bottom: none; }
.panel-buttons { display: flex; justify-content: flex-end; gap: 15px; margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,.1); }
.panel-buttons button { background-color: #007bff; color: white; padding: 8px 15px; border: none; border-radius: 5px; cursor: pointer; font-size: .9em; transition: background-color .2s; }
.panel-buttons button:hover { background-color: #0056b3; }
.panel-buttons button.cancel { background-color: #dc3545; }
.panel-buttons button.cancel:hover { background-color: #c82333; }
.panel-buttons button:disabled { background-color: #555; cursor: not-allowed; color: #bbb; }
.worklist-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,.1); }
.worklist-header h3 { margin: 0; color: #f39c12; font-size: 1.2em; }
.worklist-header .actions { display: flex; gap: 10px; }
.worklist-header button { background-color: #007bff; color: white; border: none; padding: 5px 15px; border-radius: 5px; cursor: pointer; font-size: .9em; transition: background-color .2s; }
.worklist-header button:hover { background-color: #0056b3; }
.worklist-content { display: flex; flex-grow: 1; gap: 15px; margin-top: 15px; overflow: hidden; }
.worklist-table-container { flex: 2; background-color: #4a4a4a; border-radius: 6px; overflow-y: auto; display: flex; flex-direction: column; }
.worklist-table { width: 100%; border-collapse: collapse; font-size: .8em; }
.worklist-table th, .worklist-table td { padding: 8px; border-bottom: 1px solid #555; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.worklist-table th { background-color: #666; color: #f39c12; position: sticky; top: 0; z-index: 1; }
.worklist-table tbody tr { cursor: pointer; transition: background-color .2s; }
.worklist-table tbody tr:hover { background-color: #5c5c5c; }
.worklist-table tbody tr.selected { background-color: #007bff; color: white; }
.worklist-details { flex: 1; background-color: #4a4a4a; border-radius: 6px; padding: 15px; overflow-y: auto; text-align: left; }
.worklist-details h4 { margin-top: 0; color: #f39c12; font-size: 1.1em; border-bottom: 1px solid rgba(255,255,255,.1); padding-bottom: 10px; }
.worklist-details p { margin: 5px 0; font-size: .9em; }
.worklist-details p strong { color: #c0c0c0; }
.worklist-actions-bottom { display: flex; justify-content: flex-end; gap: 15px; margin-top: 15px; }
.worklist-actions-bottom button { background-color: #007bff; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: .9em; }
.worklist-actions-bottom button:disabled { background-color: #555; cursor: not-allowed; color: #bbb; }
#examinationDetails { max-width: 600px; padding: 20px; font-size: 18px; width: 100%; margin: auto; background: #1c4e8c; }
#examinationDetails h3 { text-align: center; color: #f39c12; margin-bottom: 20px; }
#examinationDetails p { margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,.2); padding-bottom: 5px; }
#examinationDetails p span { font-weight: bold; color: #fff; }
#page-content-wrapper { padding: 12px; display: flex; flex-direction: column; gap: 2px; }
.center-strip { display: flex; align-items: stretch; gap: 24px; flex-grow: 1; margin-bottom: 2px; min-height: 180px; }
.side-box { flex: 1 1 0; border-radius: 10px; background: rgba(0,0,0,.25); outline: 1px dashed rgba(255,255,255,.3); outline-offset: -4px; padding: 10px; }
.topo-patient-data { font-size: 14px; color: #ccc; height: 100%; overflow-y: auto; text-align: left; }
.topo-patient-data .data-item { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,.1); }
.topo-patient-data .data-item span:first-child { font-weight: bold; }
.topo-patient-data .data-item span:last-child { color: #f39c12; font-weight: bold; }
.center-table { flex: 0 0 auto; align-self: center; border-collapse: separate; border-spacing: 10px; background: rgba(255,255,255,.06); padding: 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,.15); }
.center-table td { width: 150px; height: 50px; padding: 0; }
.toggle-btn { width: 100%; height: 100%; background: rgba(0,0,0,.25); border-radius: 8px; border: 1px solid rgba(255,255,255,.2); color: #fff; font-size: 11px; font-weight: bold; cursor: pointer; transition: background-color .2s, color .2s; position: relative; }
.toggle-btn:hover { background-color: rgba(255,255,255,.1); }
.toggle-btn.active { background-color: #f39c12; color: #000; border-color: #f39c12; }
.series-row { display: flex; align-items: center; gap: 10px; margin-bottom: 2px; flex-shrink: 0; }
.series-row label { color: #fff; font-size: 13px; white-space: nowrap; }
.series-row input[type="text"] { flex: 1; min-width: 240px; max-width: 720px; height: 32px; border-radius: 6px; border: 1px solid #ddd; background: #fff; color: #000; padding: 0 10px; outline: none; }
.series-row input[type="text"]:focus { box-shadow: 0 0 0 3px rgba(255,255,255,.25); }
.series-grid-wrap { flex-shrink: 0; overflow: auto; }
.series-grid { border-collapse: separate; border-spacing: 4px; margin: 0 auto; }
.series-grid td { width: 68px; height: 80px; padding: 0; text-align: center; vertical-align: middle; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); border-radius: 8px; color: #fff; font-size: 12px; }
.series-grid td.scout { white-space: nowrap; padding: 0 8px; font-weight: bold; }
.series-grid input, .series-grid select { appearance: none; -webkit-appearance: none; width: 100%; height: 100%; background-color: transparent; border: none; color: white; text-align: center; font-size: 12px; font-family: Arial, sans-serif; padding: 0 4px; }
.series-grid input:focus, .series-grid select:focus { outline: 1px solid #f39c12; background-color: #2e2e2e; }
.series-grid .grid-header { font-weight: bold; color: #f39c12; font-size: 11px; text-align: center; vertical-align: middle; }
.bottom-bar { display: flex; flex-wrap: wrap; justify-content: center; gap: .8rem; background: #003366; padding: .8rem; }
.bottom-bar button { background: #ffffff10; color: white; border: 1px solid #ccc; padding: .7rem 1.2rem; border-radius: 5px; font-size: 13px; cursor: pointer; width: 150px; height: 50px; position: relative; transition: background .3s ease; display: flex; align-items: center; justify-content: center; }
.bottom-bar button:hover { background: #ffffff30; }
.bottom-bar button::after, .toggle-btn::after { content: attr(data-tooltip); position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%) translateY(-5px); background-color: #333; color: #fff; padding: 6px 10px; border-radius: 4px; border: 1px solid #555; font-size: 13px; white-space: nowrap; z-index: 20; opacity: 0; pointer-events: none; transition: opacity .2s ease, transform .2s ease; }
.bottom-bar button:hover::after, .toggle-btn:hover::after { opacity: 1; transform: translateX(-50%) translateY(-10px); }
.btn-disabled { background: #555 !important; color: #999 !important; cursor: not-allowed !important; border-color: #777 !important; }
.btn-disabled:hover { background: #555 !important; }
#bottom-bar-topogram { margin: 0 12px 12px; border-radius: 6px; border-top: 1px solid rgba(255,255,255,.08); justify-content: space-between; }
.group-left, .group-center, .group-right { display: flex; gap: 10px; }
#bottom-bar-topogram button { min-width: 140px; height: 44px; border-radius: 8px; }
.btn-cancel { background: #dc3545; border-color: #b73a47; }
.btn-cancel:hover { background: #c82333; }
.btn-accept { background: #f39c12; border-color: #c5860e; }
.btn-accept:hover { background: #e08e0b; }
#screen-toggle-switch { position: fixed; top: 50%; transform: translateY(-50%); width: 90px; height: 48px; border-radius: 24px; cursor: pointer; z-index: 100; box-shadow: 0 4px 15px rgba(0,0,0,.4); transition: background-color .3s ease, right .5s cubic-bezier(.77,0,.175,1), left .5s cubic-bezier(.77,0,.175,1); right: 20px; background-color: #34c759; }
#screen-toggle-switch .knob { position: absolute; top: 4px; left: 4px; width: 40px; height: 40px; background-color: white; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,.3); transform: translateX(42px); transition: transform .3s cubic-bezier(.25,.46,.45,.94); }
body.viewer-active #master-container { transform: translateX(-50%); }
body.viewer-active #screen-toggle-switch { right: auto; left: 20px; background-color: #76767c; }
body.viewer-active #screen-toggle-switch .knob { transform: translateX(0); }
#protocolManagerPanel { padding: 0; background-color: #2e2e2e; }
.protocol-manager-container { display: flex; gap: 20px; width: 100%; height: 100%; padding: 20px; }
.side-panel { flex-basis: 200px; flex-shrink: 0; display: flex; flex-direction: column; gap: 15px; }
.main-panel-manager { flex-grow: 1; display: flex; flex-direction: column; }
.main-panel-manager h3 { text-align: center; color: #f39c12; margin: 0 0 15px 0; }
.protocol-tabs-manager { display: flex; gap: 5px; }
.protocol-tabs-manager button { flex-grow: 1; padding: 8px; background-color: #4a4a4a; color: #fff; border: 1px solid #666; border-radius: 5px; cursor: pointer; }
.protocol-tabs-manager button.active { background-color: #f39c12; color: #000; }
.protocol-list-container-manager { flex-grow: 1; background-color: #1c1c1c; border: 1px solid #444; border-radius: 5px; padding: 5px; overflow-y: auto; }
#protocol-list-manager { list-style: none; padding: 0; margin: 0; }
#protocol-list-manager li { padding: 10px; border-bottom: 1px solid #333; cursor: pointer; transition: background-color .2s; }
#protocol-list-manager li:hover { background-color: #3f3f3f; }
#protocol-list-manager li.selected { background-color: #007bff; color: white; }
.mgmt-buttons { margin-top: 15px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; padding-top: 15px; border-top: 1px solid #444; }
.mgmt-buttons button { padding: 8px 16px; border-radius: 5px; border: 1px solid #666; background-color: #4a4a4a; color: #fff; cursor: pointer; transition: background-color .2s; }
.mgmt-buttons button:hover:not(:disabled) { background-color: #5f5f5f; }
.mgmt-buttons button:disabled { background-color: #3a3a3a; color: #777; cursor: not-allowed; }
.mgmt-buttons .btn-delete { background-color: #dc3545; border-color: #c82333; }
.mgmt-buttons .btn-delete:hover:not(:disabled) { background-color: #c82333; }
#screen-viewer .screen { justify-content: center; align-items: center; }
</style>
