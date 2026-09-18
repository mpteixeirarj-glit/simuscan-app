<template>
  <div class="landing-light">
    <!-- DEVICE NOTICE -->
    <div class="device-notice">
      <span class="notice-text">
        Para melhor experiência, o SimuScan foi projetado para
        <strong>tablets e computadores</strong>.
        No PC, pressione <kbd>F11</kbd> para tela cheia.
      </span>
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
        <RouterLink to="/login" class="btn-entrar">Entrar</RouterLink>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <div class="hero-left">
        <p class="hero-eyebrow">Simulador Educacional de TC</p>
        <h1 class="hero-h1">
          Treine com <span class="pink">precisão</span><br>antes de entrar na <span class="blue">sala</span>.
        </h1>
        <p class="hero-sub">
          Pratique o fluxo completo de um exame de tomografia — cadastro de paciente, seleção de protocolo, topograma e aquisição — em ambiente seguro e sem risco ao paciente.
        </p>
        <div class="hero-ctas">
          <RouterLink to="/login" class="cta-primary">Começar agora</RouterLink>
          <button class="cta-ghost" @click="scrollTo('funcionalidades')">Ver funcionalidades</button>
        </div>
      </div>
      <div class="hero-right">
        <div class="hero-img-wrap">
          <video class="hero-video" autoplay muted loop playsinline :poster="BASE_URL + 'imagens/hero-scanner.jpg'">
            <source :src="BASE_URL + 'imagens/hero-scanner.webm'" type="video/webm" />
            <source :src="BASE_URL + 'imagens/hero-scanner.mp4'" type="video/mp4" />
            <img :src="BASE_URL + 'imagens/hero-scanner.jpg'" alt="SimuScan CT Scanner" class="hero-img" />
          </video>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="section" id="funcionalidades">
      <p class="eyebrow">Funcionalidades</p>
      <h2 class="section-title">Tudo que você precisa para treinar</h2>
      <div class="cards-grid" ref="featuresRef">
        <div class="card" v-for="(feat, i) in features" :key="i" :class="{ visible: featVisible }">
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

    <!-- SISTEMAS -->
    <section class="section section-tinted" id="sistemas">
      <p class="eyebrow">Sistemas</p>
      <h2 class="section-title">Escolha o equipamento</h2>
      <div class="sistemas-grid">
        <div class="sistema-card gama-card">
          <div class="sys-icon-wrap">
            <img :src="BASE_URL + 'imagens/gamma-icone.png'" alt="Gama Healthcare" class="sys-icon" @error="$event.target.style.display='none'" />
          </div>
          <span class="sys-badge available">Disponível</span>
          <h3 class="sys-name">Gama Healthcare</h3>
          <p class="sys-desc">Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
          <RouterLink to="/login" class="sys-btn">Acessar</RouterLink>
        </div>
        <div class="sistema-card sigma-on-card">
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
          <p class="ai-text">
            O SimuScan foi inteiramente desenvolvido com o auxílio de Inteligências Artificiais, sob orientação e supervisão de um profissional formado e atuante na área de Radiologia há mais de 20 anos, com vasta experiência nas plataformas de tomografia simuladas.
          </p>
          <p class="ai-text">
            As interfaces, nomenclaturas e fluxos apresentados são fictícios e foram criados exclusivamente para fins educacionais e de treinamento.
          </p>
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
          <h4 class="footer-col-title">Produto</h4>
          <ul>
            <li><a href="#funcionalidades" @click.prevent="scrollTo('funcionalidades')">Funcionalidades</a></li>
            <li><a href="#sistemas">Sistemas</a></li>
            <li><a href="#planos">Planos</a></li>
            <li><RouterLink to="/documentacao">Documentação</RouterLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-col-title">Suporte</h4>
          <ul>
            <li><RouterLink to="/contato">Contato</RouterLink></li>
            <li><RouterLink to="/documentacao">Guia de uso</RouterLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-col-title">Legal</h4>
          <ul>
            <li><RouterLink to="/termos">Termos de Uso</RouterLink></li>
            <li><RouterLink to="/privacidade">Privacidade</RouterLink></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 SimuScan. Todos os direitos reservados.</span>
        <span class="footer-version">{{ version }}</span>
      </div>
      <div class="footer-legal-bottom">
        <p>© 2026 SimuScan. Simulador educacional — interfaces fictícias para fins de treinamento.</p>
      </div>
      <div class="footer-legal-final">
        <p>SimuScan é um simulador educacional. Todas as interfaces, marcas e equipamentos representados são fictícios e criados exclusivamente para fins de treinamento.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { APP_VERSION } from '@/version.js'

