<template>
  <component :is="currentComponent" />

  <div class="version-switcher">
    <span class="version-label">Versão</span>
    <div class="version-btns">
      <button
        v-for="v in versions"
        :key="v.key"
        class="version-btn"
        :class="{ active: landingVersion === v.key }"
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
  { key: 'v1', label: 'Dark' },
  { key: 'v2', label: 'Light' },
  { key: 'v3', label: 'Clean' },
]

const landingVersion = ref(localStorage.getItem('landingVersion') || 'v1')

watch(landingVersion, (v) => {
  localStorage.setItem('landingVersion', v)
})

const componentMap = {
  v1: defineAsyncComponent(() => import('@/views/LandingView.vue')),
  v2: defineAsyncComponent(() => import('@/views/LandingV2.vue')),
  v3: defineAsyncComponent(() => import('@/views/LandingV3.vue')),
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
</style>
