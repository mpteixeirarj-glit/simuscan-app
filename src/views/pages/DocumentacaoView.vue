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
        <p class="page-eyebrow">Documentação</p>
        <h1 class="page-title">Guia de uso do SimuScan</h1>
        <p class="page-subtitle">Aprenda a utilizar todas as funcionalidades do simulador de tomografia.</p>
      </div>
    </div>

    <div class="doc-layout">
      <aside class="doc-sidebar">
        <p class="doc-sidebar-title">Nesta página</p>
        <nav class="doc-nav">
          <a v-for="s in sections" :key="s.id" :href="'#' + s.id"
             :class="{ active: activeSection === s.id }">{{ s.label }}</a>
        </nav>
      </aside>

      <main class="doc-content">
        <section class="doc-section" id="intro">
          <h2>Introdução</h2>
          <p>O SimuScan é um simulador educacional de Tomografia Computadorizada (TC) criado para técnicos em radiologia, estudantes e profissionais que desejam praticar o fluxo completo de um exame em ambiente seguro.</p>
          <p>A plataforma reproduz fielmente a sequência de etapas de um exame real: recepção do paciente, seleção de protocolo, posicionamento, topograma e aquisição — tudo sem risco ao paciente.</p>
          <div class="doc-tip">💡 Recomendamos o uso em tablet ou computador para melhor experiência.</div>
        </section>

        <section class="doc-section" id="tela-inicial">
          <h2>Tela Inicial</h2>
          <p>Após o login, você será redirecionado para a tela de escolha do sistema. Selecione o equipamento que deseja simular e clique em "Acessar".</p>
          <ul>
            <li>Gama Healthcare — sistema disponível</li>
            <li>Sigma Healthcare e Kappa Healthcare — em desenvolvimento</li>
          </ul>
        </section>

        <section class="doc-section" id="worklist">
          <h2>Worklist de Pacientes</h2>
          <p>A worklist lista os pacientes agendados para o dia. Cada entrada contém nome, data de nascimento, tipo de exame solicitado e prioridade.</p>
          <ul>
            <li>Clique em um paciente para iniciar o atendimento</li>
            <li>Confirme os dados cadastrais antes de prosseguir</li>
            <li>Pacientes urgentes são marcados com badge vermelho</li>
          </ul>
        </section>

        <section class="doc-section" id="protocolos">
          <h2>Gerenciador de Protocolos</h2>
          <p>O gerenciador permite visualizar, selecionar e editar os protocolos de aquisição organizados por região anatômica.</p>
          <ul>
            <li>Filtre por região: crânio, tórax, abdome, pelve, coluna</li>
            <li>Cada protocolo exibe os parâmetros: kV, mA, tempo de rotação, pitch, FOV e espessura de corte</li>
            <li>Protocolos podem ser duplicados e editados para prática avançada</li>
          </ul>
          <div class="doc-tip">💡 Os protocolos são fictícios e criados exclusivamente para fins educacionais.</div>
        </section>

        <section class="doc-section" id="topograma">
          <h2>Topograma</h2>
          <p>O topograma (scout) é o primeiro passo da aquisição. Posicione o campo de varredura na região de interesse usando os cursores na imagem de referência.</p>
          <ul>
            <li>Ajuste a linha superior e inferior para delimitar a área de aquisição</li>
            <li>Confirme o posicionamento antes de prosseguir para a aquisição</li>
          </ul>
        </section>

        <section class="doc-section" id="aquisicao">
          <h2>Aquisição</h2>
          <p>Na etapa de aquisição você confirma os parâmetros do protocolo selecionado e inicia o exame. O console exibe o progresso em tempo real.</p>
          <ul>
            <li>Verifique kV, mA, tempo de rotação e espessura antes de confirmar</li>
            <li>Clique em "Iniciar Exame" para simular a aquisição</li>
            <li>Acompanhe o progresso no indicador de mesa e fatias</li>
          </ul>
        </section>

        <section class="doc-section" id="retro-recon">
          <h2>Retro Recon</h2>
          <p>A reconstrução retroativa (Retro Recon) permite gerar novas séries a partir dos dados brutos adquiridos, alterando parâmetros como algoritmo de reconstrução, espessura e filtro.</p>
          <ul>
            <li>Selecione a série base</li>
            <li>Ajuste o kernel/filtro e a espessura</li>
            <li>Confirme para gerar a nova série reconstruída</li>
          </ul>
        </section>

        <section class="doc-section" id="daily-prep">
          <h2>Daily Prep</h2>
          <p>A rotina de Daily Prep simula os procedimentos de calibração e verificação diária do equipamento, essenciais antes do início das atividades clínicas.</p>
          <ul>
            <li>Calibração de ar (Air Calibration)</li>
            <li>Verificação do fantoma de qualidade de imagem</li>
            <li>Teste de ruído e uniformidade</li>
          </ul>
        </section>

        <section class="doc-section" id="scanner-util">
          <h2>Scanner Utilities</h2>
          <p>As utilitárias do scanner oferecem acesso a funções de configuração e manutenção do sistema.</p>
          <ul>
            <li>Configurações de exibição e calibração de monitor</li>
            <li>Gerenciamento de armazenamento e purga de exames</li>
            <li>Relatório de status do sistema</li>
          </ul>
        </section>

        <section class="doc-section" id="dispositivos">
          <h2>Dispositivos Compatíveis</h2>
          <p>O SimuScan foi desenvolvido e otimizado para tablets e computadores. Para melhor experiência:</p>
          <ul>
            <li>Resolução mínima recomendada: 1024 × 768 px</li>
            <li>Navegadores suportados: Chrome, Firefox, Edge, Safari (versões recentes)</li>
            <li>Em computador, utilize o modo tela cheia (F11) para uma imersão completa</li>
            <li>Em tablet, o modo paisagem (landscape) é obrigatório</li>
          </ul>
          <div class="doc-tip">⚠️ Smartphones com tela menor que 6" podem apresentar limitações de interface.</div>
        </section>
      </main>
    </div>

    <footer class="page-footer-simple">
      © 2026 SimuScan. Simulador educacional — interfaces fictícias para fins de treinamento.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import '@/assets/css/pages.css'

const BASE_URL = import.meta.env.BASE_URL
const activeSection = ref('intro')

const sections = [
  { id: 'intro', label: 'Introdução' },
  { id: 'tela-inicial', label: 'Tela Inicial' },
  { id: 'worklist', label: 'Worklist' },
  { id: 'protocolos', label: 'Protocolos' },
  { id: 'topograma', label: 'Topograma' },
  { id: 'aquisicao', label: 'Aquisição' },
  { id: 'retro-recon', label: 'Retro Recon' },
  { id: 'daily-prep', label: 'Daily Prep' },
  { id: 'scanner-util', label: 'Scanner Utilities' },
  { id: 'dispositivos', label: 'Dispositivos' },
]

function onScroll() {
  const offset = 120
  for (const s of [...sections].reverse()) {
    const el = document.getElementById(s.id)
    if (el && el.getBoundingClientRect().top <= offset) {
      activeSection.value = s.id
      return
    }
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
