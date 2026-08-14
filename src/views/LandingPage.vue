<template>
  <div class="lp">
    <!-- NAV -->
    <nav class="nav">
      <div class="nav-inner">
        <div class="logo"><span class="p">Simu</span><span class="b">Scan</span></div>
        <RouterLink :to="{ name: 'login' }" class="btn-login">Entrar</RouterLink>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <div class="hero-glow hero-glow-pink"></div>
      <div class="hero-glow hero-glow-blue"></div>
      <div class="hero-content">
        <span class="eyebrow">Simulador de Tomografia Computadorizada</span>
        <h1>Treine com<br><span class="accent-pink">precisão</span> antes de<br>entrar na <span class="accent-blue">sala</span>.</h1>
        <p class="hero-sub">
          O SimuScan reproduz os fluxos reais de aquisição de TC em um ambiente seguro e interativo.
          Pratique protocolos, gerencie worklists e domine o console — sem colocar pacientes em risco.
        </p>
        <div class="hero-actions">
          <RouterLink :to="{ name: 'login' }" class="btn-primary">Começar agora</RouterLink>
          <a href="#features" class="btn-ghost">Ver funcionalidades</a>
        </div>
      </div>
      <div class="hero-image-wrap">
        <img :src="BASE_URL + 'imagens/hero-scanner.jpg'" alt="Console de tomógrafo com iluminação azul e rosa" class="hero-img" />
      </div>
    </section>

    <!-- FEATURES -->
    <section class="section" id="features">
      <div class="section-inner">
        <span class="eyebrow-center">Funcionalidades</span>
        <h2 class="section-title">Tudo que você precisa para treinar</h2>
        <div class="features-grid">
          <div class="feat-card" v-for="feat in features" :key="feat.title">
            <div class="feat-icon">{{ feat.icon }}</div>
            <h3>{{ feat.title }}</h3>
            <p>{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SYSTEMS -->
    <section class="section section-alt" id="systems">
      <div class="section-inner">
        <span class="eyebrow-center">Equipamentos simulados</span>
        <h2 class="section-title">Escolha seu sistema</h2>
        <p class="section-sub">Cada sistema simula uma linha de console diferente, com fluxos e terminologias próprias.</p>
        <div class="systems-grid">
          <div class="sys-card available">
            <span class="badge">Disponível</span>
            <div class="sys-icon">🟢</div>
            <h3>Gama Healthcare</h3>
            <p>Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
          </div>
          <div class="sys-card locked">
            <span class="badge soon">Em breve</span>
            <div class="sys-icon">🔵</div>
            <h3>Sigma Healthcare</h3>
            <p>Tomografia e ressonância magnética com fluxo avançado de protocolos.</p>
          </div>
          <div class="sys-card locked">
            <span class="badge soon">Em breve</span>
            <div class="sys-icon">🟠</div>
            <h3>Kappa Healthcare</h3>
            <p>Interface de alta produtividade para grandes volumes de exames.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section class="section" id="pricing">
      <div class="section-inner">
        <span class="eyebrow-center">Planos</span>
        <h2 class="section-title">Invista no seu desenvolvimento</h2>
        <div class="pricing-grid">
          <div class="price-card" v-for="plan in plans" :key="plan.name" :class="{ highlight: plan.highlight }">
            <span v-if="plan.badge" class="price-badge">{{ plan.badge }}</span>
            <h3>{{ plan.name }}</h3>
            <div class="price">
              <span class="price-val">{{ plan.price }}</span>
              <span class="price-per" v-if="plan.per">{{ plan.per }}</span>
            </div>
            <p class="price-desc">{{ plan.desc }}</p>
            <ul class="price-features">
              <li v-for="f in plan.features" :key="f">✓ {{ f }}</li>
            </ul>
            <RouterLink :to="{ name: 'login' }" class="btn-plan" :class="{ 'btn-plan-primary': plan.highlight }">
              {{ plan.cta }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-logo"><span class="p">Simu</span><span class="b">Scan</span><span class="reg">®</span></div>
        <p class="footer-copy">© {{ year }} SimuScan. Todos os direitos reservados.</p>
        <p class="footer-legal">
          SimuScan® é uma plataforma educacional independente. As interfaces, nomenclaturas e fluxos
          apresentados são fictícios e criados exclusivamente para fins de treinamento. SimuScan não possui
          qualquer afiliação, parceria ou vínculo com fabricantes de equipamentos médicos. Todas as marcas
          registradas de terceiros pertencem exclusivamente aos seus respectivos proprietários.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const BASE_URL = import.meta.env.BASE_URL
const year = new Date().getFullYear()

const features = [
  { icon: '🖥️', title: 'Console interativo', desc: 'Interface fiel ao ambiente real de uma sala de TC, com painéis, botões e fluxos de trabalho autênticos.' },
  { icon: '📋', title: 'Worklist de pacientes', desc: 'Gerencie uma lista de pacientes simulados com dados completos — nome, ID, protocolo e médico solicitante.' },
  { icon: '⚙️', title: 'Gerenciador de protocolos', desc: 'Selecione e gerencie protocolos por região anatômica, do crânio aos pés, com listas completas.' },
  { icon: '📐', title: 'Topograma e scout', desc: 'Pratique o planejamento de séries no topograma antes de avançar para a aquisição real.' },
  { icon: '🔄', title: 'Fluxo completo de exame', desc: 'Do cadastro do paciente até a reconstrução: experimente cada etapa do processo sem pressa.' },
  { icon: '🔒', title: 'Acesso seguro', desc: 'Login com autenticação Firebase. Seus dados de treino ficam protegidos e acessíveis de qualquer dispositivo.' },
]

const plans = [
  {
    name: 'Mensal',
    price: 'R$ 49',
    per: '/ mês',
    desc: 'Ideal para quem está se preparando para uma reposição ou aprimoramento rápido.',
    features: ['Acesso ao sistema Gama Healthcare', 'Protocolos completos', 'Worklist simulada', 'Suporte por e-mail'],
    cta: 'Assinar',
    highlight: false,
  },
  {
    name: 'Anual',
    price: 'R$ 399',
    per: '/ ano',
    badge: 'Melhor custo-benefício',
    desc: 'Economia de mais de 30% para quem quer aprender com calma e consistência.',
    features: ['Tudo do Mensal', 'Acesso a sistemas em lançamento', 'Prioridade no suporte', 'Atualizações gratuitas'],
    cta: 'Assinar anual',
    highlight: true,
  },
  {
    name: 'Vitalício',
    price: 'R$ 997',
    per: 'único',
    desc: 'Pague uma vez, acesse para sempre. Para profissionais que querem ter o simulador sempre à disposição.',
    features: ['Tudo do Anual', 'Acesso vitalício', 'Todos os sistemas futuros inclusos', 'Certificado de uso'],
    cta: 'Adquirir acesso vitalício',
    highlight: false,
  },
]
</script>

<style scoped>
.lp { min-height: 100vh; background: var(--bg); color: var(--text); }

/* NAV */
.nav { position: sticky; top: 0; z-index: 50; background: var(--surf); border-bottom: 1px solid var(--border); backdrop-filter: blur(12px); }
.nav-inner { max-width: 1100px; margin: 0 auto; padding: 0 clamp(20px,5vw,72px); height: 64px; display: flex; align-items: center; justify-content: space-between; }
.logo { font-size: 1.5rem; font-weight: 900; letter-spacing: -0.04em; }
.logo .p { color: var(--pink); }
.logo .b { color: var(--blue); }
.btn-login { padding: 0.45rem 1.3rem; background: var(--pink); color: #fff; border-radius: 8px; font-size: 0.88rem; font-weight: 700; text-decoration: none; transition: opacity .2s; }
.btn-login:hover { opacity: .85; }

/* HERO */
.hero { position: relative; min-height: 88vh; display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 3rem; padding: 6rem clamp(20px,7vw,120px) 4rem; overflow: hidden; max-width: 1300px; margin: 0 auto; }
.hero-glow { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; }
.hero-glow-pink { width: 500px; height: 500px; background: var(--pink-lo); top: 10%; left: -10%; }
.hero-glow-blue { width: 500px; height: 500px; background: var(--blue-lo); bottom: 10%; right: -5%; }
.hero-content { position: relative; z-index: 2; }
.eyebrow { font-size: .72rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--blue); display: block; margin-bottom: 1rem; }
.eyebrow-center { font-size: .72rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--blue); display: block; text-align: center; margin-bottom: .8rem; }
h1 { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1.4rem; }
.accent-pink { color: var(--pink); }
.accent-blue { color: var(--blue); }
.hero-sub { font-size: clamp(.9rem, 1.5vw, 1.05rem); color: var(--sub); max-width: 520px; line-height: 1.7; margin-bottom: 2.4rem; }
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.btn-primary { padding: 0.8rem 2rem; background: var(--pink); color: #fff; border-radius: 10px; font-size: 1rem; font-weight: 700; text-decoration: none; box-shadow: 0 0 28px var(--pink-md); transition: opacity .2s, transform .2s; }
.btn-primary:hover { opacity: .88; transform: translateY(-2px); }
.btn-ghost { padding: 0.8rem 2rem; border: 1.5px solid var(--border); color: var(--muted); border-radius: 10px; font-size: 1rem; font-weight: 600; text-decoration: none; transition: border-color .2s, color .2s; }
.btn-ghost:hover { border-color: var(--blue); color: var(--blue); }
.hero-image-wrap { position: relative; z-index: 2; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); border: 1px solid var(--border); }
.hero-img { width: 100%; height: auto; display: block; }

/* SECTIONS */
.section { padding: 6rem clamp(20px,5vw,72px); }
.section-alt { background: var(--surf); }
.section-inner { max-width: 1100px; margin: 0 auto; }
.section-title { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 900; letter-spacing: -0.03em; text-align: center; margin-bottom: .6rem; }
.section-sub { text-align: center; color: var(--muted); max-width: 560px; margin: 0 auto 3rem; }

/* FEATURES */
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.4rem; margin-top: 3rem; }
.feat-card { background: var(--surf); border: 1px solid var(--border); border-radius: 16px; padding: 1.8rem; transition: transform .2s, border-color .2s; }
.feat-card:hover { transform: translateY(-4px); border-color: var(--blue); }
.feat-icon { font-size: 2rem; margin-bottom: 1rem; }
.feat-card h3 { font-size: 1.05rem; font-weight: 800; margin-bottom: .4rem; }
.feat-card p { font-size: .85rem; color: var(--sub); line-height: 1.6; }

