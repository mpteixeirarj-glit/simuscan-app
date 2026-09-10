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

      <div class="sistemas">
        <button class="sys-card available" @click="router.push({ name: 'gama' })">
          <span class="sys-badge">Disponível</span>
          <div class="sys-icon sys-icon--gama">
            <img :src="BASE_URL + 'imagens/icon-gama.png'" alt="Gama" class="sys-icon-img">
          </div>
          <h2>Gama Healthcare</h2>
          <p>Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
        </button>

        <div class="sigma-block">
          <div class="sigma-header">
            <span class="sigma-title">Sigma Healthcare</span>
          </div>
          <div class="sigma-versions">
            <div class="sigma-version-item">
              <img :src="BASE_URL + 'imagens/icon-sigma-on.svg'" class="sigma-version-icon" alt="Sigma ON">
              <button data-system="sigma-on" class="sub-btn sub-btn-on" disabled title="Em breve">
                Sigma ON <span class="coming-soon-badge">Em breve</span>
              </button>
            </div>
            <div class="sigma-version-item">
              <img :src="BASE_URL + 'imagens/icon-sigma-old.svg'" class="sigma-version-icon" alt="Sigma Old">
              <button data-system="sigma-old" class="sub-btn sub-btn-old" disabled title="Em breve">
                Sigma Old <span class="coming-soon-badge">Em breve</span>
              </button>
            </div>
          </div>
        </div>

        <div class="sys-card locked kappa-card">
          <span class="sys-badge soon kappa-badge">Em breve</span>
          <div class="sys-icon sys-icon--kappa">
            <img :src="BASE_URL + 'imagens/icon-sigma-kappa.svg'" alt="Kappa" class="sys-icon-img sys-icon-img--svg">
          </div>
          <h2>Kappa Healthcare</h2>
          <p class="sys-subtitle">Canon Aquilion</p>
          <p>Interface de alta produtividade para grandes volumes de exames.</p>
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

.content {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 3rem clamp(20px,5vw,72px);
  text-align: center;
}

.eyebrow { font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--cor-azul); margin-bottom: .6rem; }
h1 { font-family: 'Rajdhani', sans-serif; font-size: clamp(1.8rem,4vw,2.8rem); font-weight: 700; letter-spacing: -0.03em; margin-bottom: .5rem; }
.sub { color: var(--cor-texto-muted); margin-bottom: 3rem; }

.sistemas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.3rem; max-width: 860px; width: 100%;
}

.sys-card {
  background: var(--cor-card); border: 1px solid var(--cor-card-borda);
  border-radius: 16px; padding: 2rem;
  text-align: center; position: relative;
  display: flex; flex-direction: column; align-items: center;
  transition: transform .2s, border-color .2s;
  cursor: default;
}
.sys-card.available { border-color: var(--cor-azul); cursor: pointer; }
.sys-card.available:hover { transform: translateY(-4px); border-color: var(--cor-azul); box-shadow: 0 8px 30px rgba(52,152,219,.15); }
.sys-card.locked { opacity: .6; }

.sys-badge {
  font-size: .65rem; font-weight: 800; letter-spacing: .1em;
  text-transform: uppercase; padding: 4px 12px; border-radius: 20px;
  display: block; margin-bottom: 1.2rem;
  background: rgba(52,152,219,.15); color: var(--cor-azul);
  border: 1px solid rgba(52,152,219,.3);
}
.sys-badge.soon { background: rgba(255,255,255,.07); color: var(--cor-texto-muted); border-color: rgba(255,255,255,.1); }

.sys-icon {
  width: 80px; height: 80px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.2rem;
}
.sys-icon--gama { background: rgba(52,152,219,.15); border: 2px solid rgba(52,152,219,.4); }
.sys-icon--sigma { background: rgba(46,204,113,.15); border: 2px solid rgba(46,204,113,.4); }
.sys-icon--kappa { background: rgba(90,26,46,.15); border: 2px solid rgba(158,61,82,.4); }
.sys-icon-img { width: 52px; height: 52px; object-fit: contain; }
.sys-icon-img--svg { width: 80px; height: 80px; border-radius: 14px; }

h2 { font-size: 1.15rem; font-weight: 700; margin-bottom: .4rem; color: var(--cor-texto); }
p { font-size: .85rem; color: var(--cor-texto-muted); }
.sys-subtitle { font-size: .75rem; color: rgba(255,255,255,.35); font-style: italic; margin-bottom: 2px !important; }

/* Kappa card */
.kappa-card { border-color: rgba(158,61,82,.35); }
.kappa-badge { background: rgba(90,26,46,.18); color: #9e3d52; border-color: rgba(158,61,82,.35); }

/* Sigma block */
.sigma-block {
  background: var(--cor-card); border: 1px solid var(--cor-card-borda);
  border-radius: 16px; padding: 1.4rem 1.6rem;
  display: flex; flex-direction: column; gap: .9rem;
}
.sigma-header { text-align: center; }
.sigma-title {
  font-size: .72rem; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; color: var(--cor-texto-muted);
}
.sigma-versions { display: flex; flex-direction: column; gap: .6rem; }
.sigma-version-item {
  display: flex; align-items: center; gap: .75rem;
}
.sigma-version-icon { width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0; }
.sub-btn {
  flex: 1; display: flex; align-items: center; justify-content: space-between;
  padding: .6rem 1rem; border-radius: 10px; font-size: .88rem; font-weight: 600;
  border: 1px solid; cursor: not-allowed; opacity: .6; text-align: left;
  background: transparent;
}
.sub-btn-on  { border-color: rgba(46,204,113,.35); color: #2ecc71; }
.sub-btn-old { border-color: rgba(104,153,212,.35); color: #6899d4; }
.coming-soon-badge {
  font-size: .6rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
  padding: 2px 8px; border-radius: 12px;
  background: rgba(255,255,255,.07); color: var(--cor-texto-muted);
  border: 1px solid rgba(255,255,255,.1);
}
</style>
