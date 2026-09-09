<template>
  <div class="lv2">

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
    <nav class="v2-nav">
      <div class="v2-nav-inner">
        <div class="v2-logo">
          <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="v2-logo-img">
        </div>
        <div class="v2-nav-links">
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#sistemas">Sistemas</a>
          <a href="#planos">Planos</a>
        </div>
        <RouterLink :to="{ name: 'login' }" class="v2-btn-primary">Entrar</RouterLink>
      </div>
    </nav>

    <!-- HERO -->
    <section class="v2-hero">
      <div class="v2-hero-inner">
        <div class="v2-hero-left">
          <span class="v2-eyebrow">Simulador de Tomografia Computadorizada</span>
          <h1 class="v2-hero-title">
            Treine com <span class="v2-highlight-yellow">precisão</span>
            antes de entrar na <span class="v2-highlight-pink">sala.</span>
          </h1>
          <p class="v2-hero-desc">
            O SimuScan reproduz os fluxos reais de aquisição de TC em ambiente
            seguro e interativo. Pratique protocolos, gerencie worklists e
            domine o console — sem colocar pacientes em risco.
          </p>
          <div class="v2-hero-ctas">
            <RouterLink :to="{ name: 'login' }" class="v2-btn-cta">Começar agora</RouterLink>
            <a href="#funcionalidades" class="v2-btn-outline-white">Ver funcionalidades</a>
          </div>
        </div>
        <div class="v2-hero-right">
          <div class="v2-hero-img-wrap">
            <img :src="BASE_URL + 'imagens/hero-scanner.jpg'" alt="Console de tomógrafo" class="v2-hero-img">
          </div>
        </div>
      </div>
    </section>

    <!-- FUNCIONALIDADES -->
    <section id="funcionalidades" class="v2-section">
      <div class="v2-section-inner">
        <span class="v2-section-eyebrow">Funcionalidades</span>
        <h2 class="v2-section-title">Tudo que você precisa para treinar</h2>
        <div class="v2-cards-grid">
          <div class="v2-feature-card" v-for="(f, i) in features" :key="f.title" :style="{ animationDelay: (i * 0.1) + 's' }">
            <div class="v2-feature-img">
              <img :src="BASE_URL + f.img" :alt="f.title" @error="$event.target.style.display='none'">
              <div class="v2-feature-img-overlay">
                <span class="v2-feature-icon">{{ f.icon }}</span>
              </div>
            </div>
            <div class="v2-feature-body">
              <h3>{{ f.title }}</h3>
              <p>{{ f.desc }}</p>
              <RouterLink :to="{ name: 'login' }" class="v2-btn-card">Acessar</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SISTEMAS -->
    <section id="sistemas" class="v2-section v2-section-alt">
      <div class="v2-section-inner">
        <span class="v2-section-eyebrow">Sistemas</span>
        <h2 class="v2-section-title">Escolha seu sistema</h2>
        <p class="v2-section-sub">
          Cada sistema simula uma linha de console diferente,
          com fluxos e terminologias próprias.
        </p>
        <div class="v2-systems-grid">
          <div class="v2-system-card v2-system-available" v-for="sys in systems" :key="sys.name"
            :class="{ 'v2-system-available': sys.available }">
            <div class="v2-system-icon" :class="sys.iconClass">
              <img :src="BASE_URL + sys.iconImg" :alt="sys.symbol"
                   class="v2-sys-icon-img"
                   @error="$event.target.style.display='none'; $event.target.nextElementSibling.style.display='block'">
              <span class="v2-sys-icon-fallback">{{ sys.symbol }}</span>
            </div>
            <div class="v2-system-badge" :class="sys.available ? 'available' : 'soon'">
              {{ sys.available ? 'Disponível' : 'Em breve' }}
            </div>
            <h3>{{ sys.name }}</h3>
            <p>{{ sys.desc }}</p>
            <div v-if="sys.name === 'Sigma Healthcare'" class="sigma-versions">
              <div class="sigma-version-badge"><span class="sigma-version-dot old"></span>Old Sigma</div>
              <div class="sigma-version-badge"><span class="sigma-version-dot new"></span>Sigma ON</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PLANOS -->
    <section id="planos" class="v2-section">
      <div class="v2-section-inner">
        <span class="v2-section-eyebrow">Planos</span>
        <h2 class="v2-section-title">Simples e transparente</h2>
        <div class="v2-plans-grid">
          <div class="v2-plan-card">
            <div class="v2-plan-label">Mensal</div>
            <div class="v2-plan-price"><span class="v2-plan-currency">R$</span>59<span class="v2-plan-period">/mês</span></div>
            <ul class="v2-plan-items">
              <li>✓ Acesso a todos os sistemas</li>
              <li>✓ Atualizações incluídas</li>
              <li>✓ Suporte por e-mail</li>
            </ul>
            <RouterLink :to="{ name: 'login' }" class="v2-btn-plan">Começar agora</RouterLink>
          </div>
          <div class="v2-plan-card featured">
            <div class="v2-plan-tag">Mais popular</div>
            <div class="v2-plan-label">Anual</div>
            <div class="v2-plan-saving v2-plan-economy-badge">Economia de 17% · R$ 588/ano</div>
            <div class="v2-plan-price"><span class="v2-plan-currency">R$</span>49<span class="v2-plan-period">/mês</span></div>
            <p class="v2-plan-annual-note">Cobrado anualmente · R$ 588/ano</p>
            <ul class="v2-plan-items">
              <li>✓ Acesso a todos os sistemas</li>
              <li>✓ Atualizações incluídas</li>
              <li>✓ Suporte prioritário</li>
              <li>✓ 2 meses grátis</li>
            </ul>
            <RouterLink :to="{ name: 'login' }" class="v2-btn-plan featured">Assinar anual</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- AI DISCLOSURE -->
    <section class="v2-ai-disclosure">
      <div class="v2-ai-disclosure-inner">
        <div class="v2-ai-disclosure-icon">🤖</div>
        <p class="v2-ai-disclosure-text">
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
    <footer class="v2-footer">
      <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="v2-footer-logo">
      <p>SimuScan · Simulador de Tomografia Computadorizada</p>
      <p>Treinamento de Operadores · Uso educacional</p>
    </footer>

  </div>
