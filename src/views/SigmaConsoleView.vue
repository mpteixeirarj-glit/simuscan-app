<template>
  <div class="sigma-console">

    <!-- Lock Screen overlay -->
    <SigmaLockScreen v-if="locked" @unlocked="locked = false" />

    <!-- Top Bar -->
    <SigmaTopBar
      @openHelp="showHelp = true"
      @openUserMenu="showUserMenu = true"
      @openSettings="showSettings = true"
    />

    <!-- Main Content -->
    <SigmaCenterCards
      @openJob="showJob = true"
      @openProtocols="showJob = true"
      @openCalibration="showJob = true"
      @openSystemCheck="showSystemCheckModal = true"
    />

    <!-- Bottom Bar -->
    <SigmaBottomBar
      :systemReady="true"
      @openRestart="showRestart = true"
      @openShutdown="showShutdown = true"
      @openAbout="showAbout = true"
    />

    <!-- Modals -->
    <HelpModal    v-if="showHelp"           @close="showHelp = false" />
    <AboutModal   v-if="showAbout"          @close="showAbout = false" />
    <UserMenuModal
      v-if="showUserMenu"
      @close="showUserMenu = false"
      @lockScreen="lockScreen"
    />
    <SettingsMenu v-if="showSettings"       @close="showSettings = false" />
    <JobViewModal v-if="showJob"            @close="showJob = false" />
    <RestartModal v-if="showRestart"        @close="showRestart = false" />
    <ShutdownModal v-if="showShutdown"      @close="showShutdown = false" />

    <!-- System Check inline modal -->
    <div v-if="showSystemCheckModal" class="system-check-overlay" @click.self="showSystemCheckModal = false">
      <SigmaSystemCheck @close="showSystemCheckModal = false" />
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import SigmaTopBar       from '@/components/sigma/SigmaTopBar.vue'
import SigmaBottomBar    from '@/components/sigma/SigmaBottomBar.vue'
import SigmaCenterCards  from '@/components/sigma/SigmaCenterCards.vue'
import SigmaLockScreen   from '@/components/sigma/SigmaLockScreen.vue'
import SigmaSystemCheck  from '@/components/sigma/SigmaSystemCheck.vue'
import HelpModal         from '@/components/sigma/modals/HelpModal.vue'
import AboutModal        from '@/components/sigma/modals/AboutModal.vue'
import UserMenuModal     from '@/components/sigma/modals/UserMenuModal.vue'
import SettingsMenu      from '@/components/sigma/modals/SettingsMenu.vue'
import JobViewModal      from '@/components/sigma/modals/JobViewModal.vue'
import RestartModal      from '@/components/sigma/modals/RestartModal.vue'
import ShutdownModal     from '@/components/sigma/modals/ShutdownModal.vue'

const locked = ref(false)
const showHelp = ref(false)
const showAbout = ref(false)
const showUserMenu = ref(false)
const showSettings = ref(false)
const showJob = ref(false)
const showRestart = ref(false)
const showShutdown = ref(false)
const showSystemCheckModal = ref(false)

function lockScreen() {
  showUserMenu.value = false
  locked.value = true
}
</script>

<style>
/* Sigma Design System tokens — global so child components inherit */
:root {
  --sigma-bg:          #4D4D4D;
  --sigma-bar:         #2a2a2a;
  --sigma-card:        #383838;
  --sigma-card-hover:  #3f3f3f;
  --sigma-border:      #505050;
  --sigma-accent:      #00C800;
  --sigma-text:        #e8e8e8;
  --sigma-text-muted:  #9a9a9a;
}
</style>

<style scoped>
.sigma-console {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--sigma-bg);
  color: var(--sigma-text);
  font-family: 'Inter', 'Rajdhani', sans-serif;
  position: relative;
  overflow: hidden;
}

.system-check-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.65);
  display: flex; align-items: center; justify-content: center; z-index: 200;
  padding: 20px;
}
</style>
