<template>
  <div class="lv3">
    <nav class="lv3-nav">
      <div class="lv3-nav-inner">
        <div class="lv3-logo">
          <img :src="BASE_URL + 'imagens/logopainel.png'" alt="SimuScan" class="lv3-logo-img">
          <span>SimuScan</span>
        </div>
        <RouterLink :to="{ name: 'login' }" class="lv3-btn-login">Acessar</RouterLink>
      </div>
    </nav>

    <main class="lv3-main">
      <div class="lv3-hero">
        <div class="lv3-badge">Plataforma de Treinamento</div>
        <h1 class="lv3-title">Simulador de<br><span class="lv3-accent">Tomografia Computadorizada</span></h1>
        <p class="lv3-sub">
          Ambiente virtual para capacitação de técnicos e tecnólogos em radiologia.
          Fluxos reais de aquisição, sem exposição de pacientes.
        </p>
        <RouterLink :to="{ name: 'login' }" class="lv3-cta">Iniciar treinamento</RouterLink>
      </div>

      <div class="lv3-grid">
        <div class="lv3-card" v-for="item in features" :key="item.title">
          <div class="lv3-card-icon">{{ item.icon }}</div>
          <div class="lv3-card-title">{{ item.title }}</div>
          <div class="lv3-card-desc">{{ item.desc }}</div>
        </div>
      </div>

      <div class="lv3-divider"></div>

      <div class="lv3-footer">
        SimuScan &nbsp;·&nbsp; Treinamento de Operadores &nbsp;·&nbsp;
        <RouterLink :to="{ name: 'login' }" class="lv3-footer-link">Entrar</RouterLink>
      </div>
    </main>
  </div>
</template>

<script setup>
const BASE_URL = import.meta.env.BASE_URL

const features = [
  { icon: '🖥', title: 'Console Interativo', desc: 'Interface idêntica à do equipamento real, com todos os controles e parâmetros de aquisição.' },
  { icon: '📋', title: 'Worklist & Protocolos', desc: 'Agendamento de pacientes, seleção de protocolos e gerenciamento de exames.' },
  { icon: '🔄', title: 'Retro Recon', desc: 'Reconstrução retroativa de séries com controle de parâmetros de reconstrução.' },
  { icon: '📐', title: 'Topograma', desc: 'Posicionamento de paciente e planejamento de séries com controles interativos.' },
  { icon: '🔧', title: 'Calibração Diária', desc: 'Simulação dos procedimentos de manutenção e calibração do equipamento.' },
  { icon: '🛡', title: 'Seguro para Treinar', desc: 'Ambiente sem risco: erros não afetam pacientes reais, ideal para prática repetida.' },
]
</script>

<style scoped>
.lv3 {
  min-height: 100vh;
  background: #f5f6fa;
  color: #1a1a2e;
  font-family: 'DM Sans', sans-serif;
  display: flex;
  flex-direction: column;
}

.lv3-nav {
  background: #ffffff;
  border-bottom: 1px solid #e5e7ef;
  position: sticky;
  top: 0;
  z-index: 100;
}

.lv3-nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.lv3-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.2rem;
  color: #1a1a2e;
}

.lv3-logo-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.lv3-btn-login {
  padding: 7px 20px;
  background: #003366;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-size: .88rem;
  font-weight: 600;
  transition: background .2s;
}
.lv3-btn-login:hover { background: #002244; }

.lv3-main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
  width: 100%;
}

.lv3-hero {
  text-align: center;
  margin-bottom: 4rem;
}

.lv3-badge {
  display: inline-block;
  background: #e8f0fe;
  color: #003366;
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 4px 14px;
  border-radius: 100px;
  margin-bottom: 1.5rem;
}

.lv3-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.2rem;
  color: #1a1a2e;
}

.lv3-accent { color: #003366; }

.lv3-sub {
  font-size: 1.05rem;
  color: #555;
  max-width: 560px;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

.lv3-cta {
  display: inline-block;
  padding: 13px 32px;
  background: #003366;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;
  transition: background .2s, transform .15s;
}
.lv3-cta:hover { background: #002244; transform: translateY(-1px); }

.lv3-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 4rem;
}

.lv3-card {
  background: #ffffff;
  border: 1px solid #e5e7ef;
  border-radius: 12px;
  padding: 24px;
  transition: box-shadow .2s, transform .2s;
}
.lv3-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.08); transform: translateY(-2px); }

.lv3-card-icon { font-size: 1.8rem; margin-bottom: 12px; }
.lv3-card-title { font-weight: 700; font-size: 1rem; margin-bottom: 6px; color: #1a1a2e; }
.lv3-card-desc { font-size: .88rem; color: #666; line-height: 1.6; }

.lv3-divider { height: 1px; background: #e5e7ef; margin: 0 0 2rem; }

.lv3-footer {
  text-align: center;
  font-size: .8rem;
  color: #999;
  padding-bottom: 2rem;
}
.lv3-footer-link { color: #003366; text-decoration: none; font-weight: 600; }
.lv3-footer-link:hover { text-decoration: underline; }
</style>