</template>

<script setup>
const BASE_URL = import.meta.env.BASE_URL

const features = [
  { icon: '🖥', title: 'Console interativo', desc: 'Interface fiel ao ambiente real de uma sala de TC, com painéis, botões e fluxos de trabalho autênticos.', img: 'imagens/feature-console.jpeg' },
  { icon: '📋', title: 'Worklist de pacientes', desc: 'Gerencie uma lista de pacientes simulados com dados completos — nome, ID, protocolo e médico solicitante.', img: 'imagens/feature-worklist.jpeg' },
  { icon: '⚙', title: 'Gerenciador de protocolos', desc: 'Selecione e gerencie protocolos por região anatômica, do crânio aos pés, com listas completas.', img: 'imagens/feature-protocols.jpeg' },
]

const systems = [
  { symbol: 'Γ', name: 'Gama Healthcare', desc: 'Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.', iconClass: 'v2-icon-gama', iconImg: 'imagens/icon-gama.png', available: true },
  { symbol: 'Σ', name: 'Sigma Healthcare', desc: 'Tomografia com fluxo avançado de protocolos e interface de alta produtividade.', iconClass: 'v2-icon-sigma', iconImg: 'imagens/icon-sigma.png', available: false },
  { symbol: 'Κ', name: 'Kappa Healthcare', desc: 'Interface de alta produtividade para grandes volumes de exames.', iconClass: 'v2-icon-kappa', iconImg: 'imagens/icon-kappa.png', available: false },
]
</script>

<style scoped>
/* ---- DESIGN TOKENS ---- */
.lv2 {
  --v2-bg:           #f8f7ff;
  --v2-surface:      #ffffff;
  --v2-surface-2:    #f0eeff;
  --v2-primary:      #6115DD;
  --v2-primary-dark: #3E1191;
  --v2-primary-light:#ede6ff;
  --v2-pink:         #e91e8c;
  --v2-cta:          #FBB81B;
  --v2-text:         #282447;
  --v2-text-muted:   #6b675f;
  --v2-text-faint:   #9b968c;
  --v2-border:       #e3e0f5;
  --v2-shadow-card:  0 0 30px rgba(97,21,221,.08);
  --v2-radius-pill:  100px;
  --v2-radius-card:  24px;
  --v2-radius-btn:   8px;

  background: var(--v2-bg);
  color: var(--v2-text);
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
}

