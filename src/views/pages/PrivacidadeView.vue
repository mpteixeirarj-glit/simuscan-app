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
        <h1 class="page-title">Política de Privacidade</h1>
        <p class="page-subtitle">Como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.</p>
      </div>
    </div>

    <main class="legal-main">
      <p class="legal-meta">Última atualização: setembro de 2026 · Versão 1.0 · Conformidade LGPD (Lei nº 13.709/2018)</p>

      <div class="legal-section">
        <h2>1. Controlador dos Dados</h2>
        <p>O SimuScan é o controlador dos seus dados pessoais. Você pode entrar em contato conosco através do formulário de <RouterLink to="/contato" class="legal-link">Contato</RouterLink> para exercer seus direitos ou tirar dúvidas sobre o tratamento de dados.</p>
      </div>

      <div class="legal-section">
        <h2>2. Dados Coletados</h2>
        <p>Coletamos os seguintes dados pessoais para a prestação dos nossos serviços:</p>
        <ul>
          <li><strong>Dados de cadastro:</strong> nome, endereço de e-mail e senha (armazenada de forma criptografada)</li>
          <li><strong>Dados de uso:</strong> atividades realizadas dentro da plataforma, protocolos acessados, tempo de sessão e progresso de treinamento</li>
          <li><strong>Dados de pagamento:</strong> processados por gateway de pagamento terceirizado; não armazenamos dados de cartão</li>
          <li><strong>Dados técnicos:</strong> endereço IP, tipo de dispositivo, navegador e sistema operacional, coletados automaticamente para fins de segurança e melhoria da plataforma</li>
        </ul>
        <p>Não coletamos dados sensíveis de saúde dos usuários, tampouco dados de pacientes reais — todas as simulações utilizam dados fictícios.</p>
      </div>

      <div class="legal-section">
        <h2>3. Finalidade e Base Legal</h2>
        <p>Seus dados são tratados com base nas seguintes bases legais previstas na LGPD:</p>
        <ul>
          <li><strong>Execução de contrato</strong> — para criar sua conta, processar assinaturas e disponibilizar a plataforma</li>
          <li><strong>Legítimo interesse</strong> — para melhorar funcionalidades, garantir segurança e personalizar a experiência</li>
          <li><strong>Cumprimento de obrigação legal</strong> — para atender exigências fiscais e regulatórias</li>
          <li><strong>Consentimento</strong> — para envio de comunicações de marketing, quando aplicável</li>
        </ul>
      </div>

      <div class="legal-section">
        <h2>4. Compartilhamento de Dados</h2>
        <p>Não vendemos seus dados pessoais. Podemos compartilhá-los somente com:</p>
        <ul>
          <li>Prestadores de serviço essenciais (hospedagem, autenticação, pagamentos) sob acordos de confidencialidade</li>
          <li>Autoridades competentes, quando exigido por lei ou ordem judicial</li>
        </ul>
      </div>

      <div class="legal-section">
        <h2>5. Retenção de Dados</h2>
        <p>Mantemos seus dados pelo tempo necessário para a prestação do serviço e cumprimento de obrigações legais. Dados de conta inativa por mais de 24 meses podem ser anonimizados ou excluídos, conforme nossa política de retenção.</p>
        <p>Dados de progresso de treinamento são mantidos enquanto a conta estiver ativa para garantir continuidade da experiência educacional.</p>
      </div>

      <div class="legal-section">
        <h2>6. Seus Direitos (LGPD, Art. 18)</h2>
        <p>Você tem os seguintes direitos em relação aos seus dados pessoais:</p>
        <ul>
          <li>Confirmação da existência de tratamento e acesso aos dados</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
          <li>Portabilidade dos dados a outro fornecedor</li>
          <li>Eliminação dos dados tratados com base no consentimento</li>
          <li>Informação sobre compartilhamento com terceiros</li>
          <li>Revogação do consentimento a qualquer momento</li>
        </ul>
        <p>Para exercer seus direitos, acesse o formulário de <RouterLink to="/contato" class="legal-link">Contato</RouterLink>. Respondemos em até 15 dias úteis.</p>
      </div>

      <div class="legal-section">
        <h2>7. Cookies e Tecnologias Similares</h2>
        <p>Utilizamos cookies estritamente necessários para o funcionamento da plataforma (autenticação e preferências de sessão). Não utilizamos cookies de rastreamento publicitário de terceiros.</p>
        <p>Você pode configurar seu navegador para bloquear cookies, mas isso pode afetar o funcionamento de algumas funcionalidades da plataforma.</p>
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
