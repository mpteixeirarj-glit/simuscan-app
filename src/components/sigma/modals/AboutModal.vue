<template>
  <div class="sigma-modal-backdrop" @click.self="$emit('close')">
    <div class="sigma-modal">
      <div class="modal-header">
        <h2>Sobre</h2>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body">
        <div class="about-logo">
          <span class="about-sigma">Σ</span>
          <div>
            <div class="about-title">Sigma Healthcare</div>
            <div class="about-sub">Console de Tomografia Computadorizada</div>
          </div>
        </div>

        <div class="about-rows">
          <div class="about-row"><span>Versão do Sistema</span><span>Sigma OS v4.2.1</span></div>
          <div class="about-row"><span>Build</span><span>20241115</span></div>
          <div class="about-row"><span>Protocolo DICOM</span><span>3.0</span></div>
          <div class="about-row"><span>Modos de Aquisição</span><span>Axial, Helicoidal</span></div>
        </div>

        <div class="about-note">
          Sigma Healthcare é um sistema fictício criado exclusivamente para fins educacionais e de treinamento.
          Todos os equipamentos, nomes e parâmetros são fictícios.
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
  border-radius: 14px; width: min(420px, 90vw);
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 22px; border-bottom: 1px solid var(--sigma-border);
}
.modal-header h2 { font-size: 1rem; font-weight: 700; color: var(--sigma-text); margin: 0; }
.modal-close { background: none; border: none; color: var(--sigma-text-muted); font-size: 1rem; cursor: pointer; padding: 4px 8px; border-radius: 4px; }
.modal-close:hover { color: var(--sigma-text); }

.modal-body { padding: 22px; display: flex; flex-direction: column; gap: 18px; }

.about-logo { display: flex; align-items: center; gap: 14px; }
.about-sigma { font-size: 2.8rem; font-weight: 700; color: var(--sigma-accent); line-height: 1; }
.about-title { font-size: 1.1rem; font-weight: 700; color: var(--sigma-text); }
.about-sub { font-size: 0.72rem; color: var(--sigma-text-muted); margin-top: 2px; }

.about-rows { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--sigma-border); border-radius: 8px; overflow: hidden; }
.about-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 9px 14px; font-size: 0.78rem;
  border-bottom: 1px solid var(--sigma-border);
}
.about-row:last-child { border-bottom: none; }
.about-row span:first-child { color: var(--sigma-text-muted); }
.about-row span:last-child { color: var(--sigma-text); font-weight: 600; }

.about-note {
  font-size: 0.68rem; color: var(--sigma-text-muted);
  border: 1px solid var(--sigma-border); border-radius: 8px; padding: 10px 14px;
  line-height: 1.5;
}
</style>
