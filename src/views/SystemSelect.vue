<template>
  <div class="select-page">
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

      <div class="systems">
        <button class="sys-card available" @click="goTo('gama')">
          <span class="sys-badge">Disponível</span>
          <div class="sys-icon">🟢</div>
          <h2>Gama Healthcare</h2>
          <p>Tomografia computadorizada com console completo e gerenciador de protocolos.</p>
        </button>

        <div class="sys-card locked">
          <span class="sys-badge soon">Em breve</span>
          <div class="sys-icon">🔵</div>
          <h2>Sigma Healthcare</h2>
          <p>Tomografia e ressonância magnética com fluxo avançado.</p>
        </div>

        <div class="sys-card locked">
          <span class="sys-badge soon">Em breve</span>
          <div class="sys-icon">🟠</div>
          <h2>Kappa Healthcare</h2>
          <p>Interface de alta produtividade para grandes volumes.</p>
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

function goTo(system) {
  router.push({ name: system })
}

async function handleLogout() {
  await auth.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped>
.select-page { min-height: 100vh; background: var(--bg); display: flex; flex-direction: column; }

.top {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 clamp(20px,5vw,72px); height: 64px;
  background: var(--surf); border-bottom: 1px solid var(--border);
}
.logo { font-size: 1.4rem; font-weight: 900; letter-spacing: -0.04em; }
.logo .p { color: var(--pink); }
.logo .b { color: var(--blue); }

.user-area { display: flex; align-items: center; gap: 1rem; }
.user-email { font-size: 0.8rem; color: var(--muted); }
.btn-sair {
  padding: .35rem 1rem; border: 1.5px solid var(--border);
  background: transparent; color: var(--muted);
  border-radius: 6px; font-size: .8rem; cursor: pointer;
  transition: border-color .2s, color .2s;
}
.btn-sair:hover { border-color: var(--pink); color: var(--pink); }

.content {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 3rem clamp(20px,5vw,72px);
  text-align: center;
}

.eyebrow {
  font-size: .72rem; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; color: var(--blue); margin-bottom: .6rem;
}
h1 { font-size: clamp(1.8rem,4vw,2.8rem); font-weight: 900; letter-spacing: -0.03em; margin-bottom: .5rem; }
.sub { color: var(--muted); margin-bottom: 3rem; }

.systems {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.3rem; max-width: 860px; width: 100%;
}

.sys-card {
  background: var(--surf); border: 1px solid var(--border);
  border-radius: 16px; padding: 2rem;
  text-align: left; position: relative;
  transition: transform .2s, border-color .2s;
  cursor: default;
}
.sys-card.available {
  border-color: var(--pink); cursor: pointer;
  background: none;
}
.sys-card.available:hover { transform: translateY(-4px); }
.sys-card.locked { opacity: .55; }

.sys-badge {
  font-size: .65rem; font-weight: 800; letter-spacing: .1em;
  text-transform: uppercase; padding: 3px 10px; border-radius: 20px;
  display: inline-block; margin-bottom: 1rem;
  background: var(--pink-lo); color: var(--pink);
}
.sys-badge.soon { background: var(--surf2); color: var(--muted); }

.sys-icon { font-size: 2rem; margin-bottom: .8rem; }
h2 { font-size: 1.1rem; font-weight: 900; margin-bottom: .3rem; }
p { font-size: .83rem; color: var(--sub); }
</style>
