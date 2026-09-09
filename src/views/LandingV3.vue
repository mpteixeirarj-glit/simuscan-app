<template>
  <div class="v3-page">

    <!-- DEVICE NOTICE -->
    <div class="v3-device-notice">
      <span>💡</span>
      <span class="v3-device-text">
        Para melhor experiência, o SimuScan foi projetado para
        <strong>tablets e computadores</strong>.
        No PC, pressione <kbd>F11</kbd> para tela cheia.
      </span>
    </div>

    <!-- NAV -->
    <nav class="v3-nav">
      <div class="v3-nav-inner">
        <div class="v3-logo">
          <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="v3-logo-img" />
        </div>
        <div class="v3-nav-links">
          <a href="#funcionalidades" @click.prevent="scrollTo('funcionalidades')">Funcionalidades</a>
          <a href="#sistemas" @click.prevent="scrollTo('sistemas')">Sistemas</a>
          <a href="#planos" @click.prevent="scrollTo('planos')">Planos</a>
        </div>
        <RouterLink to="/login" class="v3-btn-accent">Entrar →</RouterLink>
      </div>
    </nav>

    <!-- HERO -->
    <section class="v3-hero">
      <div class="v3-hero-inner">
        <div class="v3-hero-content">
          <p class="v3-eyebrow">Simulador de Tomografia Computadorizada</p>
          <h1 class="v3-hero-title">
            Treine com<br />
            <span class="v3-accent-text">precisão.</span>
          </h1>
          <p class="v3-hero-desc">
            O SimuScan reproduz os fluxos reais de aquisição de TC em
            ambiente seguro e interativo. Pratique protocolos, gerencie
            worklists e domine o console.
          </p>
          <div class="v3-hero-actions">
            <RouterLink to="/login" class="v3-btn-accent-large">Começar agora →</RouterLink>
            <a href="#funcionalidades" class="v3-btn-ghost" @click.prevent="scrollTo('funcionalidades')">Ver funcionalidades</a>
          </div>
        </div>
        <div class="v3-hero-media">
          <img :src="BASE_URL + 'imagens/hero-scanner.jpg'" alt="SimuScan Console" class="v3-hero-img" />
        </div>
      </div>
    </section>

    <!-- FUNCIONALIDADES -->
    <section class="v3-section v3-section-bg" id="funcionalidades">
      <div class="v3-section-inner">
        <div class="v3-section-header">
          <p class="v3-section-eyebrow">Funcionalidades</p>
          <h2 class="v3-section-title">Tudo que você precisa para treinar</h2>
        </div>
        <div class="v3-cards-grid">
          <div class="v3-feature-card" v-for="f in features" :key="f.title">
            <div class="v3-feature-img">
              <img :src="BASE_URL + f.img" :alt="f.title" @error="$event.target.style.display='none'" />
            </div>
            <div class="v3-feature-body">
              <h3>{{ f.icon }} {{ f.title }}</h3>
              <p>{{ f.desc }}</p>
              <RouterLink to="/login" class="v3-btn-text">Explorar →</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SISTEMAS — Expanding Flex Cards -->
    <section class="v3-section v3-section-white" id="sistemas">
      <div class="v3-section-inner">
        <div class="v3-section-header">
          <p class="v3-section-eyebrow">Sistemas</p>
          <h2 class="v3-section-title">Plataformas disponíveis</h2>
        </div>
        <div class="v3-systems-flex">

          <div class="v3-flex-card v3-flex-gama">
            <div class="v3-flex-card-content">
              <div class="v3-flex-icon">
                <img :src="BASE_URL + 'imagens/icon-gama.png'" alt="Γ"
                     @error="$event.target.style.display='none'; $event.target.nextElementSibling.style.display='block'" />
                <span class="v3-greek-fallback">Γ</span>
              </div>
              <div class="v3-flex-badge available">Disponível</div>
              <h3>Gama Healthcare</h3>
              <p class="v3-flex-desc">Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
              <RouterLink to="/login" class="v3-flex-link">Acessar →</RouterLink>
            </div>
          </div>

          <div class="v3-flex-card v3-flex-sigma">
            <div class="v3-flex-card-content">
              <div class="v3-flex-icon">
                <img :src="BASE_URL + 'imagens/icon-sigma.png'" alt="Σ"
                     @error="$event.target.style.display='none'; $event.target.nextElementSibling.style.display='block'" />
                <span class="v3-greek-fallback">Σ</span>
              </div>
              <div class="v3-flex-badge soon">Em breve</div>
              <h3>Sigma Healthcare</h3>
              <p class="v3-flex-desc">Tomografia com fluxo avançado de protocolos e interface de alta produtividade.</p>
              <div class="sigma-versions">
                <div class="sigma-version-badge"><span class="sigma-version-dot old"></span>Old Sigma</div>
                <div class="sigma-version-badge"><span class="sigma-version-dot new"></span>Sigma ON</div>
              </div>
            </div>
          </div>

          <div class="v3-flex-card v3-flex-kappa">
            <div class="v3-flex-card-content">
              <div class="v3-flex-icon">
                <img :src="BASE_URL + 'imagens/icon-kappa.png'" alt="Κ"
                     @error="$event.target.style.display='none'; $event.target.nextElementSibling.style.display='block'" />
                <span class="v3-greek-fallback">Κ</span>
              </div>
              <div class="v3-flex-badge soon">Em breve</div>
              <h3>Kappa Healthcare</h3>
              <p class="v3-flex-desc">Interface de alta produtividade para grandes volumes de exames.</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- PLANOS -->
    <section class="v3-section v3-section-bg" id="planos">
      <div class="v3-section-inner">
        <div class="v3-section-header">
          <p class="v3-section-eyebrow">Planos</p>
          <h2 class="v3-section-title">Escolha seu acesso</h2>
        </div>
        <div class="v3-plans-grid">
          <div class="v3-plan-card">
            <h3 class="v3-plan-name">Mensal</h3>
            <div class="v3-plan-price"><span class="v3-plan-currency">R$</span>59<span class="v3-plan-period">/mês</span></div>
            <ul class="v3-plan-features">
              <li>Acesso a todos os sistemas</li>
              <li>Atualizações incluídas</li>
              <li>Suporte por e-mail</li>
            </ul>
            <RouterLink to="/login" class="v3-plan-btn">Assinar</RouterLink>
          </div>
          <div class="v3-plan-card v3-plan-featured">
            <div class="v3-plan-tag">Mais popular</div>
            <h3 class="v3-plan-name">Anual</h3>
            <span class="v3-plan-economy-badge">Economia de 17% · R$ 588/ano</span>
            <div class="v3-plan-price"><span class="v3-plan-currency">R$</span>49<span class="v3-plan-period">/mês</span></div>
            <p class="v3-plan-annual-note">Cobrado anualmente · R$ 588/ano</p>
            <ul class="v3-plan-features">
              <li>Acesso a todos os sistemas</li>
              <li>Atualizações incluídas</li>
              <li>Suporte prioritário</li>
              <li>2 meses grátis</li>
            </ul>
            <RouterLink to="/login" class="v3-plan-btn v3-plan-btn-featured">Assinar anual</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- AI DISCLOSURE -->
    <section class="v3-ai-disclosure">
      <div class="v3-ai-disclosure-inner">
        <div class="v3-ai-icon">🤖</div>
        <p class="v3-ai-text">
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
    <footer class="v3-footer">
      <div class="v3-footer-cols">
        <div>
          <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="v3-footer-logo" />
          <p class="v3-footer-desc">Simulador educacional de tomografia computadorizada.</p>
        </div>
        <div>
          <strong>Produto</strong>
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#sistemas">Sistemas</a>
          <a href="#planos">Planos</a>
        </div>
        <div>
          <strong>Suporte</strong>
          <a href="#">Documentação</a>
          <a href="#">Contato</a>
        </div>
        <div>
          <strong>Legal</strong>
          <a href="#">Termos de uso</a>
          <a href="#">Privacidade</a>
        </div>
      </div>
      <div class="v3-footer-bottom">
        <span>© 2026 SimuScan. Todos os direitos reservados.</span>
        <span class="v3-footer-version">{{ version }}</span>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { APP_VERSION as version } from '@/version.js'