const BASE_URL = import.meta.env.BASE_URL
const version = APP_VERSION

const features = [
  { title: 'Console interativo', desc: 'Interface que simula fielmente o console de um tomógrafo moderno, com todos os controles e feedbacks visuais.', img: 'imagens/feature-console.jpeg', icon: 'imagens/monitor.png' },
  { title: 'Worklist de pacientes', desc: 'Lista de agendamentos com dados realistas para praticar o fluxo completo de recepção e início de exame.', img: 'imagens/feature-worklist.jpeg', icon: 'imagens/prancheta.png' },
  { title: 'Gerenciador de protocolos', desc: 'Selecione, visualize e edite protocolos de aquisição organizados por região anatômica.', img: 'imagens/feature-protocols.jpeg', icon: 'imagens/engrenagem.png' },
]

const featuresRef = ref(null)
const featVisible = ref(false)

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) featVisible.value = true }, { threshold: 0.15 })
  if (featuresRef.value) obs.observe(featuresRef.value)
})
</script>

<style scoped>
* { box-sizing: border-box; }
.landing-light { min-height: 100vh; background: #f5f6fa; color: #1a1a2e; font-family: 'Inter', system-ui, sans-serif; }

/* DEVICE NOTICE */
.device-notice { background: rgba(52,152,219,0.08); border-bottom: 1px solid rgba(52,152,219,0.2); padding: 10px 24px; text-align: center; }
.notice-text { font-size: 13px; color: #555; }
.notice-text strong { color: #3498db; font-weight: 700; }
.notice-text kbd { display: inline-block; padding: 2px 7px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px; background: #f0f0f0; color: #555; }

/* NAV */
.nav { position: sticky; top: 0; z-index: 50; background: rgba(245,246,250,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0,0,0,0.08); box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.nav-inner { max-width: 1100px; margin: 0 auto; padding: 0 2rem; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: .7rem; }
.logo-img { height: 36px; width: auto; }
.logo-text { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1.5rem; letter-spacing: -.03em; }
.logo-text .p { color: #e91e8c; }
.logo-text .b { color: #3498db; }
.nav-links { display: flex; gap: 2rem; }
.nav-links a { font-size: .88rem; color: #555; text-decoration: none; font-weight: 500; transition: color .2s; }
.nav-links a:hover { color: #1a1a2e; }
.btn-entrar { padding: .45rem 1.2rem; border: 1.5px solid #3498db; border-radius: 8px; color: #3498db; font-size: .9rem; font-weight: 600; text-decoration: none; transition: background .2s, color .2s; }
.btn-entrar:hover { background: #3498db; color: #fff; }

/* HERO */
.hero { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
.hero-eyebrow { font-size: .7rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #3498db; margin-bottom: .8rem; }
.hero-h1 { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: clamp(2rem, 4vw, 3rem); line-height: 1.1; letter-spacing: -.02em; margin-bottom: 1.2rem; color: #1a1a2e; }
.hero-h1 .pink { color: #e91e8c; }
.hero-h1 .blue { color: #3498db; }
.hero-sub { font-size: .95rem; color: #666; line-height: 1.7; margin-bottom: 2rem; }
.hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; }
.cta-primary { padding: .85rem 2rem; background: #e91e8c; border: none; border-radius: 10px; color: #fff; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1rem; letter-spacing: .05em; text-decoration: none; box-shadow: 0 4px 20px rgba(233,30,140,0.3); transition: opacity .2s, transform .2s; }
.cta-primary:hover { opacity: .9; transform: translateY(-2px); }
.cta-ghost { padding: .85rem 2rem; background: none; border: 1.5px solid #ccc; border-radius: 10px; color: #555; font-size: 1rem; cursor: pointer; transition: border-color .2s, color .2s; }
.cta-ghost:hover { border-color: #3498db; color: #3498db; }
.hero-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
.hero-video, .hero-img { width: 100%; height: auto; display: block; }

/* SECTIONS */
.section { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem; }
.section-tinted { background: #eef1f7; max-width: 100%; padding: 5rem 2rem; }
.section-tinted > * { max-width: 1100px; margin-left: auto; margin-right: auto; }
.eyebrow { font-size: .7rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #3498db; margin-bottom: .8rem; }
.section-title { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: clamp(1.6rem, 3.5vw, 2.4rem); color: #1a1a2e; margin-bottom: 2.5rem; }

/* FEATURE CARDS */
.cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
.card { background: #fff; border: 1px solid #e8eaf0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); transition: box-shadow .3s, transform .3s; opacity: 0; transform: translateY(20px); transition: opacity .5s ease, transform .5s ease, box-shadow .3s, border-color .3s; }
.card.visible { opacity: 1; transform: translateY(0); }
.card:hover { box-shadow: 0 12px 40px rgba(233,30,140,0.12); border-color: #e91e8c; }
.card-img-wrap { width: 100%; height: 180px; overflow: hidden; }
.card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
.card:hover .card-img-wrap img { transform: scale(1.05); }
.card-icon { width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; margin: 1.2rem auto .6rem; }
.icon-img { width: 48px; height: 48px; object-fit: contain; }
.card h3 { font-size: 1rem; font-weight: 700; color: #1a1a2e; margin: 0 1.5rem .5rem; }
.card p { font-size: .88rem; color: #666; margin: 0 1.5rem 1.5rem; line-height: 1.6; }

/* SISTEMAS */
.sistemas-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.sistema-card { background: #fff; border: 1px solid #e0e4ef; border-radius: 16px; padding: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; box-shadow: 0 4px 16px rgba(0,0,0,0.05); transition: box-shadow .3s, transform .3s, border-color .3s; }
.sigma-on-card, .sigma-old-card, .kappa-card { opacity: .8; }
.sys-icon-wrap { width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
.sys-icon { width: 72px; height: 72px; object-fit: contain; border-radius: 12px; }
.sys-badge { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 3px 12px; border-radius: 100px; margin-bottom: 10px; }
.sys-badge.available { background: rgba(46,204,113,0.12); color: #27ae60; border: 1px solid rgba(46,204,113,0.3); }
.sys-badge.soon { background: #f0f2f8; color: #888; border: 1px solid #dde1ee; }
.sys-name { font-size: 1rem; font-weight: 700; color: #1a1a2e; margin-bottom: .3rem; }
.sys-subtitle { font-size: 11px; font-style: italic; color: #999; margin-bottom: 6px; }
.sys-desc { font-size: .82rem; color: #666; line-height: 1.6; margin-bottom: 1rem; }
.sys-btn { display: inline-block; padding: .6rem 1.6rem; background: #3498db; color: #fff; border-radius: 8px; font-weight: 700; font-size: .9rem; text-decoration: none; transition: background .2s; margin-top: auto; }
.sys-btn:hover { background: #2980b9; }
.sys-btn-disabled { display: inline-block; padding: .6rem 1.6rem; background: #f0f2f8; color: #bbb; border: 1px solid #dde1ee; border-radius: 8px; font-size: .9rem; font-weight: 600; cursor: not-allowed; width: 100%; margin-top: auto; }
.gama-card:hover { border-color: #3498db; box-shadow: 0 8px 32px rgba(52,152,219,0.2); transform: translateY(-4px); }
.sigma-on-card:hover { border-color: #27ae60; box-shadow: 0 8px 32px rgba(46,204,113,0.15); transform: translateY(-4px); opacity: 1; }
.sigma-old-card:hover { border-color: #7f8fc9; box-shadow: 0 8px 32px rgba(127,143,201,0.15); transform: translateY(-4px); opacity: 1; }
.kappa-card:hover { border-color: #9e3d52; box-shadow: 0 8px 32px rgba(158,61,82,0.15); transform: translateY(-4px); opacity: 1; }

/* PLANOS */
.planos-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 720px; margin: 0 auto; }
.plano-card { background: #fff; border: 1px solid #e0e4ef; border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem; box-shadow: 0 4px 16px rgba(0,0,0,0.05); position: relative; transition: transform .3s, box-shadow .3s; }
.plano-card.destaque { border-color: #3498db; box-shadow: 0 8px 32px rgba(52,152,219,0.15); }
.plano-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(233,30,140,0.1); }
.plano-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #3498db; color: #fff; font-size: .65rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 3px 12px; border-radius: 20px; white-space: nowrap; }
.plano-card h3 { font-size: 1.1rem; font-weight: 700; color: #1a1a2e; }
.preco { font-family: 'Rajdhani', sans-serif; font-size: 2.4rem; font-weight: 700; color: #3498db; }
.preco span { font-size: 1rem; color: #999; }
.economy-badge { display: inline-block; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 100px; background: rgba(46,204,113,0.1); color: #27ae60; border: 1px solid rgba(46,204,113,0.3); }
.annual-note { font-size: 12px; color: #999; margin-top: -4px; }
.plano-card ul { list-style: none; display: flex; flex-direction: column; gap: .5rem; flex: 1; }
.plano-card ul li { font-size: .9rem; color: #555; }
.plano-card ul li::before { content: '✓ '; color: #27ae60; font-weight: 700; }
.plano-btn { padding: .8rem; background: #e0e4ef; border: none; border-radius: 8px; color: #555; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1rem; cursor: pointer; transition: background .2s; }
.plano-btn:hover { background: #d0d5e8; }
.destaque-btn { background: #3498db; color: #fff; }
.destaque-btn:hover { background: #2980b9; }

/* AI DISCLOSURE */
.ai-disclosure { background: #eef1f7; border-top: 1px solid #e0e4ef; border-bottom: 1px solid #e0e4ef; padding: 2rem; }
.ai-inner { max-width: 900px; margin: 0 auto; display: flex; align-items: flex-start; gap: 20px; }
.ai-icon-wrap { flex-shrink: 0; width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; }
.ai-icon { width: 48px; height: 48px; object-fit: contain; }
.ai-title { font-size: 15px; font-weight: 700; color: #1a1a2e; margin-bottom: 8px; }
.ai-text { font-size: 13px; color: #666; line-height: 1.7; margin-bottom: 6px; }

/* FOOTER */
.footer { background: #1a1a2e; color: #e8e8ec; padding: 4rem 2rem 0; }
.footer-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; padding-bottom: 3rem; }
.footer-brand {}
.footer-logo-row { display: flex; align-items: center; gap: .6rem; margin-bottom: 1rem; }
.footer-logo { height: 30px; width: auto; }
.footer-logo-text { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1.3rem; }
.footer-logo-text .p { color: #e91e8c; }
.footer-logo-text .b { color: #3498db; }
.footer-desc { font-size: .83rem; color: rgba(255,255,255,0.5); line-height: 1.6; margin-bottom: 1.2rem; }
.footer-social { display: flex; gap: .6rem; }
.social-link { display: inline-flex; align-items: center; justify-content: center; background: none; border: none; padding: 4px; text-decoration: none; transition: opacity .2s, transform .2s; }
.social-link:hover { opacity: .75; transform: translateY(-2px); }
.social-img { width: 32px; height: 32px; object-fit: contain; }
.footer-col h4, .footer-col-title { font-size: .75rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 1rem; }
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: .6rem; }
.footer-col ul li a, .footer-col ul a { font-size: .88rem; color: rgba(255,255,255,0.5); text-decoration: none; transition: color .2s; }
.footer-col ul li a:hover, .footer-col ul a:hover { color: #e8e8ec; }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); max-width: 1100px; margin: 0 auto; padding: 1.2rem 0; display: flex; justify-content: space-between; font-size: .8rem; color: rgba(255,255,255,0.4); flex-wrap: wrap; gap: .5rem; }
.footer-version { color: #3498db; font-size: 11px; opacity: .7; }
.footer-legal-bottom { border-top: 1px solid rgba(255,255,255,0.04); padding: 12px 0; text-align: center; }
.footer-legal-bottom p { font-size: 12px; color: rgba(255,255,255,0.2); margin: 0; }
.footer-legal-final { padding: 8px 0 16px; text-align: center; }
.footer-legal-final p { font-size: 11px; color: rgba(255,255,255,0.12); margin: 0; }

@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; }
  .sistemas-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-inner { grid-template-columns: 1fr 1fr; }
  .footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 540px) {
  .planos-grid { grid-template-columns: 1fr; }
  .sistemas-grid { grid-template-columns: 1fr; }
  .nav-links { display: none; }
  .footer-inner { grid-template-columns: 1fr; }
}
</style>
