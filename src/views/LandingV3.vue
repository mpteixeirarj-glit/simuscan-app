<template>
  <div class="v3-page">

    <!-- NAV -->
    <nav class="v3-nav">
      <div class="v3-nav-inner">
        <div class="v3-logo">
          <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="v3-logo-img" />
        </div>
        <div class="v3-nav-links">
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#sistemas">Sistemas</a>
          <a href="#planos">Planos</a>
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
            <a href="#funcionalidades" class="v3-btn-ghost">Ver funcionalidades</a>
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
              <img :src="BASE_URL + 'imagens/hero-scanner.jpg'" :alt="f.title" />
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

    <!-- SISTEMAS -->
    <section class="v3-section v3-section-white" id="sistemas">
      <div class="v3-section-inner">
        <div class="v3-section-header">
          <p class="v3-section-eyebrow">Sistemas</p>
          <h2 class="v3-section-title">Plataformas disponíveis</h2>
        </div>
        <div class="v3-systems-grid">
          <div
            class="v3-system-card"
            :class="{ available: s.available }"
            v-for="s in systems"
            :key="s.name"
          >
            <div class="v3-system-icon" :class="s.iconClass">{{ s.initial }}</div>
            <span class="v3-system-badge" :class="s.available ? 'available' : 'soon'">
              {{ s.available ? 'Disponível' : 'Em breve' }}
            </span>
            <h3 class="v3-system-name">{{ s.name }}</h3>
            <p class="v3-system-desc">{{ s.desc }}</p>
            <RouterLink v-if="s.available" to="/login" class="v3-btn-text">Acessar →</RouterLink>
          </div>
        </div>
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

const features = [
  { icon: '🖥', title: 'Console Interativo', desc: 'Interface idêntica à do equipamento real, com todos os controles e parâmetros de aquisição.' },
  { icon: '📋', title: 'Worklist & Protocolos', desc: 'Agendamento de pacientes, seleção de protocolos e gerenciamento de exames completo.' },
  { icon: '🔄', title: 'Retro Recon & Topograma', desc: 'Reconstrução retroativa de séries e posicionamento interativo com planejamento de cortes.' },
]

const systems = [
  { initial: 'Γ', name: 'Gama Healthcare', desc: 'Tomógrafo de 64 canais com console completo, worklist, topograma e retro recon.', available: true, iconClass: 'v3-icon-gama' },
  { initial: 'Σ', name: 'Sigma Healthcare', desc: 'Tomógrafo de 128 canais com perfusion e cardíaco. Em desenvolvimento.', available: false, iconClass: 'v3-icon-sigma' },
  { initial: 'Κ', name: 'Kappa Healthcare', desc: 'Tomógrafo pediátrico de baixa dose com dose-check integrado. Em desenvolvimento.', available: false, iconClass: 'v3-icon-kappa' },
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

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .v3-nav-links { display: none; }
  .v3-nav-inner { padding: 0 20px; }
  .v3-hero { padding: 48px 20px; }
  .v3-hero-inner { grid-template-columns: 1fr; gap: 40px; }
  .v3-hero-media { display: none; }
  .v3-section { padding: 48px 20px; }
  .v3-cards-grid   { grid-template-columns: 1fr; }
  .v3-systems-grid  { grid-template-columns: 1fr; }
  .v3-footer-cols  { grid-template-columns: 1fr 1fr; padding: 40px 20px 24px; gap: 32px; }
  .v3-footer-bottom{ padding: 16px 20px; flex-direction: column; gap: 4px; }
}
</style>