const BASE_URL = import.meta.env.BASE_URL

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const features = [
  { icon: '🖥', title: 'Console interativo', desc: 'Interface fiel ao ambiente real de uma sala de TC, com painéis, botões e fluxos de trabalho autênticos.', img: 'imagens/feature-console.jpeg' },
  { icon: '📋', title: 'Worklist de pacientes', desc: 'Gerencie uma lista de pacientes simulados com dados completos — nome, ID, protocolo e médico solicitante.', img: 'imagens/feature-worklist.jpeg' },
  { icon: '⚙', title: 'Gerenciador de protocolos', desc: 'Selecione e gerencie protocolos por região anatômica, do crânio aos pés, com listas completas.', img: 'imagens/feature-protocols.jpeg' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap');

.v3-page {
  --v3-bg:           #faf9f6;
  --v3-surface:      #ffffff;
  --v3-surface-2:    #f3f1ec;
  --v3-border:       #e3e0d8;
  --v3-border-strong:#cbc7bc;
  --v3-text:         #1c1b19;
  --v3-text-muted:   #6b675f;
  --v3-text-faint:   #9b968c;
  --v3-accent:       #e91e8c;
  --v3-accent-soft:  #fce8f4;
  --v3-accent-ink:   #ffffff;
  --v3-blue:         #3498db;
  --v3-shadow:       0 2px 8px rgba(28,27,25,.08);
  --v3-shadow-hover: 0 8px 32px rgba(28,27,25,.14);

  min-height: 100vh;
  font-family: 'Noto Sans', system-ui, sans-serif;
  background: var(--v3-bg);
  color: var(--v3-text);
}

/* ── NAV ── */
.v3-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--v3-surface);
  border-bottom: 1px solid var(--v3-border);
}
.v3-nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.v3-logo-img { height: 38px; width: auto; }
.v3-nav-links { display: flex; gap: 36px; }
.v3-nav-links a {
  color: var(--v3-text-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.15s;
  position: relative;
}
.v3-nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--v3-accent);
  transition: width 0.2s ease;
}
.v3-nav-links a:hover { color: var(--v3-accent); }
.v3-nav-links a:hover::after { width: 100%; }

