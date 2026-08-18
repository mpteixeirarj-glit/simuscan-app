<template>
  <div class="placeholder-screen">
    <p>TELA DE PROTOCOLO DO SCOUT</p>
    <p class="sub">(Próxima etapa da simulação)</p>
    <button class="btn-back" @click="$emit('back')">← Voltar</button>
  </div>
</template>

<script setup>
defineEmits(['back'])
</script>

<style scoped>
.placeholder-screen { width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1rem; color:rgba(255,255,255,.7); font-size:1.3rem; font-weight:bold; letter-spacing:.05em; }
.sub { font-size:.9rem; color:rgba(255,255,255,.4); font-weight:normal; }
.btn-back { padding:.6rem 1.5rem; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.3); border-radius:6px; color:#fff; cursor:pointer; font-size:.9rem; transition:background .2s; }
.btn-back:hover { background:rgba(255,255,255,.2); }
</style>
