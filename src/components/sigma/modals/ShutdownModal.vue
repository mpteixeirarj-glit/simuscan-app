<template>
  <div class="sigma-modal-backdrop" @click.self="$emit('close')">
    <div class="sigma-modal">
      <div class="modal-header">
        <h2>Desligar Sistema</h2>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body">
        <div class="confirm-icon">⏻</div>
        <p class="confirm-text">Deseja desligar o sistema Sigma Healthcare?</p>
        <p class="confirm-sub">Certifique-se de que não há exames em andamento. O desligamento seguro pode levar até 5 minutos.</p>
        <div class="confirm-actions">
          <button class="ca-btn ca-btn--danger" @click="handleShutdown">Desligar</button>
          <button class="ca-btn" @click="$emit('close')">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const emit = defineEmits(['close'])
const router = useRouter()

function handleShutdown() {
  emit('close')
  router.push({ name: 'escolha' })
}
</script>

<style scoped>
.sigma-modal-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.65);
  display: flex; align-items: center; justify-content: center; z-index: 200;
}
.sigma-modal {
  background: var(--sigma-card); border: 1px solid var(--sigma-border);
  border-radius: 14px; width: min(380px, 90vw);
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid var(--sigma-border);
}
.modal-header h2 { font-size: 0.95rem; font-weight: 700; color: var(--sigma-text); margin: 0; }
.modal-close { background: none; border: none; color: var(--sigma-text-muted); font-size: 1rem; cursor: pointer; padding: 4px 8px; border-radius: 4px; }
.modal-close:hover { color: var(--sigma-text); }

.modal-body { padding: 22px; display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.confirm-icon { font-size: 2.4rem; color: #e74c3c; }
.confirm-text { font-size: 0.9rem; font-weight: 600; color: var(--sigma-text); margin: 0; }
.confirm-sub { font-size: 0.75rem; color: var(--sigma-text-muted); margin: 0; line-height: 1.5; }
.confirm-actions { display: flex; gap: 10px; width: 100%; margin-top: 6px; }
.ca-btn {
  flex: 1; padding: 10px;
  border-radius: 8px; font-size: 0.82rem; font-weight: 600;
  cursor: pointer; border: 1px solid var(--sigma-border);
  background: var(--sigma-card-hover); color: var(--sigma-text);
  transition: border-color 0.15s;
}
.ca-btn:hover { border-color: var(--sigma-accent); }
.ca-btn--danger { background: #e74c3c; border-color: #e74c3c; color: #fff; }
.ca-btn--danger:hover { opacity: 0.88; border-color: #e74c3c; }
</style>