/* ── BUTTONS ── */
.v3-btn-accent {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background: var(--v3-accent);
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: background 0.15s;
  letter-spacing: .02em;
}
.v3-btn-accent:hover { background: #c01575; }

.v3-btn-accent-large {
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  background: var(--v3-accent);
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: background 0.15s;
}
.v3-btn-accent-large:hover { background: #c01575; }

.v3-btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  background: transparent;
  color: #b3ac9e;
  font-size: 15px;
  text-decoration: none;
  border: 1px solid #47412f;
  transition: all 0.15s;
}
.v3-btn-ghost:hover { border-color: #b3ac9e; color: #f1eee7; }

.v3-btn-text {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--v3-accent);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s;
  padding-bottom: 2px;
}
.v3-btn-text:hover { border-bottom-color: var(--v3-accent); }

/* ── HERO ── */
.v3-hero {
  background: #1c1b19;
  padding: 80px 40px;
  border-bottom: 1px solid #332f26;
}
.v3-hero-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.v3-eyebrow {
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--v3-accent);
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.v3-eyebrow::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 1px;
  background: var(--v3-accent);
  margin-right: 8px;
  animation: v3LineGrow 0.6s ease both;
}
@keyframes v3LineGrow {
  from { width: 0; }
  to   { width: 24px; }
}
.v3-hero-title {
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 700;
  color: #f1eee7;
  line-height: 1.05;
  margin-bottom: 24px;
  letter-spacing: -.02em;
}
.v3-accent-text { color: var(--v3-accent); }
.v3-hero-desc {
  font-size: 16px;
  color: #b3ac9e;
  line-height: 1.7;
  margin-bottom: 36px;
  max-width: 440px;
}
.v3-hero-actions { display: flex; gap: 16px; align-items: center; }
.v3-hero-media {
  border: 1px solid #332f26;
  overflow: hidden;
}
.v3-hero-img { width: 100%; height: auto; display: block; }

