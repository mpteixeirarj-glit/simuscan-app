<template>
  <div class="sigma-modal-backdrop" @click.self="$emit('close')">
    <div class="sigma-modal">
      <div class="modal-header">
        <h2>Ajuda — Sigma Healthcare</h2>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body">
        <div class="help-section">
          <h3>Navegação Rápida</h3>
          <div class="help-items">
            <div class="help-item"><span class="key">Worklist</span> Visualize e selecione exames agendados</div>
            <div class="help-item"><span class="key">Protocolos</span> Configure parâmetros de aquisição</div>
            <div class="help-item"><span class="key">Calibração</span> Execute o aquecimento e calibração diária</div>
            <div class="help-item"><span class="key">Verificação</span> Diagnostique o status do sistema</div>
          </div>
        </div>
        <div class="help-section">
          <h3>Atalhos do Sistema</h3>
          <div class="help-items">
            <div class="help-item"><span class="key">F1</span> Ajuda</div>
            <div class="help-item"><span class="key">F5</span> Atualizar status</div>
            <div class="help-item"><span class="key">Esc</span> Fechar janela atual</div>
          </div>
        </div>
        <div class="help-note">
          Este é um simulador educacional. Nenhuma exposição de radiação real ocorre.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>

<style scoped>
.sigma-modal-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.65);
  display: flex; align-items: center; justify-content: center; z-index: 200;
}
.sigma-modal {
  background: var(--sigma-card); border: 1px solid var(--sigma-border);
  border-radius: 14px; width: min(480px, 90vw);
  display: flex; flex-direction: column;
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 22px; border-bottom: 1px solid var(--sigma-border);
}
.modal-header h2 { font-size: 1rem; font-weight: 700; color: var(--sigma-text); margin: 0; }
.modal-close {
  background: none; border: none; color: var(--sigma-text-muted);
  font-size: 1rem; cursor: pointer; padding: 4px 8px; border-radius: 4px;
}
.modal-close:hover { color: var(--sigma-text); }

.modal-body { padding: 20px 22px; display: flex; flex-direction: column; gap: 18px; }

.help-section h3 { font-size: 0.78rem; font-weight: 700; color: var(--sigma-accent); text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 10px; }
.help-items { display: flex; flex-direction: column; gap: 6px; }
.help-item { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; color: var(--sigma-text-muted); }
.key {
  background: var(--sigma-bar); border: 1px solid var(--sigma-border);
  color: var(--sigma-text); font-size: 0.7rem; font-weight: 600;
  padding: 2px 8px; border-radius: 4px; white-space: nowrap; min-width: 80px; text-align: center;
}
.help-note {
  font-size: 0.72rem; color: var(--sigma-text-muted);
  background: rgba(0,200,0,.08); border: 1px solid rgba(0,200,0,.2);
  border-radius: 8px; padding: 10px 14px;
}
</style>
