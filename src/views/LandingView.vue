<template>
  <div class="landing">
    <!-- DEVICE NOTICE -->
    <div class="device-notice">
      <span class="device-notice-icon">💡</span>
      <span class="device-notice-text">
        Para melhor experiência, o SimuScan foi projetado para
        <strong>tablets e computadores</strong>.
        No PC, pressione <kbd>F11</kbd> para tela cheia.
      </span>
    </div>

    <!-- NAV -->
    <nav class="nav">
      <div class="nav-inner">
        <div class="logo">
          <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="logo-img">
          <span class="logo-text"><span class="p">Simu</span><span class="b">Scan</span></span>
        </div>
        <div class="nav-links">
          <a href="#funcionalidades" @click.prevent="scrollTo('funcionalidades')">Funcionalidades</a>
          <a href="#sistemas" @click.prevent="scrollTo('sistemas')">Sistemas</a>
          <a href="#planos" @click.prevent="scrollTo('planos')">Planos</a>
        </div>
        <RouterLink to="/login" class="btn-entrar-nav">Entrar</RouterLink>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <div class="hero-brand">
        <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="hero-logo">
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
      <div class="hero-image-wrap">
        <video
          class="hero-video"
          autoplay
          muted
          loop
          playsinline
          :poster="BASE_URL + 'imagens/hero-scanner.jpg'"
        >
          <source :src="BASE_URL + 'imagens/hero-scanner.webm'" type="video/webm" />
          <source :src="BASE_URL + 'imagens/hero-scanner.mp4'" type="video/mp4" />
          <img
            :src="BASE_URL + 'imagens/hero-scanner.jpg'"
            alt="SimuScan CT Scanner"
            class="hero-image"
          />
        </video>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="section" id="funcionalidades">
      <p class="eyebrow">Funcionalidades</p>
      <h2>Tudo que você precisa para treinar</h2>
      <div class="cards-grid">
        <div class="card">
          <div class="feature-card-image">
            <img :src="BASE_URL + 'imagens/feature-console.jpeg'" alt="Console Interativo" @error="$event.target.parentElement.style.display='none'">
          </div>
          <div class="card-icon">🖥️</div>
          <h3>Console interativo</h3>
          <p>Interface que simula fielmente o console de um tomógrafo moderno, com todos os controles e feedbacks visuais.</p>
        </div>
        <div class="card">
          <div class="feature-card-image">
            <img :src="BASE_URL + 'imagens/feature-worklist.jpeg'" alt="Worklist de Pacientes" @error="$event.target.parentElement.style.display='none'">
          </div>
          <div class="card-icon">📋</div>
          <h3>Worklist de pacientes</h3>
          <p>Lista de agendamentos com dados realistas para praticar o fluxo completo de recepção e início de exame.</p>
        </div>
        <div class="card">
          <div class="feature-card-image">
            <img :src="BASE_URL + 'imagens/feature-protocols.jpeg'" alt="Gerenciador de Protocolos" @error="$event.target.parentElement.style.display='none'">
          </div>
          <div class="card-icon">⚙️</div>
          <h3>Gerenciador de protocolos</h3>
          <p>Selecione, visualize e edite protocolos de aquisição organizados por região anatômica.</p>
        </div>
      </div>
    </section>

    <!-- SISTEMAS -->
    <section class="section section-alt" id="sistemas">
      <p class="eyebrow">Sistemas</p>
      <h2>Escolha o equipamento</h2>
      <div class="sistemas-grid">
        <div class="sistema-card available gama-card" data-system="gama">
          <span class="badge-available">Disponível</span>
          <div class="system-icon system-icon--gama">
            <img :src="BASE_URL + 'imagens/icon-gama.png'" alt="Gama" class="system-icon-img" @error="$event.target.style.display='none'">
          </div>
          <h3>Gama Healthcare</h3>
          <p>Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
          <RouterLink to="/login" class="sistema-btn">Acessar</RouterLink>
        </div>
        <div class="sistema-card locked sigma-card" data-system="sigma">
          <span class="badge-soon">Em breve</span>
          <div class="system-icon system-icon--sigma">
            <img :src="BASE_URL + 'imagens/icon-sigma.png'" alt="Sigma" class="system-icon-img" @error="$event.target.style.display='none'">
          </div>
          <h3>Sigma Healthcare</h3>
          <p>Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
          <div class="sigma-versions">
            <div class="sigma-version-badge"><span class="sigma-version-dot old"></span>Old Sigma</div>
            <div class="sigma-version-badge"><span class="sigma-version-dot new"></span>Sigma ON</div>
          </div>
        </div>
        <div class="sistema-card locked kappa-card" data-system="kappa">
          <span class="badge-soon">Em breve</span>
          <div class="system-icon system-icon--kappa">
            <img :src="BASE_URL + 'imagens/icon-kappa.png'" alt="Kappa" class="system-icon-img" @error="$event.target.style.display='none'">
          </div>
          <h3>Kappa Healthcare</h3>
          <p>Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
        </div>
      </div>
    </section>


    <!-- PLANOS -->
    <section class="section" id="planos">
      <p class="eyebrow">Planos</p>
      <h2>Escolha seu acesso</h2>
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
          <span class="plano-economy-badge">Economia de 17% · R$ 588/ano</span>
          <div class="preco">R$ 49<span>/mês</span></div>
          <p class="plan-annual-note">Cobrado anualmente · R$ 588/ano</p>
          <ul>
            <li>Acesso a todos os sistemas</li>
            <li>Atualizações incluídas</li>
            <li>Suporte prioritário</li>
            <li>2 meses grátis</li>
          </ul>
          <button class="plano-btn">Assinar</button>
        </div>
      </div>
    </section>

    <!-- AI DISCLOSURE -->
    <section class="ai-disclosure">
      <div class="ai-disclosure-inner">
        <div class="ai-disclosure-icon">🤖</div>
        <p class="ai-disclosure-text">
          O SimuScan foi inteiramente desenvolvido com o auxílio de
          Inteligências Artificiais, sob orientação e supervisão de um
          profissional formado e atuante na área de Radiologia há mais
          de 20 anos, com vasta experiência em todas as plataformas
          simuladas. As interfaces, nomenclaturas e fluxos apresentados
          são fictícios e criados exclusivamente para fins educacionais
          e de treinamento.
        </p>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="landing-footer">
      <div class="landing-footer-inner">
        <div class="footer-col footer-col-brand">
          <div class="footer-logo-row">
            <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="footer-logo-img" @error="$event.target.style.display='none'">
            <span class="footer-logo-text"><span class="p">Simu</span><span class="b">Scan</span></span>
          </div>
          <p class="footer-desc">Simulador educacional de Tomografia Computadorizada, desenvolvido para técnicos e estudantes de radiologia.</p>
          <div class="footer-social">
            <a href="#" class="footer-social-link" aria-label="Instagram">📸</a>
            <a href="#" class="footer-social-link" aria-label="YouTube">▶</a>
            <a href="#" class="footer-social-link" aria-label="LinkedIn">in</a>
          </div>
        </div>
        <div class="footer-col">
          <h4 class="footer-col-title">Produto</h4>
          <ul class="footer-col-links">
            <li><a href="#funcionalidades" @click.prevent="scrollTo('funcionalidades')">Funcionalidades</a></li>
            <li><a href="#sistemas">Sistemas</a></li>
            <li><a href="#planos">Planos</a></li>
            <li><RouterLink to="/documentacao">Documentação</RouterLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-col-title">Suporte</h4>
          <ul class="footer-col-links">
            <li><RouterLink to="/contato">Contato</RouterLink></li>
            <li><RouterLink to="/documentacao">Guia de uso</RouterLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-col-title">Legal</h4>
          <ul class="footer-col-links">
            <li><RouterLink to="/termos">Termos de Uso</RouterLink></li>
            <li><RouterLink to="/privacidade">Privacidade</RouterLink></li>
          </ul>
        </div>
      </div>
      <div class="landing-footer-bottom">
        <span>© 2026 SimuScan. Todos os direitos reservados.</span>
        <span class="footer-version">{{ version }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { APP_VERSION } from '@/version.js'

const BASE_URL = import.meta.env.BASE_URL
const version = APP_VERSION

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.landing { min-height: 100vh; background: var(--cor-fundo); color: var(--cor-texto); }

/* NAV */
.nav { position: sticky; top: 0; z-index: 50; background: rgba(17,17,19,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid var(--cor-card-borda); }
.nav-inner { max-width: 1100px; margin: 0 auto; padding: 0 2rem; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: .7rem; }
.logo-img { height: 36px; width: auto; }
.logo-text { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1.5rem; letter-spacing: -.03em; }
.logo-text .p { color: var(--cor-pink); }
.logo-text .b { color: var(--cor-azul); }
.btn-entrar-nav { padding: .45rem 1.2rem; border: 1.5px solid var(--cor-azul); border-radius: 8px; color: var(--cor-azul); font-size: .9rem; font-weight: 500; text-decoration: none; transition: background .2s, color .2s; }
.btn-entrar-nav:hover { background: var(--cor-azul); color: #fff; }
.nav-links { display: flex; gap: 2rem; align-items: center; }
.nav-links a { font-size: .88rem; color: var(--cor-texto-muted); text-decoration: none; font-weight: 500; transition: color .2s; }
.nav-links a:hover { color: var(--cor-texto); }

/* HERO */
.hero { max-width: 860px; margin: 0 auto; padding: 5rem 2rem 4rem; text-align: center; }
.hero-brand { display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 1.5rem; }
.hero-logo { width: 140px; height: auto; filter: drop-shadow(0 0 20px rgba(52, 152, 219, 0.3)); }
.hero-brand-text { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--cor-texto-muted); font-weight: 500; }
.hero-h1 { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: clamp(2.4rem, 6vw, 4rem); line-height: 1.1; letter-spacing: -.03em; margin-bottom: 1.4rem; }
.hero-h1 .pink { color: var(--cor-pink); }
.hero-h1 .blue { color: var(--cor-azul); }
.hero-sub { font-size: 1.05rem; color: var(--cor-texto-muted); max-width: 600px; margin: 0 auto 2.4rem; }
.hero-ctas { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 3rem; }
.cta-primary { padding: .85rem 2rem; background: var(--cor-pink); border: none; border-radius: 10px; color: #fff; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1rem; letter-spacing: .05em; text-decoration: none; cursor: pointer; box-shadow: 0 0 30px rgba(233,30,140,.3); transition: opacity .2s; }
.cta-primary:hover { opacity: .85; }
.cta-outline { padding: .85rem 2rem; background: none; border: 1.5px solid var(--cor-card-borda); border-radius: 10px; color: var(--cor-texto); font-size: 1rem; cursor: pointer; transition: border-color .2s, color .2s; }
.cta-outline:hover { border-color: var(--cor-azul); color: var(--cor-azul); }
.hero-image-wrap { border-radius: 16px; overflow: hidden; border: 1px solid rgba(52, 152, 219, 0.2); box-shadow: 0 0 60px rgba(52, 152, 219, 0.1); position: relative; }
.hero-video { width: 100%; height: auto; display: block; border-radius: 16px; }
.hero-image { width: 100%; height: auto; display: block; }

/* SECTIONS */
.section { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem; }
.section-alt { background: var(--cor-card); margin: 0; max-width: 100%; padding: 5rem 2rem; }
.section-alt > * { max-width: 1100px; margin-left: auto; margin-right: auto; }
.eyebrow { font-size: .72rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--cor-azul); margin-bottom: 1rem; }
.section h2, .section-alt h2 { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: clamp(1.8rem, 4vw, 2.6rem); margin-bottom: 3rem; }

/* FEATURE CARDS */
.cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
.card { background: var(--cor-card); border: 1px solid var(--cor-card-borda); border-radius: 14px; padding: 0; overflow: hidden; transition: border-color .2s, transform .3s, box-shadow .3s; }
.card:hover { border-color: var(--cor-azul); transform: translateY(-6px); box-shadow: 0 12px 40px rgba(233,30,140,0.15); }
.feature-card-image { width: 100%; height: 180px; overflow: hidden; border-radius: 0; }
.feature-card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.card:hover .feature-card-image img { transform: scale(1.05); }
.card-icon { font-size: 2rem; margin: 1.5rem 2rem .8rem; }
.card h3 { font-size: 1.1rem; font-weight: 700; margin: 0 2rem .6rem; }
.card p { font-size: .9rem; color: var(--cor-texto-muted); margin: 0 2rem 2rem; }

/* SISTEMAS */
.sistemas-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; max-width: 1100px; margin: 3rem auto 0; }
.sistema-card { background: var(--cor-fundo); border: 1px solid var(--cor-card-borda); border-radius: 16px; padding: 2rem; position: relative; text-align: center; display: flex; flex-direction: column; align-items: center; transition: box-shadow .35s ease, transform .35s ease, border-color .35s ease; }
.sistema-card.available { border-color: var(--cor-azul); }
.sistema-card.locked { opacity: .65; }
.sistema-card h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: .4rem; color: var(--cor-texto); }
.sistema-card p { font-size: .85rem; color: var(--cor-texto-muted); margin-bottom: 1.2rem; }
.badge-available, .badge-soon { font-size: .65rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; display: block; width: fit-content; margin: 0 auto 1rem; }
.badge-available { background: rgba(52,152,219,.15); color: var(--cor-azul); border: 1px solid rgba(52,152,219,.3); }
.badge-soon { background: rgba(255,255,255,.07); color: var(--cor-texto-muted); border: 1px solid rgba(255,255,255,.1); }
.sistema-btn { display: inline-block; padding: .6rem 1.6rem; background: var(--cor-azul); color: #fff; border-radius: 8px; font-weight: 700; font-size: .9rem; text-decoration: none; transition: opacity .2s; margin-top: auto; }
.sistema-btn:hover { opacity: .85; }

/* SYSTEM ICONS */
.system-icon { width: 80px; height: 80px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.2rem; }
.system-icon--gama { background: rgba(52, 152, 219, 0.15); border: 2px solid rgba(52, 152, 219, 0.4); }
.system-icon--sigma { background: rgba(46, 204, 113, 0.15); border: 2px solid rgba(46, 204, 113, 0.4); }
.system-icon--kappa { background: rgba(243, 156, 18, 0.15); border: 2px solid rgba(243, 156, 18, 0.4); }
.system-icon-img { width: 52px; height: 52px; object-fit: contain; }

/* PLANOS */
.planos-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 720px; margin: 0 auto; }
.plano-card { background: var(--cor-card); border: 1px solid var(--cor-card-borda); border-radius: 16px; padding: 2rem; position: relative; display: flex; flex-direction: column; gap: 1rem; transition: transform .3s, box-shadow .3s; }
.plano-card.destaque { border-color: var(--cor-azul); box-shadow: 0 0 30px rgba(52,152,219,.15); }
.plano-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(233,30,140,0.15); }
.plano-card.destaque:hover { transform: translateY(-8px); box-shadow: 0 16px 48px rgba(233,30,140,0.22); }
.plano-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--cor-azul); color: #fff; font-size: .65rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 3px 12px; border-radius: 20px; white-space: nowrap; }
.plano-card h3 { font-size: 1.1rem; font-weight: 700; }
.preco { font-family: 'Rajdhani', sans-serif; font-size: 2.4rem; font-weight: 700; color: var(--cor-azul); }
.preco span { font-size: 1rem; color: var(--cor-texto-muted); }
.plano-card ul { list-style: none; display: flex; flex-direction: column; gap: .5rem; flex: 1; }
.plano-card ul li::before { content: '✓ '; color: var(--cor-verde); font-weight: 700; }
.plano-card ul li { font-size: .9rem; color: var(--cor-texto-muted); }
.plano-btn { padding: .8rem; background: var(--cor-azul); border: none; border-radius: 8px; color: #fff; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1rem; cursor: pointer; transition: background .2s; }
.plano-btn:hover { background: var(--cor-azul-hover); }

/* FOOTER */
.landing-footer { background: rgba(0,0,0,0.4); border-top: 1px solid var(--cor-card-borda); padding: 4rem 2rem 0; }
.landing-footer-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; padding-bottom: 3rem; }
.footer-logo-row { display: flex; align-items: center; gap: .6rem; margin-bottom: 1rem; }
.footer-logo-img { height: 30px; width: auto; }
.footer-logo-text { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1.3rem; }
.footer-logo-text .p { color: var(--cor-pink); }
.footer-logo-text .b { color: var(--cor-azul); }
.footer-desc { font-size: .83rem; color: var(--cor-texto-muted); line-height: 1.6; margin-bottom: 1.2rem; }
.footer-social { display: flex; gap: .6rem; }
.footer-social-link { width: 36px; height: 36px; background: rgba(255,255,255,0.06); border: 1px solid var(--cor-card-borda); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: .85rem; color: var(--cor-texto-muted); text-decoration: none; transition: background .2s, color .2s; }
.footer-social-link:hover { background: rgba(52,152,219,0.15); color: var(--cor-azul); }
.footer-col-title { font-size: .75rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--cor-texto-muted); margin-bottom: 1rem; }
.footer-col-links { list-style: none; display: flex; flex-direction: column; gap: .6rem; }
.footer-col-links li a, .footer-col-links a { font-size: .88rem; color: var(--cor-texto-muted); text-decoration: none; transition: color .2s; display: block; }
.footer-col-links li a:hover, .footer-col-links a:hover { color: var(--cor-texto); }
.landing-footer-bottom { border-top: 1px solid var(--cor-card-borda); max-width: 1100px; margin: 0 auto; padding: 1.2rem 0; display: flex; align-items: center; justify-content: space-between; font-size: .8rem; color: var(--cor-texto-muted); flex-wrap: wrap; gap: .5rem; }
.footer-version { color: var(--cor-azul); font-size: 11px; opacity: .7; }