/* ── SECTIONS ── */
.v3-section { padding: 80px 40px; }
.v3-section-bg { background: var(--v3-bg); }
.v3-section-white { background: var(--v3-surface); }
.v3-section-inner { max-width: 1280px; margin: 0 auto; }

.v3-section-header {
  border-top: 2px solid var(--v3-accent);
  padding-top: 20px;
  margin-bottom: 48px;
}
.v3-section-eyebrow {
  font-size: 11px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--v3-accent);
  font-weight: 600;
  margin-bottom: 8px;
}
.v3-section-title {
  font-size: clamp(24px, 2.5vw, 36px);
  font-weight: 700;
  color: var(--v3-text);
  letter-spacing: -.01em;
}

/* ── FEATURE CARDS ── */
.v3-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--v3-border);
  border: 1px solid var(--v3-border);
}
.v3-feature-card {
  background: var(--v3-surface);
  overflow: hidden;
  transition: box-shadow 0.2s;
  animation: v3FadeIn 0.4s ease both;
}
.v3-feature-card:nth-child(2) { animation-delay: 0.08s; }
.v3-feature-card:nth-child(3) { animation-delay: 0.16s; }
.v3-feature-card:hover {
  box-shadow: var(--v3-shadow-hover);
  z-index: 1;
  position: relative;
}
@keyframes v3FadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.v3-feature-img {
  height: 200px;
  overflow: hidden;
  background: var(--v3-surface-2);
}
.v3-feature-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.v3-feature-card:hover .v3-feature-img img { transform: scale(1.04); }
.v3-feature-body {
  padding: 28px 24px;
  border-top: 1px solid var(--v3-border);
}
.v3-feature-body h3 { font-size: 17px; font-weight: 700; color: var(--v3-text); margin-bottom: 10px; }
.v3-feature-body p  { font-size: 14px; color: var(--v3-text-muted); line-height: 1.6; margin-bottom: 16px; }

