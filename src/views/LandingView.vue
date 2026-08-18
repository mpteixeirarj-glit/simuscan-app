<template>
  <div class="landing">
    <!-- NAV -->
    <nav class="nav">
      <div class="nav-inner">
        <div class="logo">
          <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="logo-img">
          <span class="logo-text"><span class="p">Simu</span><span class="b">Scan</span></span>
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
        <button class="cta-outline" @click="scrollTo('features')">Ver funcionalidades</button>
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
    <section class="section" id="features">
      <p class="eyebrow">Funcionalidades</p>
      <h2>Tudo que você precisa para treinar</h2>
      <div class="cards-grid">
        <div class="card">
          <div class="feature-card-image">
            <img :src="BASE_URL + 'imagens/feature-console.jpg'" alt="Console Interativo" @error="$event.target.parentElement.style.display='none'">
          </div>
          <div class="card-icon">🖥️</div>
          <h3>Console interativo</h3>
          <p>Interface que simula fielmente o console de um tomógrafo moderno, com todos os controles e feedbacks visuais.</p>
        </div>
        <div class="card">
          <div class="feature-card-image">
            <img :src="BASE_URL + 'imagens/feature-worklist.jpg'" alt="Worklist de Pacientes" @error="$event.target.parentElement.style.display='none'">
          </div>
          <div class="card-icon">📋</div>
          <h3>Worklist de pacientes</h3>
          <p>Lista de agendamentos com dados realistas para praticar o fluxo completo de recepção e início de exame.</p>
        </div>
        <div class="card">
          <div class="feature-card-image">
            <img :src="BASE_URL + 'imagens/feature-protocols.jpg'" alt="Gerenciador de Protocolos" @error="$event.target.parentElement.style.display='none'">
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
        <div class="sistema-card available">
          <span class="badge-available">Disponível</span>
          <div class="system-icon system-icon--gama">
            <span class="greek-letter">Γ</span>
          </div>
          <h3>Gama Healthcare</h3>
          <p>Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
          <RouterLink to="/login" class="sistema-btn">Acessar</RouterLink>
        </div>
        <div class="sistema-card locked">
          <span class="badge-soon">Em breve</span>
          <div class="system-icon system-icon--sigma">
            <span class="greek-letter">Σ</span>
          </div>
          <h3>Sigma Healthcare</h3>
          <p>Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
        </div>
        <div class="sistema-card locked">
          <span class="badge-soon">Em breve</span>
          <div class="system-icon system-icon--kappa">
            <span class="greek-letter">Κ</span>
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
          <div class="preco">R$ 29<span>/mês</span></div>
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
          <div class="preco">R$ 19<span>/mês</span></div>
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

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-inner">
        <p class="footer-brand"><span class="p">Simu</span><span class="b">Scan</span>® 2026</p>
        <div class="footer-meta">
          <span>© 2026 SimuScan. Todos os direitos reservados.</span>
          <span class="footer-version">{{ version }}</span>
        </div>
        <p class="footer-legal">
          SimuScan® é uma marca registrada. As interfaces de simulação são fictícias e criadas exclusivamente para fins educacionais. Não há nenhuma afiliação com fabricantes de equipamentos de diagnóstico por imagem.
        </p>
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
.card { background: var(--cor-card); border: 1px solid var(--cor-card-borda); border-radius: 14px; padding: 0; overflow: hidden; transition: border-color .2s; }
.card:hover { border-color: var(--cor-azul); }
.feature-card-image { width: 100%; height: 180px; overflow: hidden; border-radius: 0; }
.feature-card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.card:hover .feature-card-image img { transform: scale(1.05); }
.card-icon { font-size: 2rem; margin: 1.5rem 2rem .8rem; }
.card h3 { font-size: 1.1rem; font-weight: 700; margin: 0 2rem .6rem; }
.card p { font-size: .9rem; color: var(--cor-texto-muted); margin: 0 2rem 2rem; }

/* SISTEMAS */
.sistemas-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; max-width: 1100px; margin: 3rem auto 0; }
.sistema-card { background: var(--cor-fundo); border: 1px solid var(--cor-card-borda); border-radius: 16px; padding: 2rem; position: relative; }
.sistema-card.available { border-color: var(--cor-pink); }
.sistema-card.locked { opacity: .55; }
.sistema-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: .4rem; }
.sistema-card p { font-size: .85rem; color: var(--cor-texto-muted); margin-bottom: 1.2rem; }
.badge-available, .badge-soon { font-size: .65rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; display: inline-block; }
.badge-available { background: rgba(233,30,140,.12); color: var(--cor-pink); }
.badge-soon { background: rgba(255,255,255,.07); color: var(--cor-texto-muted); }
.sistema-btn { display: inline-block; padding: .55rem 1.4rem; background: var(--cor-pink); color: #fff; border-radius: 8px; font-weight: 700; font-size: .9rem; text-decoration: none; transition: opacity .2s; }
.sistema-btn:hover { opacity: .85; }

/* SYSTEM ICONS */
.system-icon { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 1rem 0 .8rem; }
.system-icon--gama { background: rgba(46, 204, 113, 0.15); border: 1.5px solid rgba(46, 204, 113, 0.4); }
.system-icon--sigma { background: rgba(52, 152, 219, 0.15); border: 1.5px solid rgba(52, 152, 219, 0.4); }
.system-icon--kappa { background: rgba(243, 156, 18, 0.15); border: 1.5px solid rgba(243, 156, 18, 0.4); }
.greek-letter { font-family: 'Rajdhani', serif; font-size: 28px; font-weight: 700; line-height: 1; }
.system-icon--gama .greek-letter { color: #2ecc71; }
.system-icon--sigma .greek-letter { color: #3498db; }
.system-icon--kappa .greek-letter { color: #f39c12; }

/* PLANOS */
.planos-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 720px; margin: 0 auto; }
.plano-card { background: var(--cor-card); border: 1px solid var(--cor-card-borda); border-radius: 16px; padding: 2rem; position: relative; display: flex; flex-direction: column; gap: 1rem; }
.plano-card.destaque { border-color: var(--cor-azul); box-shadow: 0 0 30px rgba(52,152,219,.15); }
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
.footer { border-top: 1px solid var(--cor-card-borda); padding: 3rem 2rem; text-align: center; }
.footer-inner { max-width: 700px; margin: 0 auto; }
.footer-brand { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1.4rem; margin-bottom: 1rem; }
.footer-brand .p { color: var(--cor-pink); }
.footer-brand .b { color: var(--cor-azul); }
.footer-meta { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: .8rem; flex-wrap: wrap; font-size: .82rem; color: var(--cor-texto-muted); }
.footer-version { color: var(--cor-azul); font-size: 11px; opacity: 0.7; }
.footer-legal { font-size: .78rem; color: var(--cor-texto-muted); line-height: 1.7; }

@media (max-width: 540px) {
  .planos-grid { grid-template-columns: 1fr; }
}
</style>
