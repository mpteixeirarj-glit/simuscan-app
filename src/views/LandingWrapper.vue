<template>
  <component :is="currentComponent" />

  <div class="version-switcher">
    <span class="version-label">Tema</span>
    <div class="version-btns">
      <button
        v-for="v in versions"
        :key="v.key"
        class="version-btn"
        :class="['version-btn-' + v.key, { active: landingVersion === v.key }]"
        @click="landingVersion = v.key"
      >
        {{ v.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineAsyncComponent } from 'vue'

const versions = [
  { key: 'dark',  label: 'Dark' },
  { key: 'sigma', label: 'Sigma' },
  { key: 'kappa', label: 'Kappa' },
]

const landingVersion = ref(localStorage.getItem('landingVersion') || 'dark')

watch(landingVersion, (v) => {
  localStorage.setItem('landingVersion', v)
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const componentMap = {
  dark:  defineAsyncComponent(() => import('@/views/LandingView.vue')),
  sigma: defineAsyncComponent(() => import('@/views/LandingLumina.vue')),
  kappa: defineAsyncComponent(() => import('@/views/LandingAurora.vue')),
}

const currentComponent = computed(() => componentMap[landingVersion.value])
</script>

<style scoped>
.version-switcher {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9000;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 100px;
  padding: 6px 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.version-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
  text-transform: uppercase;
  white-space: nowrap;
  padding-right: 4px;
}

.version-btns {
  display: flex;
  gap: 4px;
}

.version-btn {
  padding: 4px 14px;
  border: none;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.2s;
  white-space: nowrap;
}

.version-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.version-btn.active {
  background: #e91e8c;
  color: white;
}

.version-btn-sigma.active {
  background: #3498db !important;
  color: white !important;
}

.version-btn-kappa.active {
  background: #5a1a2e !important;
  color: #f0d0d8 !important;
  border: 1px solid #9e3d52;
}
</style>
