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
          <div class="sys-icon">🟢</div>
          <h2>Gama Healthcare</h2>
          <p>Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
        </button>

        <div class="sys-card locked">
          <span class="sys-badge soon">Em breve</span>
          <div class="sys-icon">🔵</div>
          <h2>Sigma Healthcare</h2>
          <p>Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
        </div>

        <div class="sys-card locked">
          <span class="sys-badge soon">Em breve</span>
          <div class="sys-icon">🟠</div>
          <h2>Kappa Healthcare</h2>
          <p>Console completo com gerenciador de protocolos, worklist, topograma e fluxo de aquisição.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
  text-align: left; position: relative;
  transition: transform .2s, border-color .2s;
  cursor: default;
}
.sys-card.available { border-color: var(--cor-pink); cursor: pointer; background: none; }
.sys-card.available:hover { transform: translateY(-4px); }
.sys-card.locked { opacity: .55; }

.sys-badge {
  font-size: .65rem; font-weight: 800; letter-spacing: .1em;
  text-transform: uppercase; padding: 3px 10px; border-radius: 20px;
  display: inline-block; margin-bottom: 1rem;
  background: rgba(233,30,140,.12); color: var(--cor-pink);
}
.sys-badge.soon { background: rgba(255,255,255,.07); color: var(--cor-texto-muted); }

.sys-icon { font-size: 2rem; margin-bottom: .8rem; }
h2 { font-size: 1.1rem; font-weight: 700; margin-bottom: .3rem; }
p { font-size: .83rem; color: var(--cor-texto-muted); }
</style>
