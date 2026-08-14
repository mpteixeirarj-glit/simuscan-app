document.addEventListener('DOMContentLoaded', () => {

    if (sessionStorage.getItem('usuarioLogado') !== 'true') {
        alert('Acesso negado. Por favor, faça o login.');
        window.location.href = 'login.html';
        return;
    }

    // --- REFERÊNCIAS GLOBAIS ---
    const pageContentWrapper = document.getElementById('page-content-wrapper');
    const bottomBarMain = document.getElementById('bottom-bar-main');
    const bottomBarTopogram = document.getElementById('bottom-bar-topogram');
    const patientProtocolPanel = document.getElementById('patientProtocolPanel');
    const worklistPanel = document.getElementById('worklistPanel');
    const examinationDetails = document.getElementById('examinationDetails');
    const protocolManagerPanel = document.getElementById('protocolManagerPanel'); // Adicionado para consistência
    const okButton = document.getElementById('okButton');
    const worklistTableBody = document.getElementById('worklistTableBody');
    const startExamFromWorklistBtn = document.getElementById('startExamFromWorklistBtn');
    const protocolListElement = document.getElementById('protocolList');
    const examNumberInput = document.getElementById('examNumberInput');
    const protocolNumberInput = document.getElementById('protocolNumberInput');
    const bodyImage = document.getElementById('bodyImage');
    const allInputs = document.querySelectorAll('#patientProtocolPanel input');
    
    // --- BOTÕES ---
    const btnExamination = document.getElementById('btn-examination');
    const btnPatientSchedule = document.getElementById('btn-patient-schedule');
    const btnReturnSystem = document.getElementById('btn-return-system');

    // --- BOTÕES ADICIONAIS DA BARRA PRINCIPAL (ACRESCENTADOS) ---
    const btnProtocolManager = document.getElementById('btn-protocol-manager');
    if (btnProtocolManager) {
    btnProtocolManager.addEventListener('click', () => {
        window.location.href = 'protocolos.html';
    });
}
    const btnDataScreen = document.getElementById('btn-data-screen');
    const btnReconManager = document.getElementById('btn-recon-manager');
    const btnDailyPrep = document.getElementById('btn-daily-prep');
    const btnScannerUtil = document.getElementById('btn-scanner-util');
    
    const btnRefreshWorklist = document.getElementById('refreshWorklistBtn');
    const btnCloseWorklist = document.getElementById('closeWorklistBtn');
    const btnShowSkeleton = document.getElementById('showSkeletonBtn');
    const btnShowMarkedSkeleton = document.getElementById('showMarkedSkeletonBtn');
    const btnEndExam = document.getElementById('btn-end-exam');
    const btnCancel = document.getElementById('btn-cancel');
    
    const topoBtnCancel = document.getElementById('topo-btn-cancel');
    const topoBtnAccept = document.getElementById('topo-btn-accept');
    const topoBtnDelete = document.getElementById('topo-btn-delete');
    const topoBtnNew = document.getElementById('topo-btn-new');
    const topoBtnRepeat = document.getElementById('topo-btn-repeat');
    const topoBtnTransfer = document.getElementById('topo-btn-transfer');

    const protocolTabButtons = document.querySelectorAll('.protocol-tabs button');
    const skeletonMapAreas = document.querySelectorAll('map[name="skeletonmap"] area');

    const screenToggleSwitch = document.getElementById('screen-toggle-switch');
    const body = document.body;
    const soundSlideIn = document.getElementById('sound-slide-in');
    const soundSlideOut = document.getElementById('sound-slide-out');

    // --- DADOS E VARIÁVEIS DE ESTADO ---
    const allProtocols = { cranio: ['1.1 CRANIO ROTINA', '1.2 SEIOS DA FACE / FACE', '1.3 ORBITAS', '1.4 MASTOIDES', '1.5 ATM', '1.6 HIPOFISE'], torax: ['2.1 COL CERVICAL', '2.2 TORAX ROTINA', '2.3 TORAX TRAUMA', '2.4 COL DORSAL', '2.5 ANGIO TEP', '2.6 ANGIO AORTA TOTAL'], abd_plv: ['3.1 ABD PELVE ROTINA', '3.2 ABD PELVE TRIFASICO', '3.3 COL LOMBAR', '3.4 PELVE/BACIA/QUADRIL', '3.5 TC TX ABD PELVE C/C'], joelhos: ['4.1 JOELHOS', '4.2 TAGT', '4.3 COXA', '4.4 PERNAS', '4.5 MMII'], pes: ['5.1 TORNOZELO', '5.2 PÉ'], ombros: ['6.1 OMBROS', '6.2 BRAÇO', '6.3 COTOVELOS', '6.4 ANTEBRAÇO', '6.5 MÃOS E PUNHOS'], service: ['DAILY CALIBRATION', 'TUBE WARMUP', 'SYSTEM DIAGNOSTICS'] };
    const firstNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Mariana', 'Ricardo', 'Camila', 'Felipe', 'Juliana', 'Rafael', 'Helena', 'Heitor', 'Arthur', 'Aurora', 'Gustav', 'Rebeca', 'Iris', 'Ravi'];
    const lastNames = ['Nascimento Silva', 'Silva Santos', 'Oliveira Machado', 'Souza Lima', 'Pereira Gomes', 'Ferreira Lima', 'Almeida da Silva', 'Rodrigues Gomes', 'Gomes Lima', 'Pereira Alves', 'Teixeira da Silva', 'Amaral Lopes'];
    const referringPhysicians = ['Dr. Rafael', 'Dr. Leticia', 'Dra. Renata', 'Dr. Bruno', 'Dra. Fernando'];
    const radiologist = ['Dr. Grance', 'Dra. Virgilio'];
    const operator = ['Marcos', 'Raquel', 'Oliver'];
    const histories = ['Dor abdominal', 'Trauma na cabeça', 'Acompanhamento pós-cirúrgico', 'Dores no joelho', 'Suspeita de fratura'];
    const examDescriptions = [ { desc: 'CRANIO', protocol: '1.1 CRANIO ROTINA' }, { desc: 'TORAX', protocol: '2.2 TORAX ROTINA' }, { desc: 'ABDOME TOTAL', protocol: '3.1 ABD PELVE ROTINA' }, { desc: 'JOELHO DIREITO', protocol: '4.1 JOELHOS' }, { desc: 'OMBRO ESQUERDO', protocol: '6.1 OMBROS' } ];
    let currentProtocol = null;
    let worklistPatients = [];

    // --- FUNÇÕES ---
    function toggleViewMode() {
        if (body.classList.contains('viewer-active')) {
            if (soundSlideOut) soundSlideOut.play();
        } else {
            if (soundSlideIn) soundSlideIn.play();
        }
        body.classList.toggle('viewer-active');
    }

    function hideAllOverlays() {
        if(patientProtocolPanel) patientProtocolPanel.style.display = 'none';
        if(worklistPanel) worklistPanel.style.display = 'none';
        if(examinationDetails) examinationDetails.style.display = 'none';
        if(protocolManagerPanel) protocolManagerPanel.style.display = 'none'; // Adicionado para consistência
    }

    async function loadPage(pageName) {
        hideAllOverlays();
        if (pageName === 'topograma' || pageName === 'protocolo_scout') {
            bottomBarMain.style.display = 'none';
            bottomBarTopogram.style.display = 'flex';
        } else {
            bottomBarTopogram.style.display = 'none';
            bottomBarMain.style.display = 'flex';
        }
        try {
            const response = await fetch(`partials/${pageName}.html`);
            if (!response.ok) throw new Error(`Arquivo partials/${pageName}.html não encontrado.`);
            pageContentWrapper.innerHTML = await response.text();
            
            // Executar scripts específicos após carregar o conteúdo
            if (pageName === 'topograma') {
                populateTopogramData();
            } else if (pageName === 'protocolos') {
                // Aguardar um pouco para garantir que o DOM esteja renderizado
                setTimeout(() => {
                    // Procurar e executar a função initProtocolManager se existir
                    if (typeof window.initProtocolManager === 'function') {
                        window.initProtocolManager();
                    } else {
                        // Se a função não estiver no escopo global, procurar no script carregado
                        const scripts = pageContentWrapper.querySelectorAll('script');
                        scripts.forEach(script => {
                            if (script.textContent.includes('initProtocolManager')) {
                                // Re-executar o script para garantir que as funções sejam definidas
                                eval(script.textContent);
                            }
                        });
                    }
                }, 100);
            }
        } catch (error) {
            pageContentWrapper.innerHTML = `<h1 style="color:red; text-align:center;">${error.message}</h1>`;
        }
    }

    function showPatientPanel() {
        hideAllOverlays();
        pageContentWrapper.innerHTML = '';
        patientProtocolPanel.style.display = 'flex';
        okButton.disabled = true;
        document.getElementById('accessionNumberInput').focus();
    }

    function showWorklist() {
        hideAllOverlays();
        pageContentWrapper.innerHTML = '';
        worklistPanel.style.display = 'flex';
        renderWorklist();
    }

    // Função para o Protocol Manager (adicionada)
    function showProtocolManager() {
        hideAllOverlays();
        pageContentWrapper.innerHTML = '';
        if (protocolManagerPanel) {
            protocolManagerPanel.style.display = 'flex';
        } else {
            console.error("Painel 'protocolManagerPanel' não encontrado no HTML.");
        }
    }
    
    function getOrGenerateWorklist() {
        const storedList = sessionStorage.getItem('gamaWorklist');
        if (storedList) {
            worklistPatients = JSON.parse(storedList);
        } else {
            worklistPatients = Array.from({ length: 20 }, generateRandomPatient);
            sessionStorage.setItem('gamaWorklist', JSON.stringify(worklistPatients));
        }
    }

    function renderWorklist() {
        getOrGenerateWorklist();
        worklistTableBody.innerHTML = '';
        worklistPatients.forEach((patient, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${patient.name}</td><td>${patient.id}</td><td>${patient.examDescription}</td><td>${patient.referringPhysician}</td>`;
            tr.dataset.patientIndex = i;
            tr.addEventListener('click', () => selectPatientFromWorklist(i));
            worklistTableBody.appendChild(tr);
        });
        selectPatientFromWorklist(-1);
    }
    
    function refreshWorklist() {
        sessionStorage.removeItem('gamaWorklist');
        renderWorklist();
    }

    function generateRandomPatient() {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const exam = examDescriptions[Math.floor(Math.random() * examDescriptions.length)];
        const year = 1945 + Math.floor(Math.random() * 50);
        return { name: `${firstName} ${lastName}`, id: `P${Math.floor(Math.random() * 9000) + 1000}`, accession: `A${Math.floor(Math.random() * 900000) + 100000}`, reqProcId: `R${Math.floor(Math.random() * 90000) + 10000}`, sex: Math.random() < 0.5 ? 'M' : 'F', birthdate: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}/${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}/${year}`, age: new Date().getFullYear() - year, weight: (Math.random() * 50 + 50).toFixed(1), height: (Math.random() * 50 + 150).toFixed(0), examDescription: exam.desc, protocol: exam.protocol, referringPhysician: referringPhysicians[Math.floor(Math.random() * referringPhysicians.length)], radiologist: radiologist[Math.floor(Math.random() * radiologist.length)], operator: operator[Math.floor(Math.random() * operator.length)], history: histories[Math.floor(Math.random() * histories.length)] };
    }

    function selectPatientFromWorklist(index) {
        document.querySelectorAll('#worklistTableBody tr').forEach(tr => tr.classList.remove('selected'));
        startExamFromWorklistBtn.disabled = true;
        document.querySelectorAll('#worklistDetailsPanel span').forEach(span => span.textContent = '');
        if (index > -1) {
            const p = worklistPatients[index];
            worklistTableBody.querySelector(`tr[data-patient-index="${index}"]`).classList.add('selected');
            document.getElementById('detailPatientName').textContent = p.name;
            document.getElementById('detailPatientId').textContent = p.id;
            document.getElementById('detailBirthdate').textContent = p.birthdate;
            document.getElementById('detailAge').textContent = p.age;
            document.getElementById('detailSex').textContent = p.sex;
            document.getElementById('detailWeight').textContent = `${p.weight} kg`;
            document.getElementById('detailHeight').textContent = `${p.height} cm`;
            document.getElementById('detailExamDesc').textContent = p.examDescription;
            document.getElementById('detailRefPhy').textContent = p.referringPhysician;
            document.getElementById('detailRadiologist').textContent = p.radiologist;
            document.getElementById('detailOperator').textContent = p.operator;
            document.getElementById('detailHistory').textContent = p.history;
            document.getElementById('detailProtocolNumber').textContent = p.protocol;
            document.getElementById('detailAccNumber').textContent = p.accession;
            document.getElementById('detailReqProcId').textContent = p.reqProcId;
            startExamFromWorklistBtn.disabled = false;
        }
    }

    function startExamFromWorklist() {
        const selectedRow = document.querySelector('#worklistTableBody tr.selected');
        if (!selectedRow) return;
        const patientData = worklistPatients[selectedRow.dataset.patientIndex];
        hideAllOverlays();
        patientProtocolPanel.style.display = 'flex';
        document.getElementById('accessionNumberInput').value = patientData.accession;
        document.getElementById('patientIdInput').value = patientData.id;
        document.getElementById('patientNameInput').value = patientData.name;
        const [day, month, year] = patientData.birthdate.split('/');
        document.getElementById('birthdate-day').value = day;
        document.getElementById('birthdate-month').value = month;
        document.getElementById('birthdate-year').value = year;
        document.getElementById('patient-age').value = patientData.age;
        document.getElementById('sexInput').value = patientData.sex;
        document.getElementById('weightInput').value = patientData.weight;
        document.getElementById('heightInput').value = patientData.height;
        document.getElementById('referringPhysicianInput').value = patientData.referringPhysician;
        document.getElementById('radiologistInput').value = patientData.radiologist;
        document.getElementById('operatorInput').value = patientData.operator;
        document.getElementById('historyInput').value = patientData.history;
        document.getElementById('examDescriptionInput').value = patientData.examDescription;
        document.getElementById('protocolNumberInput').value = patientData.protocol;
        document.getElementById('reqProcIdInput').value = patientData.reqProcId;
        currentProtocol = patientData.protocol;
        fillExamNumberField();
        checkFormValidity();
    }
    
    function renderProtocolList(protocols) {
        if (!protocolListElement) return;
        protocolListElement.innerHTML = '';
        if (!protocols || protocols.length === 0) {
            protocolListElement.innerHTML = '<li style="text-align:center; color: #888;">Nenhum protocolo.</li>'; return;
        }
        protocols.forEach(protocol => {
            const li = document.createElement('li');
            li.textContent = protocol;
            li.addEventListener('click', () => {
                document.querySelectorAll('#protocolList li').forEach(item => item.classList.remove('selected'));
                li.classList.add('selected');
                fillExamNumberField();
                protocolNumberInput.value = protocol;
                currentProtocol = protocol;
                checkFormValidity();
            });
            protocolListElement.appendChild(li);
        });
    }

    function filterProtocolsByArea(area) {
        filterProtocolsByTab('gama');
        const protocolsToShow = allProtocols[area] || [];
        renderProtocolList(protocolsToShow);
        if (protocolsToShow.length > 0) protocolListElement.querySelector('li')?.click();
        else { currentProtocol = null; checkFormValidity(); }
    }

    function filterProtocolsByTab(tabName) {
        if (!protocolTabButtons) return;
        protocolTabButtons.forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`.protocol-tabs button[data-area="${tabName}"]`);
        if (activeButton) activeButton.classList.add('active');
        let protocolsToRender = [];
        if (tabName === 'gama') {
            protocolsToRender = Object.values(allProtocols).filter(p => p !== allProtocols.service).flat();
        } else if (tabName === 'service') {
            protocolsToRender = allProtocols.service || [];
        }
        renderProtocolList(protocolsToRender);
    }

    function fillExamNumberField() { if (examNumberInput && examNumberInput.value === '') { examNumberInput.value = Math.floor(1000 + Math.random() * 9000); } }
    
    function checkFormValidity() {
        if(!okButton) return;
        const requiredIds = ['accessionNumberInput', 'patientIdInput', 'patientNameInput', 'birthdate-day', 'birthdate-month', 'birthdate-year', 'sexInput', 'weightInput', 'heightInput', 'referringPhysicianInput', 'radiologistInput', 'operatorInput', 'historyInput', 'examDescriptionInput', 'reqProcIdInput'];
        const allFilled = requiredIds.every(id => {
            const input = document.getElementById(id);
            return input && input.value.trim() !== '';
        });
        okButton.disabled = !(allFilled && currentProtocol);
    }
    
    function handleOkButtonClick() { 
        if (okButton.disabled) return;
        const patientData = { name: document.getElementById('patientNameInput').value, id: document.getElementById('patientIdInput').value, birthdate: `${document.getElementById('birthdate-day').value}/${document.getElementById('birthdate-month').value}/${document.getElementById('birthdate-year').value}`, age: document.getElementById('patient-age').value, sex: document.getElementById('sexInput').value, physician: document.getElementById('referringPhysicianInput').value, protocol: document.getElementById('protocolNumberInput').value };
        sessionStorage.setItem('currentPatientData', JSON.stringify(patientData));
        loadPage('topograma');
    }

    function populateTopogramData() {
        const patientDataString = sessionStorage.getItem('currentPatientData');
        if (patientDataString) {
            const pData = JSON.parse(patientDataString);
            document.getElementById('topo-data-name').textContent = pData.name;
            document.getElementById('topo-data-id').textContent = pData.id;
            document.getElementById('topo-data-birthdate').textContent = pData.birthdate;
            document.getElementById('topo-data-age').textContent = pData.age;
            document.getElementById('topo-data-sex').textContent = pData.sex;
            document.getElementById('topo-data-physician').textContent = pData.physician;
            document.getElementById('topo-data-protocol').textContent = pData.protocol;
        }
    }

    function changeBodyImage(imageSrc) { if(bodyImage) bodyImage.src = imageSrc; }
    
    function topoAccept() {
        loadPage('protocolo_scout');
    }

    function topoDeleteSeries() {
        const grid = document.getElementById('series-grid-table');
        if (!grid) return;
        const secondDataRow = grid.querySelectorAll('tbody > tr')[2];
        if (!secondDataRow) return;
        const fields = secondDataRow.querySelectorAll('input, select');
        fields.forEach((field, index) => { if (index > 0) field.value = ''; });
    }

    function topoCreateOrRepeatSeries() {
        const grid = document.getElementById('series-grid-table');
        if (!grid) return;
        const firstDataRow = grid.querySelectorAll('tbody > tr')[1];
        const secondDataRow = grid.querySelectorAll('tbody > tr')[2];
        if (!firstDataRow || !secondDataRow) return;
        const sourceFields = firstDataRow.querySelectorAll('input, select');
        const targetFields = secondDataRow.querySelectorAll('input, select');
        sourceFields.forEach((sourceField, index) => { if (index > 0) targetFields[index].value = sourceField.value; });
        targetFields[0].value = '2';
    }

    // --- EVENT LISTENERS ---
    if(btnExamination) btnExamination.addEventListener('click', showPatientPanel);
    if(btnPatientSchedule) btnPatientSchedule.addEventListener('click', showWorklist);
    if(btnReturnSystem) btnReturnSystem.addEventListener('click', () => { window.location.href = 'escolha.sistemas.html'; });
    
    // --- LISTENERS DOS BOTÕES ADICIONAIS (ACRESCENTADOS) ---
    if(btnProtocolManager) btnProtocolManager.addEventListener('click', () => loadPage('protocolos'));
    if(btnDataScreen) btnDataScreen.addEventListener('click', () => loadPage('data_screen'));
    if(btnReconManager) btnReconManager.addEventListener('click', () => loadPage('recon_manager'));
    if(btnDailyPrep) btnDailyPrep.addEventListener('click', () => loadPage('calibracao_diaria'));
    if(btnScannerUtil) btnScannerUtil.addEventListener('click', () => loadPage('scanner_util'));

    if(topoBtnCancel) topoBtnCancel.addEventListener('click', () => loadPage('initial'));
    if(topoBtnAccept) topoBtnAccept.addEventListener('click', topoAccept);
    if(topoBtnDelete) topoBtnDelete.addEventListener('click', topoDeleteSeries);
    if(topoBtnNew) topoBtnNew.addEventListener('click', topoCreateOrRepeatSeries);
    if(topoBtnRepeat) topoBtnRepeat.addEventListener('click', topoCreateOrRepeatSeries);
    if(topoBtnTransfer) topoBtnTransfer.addEventListener('click', () => topoBtnTransfer.classList.toggle('active'));
    
    if(okButton) okButton.addEventListener('click', handleOkButtonClick);
    if(btnCloseWorklist) btnCloseWorklist.addEventListener('click', () => loadPage('initial'));
    if(btnCancel) btnCancel.addEventListener('click', () => loadPage('initial'));
    if(btnEndExam) btnEndExam.addEventListener('click', () => loadPage('initial'));
    if(btnRefreshWorklist) btnRefreshWorklist.addEventListener('click', refreshWorklist);
    if(startExamFromWorklistBtn) startExamFromWorklistBtn.addEventListener('click', startExamFromWorklist);
    
    if(btnShowSkeleton) btnShowSkeleton.addEventListener('click', () => { changeBodyImage('imagens/esqueleto-simples.png'); btnShowSkeleton.classList.add('active'); btnShowMarkedSkeleton.classList.remove('active'); });
    if(btnShowMarkedSkeleton) btnShowMarkedSkeleton.addEventListener('click', () => { changeBodyImage('imagens/marcacaoesesqueleto.png'); btnShowMarkedSkeleton.classList.add('active'); btnShowSkeleton.classList.remove('active'); });
    
    if(protocolTabButtons) protocolTabButtons.forEach(button => button.addEventListener('click', () => filterProtocolsByTab(button.dataset.area)));
    
    if(skeletonMapAreas) skeletonMapAreas.forEach(area => {
        area.addEventListener('click', (e) => { 
            e.preventDefault(); 
            filterProtocolsByArea(area.dataset.area); 
        });
    });
    
    if(allInputs) allInputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
    });
    
    pageContentWrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains('toggle-btn')) {
            event.target.classList.toggle('active');
        }
    });

    if(screenToggleSwitch) screenToggleSwitch.addEventListener('click', toggleViewMode);
    
    // --- INICIALIZAÇÃO ---
    loadPage('initial');
});