<template>
  <div class="placeholder-screen">
    <p>Tela Data Screen</p>
    <button class="btn-back" @click="$emit('back')">← Voltar</button>
  </div>
</template>
<script setup>defineEmits(['back'])</script>
<style scoped>
.placeholder-screen { width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1rem; color:rgba(255,255,255,.7); font-size:1.3rem; font-weight:bold; }
.btn-back { padding:.6rem 1.5rem; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.3); border-radius:6px; color:#fff; cursor:pointer; font-size:.9rem; }
.btn-back:hover { background:rgba(255,255,255,.2); }
</style>