/* ── SYSTEMS ── */
.v3-systems-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--v3-border);
  border: 1px solid var(--v3-border);
}
.v3-system-card {
  background: var(--v3-surface);
  padding: 40px 32px;
  opacity: 0.55;
}
.v3-system-card.available {
  opacity: 1;
  border-top: 3px solid var(--v3-accent);
}
.v3-system-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  background: var(--v3-surface-2);
  border: 1px solid var(--v3-border);
}
.v3-icon-gama  { color: #2ecc71; }
.v3-icon-sigma { color: #3498db; }
.v3-icon-kappa { color: #f39c12; }
.v3-system-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  padding: 2px 8px;
  margin-bottom: 12px;
}
.v3-system-badge.available { background: var(--v3-accent-soft); color: var(--v3-accent); }
.v3-system-badge.soon      { background: var(--v3-surface-2);   color: var(--v3-text-faint); }
.v3-system-name { font-size: 18px; font-weight: 700; color: var(--v3-text); margin-bottom: 10px; }
.v3-system-desc { font-size: 14px; color: var(--v3-text-muted); line-height: 1.6; margin-bottom: 16px; }

/* ── FOOTER ── */
.v3-footer {
  background: #1c1b19;
  color: #b3ac9e;
  border-top: 1px solid #332f26;
}
.v3-footer-cols {
  max-width: 1280px;
  margin: 0 auto;
  padding: 56px 40px 40px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
}
.v3-footer-logo {
  height: 32px;
  width: auto;
  margin-bottom: 12px;
  filter: brightness(0) invert(1);
  opacity: 0.8;
  display: block;
}
.v3-footer-desc { font-size: 13px; line-height: 1.6; max-width: 260px; }
.v3-footer-cols strong {
  display: block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #f1eee7;
  margin-bottom: 14px;
}
.v3-footer-cols a {
  display: block;
  font-size: 13px;
  color: #7d7669;
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.15s;
}
.v3-footer-cols a:hover { color: var(--v3-accent); }
.v3-footer-bottom {
  border-top: 1px solid #332f26;
  padding: 16px 40px;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #7d7669;
}
.v3-footer-version { color: var(--v3-blue); }

/* ── EXPANDING FLEX CARDS ── */
.v3-systems-flex {
  display: flex;
  gap: 14px;
  height: 260px;
}
.v3-flex-card {
  flex: 1;
  transition: all 0.55s ease;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border: 1px solid var(--v3-border);
  display: flex;
  align-items: flex-end;
}
.v3-flex-card:hover { flex: 3; transform: translateY(-8px); box-shadow: var(--v3-shadow-hover); z-index: 2; }
.v3-flex-gama  { background: linear-gradient(135deg,#0d2b5e 0%,#1a4a8a 100%); border-top: 3px solid #3498db; }
.v3-flex-sigma { background: linear-gradient(135deg,#0d3320 0%,#1a5c35 100%); border-top: 3px solid #2ecc71; opacity: .7; }
.v3-flex-kappa { background: linear-gradient(135deg,#3d2000 0%,#7a4200 100%); border-top: 3px solid #f39c12; opacity: .7; }
.v3-flex-card-content { padding: 24px; color: white; width: 100%; opacity: 0; transition: opacity 0.3s ease 0.2s; }
.v3-flex-card:hover .v3-flex-card-content { opacity: 1; }
.v3-flex-icon {
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2);
  margin-bottom: 12px; font-size: 22px; font-weight: 700;
}
.v3-flex-icon img { width: 28px; height: 28px; object-fit: contain; }
.v3-greek-fallback { display: none; font-size: 22px; font-weight: 700; }
.v3-flex-card h3 { font-size: 16px; font-weight: 700; color: white; margin-bottom: 6px; }
.v3-flex-desc {
  font-size: 13px; color: rgba(255,255,255,.7); line-height: 1.5; margin-bottom: 10px;
  overflow: hidden; max-height: 0; transition: max-height 0.4s ease;
}
.v3-flex-card:hover .v3-flex-desc { max-height: 80px; }
.v3-flex-badge {
  display: inline-block; font-size: 10px; font-weight: 700;
  letter-spacing: .08em; text-transform: uppercase; padding: 2px 8px; margin-bottom: 8px;
}
.v3-flex-badge.available { background: rgba(52,219,99,.2); color: #2ecc71; border: 1px solid rgba(52,219,99,.3); }
.v3-flex-badge.soon      { background: rgba(255,255,255,.1); color: rgba(255,255,255,.5); border: 1px solid rgba(255,255,255,.15); }
.v3-flex-link {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 13px; font-weight: 600; color: white;
  text-decoration: none; border-bottom: 1px solid rgba(255,255,255,.4);
  padding-bottom: 2px; transition: border-color .15s;
  overflow: hidden; max-height: 0; transition: max-height 0.4s ease;
}
.v3-flex-card:hover .v3-flex-link { max-height: 30px; }

/* ── SIGMA VERSIONS ── */
.sigma-versions { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
.sigma-version-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 600; padding: 3px 10px;
  border-radius: 100px; background: rgba(52,152,219,.15);
  color: #3498db; border: 1px solid rgba(52,152,219,.3);
}
.sigma-version-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.sigma-version-dot.old { background: #888; }
.sigma-version-dot.new { background: #3498db; }

/* ── PLANS ── */
.v3-plans-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(280px, 400px));
  gap: 24px;
  justify-content: center;
}
.v3-plan-card {
  background: var(--v3-surface);
  border: 1px solid var(--v3-border);
  padding: 40px 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.v3-plan-card.v3-plan-featured { border-top: 3px solid var(--v3-accent); }
.v3-plan-tag {
  position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
  background: var(--v3-accent); color: #fff;
  font-size: 11px; font-weight: 700; padding: 3px 14px;
  letter-spacing: .05em;
}
.v3-plan-name { font-size: 18px; font-weight: 700; color: var(--v3-text); }
.v3-plan-economy-badge {
  display: inline-block; font-size: 11px; font-weight: 700;
  padding: 3px 10px; border-radius: 100px;
  background: rgba(46,204,113,.15); color: #2ecc71;
  border: 1px solid rgba(46,204,113,.3);
}
.v3-plan-price { font-size: 48px; font-weight: 700; color: var(--v3-text); line-height: 1; }
.v3-plan-currency { font-size: 22px; vertical-align: super; font-weight: 700; }
.v3-plan-period { font-size: 16px; font-weight: 400; color: var(--v3-text-muted); }
.v3-plan-annual-note { font-size: 12px; color: var(--v3-text-muted); margin-top: -8px; }
.v3-plan-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.v3-plan-features li { font-size: 14px; color: var(--v3-text-muted); }
.v3-plan-features li::before { content: '✓ '; color: #2ecc71; font-weight: 700; }
.v3-plan-btn {
  display: block; width: 100%; padding: 12px;
  background: var(--v3-surface-2); color: var(--v3-text);
  font-weight: 700; font-size: 14px; text-decoration: none;
  text-align: center; border: 1px solid var(--v3-border);
  transition: background .15s, color .15s; margin-top: auto;
}
.v3-plan-btn:hover { background: var(--v3-border-strong); }
.v3-plan-btn.v3-plan-btn-featured { background: var(--v3-accent); color: #fff; border-color: var(--v3-accent); }
.v3-plan-btn.v3-plan-btn-featured:hover { background: #c01575; border-color: #c01575; }

/* ── AI DISCLOSURE ── */
.v3-ai-disclosure {
  background: var(--v3-surface-2);
  border-top: 1px solid var(--v3-border);
  padding: 24px 40px;
}
.v3-ai-disclosure-inner {
  max-width: 1280px; margin: 0 auto;
  display: flex; align-items: flex-start; gap: 14px;
}
.v3-ai-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
.v3-ai-text { font-size: 13px; color: var(--v3-text-faint); line-height: 1.6; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .v3-nav-links { display: none; }
  .v3-nav-inner { padding: 0 20px; }
  .v3-hero { padding: 48px 20px; }
  .v3-hero-inner { grid-template-columns: 1fr; gap: 40px; }
  .v3-hero-media { display: none; }
  .v3-section { padding: 48px 20px; }
  .v3-cards-grid    { grid-template-columns: 1fr; }
  .v3-systems-flex  { flex-direction: column; height: auto; }
  .v3-flex-card     { min-height: 80px; }
  .v3-plans-grid    { grid-template-columns: 1fr; }
  .v3-footer-cols   { grid-template-columns: 1fr 1fr; padding: 40px 20px 24px; gap: 32px; }
  .v3-footer-bottom { padding: 16px 20px; flex-direction: column; gap: 4px; }
  .v3-ai-disclosure { padding: 20px; }
}

/* ── DEVICE NOTICE ── */
.v3-device-notice { background: rgba(52,152,219,0.07); border-bottom: 1px solid rgba(52,152,219,0.2); padding: 10px 24px; display: flex; align-items: center; justify-content: center; gap: 8px; text-align: center; }
.v3-device-text { font-size: 13px; color: #555; line-height: 1.4; }
.v3-device-text strong { color: #2980b9; font-weight: 700; }
.v3-device-text kbd { display: inline-block; padding: 2px 7px; border: 1px solid rgba(0,0,0,0.18); border-radius: 4px; font-size: 12px; background: rgba(0,0,0,0.06); color: #444; }

/* ── FLEX CARD GLOW ── */
.v3-flex-card.v3-flex-gama:hover  { box-shadow: 0 0 0 2px #3498db, 0 0 30px rgba(52,152,219,0.3); }
.v3-flex-card.v3-flex-sigma:hover { box-shadow: 0 0 0 2px #2ecc71, 0 0 30px rgba(46,204,113,0.3); }
.v3-flex-card.v3-flex-kappa:hover { box-shadow: 0 0 0 2px #f39c12, 0 0 30px rgba(243,156,18,0.3); }

/* ── PLAN CARD HOVER ── */
.v3-plan-card { transition: transform .3s, box-shadow .3s; }
.v3-plan-card:hover { transform: translateY(-6px); box-shadow: 0 8px 32px rgba(233,30,140,0.1); }
</style>
