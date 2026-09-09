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
        <p class="page-eyebrow">Legal</p>
        <h1 class="page-title">Termos de Uso</h1>
        <p class="page-subtitle">Leia atentamente antes de utilizar a plataforma SimuScan.</p>
      </div>
    </div>

    <main class="legal-main">
      <p class="legal-meta">Última atualização: setembro de 2026 · Versão 1.0</p>

      <div class="legal-section">
        <h2>1. Aceitação dos Termos</h2>
        <p>Ao acessar e utilizar o SimuScan, você concorda com estes Termos de Uso. Se não concordar com qualquer cláusula, não utilize a plataforma. O uso continuado após eventuais alterações implica aceitação das condições atualizadas.</p>
      </div>

      <div class="legal-section">
        <h2>2. Natureza Educacional</h2>
        <p>O SimuScan é um simulador educacional de Tomografia Computadorizada (TC). Todas as interfaces, nomenclaturas, protocolos, dados de pacientes e fluxos operacionais apresentados são <strong>fictícios</strong> e criados exclusivamente para fins de treinamento e aprendizado.</p>
        <p>A plataforma não possui qualquer afiliação com fabricantes de equipamentos de diagnóstico por imagem. Os nomes dos sistemas simulados (Gama Healthcare, Sigma Healthcare e Kappa Healthcare) são marcas fictícias criadas para fins educacionais.</p>
      </div>

      <div class="legal-section">
        <h2>3. Uso Permitido</h2>
        <p>A licença concedida ao usuário é pessoal, intransferível e não exclusiva. É permitido:</p>
        <ul>
          <li>Acessar e utilizar a plataforma para fins de estudo e treinamento profissional</li>
          <li>Explorar as funcionalidades disponíveis conforme o plano contratado</li>
          <li>Compartilhar a plataforma com colegas e estudantes para fins educacionais</li>
        </ul>
        <p>É expressamente proibido:</p>
        <ul>
          <li>Reproduzir, distribuir, modificar ou criar obras derivadas sem autorização prévia</li>
          <li>Utilizar a plataforma para fins comerciais não autorizados</li>
          <li>Tentar acessar áreas restritas ou reverter a engenharia da aplicação</li>
          <li>Compartilhar credenciais de acesso com terceiros</li>
        </ul>
      </div>

      <div class="legal-section">
        <h2>4. Conta e Segurança</h2>
        <p>Você é responsável por manter a confidencialidade de suas credenciais de acesso. Notifique-nos imediatamente em caso de uso não autorizado da sua conta. O SimuScan não se responsabiliza por danos decorrentes do não cumprimento desta obrigação.</p>
      </div>

      <div class="legal-section">
        <h2>5. Planos e Pagamentos</h2>
        <p>O acesso à plataforma está condicionado à contratação de um dos planos disponíveis. Os valores estão sujeitos a alteração mediante aviso prévio de 30 dias. O cancelamento pode ser realizado a qualquer momento, sem multa, e produz efeitos ao final do período vigente contratado.</p>
      </div>

      <div class="legal-section">
        <h2>6. Disponibilidade e Manutenção</h2>
        <p>O SimuScan empenha-se em manter a plataforma disponível continuamente, mas não garante disponibilidade ininterrupta. Manutenções programadas serão comunicadas com antecedência. O SimuScan não se responsabiliza por indisponibilidades decorrentes de fatores externos, como falhas de infraestrutura de terceiros.</p>
      </div>

      <div class="legal-section">
        <h2>7. Propriedade Intelectual</h2>
        <p>Todo o conteúdo da plataforma — incluindo código-fonte, design, textos, imagens, simulações e interfaces — é de propriedade exclusiva do SimuScan e protegido pela legislação de propriedade intelectual vigente. A utilização indevida poderá resultar em medidas legais cabíveis.</p>
      </div>

      <div class="legal-section">
        <h2>8. Limitação de Responsabilidade</h2>
        <p>O SimuScan é fornecido "como está", sem garantias explícitas ou implícitas de adequação a um propósito específico. O SimuScan não se responsabiliza por quaisquer danos diretos, indiretos ou consequentes decorrentes do uso ou da impossibilidade de uso da plataforma.</p>
        <p>O conteúdo educacional apresentado não substitui a formação técnica profissional regulamentada. O usuário é responsável pela aplicação das habilidades adquiridas no contexto clínico real.</p>
      </div>

      <div class="legal-section">
        <h2>9. Legislação Aplicável</h2>
        <p>Estes Termos são regidos pelas leis brasileiras. Quaisquer disputas serão submetidas ao foro da comarca de domicílio do usuário, salvo expressa previsão legal em contrário.</p>
        <p>Em caso de dúvidas sobre estes Termos, entre em contato pelo nosso formulário de <RouterLink to="/contato" class="legal-link">Contato</RouterLink>.</p>
      </div>
    </main>

    <footer class="page-footer-simple">
      © 2026 SimuScan. Simulador educacional — interfaces fictícias para fins de treinamento.
    </footer>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import '@/assets/css/pages.css'

const BASE_URL = import.meta.env.BASE_URL
</script>

<style scoped>
.legal-link { color: #3498db; text-decoration: none; }
.legal-link:hover { text-decoration: underline; }
</style>
