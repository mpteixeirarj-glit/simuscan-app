<template>
  <div class="page-wrap">
    <nav class="page-nav">
      <div class="page-nav-inner">
        <RouterLink to="/" class="page-nav-logo">
          <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" @error="$event.target.style.display='none'">
          <span><span class="p">Simu</span><span class="b">Scan</span></span>
        </RouterLink>
        <RouterLink to="/" class="page-nav-back">← Voltar para o início</RouterLink>
      </div>
    </nav>

    <div class="page-header">
      <div class="page-header-inner">
        <p class="page-eyebrow">Contato</p>
        <h1 class="page-title">Fale com a gente</h1>
        <p class="page-subtitle">Dúvidas, sugestões ou reportar um problema — estamos aqui para ajudar.</p>
      </div>
    </div>

    <div class="contact-main">
      <div class="contact-info-block">
        <div class="contact-info-item">
          <span class="contact-info-icon">📧</span>
          <div>
            <p class="contact-info-title">E-mail</p>
            <p class="contact-info-text">contato@simuscan.app<br>Respondemos em até 48h úteis.</p>
          </div>
        </div>
        <div class="contact-info-item">
          <span class="contact-info-icon">📸</span>
          <div>
            <p class="contact-info-title">Instagram</p>
            <p class="contact-info-text">@simuscan<br>Novidades e atualizações.</p>
          </div>
        </div>
        <div class="contact-info-item">
          <span class="contact-info-icon">▶</span>
          <div>
            <p class="contact-info-title">YouTube</p>
            <p class="contact-info-text">SimuScan<br>Tutoriais e demonstrações.</p>
          </div>
        </div>
        <div class="contact-info-item">
          <span class="contact-info-icon">🔗</span>
          <div>
            <p class="contact-info-title">LinkedIn</p>
            <p class="contact-info-text">SimuScan<br>Atualizações profissionais.</p>
          </div>
        </div>
      </div>

      <div class="contact-form-card">
        <p class="contact-form-title">Enviar mensagem</p>
        <template v-if="!sent">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label>Nome completo</label>
              <input v-model="form.nome" type="text" placeholder="Seu nome" required>
            </div>
            <div class="form-group">
              <label>E-mail</label>
              <input v-model="form.email" type="email" placeholder="seu@email.com" required>
            </div>
            <div class="form-group">
              <label>Assunto</label>
              <select v-model="form.assunto" required>
                <option value="">Selecione um assunto</option>
                <option>Dúvida sobre o simulador</option>
                <option>Reportar um problema técnico</option>
                <option>Sugestão de melhoria</option>
                <option>Questão sobre planos e assinatura</option>
                <option>Parceria ou imprensa</option>
                <option>Outro</option>
              </select>
            </div>
            <div class="form-group">
              <label>Mensagem</label>
              <textarea v-model="form.mensagem" placeholder="Descreva sua dúvida ou sugestão..." required></textarea>
            </div>
            <button type="submit" class="form-submit-btn" :disabled="sending">
              {{ sending ? 'Enviando...' : 'Enviar mensagem' }}
            </button>
          </form>
        </template>
        <div v-else class="form-success">
          ✅ Mensagem enviada com sucesso!<br>
          <small style="font-weight:400; font-size:.85rem; color:rgba(255,255,255,0.5)">Retornaremos em breve pelo e-mail informado.</small>
        </div>
      </div>
    </div>

    <footer class="page-footer-simple">
      © 2026 SimuScan. Simulador educacional — interfaces fictícias para fins de treinamento.
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import '@/assets/css/pages.css'

const BASE_URL = import.meta.env.BASE_URL

const form = reactive({ nome: '', email: '', assunto: '', mensagem: '' })
const sending = ref(false)
const sent = ref(false)

async function submitForm() {
  sending.value = true
  await new Promise(r => setTimeout(r, 1500))
  sending.value = false
  sent.value = true
}
</script>