/* ---- NAV ---- */
.v2-nav {
  position: sticky; top: 0; z-index: 100;
  background: #fff;
  border-bottom: 1px solid var(--v2-border);
}
.v2-nav-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 32px;
  height: 72px; display: flex; align-items: center; justify-content: space-between;
}
.v2-logo-img { height: 40px; width: auto; }
.v2-nav-links { display: flex; gap: 32px; }
.v2-nav-links a { color: var(--v2-text-muted); text-decoration: none; font-size: 15px; font-weight: 500; transition: color .2s; }
.v2-nav-links a:hover { color: var(--v2-primary); }

/* ---- BUTTONS ---- */
.v2-btn-primary {
  display: inline-flex; align-items: center;
  padding: 10px 24px; background: var(--v2-primary); color: white;
  font-weight: 700; font-size: 15px; border-radius: var(--v2-radius-btn);
  text-decoration: none; transition: background .2s;
}
.v2-btn-primary:hover { background: var(--v2-primary-dark); }

.v2-btn-cta {
  display: inline-flex; align-items: center;
  padding: 16px 36px; background: var(--v2-cta); color: #1a1a1a;
  font-weight: 700; font-size: 16px; border-radius: var(--v2-radius-pill);
  text-decoration: none; border: none; cursor: pointer;
  box-shadow: 0 4px 20px rgba(251,184,27,.4);
  animation: v2Pulse 3s ease infinite;
  transition: transform .2s;
}
.v2-btn-cta:hover { transform: translateY(-2px); }

.v2-btn-outline-white {
  display: inline-flex; align-items: center;
  padding: 16px 36px; background: transparent; color: white;
  font-weight: 600; font-size: 16px; border-radius: var(--v2-radius-pill);
  border: 2px solid rgba(255,255,255,.4); text-decoration: none; transition: all .2s;
}
.v2-btn-outline-white:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.7); }

.v2-hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }

@keyframes v2Pulse {
  0%,100% { box-shadow: 0 4px 20px rgba(251,184,27,.4); }
  50%      { box-shadow: 0 4px 32px rgba(251,184,27,.7); }
}

/* ---- HERO ---- */
.v2-hero {
  background: linear-gradient(135deg, #2B1464 0%, #3E1191 60%, #6115DD 100%);
  padding: 80px 32px;
}
.v2-hero-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
}
.v2-eyebrow {
  display: inline-block; font-size: 12px; letter-spacing: 2px;
  text-transform: uppercase; color: #FBB81B; font-weight: 600; margin-bottom: 16px;
}
.v2-hero-title {
  font-size: clamp(36px, 4vw, 56px); font-weight: 700; color: white;
  line-height: 1.1; margin-bottom: 20px;
}
.v2-highlight-yellow { color: #FBB81B; }
.v2-highlight-pink   { color: #e91e8c; }
.v2-hero-desc {
  font-size: 18px; color: rgba(255,255,255,.8); line-height: 1.6;
  margin-bottom: 32px; max-width: 480px;
}
.v2-hero-img-wrap {
  border-radius: var(--v2-radius-card); overflow: hidden;
  box-shadow: 0 24px 60px rgba(0,0,0,.4);
  border: 1px solid rgba(255,255,255,.1);
}
.v2-hero-img { width: 100%; height: auto; display: block; }

/* ---- SECTIONS ---- */
.v2-section { padding: 80px 32px; background: var(--v2-surface); }
.v2-section-alt { background: var(--v2-bg); }
.v2-section-inner { max-width: 1200px; margin: 0 auto; text-align: center; }
.v2-section-eyebrow {
  font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--v2-primary); font-weight: 600;
}
.v2-section-title {
  font-size: clamp(28px, 3vw, 40px); font-weight: 700; color: var(--v2-text);
  margin: 12px 0 48px;
}
.v2-section-sub {
  font-size: 17px; color: var(--v2-text-muted); margin-bottom: 40px;
  max-width: 500px; margin-left: auto; margin-right: auto;
}

/* ---- FEATURE CARDS ---- */
.v2-cards-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; text-align: left;
}
.v2-feature-card {
  background: var(--v2-surface);
  border-radius: var(--v2-radius-card);
  box-shadow: var(--v2-shadow-card);
  border: 1px solid var(--v2-border);
  overflow: hidden;
  transition: transform .25s, box-shadow .25s;
  animation: v2FadeUp .5s ease both;
}
.v2-feature-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(97,21,221,.15); }
.v2-feature-img { height: 180px; overflow: hidden; position: relative; }
.v2-feature-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
.v2-feature-card:hover .v2-feature-img img { transform: scale(1.06); }
.v2-feature-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(43,20,100,.7), rgba(97,21,221,.4));
  display: flex; align-items: center; justify-content: center;
}
.v2-feature-icon { font-size: 3rem; }
.v2-feature-body { padding: 24px; display: flex; flex-direction: column; gap: 10px; }
.v2-feature-body h3 { font-size: 18px; font-weight: 700; color: var(--v2-text); }
.v2-feature-body p { font-size: 15px; color: var(--v2-text-muted); line-height: 1.6; }