/* SYSTEMS */
.systems-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.4rem; margin-top: 2.5rem; }
.sys-card { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; position: relative; }
.sys-card.available { border-color: var(--pink); }
.sys-card.locked { opacity: .55; }
.badge { font-size: .62rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; display: inline-block; margin-bottom: .8rem; background: var(--pink-lo); color: var(--pink); }
.badge.soon { background: var(--surf2); color: var(--muted); }
.sys-icon { font-size: 2rem; margin-bottom: .8rem; }
.sys-card h3 { font-size: 1.1rem; font-weight: 900; margin-bottom: .3rem; }
.sys-card p { font-size: .83rem; color: var(--sub); }

/* PRICING */
.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.6rem; margin-top: 3rem; }
.price-card { background: var(--surf); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; display: flex; flex-direction: column; position: relative; }
.price-card.highlight { border-color: var(--pink); box-shadow: 0 0 40px var(--pink-lo); }
.price-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--pink); color: #fff; font-size: .68rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; padding: 4px 14px; border-radius: 20px; white-space: nowrap; }
.price-card h3 { font-size: 1.2rem; font-weight: 900; margin-bottom: 1rem; }
.price { display: flex; align-items: baseline; gap: .3rem; margin-bottom: 1rem; }
.price-val { font-size: 2.2rem; font-weight: 900; color: var(--pink); }
.price-per { font-size: .85rem; color: var(--muted); }
.price-desc { font-size: .83rem; color: var(--sub); margin-bottom: 1.4rem; line-height: 1.6; }
.price-features { list-style: none; margin-bottom: 2rem; flex: 1; }
.price-features li { font-size: .85rem; color: var(--sub); padding: .3rem 0; border-bottom: 1px solid var(--border); }
.price-features li:last-child { border-bottom: none; }
.btn-plan { display: block; text-align: center; padding: .75rem; border-radius: 10px; font-size: .9rem; font-weight: 700; text-decoration: none; border: 1.5px solid var(--border); color: var(--muted); transition: border-color .2s, color .2s; }
.btn-plan:hover { border-color: var(--pink); color: var(--pink); }
.btn-plan-primary { background: var(--pink); color: #fff !important; border-color: var(--pink) !important; box-shadow: 0 0 20px var(--pink-md); }
.btn-plan-primary:hover { opacity: .88; }

/* FOOTER */
.footer { background: var(--surf); border-top: 1px solid var(--border); padding: 3rem clamp(20px,5vw,72px); }
.footer-inner { max-width: 800px; margin: 0 auto; text-align: center; }
.footer-logo { font-size: 1.6rem; font-weight: 900; letter-spacing: -0.04em; margin-bottom: .5rem; }
.footer-logo .p { color: var(--pink); }
.footer-logo .b { color: var(--blue); }
.footer-logo .reg { font-size: .9rem; color: var(--muted); vertical-align: super; }
.footer-copy { font-size: .82rem; color: var(--muted); margin-bottom: 1rem; }
.footer-legal { font-size: .72rem; color: var(--muted); line-height: 1.7; max-width: 680px; margin: 0 auto; }

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero { grid-template-columns: 1fr; min-height: auto; padding-top: 3rem; }
  .hero-image-wrap { order: -1; }
}
</style>
