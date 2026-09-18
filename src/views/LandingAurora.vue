<template>
  <div class="landing-aurora">
    <!-- DEVICE NOTICE -->
    <div class="device-notice">
      <span>Para melhor experiência, o SimuScan foi projetado para <strong>tablets e computadores</strong>. No PC, pressione <kbd>F11</kbd> para tela cheia.</span>
    </div>

    <!-- NAV -->
    <nav class="nav">
      <div class="nav-inner">
        <div class="logo">
          <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="logo-img" @error="$event.target.style.display='none'">
          <span class="logo-text"><span class="p">Simu</span><span class="b">Scan</span></span>
        </div>
        <div class="nav-links">
          <a href="#funcionalidades" @click.prevent="scrollTo('funcionalidades')">Funcionalidades</a>
          <a href="#sistemas" @click.prevent="scrollTo('sistemas')">Sistemas</a>
          <a href="#planos" @click.prevent="scrollTo('planos')">Planos</a>
        </div>
        <RouterLink to="/login" class="btn-nav">Entrar</RouterLink>
      </div>
    </nav>

    <!-- HERO with aurora + orbits -->
    <section class="hero">
      <div class="aurora-bg">
        <div class="aurora-layer aurora-1"></div>
        <div class="aurora-layer aurora-2"></div>
        <div class="aurora-layer aurora-3"></div>
      </div>
      <div class="orbit orbit-1"></div>
      <div class="orbit orbit-2"></div>
      <div class="hero-content">
        <div class="hero-brand">
          <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="hero-logo" @error="$event.target.style.display='none'" />
          <span class="hero-brand-text">Simulador Educacional de TC</span>
        </div>
        <h1 class="hero-h1">
          Treine com <span class="pink">precisão</span><br>antes de entrar na <span class="blue">sala</span>.
        </h1>
        <p class="hero-sub">
          Pratique o fluxo completo de um exame de tomografia — cadastro de paciente, seleção de protocolo, topograma e aquisição — em ambiente seguro e sem risco ao paciente.
        </p>
        <div class="hero-ctas">
          <RouterLink to="/login" class="cta-primary">Começar agora</RouterLink>
          <button class="cta-outline" @click="scrollTo('funcionalidades')">Ver funcionalidades</button>
        </div>
      </div>
      <div class="hero-media">
        <div class="hero-frame">
          <video class="hero-video" autoplay muted loop playsinline :poster="BASE_URL + 'imagens/hero-scanner.jpg'">
            <source :src="BASE_URL + 'imagens/hero-scanner.webm'" type="video/webm" />
            <source :src="BASE_URL + 'imagens/hero-scanner.mp4'" type="video/mp4" />
            <img :src="BASE_URL + 'imagens/hero-scanner.jpg'" alt="SimuScan" class="hero-img" />
          </video>
        </div>
      </div>
    </section>

    <!-- FLOWLINE section -->
    <section class="flowline">
      <div class="flowline-inner">
        <div class="flow-step" v-for="(step, i) in flowSteps" :key="i">
          <div class="flow-num">{{ String(i+1).padStart(2,'0') }}</div>
          <h4 class="flow-title">{{ step.title }}</h4>
          <p class="flow-desc">{{ step.desc }}</p>
          <div class="flow-connector" v-if="i < flowSteps.length - 1"></div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="section" id="funcionalidades">
      <p class="eyebrow">Funcionalidades</p>
      <h2 class="section-title">Tudo que você precisa para treinar</h2>
      <div class="cards-grid">
        <div class="card" v-for="(feat, i) in features" :key="i">
          <div class="card-img-wrap">
            <img :src="BASE_URL + feat.img" :alt="feat.title" @error="$event.target.parentElement.style.display='none'" />
          </div>
          <div class="card-icon">
            <img :src="BASE_URL + feat.icon" :alt="feat.title" class="icon-img" @error="$event.target.style.display='none'" />
          </div>
          <h3>{{ feat.title }}</h3>
          <p>{{ feat.desc }}</p>
        </div>
      </div>
    </section>

    <!-- SISTEMAS — shimmer cards -->
    <section class="section section-alt" id="sistemas">
      <p class="eyebrow">Sistemas</p>
      <h2 class="section-title">Escolha o equipamento</h2>
      <div class="sistemas-grid">
        <div class="sistema-card gama-card">
          <div class="shimmer-border"></div>
          <div class="sys-icon-wrap">
            <img :src="BASE_URL + 'imagens/gamma-icone.png'" alt="Gama Healthcare" class="sys-icon" @error="$event.target.style.display='none'" />
          </div>
          <span class="sys-badge available">Disponível</span>
          <h3 class="sys-name">Gama Healthcare</h3>
          <p class="sys-desc">Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
          <RouterLink to="/login" class="sys-btn">Acessar</RouterLink>
        </div>
        <div class="sistema-card sigma-on-card">
          <div class="shimmer-border"></div>
          <div class="sys-icon-wrap">
            <img :src="BASE_URL + 'imagens/sigma-on.png'" alt="Sigma ON" class="sys-icon" @error="$event.target.style.display='none'" />
          </div>
          <span class="sys-badge soon">Em breve</span>
          <h3 class="sys-name">Sigma ON</h3>
          <p class="sys-subtitle">Sigma ON CT — versão atual</p>
          <p class="sys-desc">Interface moderna com fluxo avançado completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
          <button class="sys-btn-disabled" disabled>Acessar</button>
        </div>
        <div class="sistema-card sigma-old-card">
          <div class="shimmer-border"></div>
          <div class="sys-icon-wrap">
            <img :src="BASE_URL + 'imagens/sigma-icone.png'" alt="Sigma Old" class="sys-icon" @error="$event.target.style.display='none'" />
          </div>
          <span class="sys-badge soon">Em breve</span>
          <h3 class="sys-name">Sigma Old</h3>
          <p class="sys-subtitle">Sigma Old CT — versão legado</p>
          <p class="sys-desc">Interface clássica do console de geração anterior, com fluxo completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
          <button class="sys-btn-disabled" disabled>Acessar</button>
        </div>
        <div class="sistema-card kappa-card">
          <div class="shimmer-border"></div>
          <div class="sys-icon-wrap">
            <img :src="BASE_URL + 'imagens/kappa-icone.png'" alt="Kappa Healthcare" class="sys-icon" @error="$event.target.style.display='none'" />
          </div>
          <span class="sys-badge soon">Em breve</span>
          <h3 class="sys-name">Kappa Healthcare</h3>
          <p class="sys-desc">Interface de alta produtividade completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
          <button class="sys-btn-disabled" disabled>Acessar</button>
        </div>
      </div>
    </section>

    <!-- PLANOS -->
    <section class="section" id="planos">
      <p class="eyebrow">Planos</p>
      <h2 class="section-title">Escolha seu acesso</h2>
      <div class="planos-grid">
        <div class="plano-card">
          <h3>Mensal</h3>
          <div class="preco">R$ 59<span>/mês</span></div>
          <ul>
            <li>Acesso a todos os sistemas</li>
            <li>Atualizações incluídas</li>
            <li>Suporte por e-mail</li>
          </ul>
          <button class="plano-btn">Assinar</button>
        </div>
        <div class="plano-card destaque">
          <span class="plano-badge">Mais popular</span>
          <h3>Anual</h3>
          <span class="economy-badge">Economia de 17% · R$ 588/ano</span>
          <div class="preco">R$ 49<span>/mês</span></div>
          <p class="annual-note">Cobrado anualmente · R$ 588/ano</p>
          <ul>
            <li>Acesso a todos os sistemas</li>
            <li>Atualizações incluídas</li>
            <li>Suporte prioritário</li>
            <li>2 meses grátis</li>
          </ul>
          <button class="plano-btn destaque-btn">Assinar</button>
        </div>
      </div>
    </section>

    <!-- AI DISCLOSURE -->
    <section class="ai-disclosure">
      <div class="ai-inner">
        <div class="ai-icon-wrap">
          <img :src="BASE_URL + 'imagens/AI.png'" alt="IA" class="ai-icon" @error="$event.target.style.display='none'" />
        </div>
        <div>
          <h4 class="ai-title">Desenvolvimento com Inteligência Artificial</h4>
          <p class="ai-text">O SimuScan foi inteiramente desenvolvido com o auxílio de Inteligências Artificiais, sob orientação e supervisão de um profissional formado e atuante na área de Radiologia há mais de 20 anos, com vasta experiência nas plataformas de tomografia simuladas.</p>
          <p class="ai-text">As interfaces, nomenclaturas e fluxos apresentados são fictícios e foram criados exclusivamente para fins educacionais e de treinamento.</p>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo-row">
            <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="footer-logo" @error="$event.target.style.display='none'" />
            <span class="footer-logo-text"><span class="p">Simu</span><span class="b">Scan</span></span>
          </div>
          <p class="footer-desc">Simulador educacional de Tomografia Computadorizada, desenvolvido para técnicos e estudantes de radiologia.</p>
          <div class="footer-social">
            <a href="mailto:mpteixeira.rj@gmail.com" class="social-link" title="E-mail">
              <img :src="BASE_URL + 'imagens/email.png'" alt="E-mail" class="social-img" />
            </a>
            <a href="#" class="social-link" title="Facebook">
              <img :src="BASE_URL + 'imagens/face.png'" alt="Facebook" class="social-img" />
            </a>
            <a href="#" class="social-link" title="Instagram">
              <img :src="BASE_URL + 'imagens/insta.png'" alt="Instagram" class="social-img" />
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Produto</h4>
          <ul>
            <li><a href="#funcionalidades" @click.prevent="scrollTo('funcionalidades')">Funcionalidades</a></li>
            <li><a href="#sistemas" @click.prevent="scrollTo('sistemas')">Sistemas</a></li>
            <li><a href="#planos" @click.prevent="scrollTo('planos')">Planos</a></li>
            <li><RouterLink to="/documentacao">Documentação</RouterLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Suporte</h4>
          <ul>
            <li><RouterLink to="/contato">Contato</RouterLink></li>
            <li><RouterLink to="/documentacao">Guia de uso</RouterLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><RouterLink to="/termos">Termos de Uso</RouterLink></li>
            <li><RouterLink to="/privacidade">Privacidade</RouterLink></li>
          </ul>
        </div>
      </div>
      <div class="footer-final-line">
        © 2026 SimuScan. Todos os direitos reservados — Simulador educacional — interfaces fictícias para fins de treinamento. — {{ version }}
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { APP_VERSION } from '@/version.js'

