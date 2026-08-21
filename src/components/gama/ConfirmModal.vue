<template>
  <div v-if="visible" class="confirm-overlay" @click.self="cancel">
    <div class="confirm-box">
      <p class="confirm-message">{{ message }}</p>
      <div class="confirm-buttons">
        <button class="confirm-btn-cancel" @click="cancel">Cancelar</button>
        <button class="confirm-btn-ok" @click="confirm">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ visible: Boolean, message: String })
const emit = defineEmits(['confirm', 'cancel'])
function confirm() { emit('confirm') }
function cancel() { emit('cancel') }
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.confirm-box {
  background: #0b2c5d;
  border: 2px solid #f39c12;
  border-radius: 8px;
  padding: 24px 32px;
  min-width: 320px;
  text-align: center;
  color: #e0e0e0;
  font-family: Arial, sans-serif;
}
.confirm-message {
  font-size: 15px;
  margin-bottom: 20px;
  color: #e0e0e0;
}
.confirm-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}
.confirm-btn-cancel {
  padding: 8px 24px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}
.confirm-btn-ok {
  padding: 8px 24px;
  background: #f39c12;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}
</style>
