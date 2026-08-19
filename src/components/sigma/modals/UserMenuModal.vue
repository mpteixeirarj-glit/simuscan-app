<template>
  <div class="sigma-modal-backdrop" @click.self="$emit('close')">
    <div class="sigma-modal">
      <div class="modal-header">
        <h2>Usuário</h2>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body">
        <div class="user-card">
          <div class="user-avatar">{{ initials }}</div>
          <div>
            <div class="user-name">{{ auth.user?.displayName || 'Operador' }}</div>
            <div class="user-email">{{ auth.user?.email }}</div>
            <div class="user-role">Técnico em Radiologia</div>
          </div>
        </div>

        <div class="user-actions">
          <button class="ua-btn" @click="$emit('lockScreen')">🔒 Bloquear Tela</button>
          <button class="ua-btn ua-btn--danger" @click="handleLogout">⏻ Sair do Sistema</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['close', 'lockScreen'])
const auth = useAuthStore()
const router = useRouter()

const initials = computed(() => {
  const name = auth.user?.displayName || auth.user?.email || 'OP'
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
})

async function handleLogout() {
  await auth.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped>
.sigma-modal-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.65);
  display: flex; align-items: center; justify-content: center; z-index: 200;
}
.sigma-modal {
  background: var(--sigma-card); border: 1px solid var(--sigma-border);
  border-radius: 14px; width: min(360px, 90vw);
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid var(--sigma-border);
}
.modal-header h2 { font-size: 0.95rem; font-weight: 700; color: var(--sigma-text); margin: 0; }
.modal-close { background: none; border: none; color: var(--sigma-text-muted); font-size: 1rem; cursor: pointer; padding: 4px 8px; border-radius: 4px; }
.modal-close:hover { color: var(--sigma-text); }

.modal-body { padding: 20px; display: flex; flex-direction: column; gap: 16px; }

.user-card { display: flex; align-items: center; gap: 14px; }
.user-avatar {
  width: 46px; height: 46px; border-radius: 50%;
  background: var(--sigma-accent); color: #000;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; font-weight: 700; flex-shrink: 0;
}
.user-name { font-size: 0.9rem; font-weight: 700; color: var(--sigma-text); }
.user-email { font-size: 0.7rem; color: var(--sigma-text-muted); margin-top: 1px; }
.user-role { font-size: 0.68rem; color: var(--sigma-accent); margin-top: 3px; font-weight: 600; }

.user-actions { display: flex; flex-direction: column; gap: 8px; }
.ua-btn {
  width: 100%; padding: 10px;
  border-radius: 8px; font-size: 0.82rem; font-weight: 600;
  cursor: pointer; border: 1px solid var(--sigma-border);
  background: var(--sigma-card-hover); color: var(--sigma-text);
  transition: border-color 0.15s, color 0.15s;
}
.ua-btn:hover { border-color: var(--sigma-accent); color: var(--sigma-accent); }
.ua-btn--danger:hover { border-color: #e74c3c; color: #e74c3c; }
</style>