.v2-btn-card {
  display: inline-flex; align-items: center;
  padding: 8px 20px; background: var(--v2-primary); color: white;
  font-weight: 700; font-size: 14px; border-radius: var(--v2-radius-pill);
  text-decoration: none; align-self: flex-start; margin-top: 8px; transition: background .2s;
}
.v2-btn-card:hover { background: var(--v2-primary-dark); }

@keyframes v2FadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ---- SYSTEMS ---- */
.v2-systems-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.v2-system-card {
  background: var(--v2-surface); border: 1px solid var(--v2-border);
  border-radius: var(--v2-radius-card); padding: 32px 24px;
  text-align: center; box-shadow: var(--v2-shadow-card);
  transition: transform .2s; opacity: .6;
}
.v2-system-card.v2-system-available {
  opacity: 1; border-color: var(--v2-primary);
  box-shadow: 0 0 0 2px var(--v2-primary-light), var(--v2-shadow-card);
}
.v2-system-card:hover { transform: translateY(-4px); }
.v2-system-icon {
  width: 64px; height: 64px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px; font-family: 'Rajdhani', sans-serif;
  font-size: 32px; font-weight: 700;
}
.v2-icon-gama  { background: #e8f8ee; color: #2ecc71; }
.v2-icon-sigma { background: #e8f0ff; color: #3498db; }
.v2-icon-kappa { background: #fff8e6; color: #f39c12; }
.v2-system-badge {
  display: inline-block; font-size: 11px; font-weight: 700;
  letter-spacing: 1px; text-transform: uppercase;
  padding: 3px 12px; border-radius: 100px; margin-bottom: 12px;
}
.v2-system-badge.available { background: #e8f8ee; color: #16a34a; }
.v2-system-badge.soon      { background: var(--v2-surface-2); color: var(--v2-text-faint); }
.v2-system-card h3 { font-size: 18px; font-weight: 700; color: var(--v2-text); margin-bottom: 8px; }
.v2-system-card p  { font-size: 14px; color: var(--v2-text-muted); line-height: 1.5; }

/* ---- PLANS ---- */
.v2-plans-grid {
  display: grid; grid-template-columns: repeat(2, minmax(280px, 380px));
  gap: 28px; justify-content: center; margin-top: 0;
}
.v2-plan-card {
  background: var(--v2-surface); border: 1px solid var(--v2-border);
  border-radius: var(--v2-radius-card); padding: 40px 32px;
  box-shadow: var(--v2-shadow-card); position: relative; text-align: left;
}
.v2-plan-card.featured {
  border-color: var(--v2-primary);
  box-shadow: 0 0 0 2px var(--v2-primary-light), var(--v2-shadow-card);
}
.v2-plan-tag {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
  background: var(--v2-primary); color: white; font-size: 12px; font-weight: 700;
  padding: 4px 16px; border-radius: 100px; letter-spacing: .5px;
}
.v2-plan-label { font-size: 13px; font-weight: 600; color: var(--v2-text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
.v2-plan-price { font-size: 52px; font-weight: 800; color: var(--v2-text); line-height: 1; margin-bottom: 4px; }
.v2-plan-currency { font-size: 22px; vertical-align: super; font-weight: 700; }
.v2-plan-period { font-size: 18px; font-weight: 400; color: var(--v2-text-muted); }
.v2-plan-saving { font-size: 13px; color: #16a34a; font-weight: 600; margin-bottom: 20px; }
.v2-plan-items { list-style: none; padding: 0; margin: 16px 0 24px; display: flex; flex-direction: column; gap: 10px; }
.v2-plan-items li { font-size: 15px; color: var(--v2-text-muted); }
.v2-btn-plan {
  display: block; width: 100%; padding: 14px;
  background: var(--v2-primary-light); color: var(--v2-primary);
  font-weight: 700; font-size: 15px; border-radius: var(--v2-radius-pill);
  text-decoration: none; text-align: center; transition: all .2s;
}
.v2-btn-plan:hover { background: var(--v2-primary); color: white; }
.v2-btn-plan.featured { background: var(--v2-primary); color: white; }
.v2-btn-plan.featured:hover { background: var(--v2-primary-dark); }

/* ---- FOOTER ---- */
.v2-footer {
  background: #282447; color: rgba(255,255,255,.7);
  padding: 48px 32px 24px; text-align: center; font-size: 14px;
}
.v2-footer-logo { height: 36px; margin-bottom: 16px; filter: brightness(0) invert(1); display: block; margin-left: auto; margin-right: auto; }
.v2-footer p { color: rgba(255,255,255,.5); font-size: 13px; margin-top: 8px; }

/* ---- SYSTEM ICON IMG ---- */
.v2-sys-icon-img { width: 40px; height: 40px; object-fit: contain; }
.v2-sys-icon-fallback { display: none; font-family: 'Rajdhani', sans-serif; font-size: 32px; font-weight: 700; }

/* ---- SIGMA VERSIONS ---- */
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

/* ---- PLAN ECONOMY ---- */
.v2-plan-economy-badge {
  display: inline-block !important;
  font-size: 11px; font-weight: 700;
  padding: 3px 10px; border-radius: 100px;
  background: rgba(46,204,113,0.15); color: #2ecc71;
  border: 1px solid rgba(46,204,113,0.3);
  margin-bottom: 8px;
}
.v2-plan-annual-note { font-size: 12px; color: var(--v2-text-muted); margin-top: -8px; margin-bottom: 16px; }

/* ---- AI DISCLOSURE ---- */
.v2-ai-disclosure {
  background: var(--v2-surface-2);
  border-top: 1px solid var(--v2-border);
  padding: 24px 32px;
}
.v2-ai-disclosure-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: flex-start; gap: 14px;
}
.v2-ai-disclosure-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
.v2-ai-disclosure-text { font-size: 13px; color: var(--v2-text-faint); line-height: 1.6; }

/* ---- RESPONSIVE ---- */
@media (max-width: 900px) {
  .v2-hero-inner { grid-template-columns: 1fr; gap: 40px; }
  .v2-hero-right { display: none; }
  .v2-cards-grid { grid-template-columns: 1fr; }
  .v2-systems-grid { grid-template-columns: 1fr; }
  .v2-plans-grid { grid-template-columns: 1fr; }
  .v2-nav-links { display: none; }
}

/* ---- DEVICE NOTICE ---- */
.device-notice { background: rgba(121,82,179,0.05); border-bottom: 1px solid rgba(121,82,179,0.12); padding: 8px 20px; display: flex; align-items: center; justify-content: center; gap: 8px; text-align: center; }
.device-notice-icon { font-size: 14px; flex-shrink: 0; }
.device-notice-text { font-size: 12px; color: #888; line-height: 1.4; }
.device-notice-text strong { color: #333; }
.device-notice-text kbd { display: inline-block; padding: 1px 5px; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; background: #f0f0f0; }
</style>
