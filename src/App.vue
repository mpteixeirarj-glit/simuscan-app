<template>
  <RouterView />
</template>

<style>
:root {
  --cor-fundo: #111113;
  --cor-card: #1c1c1f;
  --cor-card-borda: #2a2a2e;
  --cor-azul: #3498db;
  --cor-azul-hover: #2980b9;
  --cor-pink: #e91e8c;
  --cor-texto: #e8e8ea;
  --cor-texto-muted: #666670;
  --cor-amarelo: #f39c12;
  --cor-verde: #2ecc71;
  --cor-console-fundo: #003366;
  --cor-console-painel: #0b2c5d;
  --cor-console-borda: #3c6eac;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--cor-fundo);
  color: var(--cor-texto);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}
</style>
