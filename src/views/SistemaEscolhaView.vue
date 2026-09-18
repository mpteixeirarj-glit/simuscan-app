<template>
  <div class="escolha-page">
    <header class="top">
      <div class="logo"><span class="p">Simu</span><span class="b">Scan</span></div>
      <div class="user-area">
        <span class="user-email">{{ auth.user?.email }}</span>
        <button @click="handleLogout" class="btn-sair">Sair</button>
      </div>
    </header>

    <main class="content">
      <p class="eyebrow">Simulador</p>
      <h1>Escolha o sistema</h1>
      <p class="sub">Selecione o equipamento que deseja praticar hoje.</p>

      <div class="systems-escolha-grid">
        <!-- GAMA -->
        <div class="system-card gama-card" @click="router.push('/gama')">
          <div class="system-card-icon">
            <img :src="BASE_URL + 'imagens/gamma-icone.png'" alt="Gama Healthcare" class="system-icon-img" @error="$event.target.style.display='none'" />
          </div>
          <div class="system-badge available">Disponível</div>
          <h3 class="system-name">Gama Healthcare</h3>
          <p class="system-desc">Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
          <button class="system-btn-active">Acessar</button>
        </div>

        <!-- SIGMA ON -->
        <div class="system-card sigma-on-card" @click="router.push('/sigma-on')">
          <div class="system-card-icon">
            <img :src="BASE_URL + 'imagens/sigma-on.png'" alt="Sigma ON" class="system-icon-img" @error="$event.target.style.display='none'" />
          </div>
          <div class="system-badge available">Disponível</div>
          <h3 class="system-name">Sigma ON</h3>
          <p class="system-subtitle-italic">Sigma ON CT — versão atual</p>
          <p class="system-desc">Interface moderna com fluxo avançado completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
          <button class="system-btn-active sigma-on-active">Acessar</button>
        </div>

        <!-- SIGMA OLD -->
        <div class="system-card sigma-old-card">
          <div class="system-card-icon">
            <img :src="BASE_URL + 'imagens/sigma-icone.png'" alt="Sigma Old" class="system-icon-img" @error="$event.target.style.display='none'" />
          </div>
          <div class="system-badge soon">Em breve</div>
          <h3 class="system-name">Sigma Old</h3>
          <p class="system-subtitle-italic">Sigma Old CT — versão legado</p>
          <p class="system-desc">Interface clássica do console de geração anterior, com fluxo completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
          <button class="system-btn-access" disabled>Acessar</button>
        </div>

        <!-- KAPPA -->
        <div class="system-card kappa-card">
          <div class="system-card-icon">
            <img :src="BASE_URL + 'imagens/kappa-icone.png'" alt="Kappa Healthcare" class="system-icon-img" @error="$event.target.style.display='none'" />
          </div>
          <div class="system-badge soon">Em breve</div>
          <h3 class="system-name">Kappa Healthcare</h3>
          <p class="system-desc">Interface de alta produtividade completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
          <button class="system-btn-access" disabled>Acessar</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const BASE_URL = import.meta.env.BASE_URL
const router = useRouter()
const auth = useAuthStore()

async function handleLogout() {
  await auth.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped>
.escolha-page { min-height: 100vh; background: var(--cor-fundo); display: flex; flex-direction: column; }

/* HEADER */
.top {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 clamp(20px,5vw,72px); height: 64px;
  background: var(--cor-card); border-bottom: 1px solid var(--cor-card-borda);
}
.logo { font-family: 'Rajdhani', sans-serif; font-size: 1.4rem; font-weight: 700; letter-spacing: -0.04em; }
.logo .p { color: var(--cor-pink); }
.logo .b { color: var(--cor-azul); }
.user-area { display: flex; align-items: center; gap: 1rem; }
.user-email { font-size: .8rem; color: var(--cor-texto-muted); }
.btn-sair {
  padding: .35rem 1rem; border: 1.5px solid var(--cor-card-borda);
  background: transparent; color: var(--cor-texto-muted);
  border-radius: 6px; font-size: .8rem; cursor: pointer;
  transition: border-color .2s, color .2s;
}
.btn-sair:hover { border-color: var(--cor-pink); color: var(--cor-pink); }

/* MAIN */
.content {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 3rem clamp(20px,5vw,72px);
  text-align: center;
}
.eyebrow { font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--cor-azul); margin-bottom: .6rem; }
h1 { font-family: 'Rajdhani', sans-serif; font-size: clamp(1.8rem,4vw,2.8rem); font-weight: 700; letter-spacing: -0.03em; margin-bottom: .5rem; }
.sub { color: var(--cor-texto-muted); margin-bottom: 3rem; }