@media (max-width: 540px) {
  .planos-grid { grid-template-columns: 1fr; }
}

/* DEVICE NOTICE */
.device-notice { background: rgba(52,152,219,0.12); border-bottom: 1px solid rgba(52,152,219,0.3); padding: 10px 24px; display: flex; align-items: center; justify-content: center; gap: 8px; text-align: center; }
.device-notice-icon { font-size: 14px; flex-shrink: 0; }
.device-notice-text { font-size: 13px; color: #aaa; line-height: 1.4; }
.device-notice-text strong { color: #3498db; font-weight: 700; }
.device-notice-text kbd { display: inline-block; padding: 2px 7px; border: 1px solid rgba(255,255,255,0.25); border-radius: 4px; font-size: 12px; background: rgba(255,255,255,0.12); color: #ccc; }

/* SISTEMA CARD GLOW */
.gama-card:hover { border-color: #3498db; box-shadow: 0 0 0 1px #3498db, 0 0 20px rgba(52,152,219,0.35), 0 0 50px rgba(52,152,219,0.12); transform: translateY(-6px); }
.sigma-card:hover { border-color: #2ecc71; box-shadow: 0 0 0 1px #2ecc71, 0 0 20px rgba(46,204,113,0.35), 0 0 50px rgba(46,204,113,0.12); transform: translateY(-6px); opacity: 1; }
.kappa-card:hover { border-color: #f39c12; box-shadow: 0 0 0 1px #f39c12, 0 0 20px rgba(243,156,18,0.35), 0 0 50px rgba(243,156,18,0.12); transform: translateY(-6px); opacity: 1; }

/* FOOTER RESPONSIVE */
@media (max-width: 768px) {
  .landing-footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
  .footer-col-brand { grid-column: 1 / -1; }
}
@media (max-width: 480px) {
  .landing-footer-inner { grid-template-columns: 1fr; }
  .nav-links { display: none; }
}

/* SIGMA VERSIONS */
.sigma-versions { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; justify-content: center; }
.sigma-version-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 600; padding: 3px 10px;
  border-radius: 100px; background: rgba(52,152,219,0.12);
  color: #3498db; border: 1px solid rgba(52,152,219,0.25);
}
.sigma-version-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.sigma-version-dot.old { background: #888; }
.sigma-version-dot.new { background: #3498db; }

/* PLAN ECONOMY */
.plano-economy-badge {
  display: inline-block; font-size: 11px; font-weight: 700;
  padding: 3px 10px; border-radius: 100px;
  background: rgba(46,204,113,0.15); color: #2ecc71;
  border: 1px solid rgba(46,204,113,0.3); margin-bottom: 6px;
}
.plan-annual-note { font-size: 12px; color: var(--cor-texto-muted); margin-top: -4px; margin-bottom: 4px; }

/* AI DISCLOSURE */
.ai-disclosure {
  background: rgba(255,255,255,0.03);
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 24px 32px;
}
.ai-disclosure-inner {
  max-width: 1100px; margin: 0 auto;
  display: flex; align-items: flex-start; gap: 14px;
}
.ai-disclosure-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
.ai-disclosure-text { font-size: 13px; color: #555; line-height: 1.6; }
</style>