const BASE_URL = import.meta.env.BASE_URL
const version = APP_VERSION

const features = [
  { title: 'Console interativo', desc: 'Interface que simula fielmente o console de um tomógrafo moderno, com todos os controles e feedbacks visuais.', img: 'imagens/feature-console.jpeg', icon: 'imagens/monitor.png' },
  { title: 'Worklist de pacientes', desc: 'Lista de agendamentos com dados realistas para praticar o fluxo completo de recepção e início de exame.', img: 'imagens/feature-worklist.jpeg', icon: 'imagens/prancheta.png' },
  { title: 'Gerenciador de protocolos', desc: 'Selecione, visualize e edite protocolos de aquisição organizados por região anatômica.', img: 'imagens/feature-protocols.jpeg', icon: 'imagens/engrenagem.png' },
]

const flowSteps = [
  { title: 'Cadastro do paciente', desc: 'Insira os dados do paciente na worklist, como em um fluxo real de exame.' },
  { title: 'Seleção de protocolo', desc: 'Escolha o protocolo de aquisição adequado para a região anatômica.' },
  { title: 'Topograma', desc: 'Execute o scout para planejamento preciso das imagens.' },
  { title: 'Aquisição', desc: 'Realize o exame com todos os parâmetros configurados e analise os resultados.' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
* { box-sizing: border-box; }

.landing-aurora {
  min-height: 100vh;
  background: #06080f;
  color: #e4e8f4;
  font-family: 'Inter', system-ui, sans-serif;
}

/* DEVICE NOTICE */
.device-notice { background: rgba(233,30,140,0.07); border-bottom: 1px solid rgba(233,30,140,0.15); padding: 10px 24px; text-align: center; font-size: 13px; color: rgba(228,232,244,0.5); }
.device-notice strong { color: #e91e8c; font-weight: 700; }
.device-notice kbd { display: inline-block; padding: 1px 6px; border: 1px solid rgba(255,255,255,0.15); border-radius: 3px; font-size: 12px; background: rgba(255,255,255,0.06); color: #aaa; }

/* NAV */
.nav { position: sticky; top: 0; z-index: 100; background: rgba(6,8,15,0.85); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.05); }
.nav-inner { max-width: 1100px; margin: 0 auto; padding: 0 2rem; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: .7rem; }
.logo-img { height: 34px; }
.logo-text { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1.5rem; letter-spacing: -.03em; }
.logo-text .p { color: #e91e8c; }
.logo-text .b { color: #3498db; }
.nav-links { display: flex; gap: 2rem; }
.nav-links a { font-size: .88rem; color: rgba(228,232,244,0.5); text-decoration: none; font-weight: 500; transition: color .2s; }
.nav-links a:hover { color: #e4e8f4; }
.btn-nav { padding: .45rem 1.2rem; background: linear-gradient(135deg, rgba(233,30,140,0.15), rgba(52,152,219,0.15)); border: 1px solid rgba(233,30,140,0.3); border-radius: 8px; color: #e91e8c; font-size: .88rem; font-weight: 600; text-decoration: none; transition: background .2s, color .2s; }
.btn-nav:hover { background: linear-gradient(135deg, rgba(233,30,140,0.25), rgba(52,152,219,0.25)); color: #f96bc0; }

/* HERO — aurora shift */
.hero {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  padding: 5rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  overflow: hidden;
}

/* Aurora animated layers */
.aurora-bg { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.aurora-layer {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.12;
}
.aurora-1 {
  width: 600px; height: 400px;
  background: linear-gradient(135deg, #e91e8c, #9b59b6);
  top: -100px; left: -100px;
  animation: aurora-shift 12s ease-in-out infinite alternate;
}
.aurora-2 {
  width: 500px; height: 400px;
  background: linear-gradient(135deg, #3498db, #1abc9c);
  bottom: -80px; right: -80px;
  animation: aurora-shift 15s ease-in-out infinite alternate-reverse;
}
.aurora-3 {
  width: 350px; height: 350px;
  background: linear-gradient(135deg, #e91e8c, #3498db);
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  animation: aurora-pulse 8s ease-in-out infinite;
}
@keyframes aurora-shift {
  0% { transform: translateX(0) translateY(0) scale(1); }
  100% { transform: translateX(60px) translateY(40px) scale(1.15); }
}
@keyframes aurora-pulse {
  0%, 100% { opacity: 0.08; transform: translate(-50%,-50%) scale(1); }
  50% { opacity: 0.15; transform: translate(-50%,-50%) scale(1.1); }
}

/* Orbit decorations */
.orbit {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.04);
  pointer-events: none;
  z-index: 0;
}
.orbit-1 {
  width: 500px; height: 500px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation: orbit-spin 30s linear infinite;
}
.orbit-2 {
  width: 350px; height: 350px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation: orbit-spin 20s linear infinite reverse;
}
@keyframes orbit-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.hero-content { position: relative; z-index: 1; }
.hero-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem; }
.hero-logo { width: 48px; height: 48px; object-fit: contain; filter: drop-shadow(0 0 12px rgba(233,30,140,0.4)); }
.hero-brand-text { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(228,232,244,0.4); font-weight: 500; }
.hero-h1 { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: clamp(2rem, 4vw, 3rem); line-height: 1.1; letter-spacing: -.02em; margin-bottom: 1.2rem; }
.hero-h1 .pink { color: #e91e8c; text-shadow: 0 0 30px rgba(233,30,140,0.4); }
.hero-h1 .blue { color: #3498db; text-shadow: 0 0 30px rgba(52,152,219,0.4); }
.hero-sub { font-size: .92rem; color: rgba(228,232,244,0.5); line-height: 1.7; margin-bottom: 2rem; }
.hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; }
.cta-primary { padding: .85rem 2rem; background: linear-gradient(135deg, #e91e8c, #c0186e); border: none; border-radius: 10px; color: #fff; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1rem; letter-spacing: .05em; text-decoration: none; box-shadow: 0 0 32px rgba(233,30,140,0.35); transition: opacity .2s, transform .2s; }
.cta-primary:hover { opacity: .9; transform: translateY(-2px); }
.cta-outline { padding: .85rem 2rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: rgba(228,232,244,0.7); font-size: 1rem; cursor: pointer; transition: border-color .2s, color .2s; }
.cta-outline:hover { border-color: rgba(52,152,219,0.5); color: #3498db; }
.hero-media { position: relative; z-index: 1; }
.hero-frame {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(233,30,140,0.2);
  box-shadow: 0 0 0 1px rgba(52,152,219,0.1), 0 24px 64px rgba(0,0,0,0.5), 0 0 80px rgba(233,30,140,0.08);
}
.hero-video, .hero-img { width: 100%; height: auto; display: block; }

/* FLOWLINE */
.flowline {
  background: rgba(255,255,255,0.02);
  border-top: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding: 3rem 2rem;
}
.flowline-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  position: relative;
}
.flow-step {
  padding: 0 1.5rem;
  position: relative;
  border-right: 1px solid rgba(255,255,255,0.06);
}
.flow-step:last-child { border-right: none; }
.flow-num { font-family: 'Rajdhani', sans-serif; font-size: 2.5rem; font-weight: 700; color: rgba(233,30,140,0.25); line-height: 1; margin-bottom: .5rem; }
.flow-title { font-size: .9rem; font-weight: 700; color: #e4e8f4; margin-bottom: .4rem; }
.flow-desc { font-size: .82rem; color: rgba(228,232,244,0.45); line-height: 1.6; }

/* SECTIONS */
.section { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem; }
.section-alt { background: rgba(255,255,255,0.015); max-width: 100%; border-top: 1px solid rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.04); padding: 5rem 2rem; }
.section-alt > * { max-width: 1100px; margin-left: auto; margin-right: auto; }
.eyebrow { font-size: .68rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #e91e8c; margin-bottom: .8rem; }
.section-title { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: clamp(1.6rem, 3vw, 2.4rem); margin-bottom: 2.5rem; }

/* FEATURE CARDS */
.cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
.card { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; overflow: hidden; transition: border-color .3s, transform .3s, box-shadow .3s; }
.card:hover { border-color: rgba(233,30,140,0.3); transform: translateY(-5px); box-shadow: 0 12px 40px rgba(233,30,140,0.1); }
.card-img-wrap { width: 100%; height: 180px; overflow: hidden; }
.card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
.card:hover .card-img-wrap img { transform: scale(1.05); }
.card-icon { width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; margin: 1.2rem auto .8rem; }
.icon-img { width: 48px; height: 48px; object-fit: contain; }
.card h3 { font-size: 1rem; font-weight: 700; margin: 0 1.5rem .5rem; }
.card p { font-size: .87rem; color: rgba(228,232,244,0.5); margin: 0 1.5rem 1.5rem; line-height: 1.6; }

/* SISTEMAS — shimmer border cards */
.sistemas-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.sistema-card {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: border-color .3s, transform .3s;
}
.shimmer-border {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  opacity: 0;
  transition: opacity .4s;
  background: conic-gradient(from var(--shimmer-angle, 0deg), transparent 60%, rgba(233,30,140,0.4) 80%, transparent 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 1px;
  pointer-events: none;
}
.sistema-card:hover .shimmer-border { opacity: 1; }
.sigma-on-card, .sigma-old-card, .kappa-card { opacity: .75; }
.sistema-card:hover { transform: translateY(-5px); opacity: 1; }
.sys-icon-wrap { width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
.sys-icon { width: 72px; height: 72px; object-fit: contain; border-radius: 14px; }
.sys-badge { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 3px 12px; border-radius: 100px; margin-bottom: .8rem; }
.sys-badge.available { background: rgba(46,204,113,0.12); color: #2ecc71; border: 1px solid rgba(46,204,113,0.25); }
.sys-badge.soon { background: rgba(255,255,255,0.04); color: rgba(228,232,244,0.3); border: 1px solid rgba(255,255,255,0.07); }
.sys-name { font-size: 1rem; font-weight: 700; margin-bottom: .3rem; }
.sys-subtitle { font-size: 11px; font-style: italic; color: rgba(228,232,244,0.35); margin-bottom: .5rem; }
.sys-desc { font-size: .82rem; color: rgba(228,232,244,0.48); line-height: 1.6; margin-bottom: 1rem; }
.sys-btn { display: inline-block; padding: .6rem 1.6rem; background: linear-gradient(135deg, #e91e8c, #c0186e); color: #fff; border-radius: 8px; font-weight: 700; font-size: .9rem; text-decoration: none; box-shadow: 0 4px 16px rgba(233,30,140,0.25); transition: opacity .2s; margin-top: auto; }
.sys-btn:hover { opacity: .85; }
.sys-btn-disabled { display: inline-block; padding: .6rem 1.6rem; background: rgba(255,255,255,0.04); color: rgba(228,232,244,0.2); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; font-size: .9rem; cursor: not-allowed; width: 100%; margin-top: auto; }

/* PLANOS */
.planos-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 720px; margin: 0 auto; }
.plano-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem; position: relative; transition: transform .3s, box-shadow .3s; }
.plano-card.destaque { border-color: rgba(233,30,140,0.3); box-shadow: 0 0 40px rgba(233,30,140,0.1); }
.plano-card:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.35); }
.plano-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #e91e8c, #c0186e); color: #fff; font-size: .65rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 3px 12px; border-radius: 20px; white-space: nowrap; }
.plano-card h3 { font-size: 1.1rem; font-weight: 700; }
.preco { font-family: 'Rajdhani', sans-serif; font-size: 2.4rem; font-weight: 700; color: #e91e8c; }
.preco span { font-size: 1rem; color: rgba(228,232,244,0.4); }
.economy-badge { display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 10px; border-radius: 100px; background: rgba(46,204,113,0.1); color: #2ecc71; border: 1px solid rgba(46,204,113,0.2); }
.annual-note { font-size: 12px; color: rgba(228,232,244,0.4); }
.plano-card ul { list-style: none; display: flex; flex-direction: column; gap: .5rem; flex: 1; }
.plano-card ul li { font-size: .9rem; color: rgba(228,232,244,0.5); }
.plano-card ul li::before { content: '✓ '; color: #2ecc71; font-weight: 700; }
.plano-btn { padding: .8rem; background: rgba(255,255,255,0.06); border: none; border-radius: 8px; color: rgba(228,232,244,0.6); font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1rem; cursor: pointer; transition: background .2s; }
.plano-btn:hover { background: rgba(255,255,255,0.1); }
.destaque-btn { background: linear-gradient(135deg, #e91e8c, #c0186e); color: #fff; box-shadow: 0 4px 16px rgba(233,30,140,0.3); }
.destaque-btn:hover { opacity: .9; }

/* AI DISCLOSURE */
.ai-disclosure { border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 2rem; background: rgba(233,30,140,0.03); }
.ai-inner { max-width: 900px; margin: 0 auto; display: flex; align-items: flex-start; gap: 20px; }
.ai-icon-wrap { flex-shrink: 0; width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; }
.ai-icon { width: 48px; height: 48px; object-fit: contain; }
.ai-title { font-size: 15px; font-weight: 700; color: #e4e8f4; margin-bottom: 8px; }
.ai-text { font-size: 13px; color: rgba(228,232,244,0.45); line-height: 1.7; margin-bottom: 6px; }

/* FOOTER */
.footer { background: #03040a; border-top: 1px solid rgba(255,255,255,0.05); padding: 4rem 2rem 0; }
.footer-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; padding-bottom: 3rem; }
.footer-logo-row { display: flex; align-items: center; gap: .6rem; margin-bottom: 1rem; }
.footer-logo { height: 30px; }
.footer-logo-text { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1.3rem; }
.footer-logo-text .p { color: #e91e8c; }
.footer-logo-text .b { color: #3498db; }
.footer-desc { font-size: .82rem; color: rgba(228,232,244,0.3); line-height: 1.6; margin-bottom: 1.2rem; }
.footer-social { display: flex; gap: .6rem; }
.social-link { display: inline-flex; align-items: center; background: none; border: none; padding: 4px; text-decoration: none; transition: opacity .2s; }
.social-link:hover { opacity: .7; }
.social-img { width: 32px; height: 32px; object-fit: contain; }
.footer-col h4 { font-size: .72rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(228,232,244,0.28); margin-bottom: .8rem; }
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: .5rem; }
.footer-col ul li a, .footer-col ul a { font-size: .85rem; color: rgba(228,232,244,0.38); text-decoration: none; transition: color .2s; }
.footer-col ul li a:hover, .footer-col ul a:hover { color: #e4e8f4; }
.footer-final-line { border-top: 1px solid rgba(255,255,255,0.05); padding: 14px 32px; text-align: center; font-size: 12px; color: rgba(228,232,244,0.18); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; }
  .sistemas-grid { grid-template-columns: repeat(2, 1fr); }
  .flowline-inner { grid-template-columns: repeat(2, 1fr); }
  .flow-step:nth-child(2) { border-right: none; }
  .footer-inner { grid-template-columns: 1fr 1fr; }
  .footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 540px) {
  .planos-grid { grid-template-columns: 1fr; }
  .sistemas-grid { grid-template-columns: 1fr; }
  .flowline-inner { grid-template-columns: 1fr; }
  .flow-step { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 1rem 0; }
  .nav-links { display: none; }
  .footer-inner { grid-template-columns: 1fr; }
}
</style>