/* GRID */
.systems-escolha-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-items: stretch;
  max-width: 1100px;
  width: 100%;
}

/* CARDS */
.system-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 300px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.08);
  padding: 24px 20px;
  background: var(--cor-card);
  transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease;
}
.sigma-old-card, .kappa-card { opacity: .75; }
.sigma-on-card { cursor: pointer; }
.sigma-on-active { background: #2ecc71 !important; color: #000 !important; }

/* ICONS — no box, no border */
.system-card-icon {
  width: 80px; height: 80px;
  margin: 0 auto 16px;
  display: flex; align-items: center; justify-content: center;
  background: none !important;
  border: none !important;
  box-shadow: none !important;
}
.system-icon-img {
  width: 72px; height: 72px;
  object-fit: contain;
  filter: none;
}

/* BADGE */
.system-badge {
  display: inline-block; font-size: 11px; font-weight: 700;
  letter-spacing: 1px; text-transform: uppercase;
  padding: 3px 12px; border-radius: 100px; margin-bottom: 10px;
}
.system-badge.available { background: rgba(46,204,113,0.15); color: #2ecc71; border: 1px solid rgba(46,204,113,0.3); }
.system-badge.soon { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.1); }

/* CARD TEXT */
.system-name { font-size: 1.05rem; font-weight: 700; color: var(--cor-texto); margin-bottom: .3rem; }
.system-subtitle-italic { font-size: 12px; font-style: italic; color: rgba(255,255,255,0.45); margin-bottom: 8px; }
.system-desc { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.6; margin-bottom: 16px; flex: 1; }

/* BUTTONS */
.system-btn-active {
  display: inline-block; padding: 7px 20px;
  background: var(--cor-azul); color: #fff;
  border: none; border-radius: 6px; font-size: 13px; font-weight: 700;
  cursor: pointer; width: 100%; text-align: center; margin-top: auto;
  transition: opacity .2s;
}
.system-btn-active:hover { opacity: .85; }
.system-btn-access {
  display: inline-block; padding: 7px 20px;
  background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.25);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 6px;
  font-size: 13px; font-weight: 600; cursor: not-allowed;
  width: 100%; text-align: center; margin-top: auto;
}

/* GLOW PER SYSTEM */
.gama-card { border-color: rgba(52,152,219,0.3); cursor: pointer; }
.gama-card:hover { border-color: #3498db; box-shadow: 0 0 0 1px #3498db, 0 0 20px rgba(52,152,219,0.35); transform: translateY(-4px); }
.sigma-on-card:hover { border-color: #2ecc71; box-shadow: 0 0 0 1px #2ecc71, 0 0 20px rgba(46,204,113,0.3); transform: translateY(-4px); opacity: 1; }
.sigma-old-card:hover { border-color: #6899d4; box-shadow: 0 0 0 1px #6899d4, 0 0 20px rgba(104,153,212,0.3); transform: translateY(-4px); opacity: 1; }
.kappa-card:hover { border-color: #9e3d52; box-shadow: 0 0 0 1px #9e3d52, 0 0 20px rgba(90,26,46,0.45); transform: translateY(-4px); opacity: 1; }

@media (max-width: 900px) {
  .systems-escolha-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .systems-escolha-grid { grid-template-columns: 1fr; }
}
</style>
