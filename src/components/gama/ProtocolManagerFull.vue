<template>
  <div class="pm-wrapper">

    <!-- ═══════════════════════════════════════════════════════════ LIST VIEW -->
    <div v-show="!showEditor" class="pm-list-view">
      <div class="protocol-manager-container">
        <!-- SIDE PANEL -->
        <div class="side-panel">
          <div class="protocol-tabs-manager">
            <button
              v-for="t in ['gama','user','service']"
              :key="t"
              :data-area="t"
              :class="{ active: currentTab === t }"
              @click="switchTab(t)"
            >{{ t.charAt(0).toUpperCase() + t.slice(1) }}</button>
          </div>
          <div class="protocol-list-container-manager">
            <ul id="protocol-list-manager">
              <li
                v-for="(p, i) in currentProtocols"
                :key="i"
                :class="{ selected: selectedIndex === i }"
                @click="selectProtocol(i)"
              >{{ p.name }}</li>
            </ul>
          </div>
        </div>

        <!-- MAIN PANEL -->
        <div class="main-panel-manager">
          <h3>Detalhes do Protocolo</h3>
          <div id="protocol-details-view">
            <template v-if="!selectedProtocol">
              <p>Selecione um protocolo na lista para ver os detalhes.</p>
            </template>
            <template v-else-if="currentTab === 'service'">
              <p><strong>Descrição:</strong> {{ selectedProtocol.description }}</p>
            </template>
            <template v-else>
              <p><strong>Images:</strong> <span>{{ selectedProtocol.images }}</span></p>
              <p><strong>Scan Type:</strong> <span>{{ selectedProtocol.scanType }}</span></p>
              <p><strong>Start:</strong> <span>{{ selectedProtocol.start }}</span></p>
              <p><strong>End:</strong> <span>{{ selectedProtocol.end }}</span></p>
              <p><strong>No. Img:</strong> <span>{{ selectedProtocol.noImg }}</span></p>
              <p><strong>Thick:</strong> <span>{{ selectedProtocol.thick }}</span></p>
              <p><strong>Interval:</strong> <span>{{ selectedProtocol.interval }}</span></p>
              <p><strong>Tilt:</strong> <span>{{ selectedProtocol.tilt }}</span></p>
              <p><strong>SFOV:</strong> <span>{{ selectedProtocol.sfov }}</span></p>
              <p><strong>kV:</strong> <span>{{ selectedProtocol.kv }}</span></p>
              <p><strong>mA:</strong> <span>{{ selectedProtocol.ma }}</span></p>
              <p><strong>Time(s):</strong> <span>{{ selectedProtocol.time }}</span></p>
            </template>
          </div>
        </div>
      </div>

      <div class="mgmt-buttons">
        <button @click="createNewProtocol">Novo</button>
        <button style="display:none" disabled>Editar</button>
        <button
          class="btn-delete"
          :disabled="!selectedProtocol || currentTab === 'service'"
          @click="deleteSelected"
        >Excluir</button>
        <button class="cancel" @click="router.push({ name: 'gama' })">Fechar</button>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════ EDITOR VIEW -->
    <div v-show="showEditor" class="protocol-editor-container">
      <div class="editor-header">
        <div class="protocol-title-editor">Protocol: <span>{{ editorProtocol?.name }}</span></div>
        <div class="series-info-editor">Series {{ currentSeriesNum }}</div>
      </div>

      <div class="editor-top-section">
        <!-- Positioning -->
        <div class="positioning-area">
          <div class="patient-illustration">
            <img :src="patientImageSrc" alt="Posicionamento do Paciente"
                 @error="$event.target.style.display='none'">
          </div>
          <div class="positioning-controls">
            <div class="anat-ref">
              <label>Anatomical Reference</label>
              <input type="text" v-model="anatRef">
            </div>
            <div class="patient-orientation">
              <span>Patient Orientation:</span>
              <select v-model="patientOrientation">
                <option>Head First</option>
                <option>Feet First</option>
              </select>
            </div>
            <div class="patient-position">
              <span>Patient Position:</span>
              <select v-model="patientPos">
                <option>Supine</option>
                <option>Prone</option>
                <option>Left Lateral</option>
                <option>Right Lateral</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Center controls -->
        <div class="center-controls-wrapper">
          <div class="function-buttons-area">
            <button
              v-for="fb in functionButtons"
              :key="fb.key"
              class="toggle-button"
              :class="{ active: fb.active }"
              @click="fb.active = !fb.active"
            >{{ fb.label }}</button>
          </div>
          <div class="printer-setup-area">
            <span>Impressora:</span><strong>{{ currentPrinter }}</strong>
          </div>
          <button class="smart-prep-button" @click="showSmartPrepModal = true">Smart Prep Rx</button>
        </div>

        <!-- Dose info -->
        <div class="dose-info-wrapper">
          <div class="dose-info-area">
            <h4>Dose Information</h4>
            <div class="dose-item"><span>CTDIvol (mGy):</span> <strong>{{ editorProtocol?.ctdivol || '73.33' }}</strong></div>
            <div class="dose-item"><span>DLP (mGy·cm):</span> <strong>{{ editorProtocol?.dlp || '1164.33' }}</strong></div>
            <div class="dose-item"><span>Dose Eff. %:</span> <strong>{{ editorProtocol?.doseEff || '89.31' }}</strong></div>
            <p>SimuScan 64 Canais - 128 Virtuais</p>
            <small>Accumulated: <span>{{ editorProtocol?.dlp || '1164.33' }}</span></small>
          </div>
        </div>
      </div>

      <!-- Technical table -->
      <div class="technical-table-area">
        <table>
          <thead>
            <tr>
              <th>
                <div class="split-button-container">
                  Images
                  <button
                    :disabled="seriesData.length < 2"
                    @click="splitSeries"
                  >Split</button>
                </div>
              </th>
              <th>Scan Type</th><th>Start</th><th>End</th><th>No. Img</th>
              <th>Thick</th><th>Interval</th><th>Tilt</th><th>SFOV</th>
              <th>kV</th><th>mA</th><th>Time(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(s, idx) in seriesData" :key="idx">
              <td>{{ s.images }}</td>
              <td><button @click="openScanType(idx)">{{ s.scanType }}</button></td>
              <td><input type="text" v-model="s.start"></td>
              <td><input type="text" v-model="s.end"></td>
              <td><input type="text" v-model="s.noImg" @change="recalcImages(idx)"></td>
              <td><button @click="openThickness(idx)">{{ s.thick }}</button></td>
              <td><input type="text" v-model="s.interval"></td>
              <td><input type="text" v-model="s.tilt"></td>
              <td>
                <select v-model="s.sfov">
                  <option>PED Head</option><option>PED Body</option>
                  <option>Small Head</option><option>Head</option>
                  <option>Small Body</option><option>Medium Body</option>
                  <option>Large Body</option>
                </select>
              </td>
              <td><input type="text" v-model="s.kv"></td>
              <td><button @click="openMaControl(idx)">{{ s.ma }}</button></td>
              <td><input type="text" v-model="s.time"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Icon tabs -->
      <div class="icon-tabs-container">
        <div class="icon-tabs-buttons">
          <button :class="{ active: activeIconTab === 'prep' }" @click="activeIconTab = 'prep'" title="Preparação">⏱️</button>
          <button :class="{ active: activeIconTab === 'recon' }" @click="activeIconTab = 'recon'" title="Reconstrução">◎</button>
          <button :class="{ active: activeIconTab === 'photo' }" @click="activeIconTab = 'photo'" title="Filmagem">📷</button>
        </div>
        <div class="icon-tabs-content">
          <!-- Prep -->
          <div class="icon-tab-pane" :class="{ active: activeIconTab === 'prep' }">
            <div class="data-pair"><div class="data-pair-label">Prep Group</div><input type="text" class="data-pair-value" value="0.0"></div>
            <div class="data-pair"><div class="data-pair-label">ISD</div><div class="data-pair-value">1.3</div></div>
            <div class="data-pair"><div class="data-pair-label">Breath Hold</div><select class="data-pair-value"><option value="N" selected>N</option><option value="S">S</option></select></div>
            <div class="data-pair"><div class="data-pair-label">Breath Time</div><select class="data-pair-value"><option value="S" selected>S</option><option value="N">N</option></select></div>
            <div class="data-pair"><div class="data-pair-label">Voice Lights Timer</div><button class="data-pair-value" @click="showVoiceLightsModal = true">Configure</button></div>
            <div class="data-pair"><div class="data-pair-label">Cine Duration</div><div class="data-pair-value">2.0</div></div>
          </div>
          <!-- Recon -->
          <div class="icon-tab-pane" :class="{ active: activeIconTab === 'recon' }">
            <div class="data-pair"><div class="data-pair-label">Recon Type</div>
              <select class="data-pair-value">
                <option>Soft</option><option selected>Standard</option><option>Lung</option>
                <option>Chest</option><option>Detail</option><option>Bone</option>
                <option>Bone Plus</option><option>Edge</option>
              </select>
            </div>
            <div class="data-pair"><div class="data-pair-label">Kernel</div>
              <select class="data-pair-value">
                <option selected>B31s</option><option>B30f</option><option>B50f</option>
                <option>B70f</option><option>B80f</option><option>H30s</option>
                <option>H50s</option><option>H70s</option>
              </select>
            </div>
            <div class="data-pair"><div class="data-pair-label">Window</div><input type="text" class="data-pair-value" value="400/50"></div>
          </div>
          <!-- Photo -->
          <div class="icon-tab-pane" :class="{ active: activeIconTab === 'photo' }">
            <div class="data-pair"><div class="data-pair-label">Filming</div>
              <select class="data-pair-value"><option selected>AUTO</option><option>OFF</option></select>
            </div>
            <div class="data-pair"><div class="data-pair-label">Layout</div>
              <select class="data-pair-value">
                <option>1x1(1)</option><option>2x2(4)</option><option>3x3(9)</option>
                <option>3x4(12)</option><option selected>4x5(20)</option><option>5x5(25)</option><option>6x5(30)</option>
              </select>
            </div>
            <div class="data-pair"><div class="data-pair-label">Printer</div>
              <select class="data-pair-value" v-model="currentPrinter">
                <option>AGFA Drystar 5500</option>
                <option>KODAK 6900 Photo Printer</option>
                <option>Adicionar Nova Printer</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom actions -->
      <div class="bottom-actions-area">
        <div class="action-buttons-left">
          <button class="cancel" @click="cancelEdit">Cancel</button>
        </div>
        <div class="action-buttons-center">
          <button disabled>Prior Series</button>
          <button>Next Series</button>
          <button @click="createNewSeries" :disabled="seriesData.length >= 4">Create New Series</button>
          <button @click="deleteLastSeries" :disabled="seriesData.length <= 1">Delete Series</button>
        </div>
        <div class="action-buttons-right">
          <button class="toggle-btn">Priority Recon</button>
          <button class="toggle-btn">Auto Scan</button>
          <button class="accept" @click="acceptEdit">Accept</button>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════ MODALS -->

    <!-- Scan Type Modal -->
    <div class="modal" v-show="showScanTypeModal" @click.self="showScanTypeModal = false">
      <div class="modal-content" style="width:600px">
        <h3>Scan Type Configuration</h3>
        <div class="modal-section">
          <h4>Scan Type</h4>
          <span v-for="v in ['Axial','Helical','Cine','Cardiac']" :key="v"
            class="toggle-button" :class="{ active: scanTypeCfg.scanType === v }"
            @click="scanTypeCfg.scanType = v">{{ v }}</span>
        </div>
        <div class="modal-section">
          <h4>Cardiac Mode</h4>
          <div :style="{ opacity: scanTypeCfg.scanType === 'Cardiac' ? 1 : 0.5, pointerEvents: scanTypeCfg.scanType === 'Cardiac' ? 'auto' : 'none' }">
            <span v-for="v in ['SnapShot Segment(Helical)','SnapShot Burst(helical)','SnapShot Burst-Plus(Helical)','SnapShot Pulse(Cine)']" :key="v"
              class="toggle-button" :class="{ active: scanTypeCfg.cardiacMode === v }"
              @click="scanTypeCfg.cardiacMode = v">{{ v }}</span>
          </div>
        </div>
        <div class="modal-section">
          <h4>Rotation Time</h4>
          <span v-for="v in ['0.35','0.37','0.4','0.42','0.45','0.47','0.5','0.6','0.7','0.8','0.9','1.0','2.0']" :key="v"
            class="toggle-button" :class="{ active: scanTypeCfg.rotationTime === v }"
            @click="scanTypeCfg.rotationTime = v">{{ v }}</span>
        </div>
        <div class="modal-section">
          <h4>Rotation Length</h4>
          <span v-for="v in ['Segment','Full']" :key="v"
            class="toggle-button" :class="{ active: scanTypeCfg.rotationLength === v }"
            @click="scanTypeCfg.rotationLength = v">{{ v }}</span>
        </div>
        <div class="modal-section">
          <h4>Shuttle Mode</h4>
          <span v-for="v in ['Off','On']" :key="v"
            class="toggle-button" :class="{ active: scanTypeCfg.shuttleMode === v }"
            @click="scanTypeCfg.shuttleMode = v">{{ v }}</span>
        </div>
        <button @click="applyScanType">OK</button>
        <button @click="showScanTypeModal = false">Cancel</button>
      </div>
    </div>

    <!-- mA Control Modal -->
    <div class="modal" v-show="showMaModal" @click.self="showMaModal = false">
      <div class="modal-content" style="width:500px">
        <h3>mA Control</h3>
        <div class="modal-section">
          <div class="modal-row">
            <span class="toggle-button" :class="{ active: maCfg.autoMa }" @click="maCfg.autoMa = true; maCfg.manualMa = false">Auto mA</span>
          </div>
          <div style="margin:15px 0">
            <label style="display:block;margin-bottom:10px">Reference Noise Index</label>
            <div class="modal-row">
              <input type="number" v-model="maCfg.refNoiseIndex" step="0.01" class="modal-input">
              <button @click="maCfg.refNoiseIndex = 21.45">Reset</button>
              <div class="increment-controls">
                <button class="increment-btn" @click="maCfg.doseSteps = Math.max(-10, maCfg.doseSteps - 1)">-</button>
                <input type="number" v-model="maCfg.doseSteps" class="modal-input" style="width:60px">
                <button class="increment-btn" @click="maCfg.doseSteps = Math.min(10, maCfg.doseSteps + 1)">+</button>
              </div>
              <input type="number" v-model="maCfg.noiseIndex" step="0.01" class="modal-input">
            </div>
          </div>
          <div style="margin:15px 0">
            <label style="display:block;margin-bottom:10px">mA Range</label>
            <div class="modal-row">
              <div class="input-group"><label>Min</label><input type="number" v-model="maCfg.maMin" class="modal-input"></div>
              <div class="input-group"><label>Max</label><input type="number" v-model="maCfg.maMax" class="modal-input"></div>
              <div class="input-group"><label>% Dose Reduction</label><input type="number" v-model="maCfg.doseReductionAuto" class="modal-input"></div>
              <span class="toggle-button" :class="{ active: maCfg.smartMa }" @click="maCfg.smartMa = !maCfg.smartMa">Smart mA</span>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="modal-section">
          <div class="modal-row">
            <span class="toggle-button" :class="{ active: maCfg.manualMa }" @click="maCfg.manualMa = true; maCfg.autoMa = false">Manual mA</span>
          </div>
          <div class="modal-row" style="margin-top:10px">
            <div class="input-group"><label>Ref</label><input type="number" v-model="maCfg.manualRef" class="modal-input" :disabled="!maCfg.manualMa"></div>
            <div class="input-group"><label>Act</label><input type="number" v-model="maCfg.manualAct" class="modal-input" :disabled="!maCfg.manualMa"></div>
            <div class="input-group"><label>% Dose Reduction</label><input type="number" v-model="maCfg.doseReductionManual" class="modal-input" :disabled="!maCfg.manualMa"></div>
          </div>
        </div>
        <div style="margin-top:20px">
          <button @click="applyMaControl">OK</button>
          <button @click="showMaModal = false">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Voice & Lights Modal -->
    <div class="modal" v-show="showVoiceLightsModal" @click.self="showVoiceLightsModal = false">
      <div class="modal-content" style="width:600px">
        <h3>AutoVoice & BreathingLights Selection</h3>
        <div class="modal-row">
          <div class="modal-column">
            <label>Language:</label>
            <select v-model="voiceCfg.language" style="margin-left:10px;background:#1c4e8c;color:white;border:1px solid #3c6eac;padding:5px">
              <option value="en">English</option>
              <option value="pt-br">Português Brasil</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <div class="modal-column">
            <label>Preset Delay Time:</label>
            <div class="increment-controls">
              <button class="increment-btn" @click="voiceCfg.delayTime = Math.max(0, voiceCfg.delayTime - 1)">-</button>
              <input type="number" v-model="voiceCfg.delayTime" class="modal-input">
              <button class="increment-btn" @click="voiceCfg.delayTime = Math.min(20, voiceCfg.delayTime + 1)">+</button>
            </div>
          </div>
        </div>
        <div class="modal-grid" style="grid-template-columns:repeat(2,1fr);margin:20px 0">
          <span v-for="opt in voiceOptions" :key="opt.key"
            class="toggle-button" :class="{ active: opt.active }"
            @click="opt.active = !opt.active">{{ opt.label }}</span>
        </div>
        <div class="modal-row" style="margin:20px 0">
          <span class="toggle-button" :class="{ active: voiceCfg.autoVoice }" @click="voiceCfg.autoVoice = !voiceCfg.autoVoice">AutoVoice</span>
          <span class="toggle-button" :class="{ active: voiceCfg.breathingLight }" @click="voiceCfg.breathingLight = !voiceCfg.breathingLight">Breathing Light</span>
          <span class="toggle-button" :class="{ active: voiceCfg.timer }" @click="voiceCfg.timer = !voiceCfg.timer">Timer</span>
        </div>
        <button @click="showVoiceLightsModal = false">OK</button>
        <button @click="showVoiceLightsModal = false">Cancel</button>
      </div>
    </div>

    <!-- Image Thickness Modal -->
    <div class="modal" v-show="showThicknessModal" @click.self="showThicknessModal = false">
      <div class="modal-content" style="width:700px">
        <h3>Select the desired Image Thickness</h3>
        <div class="modal-section">
          <h4>Detector Coverage(mm)</h4>
          <span v-for="v in ['20.0','40.0']" :key="v"
            class="toggle-button" :class="{ active: thicknessCfg.detectorCoverage === v }"
            @click="thicknessCfg.detectorCoverage = v">{{ v }}</span>
        </div>
        <div class="modal-section">
          <h4>Helical Thickness(mm)</h4>
          <span v-for="v in ['0.625','1.25','2.5','3.75','5.0']" :key="v"
            class="toggle-button" :class="{ active: thicknessCfg.helicalThickness === v }"
            @click="thicknessCfg.helicalThickness = v">{{ v }}</span>
        </div>
        <div class="modal-section">
          <h4>Pitch & Speed(mm/rot)</h4>
          <span v-for="v in ['0.516:1 20.62','0.984:1 39.37','1.375:1 55.00']" :key="v"
            class="toggle-button" :class="{ active: thicknessCfg.pitchSpeed === v }"
            @click="thicknessCfg.pitchSpeed = v">{{ v }}</span>
        </div>
        <div class="modal-section">
          <h4>Rotation Time(s)</h4>
          <span v-for="v in ['0.35','0.37','0.4','0.42','0.45','0.47','0.5','0.6','0.7','0.8','0.9','1.0','2.0']" :key="v"
            class="toggle-button" :class="{ active: thicknessCfg.rotationTime === v }"
            @click="thicknessCfg.rotationTime = v">{{ v }}</span>
        </div>
        <button @click="applyThickness">OK</button>
        <button @click="showThicknessModal = false">Cancel</button>
      </div>
    </div>

    <!-- Smart Prep Modal -->
    <div class="modal" v-show="showSmartPrepModal" @click.self="showSmartPrepModal = false">
      <div class="modal-content" style="width:600px">
        <h3>Smart Prep</h3>
        <div class="modal-row">
          <div class="modal-column right">
            <span class="toggle-button" :class="{ active: smartPrepCfg.on }" @click="smartPrepCfg.on = !smartPrepCfg.on">On</span><br>
            <span class="toggle-button" :class="{ active: smartPrepCfg.dynamicTransition }" @click="smartPrepCfg.dynamicTransition = !smartPrepCfg.dynamicTransition">Dynamic Transition</span>
          </div>
          <div class="modal-column">
            <span class="toggle-button" :class="{ active: smartPrepCfg.showLocalizer }" @click="smartPrepCfg.showLocalizer = !smartPrepCfg.showLocalizer">Show Localizer</span><br>
            <span class="toggle-button" :class="{ active: smartPrepCfg.autoVoice }" @click="smartPrepCfg.autoVoice = !smartPrepCfg.autoVoice">AutoVoice Pre-Message</span><br>
            <span class="toggle-button" :class="{ active: smartPrepCfg.autoMinDelay }" @click="smartPrepCfg.autoMinDelay = !smartPrepCfg.autoMinDelay">Auto Minimum Delay</span>
          </div>
        </div>
        <div class="modal-grid" style="grid-template-columns:repeat(3,1fr);margin:20px 0">
          <div class="input-group"><label>Monitor Location</label><input type="text" v-model="smartPrepCfg.monitorLocation"></div>
          <div class="input-group"><label>mA</label><input type="number" v-model="smartPrepCfg.ma"></div>
          <div class="input-group"><label>Monitoring Delay</label><input type="number" v-model="smartPrepCfg.monitoringDelay" step="0.1"></div>
          <div class="input-group"><label>Monitoring ISD</label><input type="number" v-model="smartPrepCfg.monitoringISD" step="0.1"></div>
          <div class="input-group"><label>Enhancement Threshold</label><input type="number" v-model="smartPrepCfg.enhancementThreshold"></div>
          <div class="input-group"><label>Diagnostic Delay</label><input type="number" v-model="smartPrepCfg.diagnosticDelay" step="0.1"></div>
        </div>
        <button @click="showSmartPrepModal = false">Accept</button>
        <button @click="showSmartPrepModal = false">Cancel</button>
      </div>
    </div>

    <!-- Success Modal -->
    <div class="modal" v-show="showSuccessModal">
      <div class="modal-content">
        <h3>✓ Protocolo salvo com sucesso!</h3>
        <p>As alterações foram aplicadas ao protocolo.</p>
        <button @click="showSuccessModal = false">OK</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const BASE_URL = import.meta.env.BASE_URL

// ── Views ──────────────────────────────────────────────────────────────────
const showEditor = ref(false)
const currentTab = ref('gama')
const selectedIndex = ref(-1)
const editorProtocol = ref(null)
const currentSeriesNum = ref(1)
const seriesData = ref([])

// ── Modals ─────────────────────────────────────────────────────────────────
const showScanTypeModal = ref(false)
const showMaModal = ref(false)
const showVoiceLightsModal = ref(false)
const showThicknessModal = ref(false)
const showSmartPrepModal = ref(false)
const showSuccessModal = ref(false)
const editSeriesIdx = ref(-1)

// ── Editor state ───────────────────────────────────────────────────────────
const anatRef = ref('OM')
const patientOrientation = ref('Head First')
const patientPos = ref('Supine')
const currentPrinter = ref('AGFA Drystar 5500')
const activeIconTab = ref('prep')

const functionButtons = reactive([
  { key: 'copyOrient', label: 'Copy Pt. Orient.', active: false },
  { key: 'ptPosition', label: 'Pt. Position.', active: false },
  { key: 'anatRef', label: 'Anat. Ref.', active: false },
  { key: 'autoStore', label: 'Auto Store', active: true },
  { key: 'autoPacs', label: 'Auto Transfer PACS', active: false },
  { key: 'doseReport', label: 'Dose Report Auto Transfer', active: false },
  { key: 'showLoc', label: 'Show Localizer', active: false },
  { key: 'autoFilm', label: 'AUTO Film Setup', active: false },
])

// ── Modal configs ──────────────────────────────────────────────────────────
const scanTypeCfg = reactive({ scanType: 'Axial', cardiacMode: '', rotationTime: '0.6', rotationLength: 'Full', shuttleMode: 'Off' })
const maCfg = reactive({ autoMa: true, manualMa: false, refNoiseIndex: 21.45, doseSteps: 6, noiseIndex: 15.01, maMin: 10, maMax: 500, doseReductionAuto: 30, smartMa: true, manualRef: 450, manualAct: 450, doseReductionManual: 0 })
const voiceCfg = reactive({ language: 'pt-br', delayTime: 5, autoVoice: true, breathingLight: true, timer: true })
const voiceOptions = reactive([
  { key: 'suspension', label: 'Suspension', active: false },
  { key: 'inspiration', label: 'Inspiration', active: false },
  { key: 'expiration', label: 'Expiration', active: false },
  { key: 'inspiracao', label: 'INSPIRAÇÃO', active: true },
  { key: 'expiracao', label: 'EXPIRAÇÃO', active: false },
  { key: 'pararRespirar', label: 'PARAR DE RESPIRAR', active: false },
  { key: 'apneiaLivre', label: 'APNEIA LIVRE', active: false },
])
const thicknessCfg = reactive({ detectorCoverage: '40.0', helicalThickness: '1.25', pitchSpeed: '0.984:1 39.37', rotationTime: '0.6' })
const smartPrepCfg = reactive({ on: true, dynamicTransition: false, showLocalizer: false, autoVoice: false, autoMinDelay: false, monitorLocation: 'I400.00', ma: 40, monitoringDelay: 10.0, monitoringISD: 2.5, enhancementThreshold: 50, diagnosticDelay: 8.2 })

// ── Protocol database ──────────────────────────────────────────────────────
const protocolDatabase = reactive({
  gama: [
    { name: 'CRANIO ROTINA', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Head', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'CRANIO ANGIO', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Head', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'CRANIO PERFUSAO', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Head', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'FACE', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Head', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'SEIOS DA FACE', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Head', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'OUVIDO', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Head', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'PESCOCO', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Head', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'TORAX ROTINA', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Large Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'TORAX ALTA RESOLUCAO', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Large Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'TORAX ANGIO', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Large Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'ABDOME ROTINA', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Large Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'ABDOME MULTIFASICO', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Large Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'PELVE', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Large Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'COLUNA CERVICAL', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Medium Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'COLUNA TORACICA', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Medium Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'COLUNA LOMBAR', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Medium Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'EXTREMIDADES SUP', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Small Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'EXTREMIDADES INF', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Small Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'ANGIOGRAFIA CORONARIA', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Large Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'SCORE DE CALCIO', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Large Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'PEDIATRICO CRANIO', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'PED Head', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'PEDIATRICO TORAX', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'PED Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'PEDIATRICO ABDOME', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'PED Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'UROGRAFIA', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Large Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'ENTEROGRAFIA', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Large Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'COLONOGRAFIA', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Large Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'BIOPSIA GUIADA', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Medium Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'CORPO INTEIRO', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Large Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
    { name: 'DENSIDADE OSSEA', images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00', noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Medium Body', kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31' },
  ],
  user: [
    { name: 'USER PROTOCOL 1', images: '1-20', scanType: 'Helical Full', start: 'I350.00', end: 'I150.00', noImg: '20', thick: '2.5', interval: '2.5', tilt: '0', sfov: 'Medium Body', kv: '120', ma: '400', time: '0.8', ctdivol: '65.20', dlp: '980.50', doseEff: '75.40' },
    { name: 'USER PROTOCOL 2', images: '1-25', scanType: 'Helical Full', start: 'I300.00', end: 'I100.00', noImg: '25', thick: '1.5', interval: '1.5', tilt: '0', sfov: 'Large Body', kv: '120', ma: '350', time: '0.7', ctdivol: '58.90', dlp: '850.75', doseEff: '68.20' },
  ],
  service: [
    { name: 'DAILY CALIBRATION', description: 'Executa a calibração diária dos detectores e do sistema de raios-X para garantir a qualidade e a precisão da imagem.' },
    { name: 'TUBE WARMUP', description: 'Realiza o aquecimento do tubo de raios-X, um procedimento necessário para proteger o tubo e garantir sua longevidade e performance estável.' },
    { name: 'QA PHANTOM SCAN', description: 'Escaneia um objeto de teste (phantom) para controle de qualidade (QA), verificando parâmetros como uniformidade, ruído e resolução espacial.' },
  ],
})

// ── Computed ───────────────────────────────────────────────────────────────
const currentProtocols = computed(() => protocolDatabase[currentTab.value] || [])
const selectedProtocol = computed(() => selectedIndex.value >= 0 ? currentProtocols.value[selectedIndex.value] : null)

const patientImageSrc = computed(() => {
  const o = patientOrientation.value
  const p = patientPos.value
  let img = 'hfsupine.png'
  if (o === 'Head First') {
    if (p === 'Prone') img = 'hfprone.jpg.png'
    else if (p === 'Left Lateral') img = 'hfllateral.png'
    else if (p === 'Right Lateral') img = 'hfRight.png'
    else img = 'hfsupine.png'
  } else {
    if (p === 'Prone') img = 'ffprone.png'
    else if (p === 'Left Lateral') img = 'ffllateral.png'
    else if (p === 'Right Lateral') img = 'ffrlateral.png'
    else img = 'ffsupine.jpg.png'
  }
  return BASE_URL + 'imagens/' + img
})

// ── List view actions ──────────────────────────────────────────────────────
function switchTab(tab) {
  currentTab.value = tab
  selectedIndex.value = -1
}

function selectProtocol(i) {
  selectedIndex.value = i
  if (currentTab.value !== 'service') {
    openEditor(currentProtocols.value[i])
  }
}

function createNewProtocol() {
  openEditor({
    name: 'NOVO PROTOCOLO',
    images: '1-29', scanType: 'Helical Full', start: 'I400.00', end: 'I200.00',
    noImg: '29', thick: '1.25', interval: '1.25', tilt: '0', sfov: 'Head',
    kv: '120', ma: '450', time: '0.6', ctdivol: '73.33', dlp: '1164.33', doseEff: '89.31',
  })
}

function deleteSelected() {
  if (!selectedProtocol.value || currentTab.value === 'service') return
  if (confirm('Tem certeza que deseja excluir este protocolo?')) {
    protocolDatabase[currentTab.value].splice(selectedIndex.value, 1)
    selectedIndex.value = -1
  }
}

// ── Editor actions ─────────────────────────────────────────────────────────
function openEditor(protocol) {
  editorProtocol.value = protocol
  seriesData.value = [
    {
      images: protocol.images || '1-29',
      scanType: protocol.scanType || 'Helical Full',
      start: protocol.start || 'I400.00',
      end: protocol.end || 'I200.00',
      noImg: protocol.noImg || '29',
      thick: protocol.thick || '1.25',
      interval: protocol.interval || '1.25',
      tilt: protocol.tilt || '0',
      sfov: protocol.sfov || 'Head',
      kv: protocol.kv || '120',
      ma: protocol.ma || '450',
      time: protocol.time || '0.6',
    }
  ]
  currentSeriesNum.value = 1
  activeIconTab.value = 'prep'
  showEditor.value = true
}

function cancelEdit() {
  if (confirm('Descartar alterações?')) showEditor.value = false
}

function acceptEdit() {
  const tab = currentTab.value
  if (tab === 'service') { showEditor.value = false; return }
  const idx = selectedIndex.value
  const updated = { ...editorProtocol.value, ...seriesData.value[0] }
  if (idx >= 0 && idx < protocolDatabase[tab].length) {
    protocolDatabase[tab][idx] = updated
  } else {
    protocolDatabase[tab].push(updated)
  }
  showSuccessModal.value = true
  setTimeout(() => { showSuccessModal.value = false; showEditor.value = false }, 1500)
}

function createNewSeries() {
  if (seriesData.value.length >= 4) return
  const last = seriesData.value[seriesData.value.length - 1]
  const lastEnd = parseInt(last.images.split('-')[1]) || 29
  const newStart = lastEnd + 1
  const newEnd = newStart + parseInt(last.noImg) - 1
  seriesData.value.push({ ...last, images: `${newStart}-${newEnd}` })
}

function deleteLastSeries() {
  if (seriesData.value.length <= 1) return
  seriesData.value.pop()
}

function splitSeries() {
  if (seriesData.value.length < 2) return
  const firstEnd = parseInt(seriesData.value[0].images.split('-')[1]) || 29
  for (let i = 1; i < seriesData.value.length; i++) {
    const s = seriesData.value[i]
    const newStart = firstEnd + 1
    s.images = `${newStart}-${newStart + parseInt(s.noImg) - 1}`
  }
}

function recalcImages(idx) {
  const s = seriesData.value[idx]
  const startNum = parseInt(s.images.split('-')[0]) || 1
  s.images = `${startNum}-${startNum + parseInt(s.noImg) - 1}`
}

// ── Modal openers ──────────────────────────────────────────────────────────
function openScanType(idx) { editSeriesIdx.value = idx; showScanTypeModal.value = true }
function openMaControl(idx) { editSeriesIdx.value = idx; showMaModal.value = true }
function openThickness(idx) { editSeriesIdx.value = idx; showThicknessModal.value = true }

function applyScanType() {
  const s = seriesData.value[editSeriesIdx.value]
  if (s) { s.scanType = scanTypeCfg.scanType; s.time = scanTypeCfg.rotationTime }
  showScanTypeModal.value = false
}

function applyMaControl() {
  const s = seriesData.value[editSeriesIdx.value]
  if (s) s.ma = maCfg.manualMa ? String(maCfg.manualRef) : 'Auto'
  showMaModal.value = false
}

function applyThickness() {
  const s = seriesData.value[editSeriesIdx.value]
  if (s) { s.thick = thicknessCfg.helicalThickness; s.interval = thicknessCfg.helicalThickness; s.time = thicknessCfg.rotationTime }
  showThicknessModal.value = false
}
</script>

<style scoped>
.pm-wrapper { width: 100%; min-height: 100vh; background: #003366; color: #e0e0e0; font-family: Arial, sans-serif; box-sizing: border-box; }

/* LIST VIEW */
.pm-list-view { display: flex; flex-direction: column; width: 100%; height: 100vh; padding: 15px; gap: 15px; background: #003366; box-sizing: border-box; }
.protocol-manager-container { display: flex; gap: 15px; flex-grow: 1; overflow: hidden; }
.side-panel { flex-basis: 350px; flex-shrink: 0; display: flex; flex-direction: column; gap: 10px; background: #0b2c5d; padding: 15px; border-radius: 6px; border: 1px solid #3c6eac; }
.main-panel-manager { flex-grow: 1; display: flex; flex-direction: column; background: #0b2c5d; padding: 15px; border-radius: 6px; overflow-y: auto; border: 1px solid #3c6eac; }
.protocol-tabs-manager { display: flex; border-bottom: 1px solid #3c6eac; margin-bottom: 10px; }
.protocol-tabs-manager button { flex-grow: 1; padding: 10px; font-size: 1em; background: #1c4e8c; color: #fff; border: 1px solid #3c6eac; cursor: pointer; border-bottom: none; }
.protocol-tabs-manager button.active { background: #f39c12; color: #000; font-weight: bold; }
.main-panel-manager h3 { text-align: center; color: #f39c12; margin: 0 0 10px; padding-bottom: 10px; border-bottom: 1px solid #3c6eac; font-size: 1.2em; }
#protocol-details-view p { margin: 8px 0; font-size: .9em; display: flex; justify-content: space-between; border-bottom: 1px solid #3c6eac; padding-bottom: 4px; }
#protocol-details-view p strong { color: #f39c12; }
.protocol-list-container-manager { flex-grow: 1; background: #003366; border: 1px solid #3c6eac; border-radius: 5px; padding: 5px; overflow-y: auto; }
#protocol-list-manager { list-style: none; padding: 0; margin: 0; }
#protocol-list-manager li { padding: 12px 14px; border-bottom: 1px solid #3c6eac; cursor: pointer; transition: background .2s; font-size: 1em; color: #e0e0e0; }
#protocol-list-manager li:hover { background: #1c4e8c; }
#protocol-list-manager li.selected { background: #f39c12; color: #000; font-weight: bold; }
.mgmt-buttons { display: flex; gap: 15px; justify-content: flex-end; padding-top: 15px; border-top: 1px solid #3c6eac; }
.mgmt-buttons button { padding: 10px 20px; font-size: 1em; border-radius: 5px; border: none; background: #3c6eac; color: #fff; cursor: pointer; transition: background .2s; }
.mgmt-buttons button:hover:not(:disabled) { background: #5c8ebc; }
.mgmt-buttons button:disabled { background: #555; cursor: not-allowed; color: #bbb; }
.mgmt-buttons .btn-delete { background: #dc3545; }
.mgmt-buttons .btn-delete:hover:not(:disabled) { background: #c82333; }
.mgmt-buttons .cancel { background: #dc3545; }
.mgmt-buttons .cancel:hover { background: #c82333; }

/* EDITOR VIEW */
.protocol-editor-container { background: #003366; padding: 15px; display: flex; flex-direction: column; gap: 15px; width: 100%; min-height: 100vh; box-sizing: border-box; overflow-y: auto; color: white; }
.editor-header { display: flex; justify-content: space-between; align-items: center; background: #0b2c5d; padding: 8px 20px; border-radius: 6px; border: 1px solid #3c6eac; }
.protocol-title-editor { font-size: 1.5em; font-weight: bold; color: #f39c12; }
.series-info-editor { font-size: 1.3em; }
.editor-top-section { display: flex; gap: 15px; align-items: stretch; }
.positioning-area { flex: 1.5; background: rgba(11,44,93,.5); border-radius: 6px; padding: 10px; display: flex; gap: 15px; border: 1px solid #3c6eac; }
.patient-illustration { flex-basis: 180px; flex-shrink: 0; }
.patient-illustration img { width: 100%; height: auto; object-fit: contain; }
.positioning-controls { flex-grow: 1; display: flex; flex-direction: column; justify-content: space-around; }
.anat-ref label { display: block; font-size: .9em; margin-bottom: 5px; }
.anat-ref input { width: 80%; background: #1c4e8c; border: 1px solid #3c6eac; color: white; border-radius: 4px; padding: 5px; font-size: 1em; }
.patient-orientation, .patient-position { font-size: 1em; margin: 10px 0; }
.patient-orientation select, .patient-position select { margin-left: 8px; background: #1c4e8c; border: 1px solid #3c6eac; color: white; border-radius: 4px; padding: 5px; font-size: 1em; }
.center-controls-wrapper { flex: 1.5; display: flex; flex-direction: column; gap: 10px; }
.function-buttons-area { display: flex; flex-wrap: wrap; gap: 8px; }
.function-buttons-area .toggle-button { flex: 1 1 22%; font-size: .85em; background: #1c4e8c; color: white; border: 1px solid #3c6eac; border-radius: 5px; padding: 8px; text-align: center; cursor: pointer; transition: background .2s; }
.function-buttons-area .toggle-button.active { background: #f39c12; color: black; font-weight: bold; }
.printer-setup-area { background: rgba(11,44,93,.5); padding: 10px; text-align: center; border-radius: 4px; font-size: 1em; border: 1px solid #3c6eac; }
.printer-setup-area strong { color: #f39c12; margin-left: 5px; }
.smart-prep-button { background: #f39c12; color: black; border: 1px solid #3c6eac; border-radius: 4px; padding: 8px 15px; cursor: pointer; font-weight: bold; margin-top: 10px; transition: background .2s; }
.smart-prep-button:hover { background: #e67e22; }
.dose-info-wrapper { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.dose-info-area { background: rgba(11,44,93,.5); border-radius: 6px; padding: 15px; text-align: center; flex-grow: 1; border: 1px solid #3c6eac; }
.dose-info-area h4 { margin: 0 0 15px; font-size: 1.1em; color: #f39c12; }
.dose-item { display: flex; justify-content: space-between; font-size: 1em; margin-bottom: 8px; }
.dose-info-area p { font-size: .9em; margin: 15px 0; border-top: 1px solid #3c6eac; padding-top: 10px; }
.dose-info-area small { font-size: .8em; color: #ccc; }
.technical-table-area { background: rgba(11,44,93,.5); padding: 8px; border-radius: 6px; overflow-x: auto; border: 1px solid #3c6eac; }
.technical-table-area table { width: 100%; border-collapse: collapse; font-size: .9em; text-align: center; }
.technical-table-area th { background: #0b2c5d; padding: 10px; white-space: nowrap; border: 1px solid #3c6eac; color: white; font-weight: bold; }
.technical-table-area td { background: #1c4e8c; padding: 2px; border: 1px solid #3c6eac; vertical-align: middle; }
.technical-table-area td input, .technical-table-area td select { width: 98%; background: transparent; border: none; color: white; text-align: center; padding: 8px 2px; font-size: 1em; appearance: none; }
.technical-table-area td button { width: 98%; background: #f39c12; border: 1px solid #3c6eac; color: black; text-align: center; padding: 8px 2px; font-size: 1em; cursor: pointer; border-radius: 3px; }
.split-button-container { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.split-button-container button { background: #f39c12; color: black; border: none; border-radius: 3px; padding: 2px 8px; font-size: .8em; cursor: pointer; }
.split-button-container button:disabled { background: #555; cursor: not-allowed; }
.icon-tabs-container { margin-top: 10px; border: 1px solid #3c6eac; border-radius: 6px; }
.icon-tabs-buttons { display: flex; justify-content: space-around; background: #0b2c5d; border-radius: 6px 6px 0 0; padding: 5px; }
.icon-tabs-buttons button { background: #1c4e8c; color: white; border: 1px solid #3c6eac; width: 60px; height: 60px; border-radius: 50%; font-size: 2.5em; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.icon-tabs-buttons button.active { background: #f39c12; color: black; }
.icon-tabs-content { padding: 15px; background: rgba(11,44,93,.5); }
.icon-tab-pane { display: none; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; }
.icon-tab-pane.active { display: grid; }
.data-pair { text-align: center; }
.data-pair-label { font-size: .8em; color: #ccc; }
.data-pair-value { font-size: 1.1em; color: #f39c12; font-weight: bold; display: block; margin-top: 5px; }
.icon-tab-pane input, .icon-tab-pane select { background: #1c4e8c; border: 1px solid #3c6eac; color: white; border-radius: 4px; padding: 5px; text-align: center; width: 100%; margin-top: 5px; }
.icon-tab-pane button { background: #f39c12; border: 1px solid #3c6eac; color: black; border-radius: 4px; padding: 5px; width: 100%; margin-top: 5px; cursor: pointer; }
.bottom-actions-area { display: flex; gap: 15px; background: #0b2c5d; padding: 10px; border-radius: 6px; justify-content: space-between; border: 1px solid #3c6eac; }
.bottom-actions-area div { display: flex; gap: 10px; }
.bottom-actions-area button { background: #3c6eac; color: white; border: 1px solid #5c8ebc; border-radius: 5px; padding: 10px 15px; font-size: .9em; cursor: pointer; }
.bottom-actions-area button:hover:not(:disabled) { background: #5c8ebc; }
.bottom-actions-area button:disabled { background: #555; cursor: not-allowed; color: #999; }
.bottom-actions-area .toggle-btn { background: rgba(0,0,0,.25); border: 1px solid rgba(255,255,255,.2); }
.bottom-actions-area .toggle-btn.active { background: #f39c12; color: black; font-weight: bold; }
.bottom-actions-area .cancel { background: #dc3545; }
.bottom-actions-area .accept { background: #f39c12; color: black; font-weight: bold; }

/* MODALS */
.modal { display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,.7); z-index: 1000; align-items: center; justify-content: center; }
.modal-content { background: #0b2c5d; color: white; padding: 30px; border-radius: 8px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,.5); border: 2px solid #f39c12; max-width: 90%; max-height: 90vh; overflow-y: auto; }
.modal-content h3 { margin-bottom: 20px; color: #f39c12; }
.modal-content > button { background: #f39c12; color: black; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; margin: 5px; }
.modal-grid { display: grid; gap: 15px; margin: 20px 0; }
.modal-section { background: rgba(28,78,140,.3); padding: 15px; border-radius: 6px; border: 1px solid #3c6eac; margin: 10px 0; }
.modal-section h4 { color: #f39c12; margin-bottom: 10px; font-size: 1.1em; }
.toggle-button { display: inline-block; background: #1c4e8c; color: white; border: 1px solid #3c6eac; border-radius: 4px; padding: 8px 12px; margin: 3px; cursor: pointer; transition: all .2s; font-size: .9em; user-select: none; }
.toggle-button.active { background: #f39c12; color: black; font-weight: bold; }
.toggle-button:hover { background: #2c5e9c; }
.toggle-button.active:hover { background: #e67e22; }
.increment-controls { display: flex; align-items: center; gap: 5px; justify-content: center; }
.increment-btn { background: #f39c12; color: black; border: 1px solid #3c6eac; border-radius: 3px; width: 25px; height: 25px; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center; }
.modal-input { background: #1c4e8c; border: 1px solid #3c6eac; color: white; border-radius: 4px; padding: 5px; text-align: center; width: 80px; }
.divider { border-bottom: 2px solid #3c6eac; margin: 20px 0; }
.modal-row { display: flex; gap: 15px; align-items: center; margin: 10px 0; flex-wrap: wrap; justify-content: center; }
.modal-column { flex: 1; text-align: left; }
.modal-column.right { text-align: right; }
.input-group { display: flex; flex-direction: column; align-items: center; gap: 5px; margin: 10px; }
.input-group label { font-size: .9em; color: #ccc; }
.input-group input { background: #1c4e8c; border: 1px solid #3c6eac; color: white; border-radius: 4px; padding: 5px; text-align: center; width: 100px; }
</style>
