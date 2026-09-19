<template>
  <div class="sigma-on-root">
    <!-- ROTATE OVERLAY (mobile portrait) -->
    <div v-if="isMobile && isPortrait" class="rotate-overlay">
      <div class="rotate-content">
        <div class="rotate-icon">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="28" y="8" width="24" height="40" rx="3" stroke="#3498db" stroke-width="2.5" fill="none"/>
            <rect x="32" y="12" width="16" height="28" rx="1" fill="rgba(52,152,219,0.1)"/>
            <circle cx="40" cy="44" r="2" fill="#3498db"/>
            <path d="M16 40 A24 24 0 0 1 64 40" stroke="#e91e8c" stroke-width="2.5" stroke-linecap="round" fill="none" stroke-dasharray="6 3"/>
            <polyline points="60,34 64,40 58,42" stroke="#e91e8c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2 class="rotate-title">Gire o dispositivo</h2>
        <p class="rotate-desc">O console Sigma ON CT foi projetado para uso em <strong>modo paisagem</strong>.</p>
        <p class="rotate-hint">Gire seu dispositivo horizontalmente para continuar.</p>
        <button class="rotate-btn-back" @click="$router.push('/escolha')">← Voltar à escolha de sistema</button>
      </div>
    </div>

    <template v-else>
      <!-- ══════════ BOOT SCREEN ══════════ -->
      <div v-if="currentScreen === 'boot'" class="boot-screen">
        <!-- Painel esquerdo — verde, 50% -->
        <div class="boot-left">
          <!-- Logo SimuScan no canto superior esquerdo -->
          <div class="boot-logo-wrap">
            <img :src="BASE_URL + 'imagens/logo.png'" alt="SimuScan"
                 class="boot-logo-icon"
                 @error="$event.target.style.display='none'" />
            <span class="boot-logo-text">
              <span class="t-simu">Simu</span><span class="t-scan">Scan</span>
            </span>
          </div>
          <!-- Esfera decorativa radial -->
          <div class="boot-sphere"></div>
          <!-- Marca d'água ON — canto inferior esquerdo -->
          <div class="boot-on-watermark">On</div>
        </div>

        <!-- Painel direito — escuro, 50% -->
        <div class="boot-right">
          <div class="boot-right-inner">
            <div class="boot-product-name">Sigma ON CT</div>
            <div class="boot-product-version">VS10A · SimuScan Edition</div>
            <div class="boot-progress-wrap">
              <div class="boot-progress-bar" :style="{ width: bootProgress + '%' }"></div>
            </div>
            <div class="boot-status-text">{{ bootStatusText }}</div>
          </div>
          <div class="boot-copyright">
            © 2026 SimuScan. Interfaces fictícias para fins de treinamento.
          </div>
        </div>
      </div>

      <!-- ══════════ HOME ══════════ -->
      <div v-else-if="currentScreen === 'home'" class="home-root" @click="openDropdown = null">
        <!-- Header -->
        <header class="home-header" @click.stop>
          <div class="home-header-left">
            <img :src="BASE_URL + 'imagens/logo.png'" alt="SimuScan"
                 class="home-logo-icon"
                 @error="$event.target.style.display='none'" />
            <span class="home-logo-text">
              <span class="t-simu">Simu</span><span class="t-scan">Scan</span>
            </span>
          </div>

          <div class="home-header-right">
            <!-- Ajuda -->
            <div class="home-icon-btn" @click.stop="toggleDropdown('help')">
              <img :src="BASE_URL + 'imagens/interrogacao.png'" alt="Ajuda"
                   class="home-icon-img" @error="$event.target.style.display='none'" />
              <div v-if="openDropdown === 'help'" class="home-dropdown">
                <div class="home-dropdown-item" @click.stop="showHelpModal = true; openDropdown = null">Help</div>
                <div class="home-dropdown-item" @click.stop="showAboutModal = true; openDropdown = null">About</div>
              </div>
            </div>

            <!-- Expert-i -->
            <div class="home-icon-btn" @click.stop="toggleDropdown('expert')"
                 title="Acesso remoto do fabricante — sem função no simulador">
              <img :src="BASE_URL + 'imagens/remoto.png'" alt="Expert-i"
                   class="home-icon-img" @error="$event.target.style.display='none'" />
              <div v-if="openDropdown === 'expert'" class="home-dropdown">
                <div class="home-dropdown-item disabled">Provide Expert-i Access</div>
                <div class="home-dropdown-item disabled">Expert-i Connect</div>
              </div>
            </div>

            <!-- Configurações -->
            <div class="home-icon-btn" @click.stop="showSettingsPanel = !showSettingsPanel; openDropdown = null">
              <img :src="BASE_URL + 'imagens/config.png'" alt="Configurações"
                   class="home-icon-img" @error="$event.target.style.display='none'" />
            </div>

            <!-- Job View -->
            <div class="home-icon-btn" @click.stop="showJobView = true; openDropdown = null">
              <img :src="BASE_URL + 'imagens/maleta.png'" alt="Job View"
                   class="home-icon-img" @error="$event.target.style.display='none'" />
            </div>

            <!-- Usuário -->
            <div class="home-icon-btn" @click.stop="toggleDropdown('user')">
              <img :src="BASE_URL + 'imagens/usuario.png'" alt="Usuário"
                   class="home-icon-img" @error="$event.target.style.display='none'" />
              <div v-if="openDropdown === 'user'" class="home-dropdown">
                <div class="home-dropdown-item" :class="{ active: currentUser === 'meduser' }"
                     @click.stop="currentUser = 'meduser'; openDropdown = null">meduser</div>
                <div class="home-dropdown-item" :class="{ active: currentUser === 'SimuAdmin' }"
                     @click.stop="currentUser = 'SimuAdmin'; openDropdown = null">SimuAdmin</div>
                <div class="home-dropdown-item" :class="{ active: currentUser === 'Other User' }"
                     @click.stop="currentUser = 'Other User'; openDropdown = null">Other User</div>
              </div>
            </div>
          </div>
        </header>

        <!-- 4 cards centrais -->
        <div class="home-center">
          <div class="home-cards-grid">
            <div class="home-card" @click="currentScreen = 'patient-browser'">
              <div class="home-card-icon">
                <img :src="BASE_URL + 'imagens/examination.png'" alt="Examination"
                     @error="$event.target.style.display='none'" />
              </div>
              <span class="home-card-label">Examination</span>
            </div>

            <div class="home-card" @click="currentScreen = 'system-check'; startSystemCheck()">
              <div class="home-card-icon home-card-icon-accent">
                <img :src="BASE_URL + 'imagens/system.png'" alt="System Check"
                     @error="$event.target.style.display='none'" />
              </div>
              <span class="home-card-label">System Check</span>
            </div>

            <div class="home-card" @click="showRestartConfirm = true">
              <div class="home-card-icon">
                <img :src="BASE_URL + 'imagens/restart.png'" alt="Restart"
                     @error="$event.target.style.display='none'" />
              </div>
              <span class="home-card-label">Restart</span>
            </div>

            <div class="home-card" @click="isLocked = true">
              <div class="home-card-icon">
                <img :src="BASE_URL + 'imagens/lock.png'" alt="Lock"
                     @error="$event.target.style.display='none'" />
              </div>
              <span class="home-card-label">Lock</span>
            </div>
          </div>
        </div>

        <!-- Barra inferior -->
        <footer class="home-bottombar">
          <div></div>
          <div class="home-power-btn" @click="showShutdownModal = true" title="Desligar">
            <img :src="BASE_URL + 'imagens/desligar.png'" alt="Desligar"
                 @error="$event.target.style.display='none'" />
          </div>
        </footer>
      </div>

      <!-- ══════════ SYSTEM CHECK ══════════ -->
      <div v-else-if="currentScreen === 'system-check'" class="syscheck-root">
        <header class="home-header">
          <div class="home-header-left">
            <img :src="BASE_URL + 'imagens/logo.png'" alt="SimuScan" class="home-logo-icon"
                 @error="$event.target.style.display='none'" />
            <span class="home-logo-text"><span class="t-simu">Simu</span><span class="t-scan">Scan</span></span>
          </div>
        </header>
        <div class="syscheck-body">
          <h2>System Check — Sigma ON</h2>
          <div class="syscheck-list">
            <div v-for="(item, i) in systemCheckItems" :key="i"
                 class="syscheck-item"
                 :class="{ visible: i < systemCheckVisible }">
              <span class="syscheck-check">✓</span>
              <span>{{ item }}</span>
            </div>
          </div>
          <div v-if="systemCheckVisible >= systemCheckItems.length" class="syscheck-status">
            Status: Sistema OK
          </div>
          <button class="syscheck-back-btn" @click="currentScreen = 'home'">Voltar</button>
        </div>
      </div>

      <!-- ══════════ PATIENT BROWSER ══════════ -->
      <div v-else-if="currentScreen === 'patient-browser'" class="pb-root">
        <!-- menubar -->
        <div class="so-menubar">
          <div class="so-menubar-left">
            <img :src="BASE_URL + 'imagens/sigma-on.png'" alt="Sigma ON" class="so-logo" @error="$event.target.style.display='none'" />
            <span class="so-title">SimuScan — Sigma ON CT</span>
          </div>
          <div class="so-menubar-tabs">
            <button class="so-tab active">Patient Browser</button>
            <button class="so-tab">Exam</button>
            <button class="so-tab">MPR</button>
            <button class="so-tab">3D</button>
            <button class="so-tab" @click="currentScreen = 'home'">Home</button>
            <button class="so-tab" @click="$router.push('/escolha')">Return System</button>
          </div>
        </div>

        <!-- main area -->
        <div class="pb-body">
          <!-- left: table panel -->
          <div class="pb-table-panel">
            <div class="pb-toolbar">
              <div class="pb-tab-group">
                <button
                  v-for="tab in pbTabs" :key="tab.key"
                  class="pb-filter-tab"
                  :class="{ active: pbActiveTab === tab.key }"
                  @click="pbActiveTab = tab.key"
                >{{ tab.label }}</button>
              </div>
              <input
                v-model="pbSearch"
                class="pb-search"
                placeholder="Buscar paciente..."
                type="text"
              />
            </div>
            <div class="pb-table-wrap">
              <table class="pb-table">
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>ID</th>
                    <th>Nascimento</th>
                    <th>Data Exame</th>
                    <th>Descrição</th>
                    <th>Mod.</th>
                    <th>Séries</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="p in filteredPatients"
                    :key="p.patientId"
                    :class="{ selected: selectedPatient?.patientId === p.patientId }"
                    @click="selectedPatient = p"
                    @dblclick="openStudy(p)"
                  >
                    <td>{{ p.name }}</td>
                    <td class="mono">{{ p.patientId }}</td>
                    <td class="mono">{{ p.dob }}</td>
                    <td class="mono">{{ p.studyDate }}</td>
                    <td>{{ p.studyDesc }}</td>
                    <td class="mono">{{ p.modality }}</td>
                    <td class="mono center">{{ p.seriesCount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- right: series panel -->
          <div class="pb-series-panel">
            <div class="pb-series-header">Séries do Estudo</div>
            <template v-if="selectedPatient">
              <div class="pb-patient-info">
                <div class="pb-pi-name">{{ selectedPatient.name }}</div>
                <div class="pb-pi-sub">{{ selectedPatient.patientId }} · {{ selectedPatient.dob }}</div>
                <div class="pb-pi-study">{{ selectedPatient.studyDesc }}</div>
                <div class="pb-pi-date">{{ selectedPatient.studyDate }}</div>
              </div>
              <div class="pb-series-list">
                <div
                  v-for="(s, i) in selectedPatient.series"
                  :key="i"
                  class="pb-series-item"
                  :class="{ 'series-selected': selectedSeriesIndex === i }"
                  @click="selectedSeriesIndex = i"
                >
                  <div class="pb-series-thumb">
                    <div class="pb-series-thumb-inner">{{ i + 1 }}</div>
                  </div>
                  <div class="pb-series-info">
                    <div class="pb-series-name">{{ s.name }}</div>
                    <div class="pb-series-meta">{{ s.images }} imagens · {{ s.thickness }}mm · {{ s.kv }}kV/{{ s.mas }}mAs</div>
                  </div>
                </div>
              </div>
              <button class="pb-open-btn" @click="openStudy(selectedPatient)">Abrir Estudo</button>
            </template>
            <div v-else class="pb-no-selection">
              <span>Selecione um paciente</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ══════════ SCAN CONSOLE ══════════ -->
      <div v-else-if="currentScreen === 'scan'" class="scan-root">
        <!-- header -->
        <div class="scan-header">
          <div class="scan-hdr-left">
            <img :src="BASE_URL + 'imagens/sigma-on.png'" alt="Sigma ON" class="scan-logo" @error="$event.target.style.display='none'" />
            <span class="scan-title">Sigma ON CT</span>
          </div>
          <div class="scan-hdr-patient" v-if="scanPatient">
            <span class="scan-hdr-label">Paciente:</span>
            <span class="scan-hdr-name">{{ scanPatient.name }}</span>
            <span class="scan-hdr-sep">·</span>
            <span class="scan-hdr-id">{{ scanPatient.patientId }}</span>
            <span class="scan-hdr-sep">·</span>
            <span class="scan-hdr-study">{{ scanPatient.studyDesc }}</span>
          </div>
          <div class="scan-hdr-right">
            <span class="scan-version">{{ version }}</span>
            <button class="scan-back-btn" @click="currentScreen = 'patient-browser'">← Patient Browser</button>
            <button class="scan-back-btn" @click="currentScreen = 'home'">Home</button>
            <button class="scan-return-btn" @click="$router.push('/escolha')">Return System</button>
          </div>
        </div>

        <!-- body -->
        <div class="scan-body">
          <!-- sidebar left -->
          <div class="scan-sidebar-left">
            <div class="ssl-section-title">Protocolos / Séries</div>
            <div class="ssl-series-list">
              <div
                v-for="(s, i) in scanSeriesList"
                :key="i"
                class="ssl-series-item"
                :class="{ active: activeSeries === i }"
                @click="activeSeries = i"
              >
                <div class="ssl-series-num">{{ i + 1 }}</div>
                <div class="ssl-series-name">{{ s.name }}</div>
              </div>
            </div>

            <div class="ssl-divider"></div>

            <div class="ssl-section-title">Posição do Paciente</div>
            <div class="ssl-positions">
              <div
                v-for="pos in positions"
                :key="pos.key"
                class="ssl-pos-btn"
                :class="{ active: activePosition === pos.key }"
                @click="activePosition = pos.key"
              >
                <img :src="BASE_URL + 'imagens/' + pos.img" :alt="pos.label" class="ssl-pos-img" @error="$event.target.style.display='none'" />
                <span>{{ pos.label }}</span>
              </div>
            </div>

            <div class="ssl-divider"></div>

            <div class="ssl-section-title">Parâmetros</div>
            <div class="ssl-params">
              <div class="ssl-param-row">
                <span class="ssl-param-label">kV</span>
                <select v-model="scanParams.kv" class="ssl-param-select">
                  <option v-for="v in [80,100,120,140]" :key="v" :value="v">{{ v }}</option>
                </select>
              </div>
              <div class="ssl-param-row">
                <span class="ssl-param-label">mAs</span>
                <input v-model.number="scanParams.mas" type="number" min="10" max="800" step="10" class="ssl-param-input" />
              </div>
              <div class="ssl-param-row">
                <span class="ssl-param-label">Rot (s)</span>
                <select v-model="scanParams.rot" class="ssl-param-select">
                  <option v-for="v in [0.3, 0.5, 0.75, 1.0]" :key="v" :value="v">{{ v }}</option>
                </select>
              </div>
              <div class="ssl-param-row">
                <span class="ssl-param-label">Pitch</span>
                <select v-model="scanParams.pitch" class="ssl-param-select">
                  <option v-for="v in [0.5, 0.75, 1.0, 1.5]" :key="v" :value="v">{{ v }}</option>
                </select>
              </div>
              <div class="ssl-param-row">
                <span class="ssl-param-label">Espess. (mm)</span>
                <select v-model="scanParams.thickness" class="ssl-param-select">
                  <option v-for="v in [0.5, 1.0, 2.0, 3.0, 5.0]" :key="v" :value="v">{{ v }}</option>
                </select>
              </div>
            </div>

            <div class="ssl-divider"></div>

            <div class="ssl-actions">
              <button class="ssl-btn ssl-btn-scout">Scout</button>
              <button class="ssl-btn ssl-btn-scan" @click="startScan">Scan</button>
              <button class="ssl-btn ssl-btn-pause" :disabled="!scanning">Pause</button>
            </div>
          </div>

          <!-- center image area -->
          <div class="scan-center">
            <div class="scan-image-area">
              <div v-if="scanning" class="scan-progress-overlay">
                <div class="scan-progress-bar" :style="{ width: scanProgress + '%' }"></div>
                <span class="scan-progress-text">Adquirindo... {{ Math.round(scanProgress) }}%</span>
              </div>
              <div class="scan-image-grid">
                <div
                  v-for="(frame, fi) in displayFrames"
                  :key="fi"
                  class="scan-image-cell"
                  :class="{ active: activeFrame === fi }"
                  @click="activeFrame = fi"
                >
                  <div class="scan-image-placeholder">
                    <span class="scan-img-num">{{ fi + 1 }}</span>
                  </div>
                  <div class="scan-img-overlay-info">
                    <span>{{ scanParams.kv }}kV</span>
                    <span>{{ scanParams.mas }}mAs</span>
                  </div>
                </div>
              </div>
              <div class="scan-image-info-bar">
                <span>kV: {{ scanParams.kv }}</span>
                <span>mAs: {{ scanParams.mas }}</span>
                <span>Rot: {{ scanParams.rot }}s</span>
                <span>Pitch: {{ scanParams.pitch }}</span>
                <span>Espessura: {{ scanParams.thickness }}mm</span>
                <span>Posição: {{ activePositionLabel }}</span>
              </div>
            </div>
          </div>

          <!-- sidebar right -->
          <div class="scan-sidebar-right">
            <div class="ssr-section-title">Reconstruções</div>
            <div class="ssr-thumb-list">
              <div
                v-for="(s, i) in scanPatient?.series ?? []"
                :key="i"
                class="ssr-thumb"
                :class="{ active: activeRecon === i }"
                @click="activeRecon = i"
              >
                <div class="ssr-thumb-img">{{ i + 1 }}</div>
                <div class="ssr-thumb-label">{{ s.name }}</div>
              </div>
            </div>

            <div class="ssl-divider"></div>

            <div class="ssr-section-title">Pós-Proc.</div>
            <div class="ssr-pp-btns">
              <button class="ssr-pp-btn">MPR</button>
              <button class="ssr-pp-btn">MIP</button>
              <button class="ssr-pp-btn">3D VR</button>
              <button class="ssr-pp-btn">Seg.</button>
            </div>

            <div class="ssl-divider"></div>

            <div class="ssr-section-title">W/L</div>
            <div class="ssr-wl-row">
              <label>W</label>
              <input v-model.number="windowWidth" type="range" min="1" max="4000" class="ssr-slider" />
              <span>{{ windowWidth }}</span>
            </div>
            <div class="ssr-wl-row">
              <label>L</label>
              <input v-model.number="windowLevel" type="range" min="-1000" max="1000" class="ssr-slider" />
              <span>{{ windowLevel }}</span>
            </div>
            <div class="ssr-wl-presets">
              <button class="ssr-preset-btn" @click="windowWidth=400; windowLevel=40">Soft</button>
              <button class="ssr-preset-btn" @click="windowWidth=1500; windowLevel=-600">Pulmão</button>
              <button class="ssr-preset-btn" @click="windowWidth=2000; windowLevel=400">Osso</button>
            </div>
          </div>
        </div>

        <!-- timeline -->
        <div class="scan-timeline">
          <div class="scan-tl-label">Timeline</div>
          <div class="scan-tl-track">
            <div
              v-for="(f, fi) in timelineFrames"
              :key="fi"
              class="scan-tl-frame"
              :class="{ active: activeFrame === fi, acquired: fi < acquiredFrames }"
              @click="activeFrame = fi"
            ></div>
          </div>
          <div class="scan-tl-info">{{ acquiredFrames }}/{{ timelineFrames.length }} frames</div>
        </div>
      </div>

      <!-- ══════════ MODAIS E OVERLAYS ══════════ -->

      <!-- Restart confirm -->
      <div v-if="showRestartConfirm" class="modal-overlay" @click.self="showRestartConfirm = false">
        <div class="modal-box">
          <h3>Reiniciar Sistema</h3>
          <p>Tem certeza que deseja reiniciar o Sigma ON CT?</p>
          <div class="modal-actions">
            <button class="modal-btn-cancel" @click="showRestartConfirm = false">Cancelar</button>
            <button class="modal-btn-confirm" @click="confirmRestart">Reiniciar</button>
          </div>
        </div>
      </div>

      <!-- Restart overlay -->
      <div v-if="showRestartOverlay" class="fullscreen-overlay">
        <div class="fs-spinner"></div>
        <p>Reiniciando sistema...</p>
      </div>

      <!-- Lock overlay -->
      <div v-if="isLocked" class="lock-overlay">
        <img :src="BASE_URL + 'imagens/lock.png'" alt="Lock" class="lock-big-icon"
             @error="$event.target.style.display='none'" />
        <h2>Tela Bloqueada</h2>
        <p>Sigma ON CT</p>
        <button class="lock-unlock-btn" @click="isLocked = false">Desbloquear</button>
      </div>

      <!-- Shutdown modal -->
      <div v-if="showShutdownModal" class="modal-overlay" @click.self="showShutdownModal = false">
        <div class="modal-box">
          <h3>O que deseja fazer?</h3>
          <div class="shutdown-options">
            <button class="shutdown-opt" @click="showShutdownModal = false; showRestartConfirm = true">
              🔄 Reiniciar
            </button>
            <button class="shutdown-opt" @click="confirmShutdown">
              ⏻ Desligar
            </button>
            <button class="shutdown-opt" @click="showShutdownModal = false">
              ✕ Cancelar
            </button>
          </div>
        </div>
      </div>

      <!-- Shutdown overlay -->
      <div v-if="showShutdownOverlay" class="fullscreen-overlay">
        <p>Desligando...</p>
      </div>

      <!-- Help modal -->
      <div v-if="showHelpModal" class="modal-overlay" @click.self="showHelpModal = false">
        <div class="modal-box modal-box-lg">
          <h3>Help — Sigma ON CT</h3>
          <p><strong>Sistema Operacional:</strong> SimuScan OS v2.1 (Educational)</p>
          <p style="margin-top:12px;"><strong>Manual do Operador</strong></p>
          <ul>
            <li>1. Introdução ao Sistema</li>
            <li>2. Patient Browser — Busca e Seleção</li>
            <li>3. Console de Aquisição</li>
            <li>4. Reconstrução e Pós-processamento</li>
            <li>5. Solução de Problemas</li>
          </ul>
          <button class="modal-btn-confirm" @click="showHelpModal = false">Fechar</button>
        </div>
      </div>

      <!-- About modal -->
      <div v-if="showAboutModal" class="modal-overlay" @click.self="showAboutModal = false">
        <div class="modal-box modal-box-lg">
          <h3>Sobre o Sistema</h3>
          <p><strong>System Type:</strong> Simulador de TC</p>
          <p><strong>Software:</strong> Sigma ON CT — VS10A</p>
          <p><strong>Material Number:</strong> SIMU-SGON-2026</p>
          <p><strong>Serial Number:</strong> SG2026-RJ-001</p>
          <p style="margin-top:10px;"><strong>Instituição:</strong><br>[Nome da Instituição]<br>[Endereço]<br>[Telefone]</p>
          <hr style="margin:14px 0; border-color:rgba(0,0,0,0.15);">
          <p style="font-size:11px; color:rgba(0,0,0,0.4);">
            © 2026 SimuScan. Simulador educacional — interfaces fictícias para fins de treinamento.
          </p>
          <button class="modal-btn-confirm" @click="showAboutModal = false">Fechar</button>
        </div>
      </div>

      <!-- Settings panel -->
      <div v-if="showSettingsPanel" class="settings-overlay" @click.self="showSettingsPanel = false">
        <div class="settings-panel" @click.stop>
          <div class="settings-item" @click="simulateAction('Configuration Panel')">Configuration Panel</div>
          <div class="settings-item" @click="simulateAction('Administration Portal')">Administration Portal</div>
          <div class="settings-item" @click="simulateAction('Clinical Configuration')">Clinical Configuration</div>
          <div class="settings-item" @click="simulateAction('Checkup')">Checkup</div>
          <div class="settings-item" @click="simulateAction('Daily QA')">Daily QA</div>
          <div class="settings-item" @click="simulateAction('Calibration')">Calibration</div>
          <div class="settings-item" @click="simulateAction('Resume')">Resume</div>
          <div class="settings-item" @click="simulateAction('SimuScan Remote Assist')">SimuScan Remote Assist</div>
          <div class="settings-item" @click="simulateAction('Screen Recorder')">Screen Recorder</div>
          <div class="settings-item" @click="simulateAction('Save Log')">Save Log</div>
          <div class="settings-item" @click="simulateAction('Remote Service')">Remote Service</div>
          <div class="settings-divider"></div>
          <div class="settings-item disabled" title="Requer senha">Exam Designer</div>
          <div class="settings-divider"></div>
          <div class="settings-item" @click="simulateAction('Create Screenshot')">Create Screenshot</div>
          <div class="settings-item" @click="simulateAction('Fast Contact')">Fast Contact</div>
          <div class="settings-item" @click="simulateAction('File Browser')">File Browser</div>
          <div class="settings-item" @click="simulateAction('Load Service Pack')">Load Service Pack</div>
          <div class="settings-divider"></div>
          <div class="settings-item disabled">Direct Laser Check</div>
          <div class="settings-item disabled">myNeedle Laser Check</div>
          <div class="settings-divider"></div>
          <div class="settings-item" @click="showAboutModal = true; showSettingsPanel = false">What is New</div>
        </div>
      </div>

      <!-- Job View -->
      <div v-if="showJobView" class="jobview-overlay" @click.self="showJobView = false">
        <div class="jobview-panel">
          <div class="jobview-body">
            <div class="jobview-sidebar">
              <div v-for="tab in jobViewTabs" :key="tab"
                   class="jobview-sidebar-item"
                   :class="{ active: activeJobTab === tab }"
                   @click="activeJobTab = tab">
                {{ tab }}
              </div>
            </div>
            <div class="jobview-content">
              <table class="jobview-table">
                <thead>
                  <tr><th v-for="col in jobViewColumns[activeJobTab]" :key="col">{{ col }}</th></tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in jobViewRows[activeJobTab]" :key="i">
                    <td v-for="col in jobViewColumns[activeJobTab]" :key="col">{{ row[col] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="jobview-messages">
            <div class="jobview-messages-title">Messages</div>
            <div v-if="jobViewMessages.length === 0" style="opacity:0.4;">No messages.</div>
            <div v-for="(m, i) in jobViewMessages" :key="i">{{ m }}</div>
          </div>
        </div>
      </div>

      <!-- Toast -->
      <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>

    </template>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { APP_VERSION } from '@/version.js'

const BASE_URL = import.meta.env.BASE_URL
const version = APP_VERSION
const router = useRouter()

// ── orientation ──
const isPortrait = ref(false)
const isMobile = ref(false)
function checkOrientation() {
  isMobile.value = window.innerWidth < 1024
  isPortrait.value = window.innerHeight > window.innerWidth
}
onMounted(() => {
  checkOrientation()
  window.addEventListener('resize', checkOrientation)
  window.addEventListener('orientationchange', checkOrientation)
  startBoot()
})
onUnmounted(() => {
  window.removeEventListener('resize', checkOrientation)
  window.removeEventListener('orientationchange', checkOrientation)
  if (scanTimer) clearInterval(scanTimer)
})

// ── screens ──
const currentScreen = ref('boot')

// ── boot ──
const bootProgress = ref(0)
const bootMessages = [
  'Inicializando sistema...', 'Carregando drivers de hardware...', 'Verificando detector...',
  'Calibrando gantry...', 'Carregando protocolos...', 'Conectando ao servidor DICOM...', 'Pronto.'
]
const bootStatusText = ref(bootMessages[0])
function startBoot() {
  let step = 0
  const total = 2000
  const interval = 40
  const steps = total / interval
  const timer = setInterval(() => {
    step++
    bootProgress.value = Math.min(100, (step / steps) * 100)
    const msgIdx = Math.floor((bootProgress.value / 100) * (bootMessages.length - 1))
    bootStatusText.value = bootMessages[Math.min(msgIdx, bootMessages.length - 1)]
    if (bootProgress.value >= 100) {
      clearInterval(timer)
      setTimeout(() => { currentScreen.value = 'home' }, 300)
    }
  }, interval)
}

// ── home state ──
const openDropdown = ref(null)
const showHelpModal = ref(false)
const showAboutModal = ref(false)
const showSettingsPanel = ref(false)
const showJobView = ref(false)
const showRestartConfirm = ref(false)
const showRestartOverlay = ref(false)
const showShutdownModal = ref(false)
const showShutdownOverlay = ref(false)
const isLocked = ref(false)
const currentUser = ref('meduser')
const toastMessage = ref('')

function toggleDropdown(name) {
  openDropdown.value = openDropdown.value === name ? null : name
}

function confirmRestart() {
  showRestartConfirm.value = false
  showRestartOverlay.value = true
  setTimeout(() => { window.location.reload() }, 2500)
}

function confirmShutdown() {
  showShutdownModal.value = false
  showShutdownOverlay.value = true
  setTimeout(() => { router.push('/') }, 1800)
}

function simulateAction(name) {
  toastMessage.value = `Funcionalidade simulada: ${name}`
  showSettingsPanel.value = false
  setTimeout(() => { toastMessage.value = '' }, 2000)
}

// ── system check ──
const systemCheckItems = [
  'Conexão com Gantry', 'Detector Array', 'High Voltage Generator',
  'Cooling System', 'Table Control', 'Image Reconstruction'
]
const systemCheckVisible = ref(0)
function startSystemCheck() {
  systemCheckVisible.value = 0
  const interval = setInterval(() => {
    systemCheckVisible.value++
    if (systemCheckVisible.value >= systemCheckItems.length) clearInterval(interval)
  }, 400)
}

// ── patient data ──
const firstNames = ['Ana','Carlos','Maria','João','Fernanda','Pedro','Beatriz','Lucas','Juliana','Rafael',
  'Camila','Marcelo','Larissa','Rodrigo','Patrícia','Felipe','Amanda','Bruno','Vanessa','Gustavo',
  'Simone','Thiago','Daniela','Eduardo','Priscila','Diego','Letícia','André','Renata','Fábio']
const lastNames = ['Silva','Santos','Oliveira','Souza','Costa','Ferreira','Alves','Pereira','Ribeiro','Lima',
  'Gomes','Martins','Rocha','Carvalho','Nunes','Mendes','Araújo','Freitas','Barbosa','Vieira']
const examTypes = [
  { desc: 'TC Crânio', series: ['Axial Cerebral', 'Janela Óssea', 'Reconstrução 3D'], region: 'cranio' },
  { desc: 'TC Tórax', series: ['Axial Pulmão', 'Mediastino', 'Alta Resolução', 'Coronal Recon'], region: 'torax' },
  { desc: 'TC Abdome e Pelve', series: ['Pré-Contraste', 'Fase Arterial', 'Fase Portal', 'Fase Tardia'], region: 'abdome' },
  { desc: 'TC Coluna Lombar', series: ['Axial Discos', 'Sagital Recon', 'Coronal Recon'], region: 'coluna' },
  { desc: 'TC Pescoço', series: ['Axial', 'Coronal', 'Sagital'], region: 'pescoco' },
  { desc: 'TC Tórax + Abdome + Pelve', series: ['Fase Arterial', 'Fase Portal', 'Fase Tardia', 'Coronária'], region: 'tap' },
]
function padZero(n) { return String(n).padStart(2, '0') }
function randomDate(startYear, endYear) {
  const y = startYear + Math.floor(Math.random() * (endYear - startYear))
  const m = 1 + Math.floor(Math.random() * 12)
  const d = 1 + Math.floor(Math.random() * 28)
  return `${padZero(d)}/${padZero(m)}/${y}`
}
function randomStudyDate() {
  const base = new Date(2024, 0, 1)
  const offset = Math.floor(Math.random() * 365)
  const d = new Date(base.getTime() + offset * 86400000)
  return `${padZero(d.getDate())}/${padZero(d.getMonth()+1)}/${d.getFullYear()}`
}
function makeSeries(names) {
  return names.map(name => ({
    name,
    images: 60 + Math.floor(Math.random() * 200),
    thickness: [0.5, 1.0, 2.0, 3.0, 5.0][Math.floor(Math.random() * 5)],
    kv: [80, 100, 120, 140][Math.floor(Math.random() * 4)],
    mas: 50 + Math.floor(Math.random() * 300),
  }))
}
function makePatientId() {
  return 'SG' + String(100000 + Math.floor(Math.random() * 899999))
}
const allPatients = Array.from({ length: 30 }, (_, i) => {
  const fn = firstNames[i % firstNames.length]
  const ln = lastNames[Math.floor(Math.random() * lastNames.length)]
  const exam = examTypes[Math.floor(Math.random() * examTypes.length)]
  return {
    name: `${fn} ${ln}`,
    patientId: makePatientId(),
    dob: randomDate(1940, 2005),
    studyDate: randomStudyDate(),
    studyDesc: exam.desc,
    modality: 'CT',
    seriesCount: exam.series.length,
    series: makeSeries(exam.series),
  }
})

// ── patient browser ──
const pbTabs = [
  { key: 'all', label: 'Todos' },
  { key: 'today', label: 'Hoje' },
  { key: 'week', label: 'Esta Semana' },
  { key: 'scheduled', label: 'Agendados' },
]
const pbActiveTab = ref('all')
const pbSearch = ref('')
const selectedPatient = ref(null)
const selectedSeriesIndex = ref(0)
const filteredPatients = computed(() => {
  const q = pbSearch.value.toLowerCase().trim()
  return allPatients.filter(p => {
    if (q && !p.name.toLowerCase().includes(q) && !p.patientId.toLowerCase().includes(q) && !p.studyDesc.toLowerCase().includes(q)) return false
    return true
  })
})

// ── scan console ──
const scanPatient = ref(null)
const activeSeries = ref(0)
const activePosition = ref('HF-Supine')
const positions = [
  { key: 'HF-Supine', label: 'HF-Supine', img: 'HFsupine.png' },
  { key: 'HF-Prone',  label: 'HF-Prone',  img: 'HFprone.png' },
  { key: 'FF-Supine', label: 'FF-Supine', img: 'FFsupine.png' },
  { key: 'FF-Prone',  label: 'FF-Prone',  img: 'FFprone.png' },
]
const activePositionLabel = computed(() => activePosition.value)
const scanParams = reactive({ kv: 120, mas: 200, rot: 0.5, pitch: 1.0, thickness: 1.0 })
const scanning = ref(false)
const scanProgress = ref(0)
let scanTimer = null
const activeFrame = ref(0)
const acquiredFrames = ref(0)
const activeRecon = ref(0)
const windowWidth = ref(400)
const windowLevel = ref(40)

const displayFrames = computed(() => Array.from({ length: 9 }))
const timelineFrames = computed(() => Array.from({ length: 20 }))

const scanSeriesList = computed(() => scanPatient.value?.series ?? [])

function startScan() {
  if (scanning.value) return
  scanning.value = true
  scanProgress.value = 0
  acquiredFrames.value = 0
  const total = timelineFrames.value.length
  scanTimer = setInterval(() => {
    scanProgress.value += 5
    acquiredFrames.value = Math.floor((scanProgress.value / 100) * total)
    if (scanProgress.value >= 100) {
      clearInterval(scanTimer)
      scanning.value = false
      acquiredFrames.value = total
    }
  }, 100)
}

function openStudy(patient) {
  scanPatient.value = patient
  activeSeries.value = 0
  activeFrame.value = 0
  acquiredFrames.value = 0
  currentScreen.value = 'scan'
}

// ── job view ──
const activeJobTab = ref('Recon')
const jobViewTabs = ['Recon','Short Term Storage','Data Publisher','Media','Network','Print','Raw Data','WorkFlow']
const jobViewColumns = {
  'Recon': ['Patient Name','Study Description','Range Name','Serie Description','Order','Progress'],
  'Short Term Storage': ['Resource','User','Priority','Status','Progress','Time'],
  'Data Publisher': ['Patient Name','Status','User','Time','Priority'],
  'Media': ['Patient Name','Status','Total Objects','Progress','Instances','Workflow','Label','Transfer Type','Client','Resource','User','Time','Connection Type','Task Flow ID','Priority'],
  'Network': ['Patient Name','Status','Total Objects','Progress','Instances','Workflow','Label','Transfer Type','Client','Resource','User','Time','Connection Type','Task Flow ID','Priority'],
  'Print': ['Patient Name','Resource','User','Priority','State','Progress'],
  'Raw Data': ['Patient Name','Study Description','Range Name','Source','Destination','Order','Progress','Anonymized'],
  'WorkFlow': ['Patient Name','User','Client','License In Use','# of Slices'],
}
const jobViewRows = computed(() => {
  const result = {}
  for (const tab of jobViewTabs) {
    result[tab] = Array.from({ length: 4 }, () => {
      const p = allPatients[Math.floor(Math.random() * allPatients.length)]
      const row = {}
      jobViewColumns[tab].forEach(col => {
        if (col === 'Patient Name') row[col] = p.name
        else if (col.includes('Progress')) row[col] = Math.floor(Math.random() * 100) + '%'
        else if (col === 'Status' || col === 'State') row[col] = ['Completed','In Progress','Pending'][Math.floor(Math.random() * 3)]
        else if (col === 'Priority') row[col] = ['High','Normal','Low'][Math.floor(Math.random() * 3)]
        else if (col === 'User') row[col] = currentUser.value
        else row[col] = '—'
      })
      return row
    })
  }
  return result
})
const jobViewMessages = ref([])
</script>

<style scoped>
@import '@/assets/css/rotate-overlay.css';

/* ── root ── */
.sigma-on-root {
  width: 100vw; height: 100vh; overflow: hidden;
  background: #1a1a1a; color: #e8e8ea;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  display: flex; flex-direction: column;
}

/* ════════ BOOT ════════ */
.boot-screen { width: 100%; height: 100%; display: flex; }

.boot-left {
  width: 50%; height: 100%;
  background: #1c6020;
  position: relative; overflow: hidden;
}
.boot-sphere {
  position: absolute;
  width: 260px; height: 260px; border-radius: 50%;
  background: radial-gradient(circle at center, #0d3d10 0%, #1c6020 70%);
  right: -60px; top: 50%; transform: translateY(-50%);
}
.boot-logo-wrap {
  position: absolute; top: 14px; left: 14px; z-index: 2;
  display: flex; align-items: center; gap: 8px;
}
.boot-logo-icon {
  width: 30px; height: 30px; object-fit: contain;
  filter: drop-shadow(0 1px 4px rgba(0,0,0,0.6));
}
.boot-logo-text {
  font-size: 17px; font-weight: 900; white-space: nowrap; line-height: 1;
  filter: drop-shadow(0 1px 4px rgba(0,0,0,0.95));
}
.t-simu { color: #e91e8c; }
.t-scan { color: #3fc8ff; }
.boot-on-watermark {
  position: absolute;
  bottom: -14px; left: -6px;
  font-size: min(18vw, 190px); font-weight: 900;
  color: #2d8a34;
  font-family: 'Arial Black', Arial, sans-serif;
  line-height: 1; letter-spacing: -6px;
  user-select: none; z-index: 1;
}

.boot-right {
  width: 50%; height: 100%;
  background: #04100a;
  position: relative;
  display: flex; align-items: center; justify-content: center;
}
.boot-right-inner {
  display: flex; flex-direction: column; gap: 12px;
  width: min(360px, 80%);
}
.boot-product-name { font-size: 26px; font-weight: 700; color: #fff; margin-bottom: 2px; }
.boot-product-version { font-size: 13px; color: rgba(255,255,255,0.5); margin-bottom: 10px; }
.boot-progress-wrap { width: 100%; height: 2px; background: rgba(255,255,255,0.1); }
.boot-progress-bar { height: 100%; background: #ffffff; transition: width 0.05s linear; }
.boot-status-text { font-size: 12px; color: rgba(255,255,255,0.45); min-height: 18px; }
.boot-copyright {
  position: absolute; bottom: 10px; left: 0; right: 0;
  text-align: center; font-size: 10px; color: rgba(255,255,255,0.3); padding: 0 12px;
}

/* ════════ HOME ════════ */
.home-root { width: 100%; height: 100%; display: flex; flex-direction: column; background: #1a1a1a; color: #e8e8ea; }
.home-header {
  height: 52px; background: #2e2e2e;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 14px; flex-shrink: 0; border-bottom: 1px solid #222;
}
.home-header-left { display: flex; align-items: center; gap: 8px; }
.home-logo-icon { width: 28px; height: 28px; object-fit: contain; }
.home-logo-text { font-size: 15px; font-weight: 900; }
.home-header-right { display: flex; align-items: center; gap: 4px; }
.home-icon-btn {
  width: 38px; height: 38px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; position: relative; transition: background 0.15s;
}
.home-icon-btn:hover { background: rgba(255,255,255,0.08); }
.home-icon-img { width: 20px; height: 20px; object-fit: contain; }
.home-dropdown {
  position: absolute; top: 44px; right: 0;
  background: #eee; color: #222; border-radius: 6px;
  min-width: 200px; box-shadow: 0 6px 24px rgba(0,0,0,0.4);
  z-index: 300; overflow: hidden;
}
.home-dropdown-item { padding: 9px 14px; font-size: 12px; cursor: pointer; transition: background 0.15s; }
.home-dropdown-item:hover { background: #ccc; }
.home-dropdown-item.disabled { color: #999; cursor: not-allowed; }
.home-dropdown-item.active { background: #3498db; color: #fff; }

.home-center { flex: 1; display: flex; align-items: center; justify-content: center; }
.home-cards-grid { display: flex; gap: 32px; }
.home-card {
  width: 140px; cursor: pointer; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
}
.home-card-icon {
  width: 100px; height: 100px; background: #3a3a3a; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.15s, background 0.15s;
}
.home-card-icon img { width: 56px; height: 56px; object-fit: contain; }
.home-card:hover .home-card-icon { transform: translateY(-4px); background: #444; }
.home-card-icon-accent { background: #00c800; }
.home-card-label { font-size: 13px; font-weight: 600; color: #ddd; }

.home-bottombar {
  height: 44px; background: #2e2e2e; border-top: 1px solid #222;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 14px; flex-shrink: 0;
}
.home-power-btn {
  width: 34px; height: 34px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.15s;
}
.home-power-btn:hover { background: rgba(255,0,0,0.15); }
.home-power-btn img { width: 18px; height: 18px; object-fit: contain; }

/* ════════ SYSTEM CHECK ════════ */
.syscheck-root { width: 100%; height: 100%; display: flex; flex-direction: column; background: #1a1a1a; color: #e8e8ea; }
.syscheck-body { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; }
.syscheck-body h2 { font-size: 20px; color: #00c800; }
.syscheck-list { display: flex; flex-direction: column; gap: 8px; }
.syscheck-item { display: flex; gap: 10px; font-size: 14px; opacity: 0; transition: opacity 0.3s; }
.syscheck-item.visible { opacity: 1; }
.syscheck-check { color: #2ecc71; font-weight: 700; }
.syscheck-status { color: #2ecc71; font-weight: 700; margin-top: 10px; }
.syscheck-back-btn {
  margin-top: 16px; padding: 8px 24px; background: #444; color: #ddd;
  border: none; border-radius: 20px; cursor: pointer;
}

/* ════════ SHARED MENUBAR ════════ */
.so-menubar {
  height: 48px; background: #1c6020;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px; flex-shrink: 0;
}
.so-menubar-left { display: flex; align-items: center; gap: 10px; }
.so-logo { width: 28px; height: 28px; object-fit: contain; }
.so-title { font-size: 14px; font-weight: 700; color: #c8f5d8; }
.so-menubar-tabs { display: flex; align-items: center; gap: 4px; }
.so-tab {
  padding: 6px 14px; background: transparent;
  border: 1px solid rgba(255,255,255,0.2); border-radius: 5px;
  color: #c8f5d8; font-size: 12px; cursor: pointer;
  transition: background 0.15s;
}
.so-tab:hover, .so-tab.active { background: #2ecc71; color: #000; border-color: #2ecc71; }

/* ════════ PATIENT BROWSER ════════ */
.pb-root {
  flex: 1; display: flex; flex-direction: column; height: 100%; overflow: hidden;
  background: #1a1a1a;
}
.pb-body { flex: 1; display: flex; overflow: hidden; }

.pb-table-panel {
  flex: 1; display: flex; flex-direction: column; overflow: hidden;
  border-right: 1px solid rgba(255,255,255,0.1);
}
.pb-toolbar {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 14px; background: #222; border-bottom: 1px solid rgba(255,255,255,0.1);
  flex-shrink: 0;
}
.pb-tab-group { display: flex; gap: 4px; }
.pb-filter-tab {
  padding: 5px 14px; border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.15); background: transparent;
  color: rgba(255,255,255,0.6); font-size: 12px; cursor: pointer;
  transition: all 0.15s;
}
.pb-filter-tab.active { background: #2ecc71; color: #000; border-color: #2ecc71; font-weight: 700; }
.pb-search {
  margin-left: auto; padding: 6px 12px;
  background: #2a2a2a; border: 1px solid rgba(255,255,255,0.15);
  border-radius: 6px; color: #e8e8ea; font-size: 12px;
  width: 200px; outline: none;
}
.pb-search:focus { border-color: #2ecc71; }

.pb-table-wrap { flex: 1; overflow-y: auto; }
.pb-table { width: 100%; border-collapse: collapse; }
.pb-table thead tr { background: #2a2a2a; position: sticky; top: 0; z-index: 2; }
.pb-table th {
  padding: 8px 12px; text-align: left; font-size: 11px; font-weight: 700;
  letter-spacing: 0.5px; text-transform: uppercase; color: rgba(255,255,255,0.45);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.pb-table tbody tr { cursor: pointer; transition: background 0.1s; }
.pb-table tbody tr:hover { background: rgba(255,255,255,0.04); }
.pb-table tbody tr.selected { background: rgba(46,204,113,0.12); }
.pb-table td {
  padding: 7px 12px; border-bottom: 1px solid rgba(255,255,255,0.06);
  font-size: 12px; color: #d0d0d0;
}
.mono { font-family: monospace; font-size: 11px; }
.center { text-align: center; }

/* series panel */
.pb-series-panel {
  width: 260px; flex-shrink: 0; display: flex; flex-direction: column;
  background: #202020; overflow: hidden;
}
.pb-series-header {
  padding: 12px 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px;
  text-transform: uppercase; color: rgba(255,255,255,0.35);
  border-bottom: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;
}
.pb-patient-info {
  padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.08); flex-shrink: 0;
}
.pb-pi-name { font-weight: 700; color: #e8e8ea; font-size: 13px; }
.pb-pi-sub { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 3px; }
.pb-pi-study { font-size: 12px; color: #2ecc71; margin-top: 6px; }
.pb-pi-date { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 2px; }

.pb-series-list { flex: 1; overflow-y: auto; padding: 8px; display: flex; flex-direction: column; gap: 4px; }
.pb-series-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px; border-radius: 6px; cursor: pointer;
  border: 1px solid transparent; transition: all 0.15s;
}
.pb-series-item:hover { background: rgba(255,255,255,0.05); }
.pb-series-item.series-selected { background: rgba(46,204,113,0.1); border-color: rgba(46,204,113,0.3); }
.pb-series-thumb { width: 40px; height: 40px; background: #111; border-radius: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.pb-series-thumb-inner { font-size: 14px; font-weight: 700; color: #2ecc71; }
.pb-series-name { font-size: 12px; font-weight: 600; color: #d0d0d0; }
.pb-series-meta { font-size: 10px; color: rgba(255,255,255,0.35); margin-top: 2px; }
.pb-open-btn {
  margin: 12px; padding: 10px;
  background: #2ecc71; color: #000; border: none; border-radius: 8px;
  font-size: 13px; font-weight: 700; cursor: pointer; transition: opacity 0.15s;
  flex-shrink: 0;
}
.pb-open-btn:hover { opacity: 0.85; }
.pb-no-selection {
  flex: 1; display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.2); font-size: 13px;
}

/* ════════ SCAN CONSOLE ════════ */
.scan-root { flex: 1; display: flex; flex-direction: column; height: 100%; overflow: hidden; }

.scan-header {
  height: 48px; background: #1c6020; border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; padding: 0 14px; gap: 16px; flex-shrink: 0;
}
.scan-hdr-left { display: flex; align-items: center; gap: 8px; }
.scan-logo { width: 26px; height: 26px; object-fit: contain; }
.scan-title { font-size: 13px; font-weight: 700; color: #c8f5d8; white-space: nowrap; }
.scan-hdr-patient { display: flex; align-items: center; gap: 6px; font-size: 12px; flex: 1; overflow: hidden; }
.scan-hdr-label { color: rgba(255,255,255,0.45); }
.scan-hdr-name { color: #e8e8ea; font-weight: 600; }
.scan-hdr-id { color: rgba(255,255,255,0.5); font-family: monospace; font-size: 11px; }
.scan-hdr-sep { color: rgba(255,255,255,0.2); }
.scan-hdr-study { color: #2ecc71; }
.scan-hdr-right { display: flex; align-items: center; gap: 8px; margin-left: auto; flex-shrink: 0; }
.scan-version { font-size: 10px; color: rgba(255,255,255,0.25); letter-spacing: 1px; }
.scan-back-btn, .scan-return-btn {
  padding: 5px 12px; border-radius: 5px; font-size: 11px; cursor: pointer;
  border: 1px solid rgba(255,255,255,0.2); background: transparent;
  color: #c8f5d8; transition: background 0.15s;
}
.scan-back-btn:hover, .scan-return-btn:hover { background: rgba(255,255,255,0.1); }

.scan-body { flex: 1; display: flex; overflow: hidden; min-height: 0; }

/* sidebar left */
.scan-sidebar-left {
  width: 264px; flex-shrink: 0; background: #1e1e1e;
  border-right: 1px solid rgba(255,255,255,0.1);
  display: flex; flex-direction: column; overflow-y: auto; padding: 10px 0;
}
.ssl-section-title {
  padding: 6px 14px 4px; font-size: 10px; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; color: rgba(255,255,255,0.3);
}
.ssl-series-list { padding: 0 8px; display: flex; flex-direction: column; gap: 2px; }
.ssl-series-item {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 10px; border-radius: 5px; cursor: pointer;
  border: 1px solid transparent; transition: all 0.15s;
}
.ssl-series-item:hover { background: rgba(255,255,255,0.04); }
.ssl-series-item.active { background: rgba(46,204,113,0.1); border-color: rgba(46,204,113,0.25); }
.ssl-series-num {
  width: 22px; height: 22px; background: #2a2a2a; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: #2ecc71; flex-shrink: 0;
}
.ssl-series-name { font-size: 12px; color: #c8c8c8; }
.ssl-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 10px 0; }
.ssl-positions { display: flex; flex-wrap: wrap; gap: 6px; padding: 4px 10px; }
.ssl-pos-btn {
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 6px 8px; border-radius: 6px; cursor: pointer;
  border: 1px solid rgba(255,255,255,0.15); background: transparent;
  color: rgba(255,255,255,0.5); font-size: 10px; transition: all 0.15s;
  min-width: 60px;
}
.ssl-pos-btn:hover { background: rgba(255,255,255,0.06); }
.ssl-pos-btn.active { background: rgba(46,204,113,0.12); border-color: #2ecc71; color: #2ecc71; }
.ssl-pos-img { width: 32px; height: 32px; object-fit: contain; opacity: 0.7; }
.ssl-pos-btn.active .ssl-pos-img { opacity: 1; }
.ssl-params { padding: 4px 12px; display: flex; flex-direction: column; gap: 6px; }
.ssl-param-row { display: flex; align-items: center; gap: 8px; }
.ssl-param-label { font-size: 11px; color: rgba(255,255,255,0.45); width: 80px; flex-shrink: 0; }
.ssl-param-select, .ssl-param-input {
  flex: 1; padding: 4px 6px; background: #2a2a2a; border: 1px solid rgba(255,255,255,0.15);
  border-radius: 4px; color: #e8e8ea; font-size: 12px; outline: none;
}
.ssl-param-select:focus, .ssl-param-input:focus { border-color: #2ecc71; }
.ssl-actions { padding: 8px 10px; display: flex; flex-direction: column; gap: 6px; }
.ssl-btn {
  padding: 8px; border-radius: 6px; font-size: 12px; font-weight: 700;
  cursor: pointer; border: none; transition: opacity 0.15s;
}
.ssl-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.ssl-btn-scout { background: #2a5a8a; color: #fff; }
.ssl-btn-scan { background: #2ecc71; color: #000; }
.ssl-btn-pause { background: #e07b00; color: #fff; }
.ssl-btn-scout:hover:not(:disabled) { opacity: 0.85; }
.ssl-btn-scan:hover:not(:disabled) { opacity: 0.85; }
.ssl-btn-pause:hover:not(:disabled) { opacity: 0.85; }

/* center */
.scan-center { flex: 1; display: flex; flex-direction: column; background: #111; overflow: hidden; }
.scan-image-area { flex: 1; display: flex; flex-direction: column; position: relative; overflow: hidden; }
.scan-progress-overlay {
  position: absolute; top: 0; left: 0; right: 0; height: 6px; z-index: 10;
  background: rgba(0,0,0,0.5);
}
.scan-progress-bar { height: 100%; background: #2ecc71; transition: width 0.1s linear; }
.scan-progress-text {
  position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
  font-size: 12px; color: #2ecc71; font-weight: 700; white-space: nowrap;
}
.scan-image-grid {
  flex: 1; display: grid; grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr); gap: 2px; padding: 2px; overflow: hidden;
}
.scan-image-cell {
  background: #0a0a0a; border: 1px solid rgba(255,255,255,0.06);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer; position: relative; transition: border-color 0.15s;
}
.scan-image-cell.active { border-color: #2ecc71; }
.scan-image-placeholder {
  width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
  background: radial-gradient(ellipse at center, #0f1a0f 0%, #050a05 100%);
}
.scan-img-num { font-size: 28px; font-weight: 700; color: rgba(46,204,113,0.15); }
.scan-img-overlay-info {
  position: absolute; bottom: 4px; right: 4px;
  display: flex; gap: 4px; font-size: 9px; color: rgba(255,255,255,0.3); font-family: monospace;
}
.scan-image-info-bar {
  height: 28px; background: #1a1a1a; border-top: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: center; gap: 20px; padding: 0 14px;
  font-size: 11px; color: rgba(255,255,255,0.4); flex-shrink: 0;
}
.scan-image-info-bar span::before { content: ''; }

/* sidebar right */
.scan-sidebar-right {
  width: 180px; flex-shrink: 0; background: #1e1e1e;
  border-left: 1px solid rgba(255,255,255,0.1);
  display: flex; flex-direction: column; overflow-y: auto; padding: 10px 0;
}
.ssr-section-title {
  padding: 6px 12px 4px; font-size: 10px; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; color: rgba(255,255,255,0.3);
}
.ssr-thumb-list { padding: 4px 8px; display: flex; flex-direction: column; gap: 4px; }
.ssr-thumb {
  display: flex; align-items: center; gap: 8px;
  padding: 6px; border-radius: 5px; cursor: pointer;
  border: 1px solid transparent; transition: all 0.15s;
}
.ssr-thumb:hover { background: rgba(255,255,255,0.04); }
.ssr-thumb.active { background: rgba(46,204,113,0.1); border-color: rgba(46,204,113,0.25); }
.ssr-thumb-img {
  width: 36px; height: 36px; background: #111; border-radius: 3px;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: #2ecc71; flex-shrink: 0;
}
.ssr-thumb-label { font-size: 10px; color: rgba(255,255,255,0.5); line-height: 1.3; }
.ssr-pp-btns { display: flex; flex-wrap: wrap; gap: 4px; padding: 4px 10px; }
.ssr-pp-btn {
  padding: 5px 10px; background: #2a2a2a; border: 1px solid rgba(255,255,255,0.15);
  border-radius: 4px; color: rgba(255,255,255,0.6); font-size: 11px; cursor: pointer;
  transition: all 0.15s;
}
.ssr-pp-btn:hover { background: rgba(255,255,255,0.1); color: #e8e8ea; }
.ssr-wl-row {
  display: flex; align-items: center; gap: 6px;
  padding: 4px 10px; font-size: 11px;
}
.ssr-wl-row label { width: 12px; color: rgba(255,255,255,0.4); flex-shrink: 0; }
.ssr-wl-row span { width: 36px; color: rgba(255,255,255,0.5); text-align: right; flex-shrink: 0; font-family: monospace; font-size: 10px; }
.ssr-slider { flex: 1; accent-color: #2ecc71; }
.ssr-wl-presets { display: flex; flex-wrap: wrap; gap: 4px; padding: 4px 10px; }
.ssr-preset-btn {
  padding: 4px 8px; background: #2a2a2a; border: 1px solid rgba(255,255,255,0.12);
  border-radius: 4px; color: rgba(255,255,255,0.5); font-size: 10px; cursor: pointer;
  transition: all 0.15s;
}
.ssr-preset-btn:hover { border-color: #2ecc71; color: #2ecc71; }

/* ════════ TIMELINE ════════ */
.scan-timeline {
  height: 48px; background: #1a1a1a; border-top: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; gap: 10px; padding: 0 14px; flex-shrink: 0;
}
.scan-tl-label { font-size: 10px; color: rgba(255,255,255,0.3); letter-spacing: 1px; text-transform: uppercase; flex-shrink: 0; width: 56px; }
.scan-tl-track { flex: 1; display: flex; gap: 2px; height: 24px; align-items: center; }
.scan-tl-frame {
  flex: 1; height: 18px; background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 2px;
  cursor: pointer; transition: all 0.1s;
}
.scan-tl-frame.acquired { background: rgba(46,204,113,0.2); border-color: rgba(46,204,113,0.3); }
.scan-tl-frame.active { background: #2ecc71; border-color: #2ecc71; }
.scan-tl-info { font-size: 11px; color: rgba(255,255,255,0.3); flex-shrink: 0; font-family: monospace; width: 64px; text-align: right; }

/* ════════ MODAIS GENÉRICOS ════════ */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.6);
  display: flex; align-items: center; justify-content: center; z-index: 9000;
}
.modal-box {
  background: #eee; color: #222; border-radius: 10px; padding: 24px 28px;
  min-width: 320px; max-width: 420px;
}
.modal-box-lg { max-width: 480px; max-height: 70vh; overflow-y: auto; }
.modal-box h3 { margin-bottom: 12px; font-size: 16px; }
.modal-box p { font-size: 13px; margin-bottom: 6px; line-height: 1.5; }
.modal-box ul { padding-left: 18px; font-size: 13px; margin: 8px 0; }
.modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 16px; }
.modal-btn-cancel {
  padding: 7px 18px; background: #ccc; border: none; border-radius: 6px; cursor: pointer;
}
.modal-btn-confirm {
  padding: 7px 18px; background: #2ecc71; color: #fff; border: none;
  border-radius: 6px; cursor: pointer; font-weight: 700; margin-top: 12px;
}

.shutdown-options { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
.shutdown-opt {
  padding: 10px; background: #ddd; border: none; border-radius: 6px;
  cursor: pointer; font-size: 13px; text-align: left;
}
.shutdown-opt:hover { background: #ccc; }

.fullscreen-overlay {
  position: fixed; inset: 0; background: #000; z-index: 9999;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 16px; color: #2ecc71;
}
.fs-spinner {
  width: 48px; height: 48px; border: 4px solid #1a1a1a; border-top-color: #2ecc71;
  border-radius: 50%; animation: fsspin 0.8s linear infinite;
}
@keyframes fsspin { to { transform: rotate(360deg); } }

/* ════════ LOCK ════════ */
.lock-overlay {
  position: fixed; inset: 0; background: #111; z-index: 9500;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
  color: #ddd;
}
.lock-big-icon { width: 64px; height: 64px; object-fit: contain; opacity: 0.7; }
.lock-unlock-btn {
  margin-top: 16px; padding: 10px 28px; background: #2ecc71; color: #000;
  border: none; border-radius: 20px; font-weight: 700; cursor: pointer;
}

/* ════════ SETTINGS ════════ */
.settings-overlay { position: fixed; inset: 0; z-index: 400; }
.settings-panel {
  position: fixed; top: 52px; right: 0; width: 260px; height: calc(100vh - 52px);
  background: #eee; color: #222; box-shadow: -4px 0 20px rgba(0,0,0,0.3);
  overflow-y: auto; z-index: 401;
}
.settings-item {
  padding: 11px 18px; font-size: 12.5px; cursor: pointer;
  border-bottom: 1px solid #ddd; transition: background 0.15s;
}
.settings-item:hover:not(.disabled) { background: #ccc; }
.settings-item.disabled { color: #aaa; cursor: not-allowed; font-style: italic; }
.settings-divider { height: 1px; background: #ccc; }

/* ════════ JOB VIEW ════════ */
.jobview-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 500; }
.jobview-panel {
  position: fixed; top: 0; left: 0; width: 75vw; height: 100vh;
  background: #2a2a2a; display: flex; flex-direction: column; z-index: 501;
}
.jobview-body { flex: 1; display: flex; overflow: hidden; }
.jobview-sidebar { width: 170px; background: #1a1a1a; flex-shrink: 0; overflow-y: auto; }
.jobview-sidebar-item {
  padding: 12px 14px; font-size: 12px; color: #ccc; cursor: pointer;
  border-bottom: 1px solid #333;
}
.jobview-sidebar-item:hover { background: #333; }
.jobview-sidebar-item.active { background: #2ecc71; color: #000; font-weight: 700; }
.jobview-content { flex: 1; overflow: auto; padding: 12px; }
.jobview-table { width: 100%; border-collapse: collapse; font-size: 11px; color: #ddd; }
.jobview-table th {
  background: #1a1a1a; padding: 6px 8px; text-align: left;
  white-space: nowrap; color: #aaa; border-bottom: 1px solid #444;
}
.jobview-table td { padding: 6px 8px; border-bottom: 1px solid #333; white-space: nowrap; }
.jobview-messages {
  height: 70px; background: #111; border-top: 1px solid #444;
  padding: 6px 12px; font-size: 11px; color: #888; overflow-y: auto;
}
.jobview-messages-title { color: #aaa; font-weight: 700; margin-bottom: 4px; }

/* ════════ TOAST ════════ */
.toast {
  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
  background: #2ecc71; color: #000; padding: 10px 20px; border-radius: 6px;
  font-size: 13px; font-weight: 700; z-index: 9999;
}

/* tablet landscape */
@media (max-width: 1023px) and (orientation: landscape) {
  .scan-sidebar-left { width: 200px; }
  .scan-sidebar-right { width: 150px; }
}
</style>
