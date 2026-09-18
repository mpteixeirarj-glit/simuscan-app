<template>
  <component :is="currentComponent" />

  <div class="theme-switcher-wrap">
    <div class="theme-menu">
      <span class="theme-menu-label">Tema</span>
      <button
        class="theme-btn"
        :class="{ active: landingVersion === 'simuscan' }"
        @click="setTheme('simuscan')"
      >SimuScan</button>
      <button
        class="theme-btn theme-btn-sigma"
        :class="{ active: landingVersion === 'sigma' }"
        @click="setTheme('sigma')"
      >Sigma</button>
      <button
        class="theme-btn theme-btn-kappa"
        :class="{ active: landingVersion === 'kappa' }"
        @click="setTheme('kappa')"
      >Kappa</button>
    </div>

    <div class="theme-trigger" title="Temas">
      <svg viewBox="0 0 24 24" width="18" height="18"
           fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineAsyncComponent } from 'vue'

const landingVersion = ref(localStorage.getItem('landingVersion') || 'simuscan')

watch(landingVersion, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const componentMap = {
  simuscan: defineAsyncComponent(() => import('@/views/LandingView.vue')),
  sigma:    defineAsyncComponent(() => import('@/views/LandingLumina.vue')),
  kappa:    defineAsyncComponent(() => import('@/views/LandingAurora.vue')),
}

const currentComponent = computed(() => componentMap[landingVersion.value] ?? componentMap['simuscan'])

function setTheme(theme) {
  landingVersion.value = theme
  localStorage.setItem('landingVersion', theme)
}
</script>

<style scoped>
.theme-switcher-wrap {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.theme-trigger {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(255,255,255,0.6);
  transition: all 0.2s;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}
.theme-switcher-wrap:hover .theme-trigger {
  background: rgba(0,0,0,0.85);
  color: white;
  border-color: rgba(255,255,255,0.3);
}

.theme-menu {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0,0,0,0.82);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 100px;
  padding: 6px 14px 6px 12px;
  margin-right: 8px;
  opacity: 0;
  pointer-events: none;
  transform: translateX(12px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.theme-switcher-wrap:hover .theme-menu {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0);
}

.theme-menu-label {
  font-size: 10px;
  color: rgba(255,255,255,0.35);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  white-space: nowrap;
  padding-right: 4px;
}

.theme-btn {
  padding: 4px 14px;
  border: none;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  color: rgba(255,255,255,0.45);
  transition: all 0.2s;
  white-space: nowrap;
}
.theme-btn:hover           { color: white; background: rgba(255,255,255,0.1); }
.theme-btn.active          { background: #e91e8c; color: white; }
.theme-btn-sigma.active    { background: #3498db !important; color: white !important; }
.theme-btn-kappa.active    { background: #5a1a2e !important; color: #f0d0d8 !important; border: 1px solid #9e3d52; }
</style>
