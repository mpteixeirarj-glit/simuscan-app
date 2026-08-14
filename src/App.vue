<template>
  <RouterView />
</template>

<style>
:root {
  --pink:    #e2006a;
  --pink-lo: rgba(226,0,106,0.12);
  --pink-md: rgba(226,0,106,0.22);
  --blue:    #27a8df;
  --blue-lo: rgba(39,168,223,0.12);
  --blue-md: rgba(39,168,223,0.22);
  --bg:      #f2f4f9;
  --surf:    #ffffff;
  --surf2:   #e8ecf5;
  --border:  #d2d8e8;
  --text:    #0c0e18;
  --sub:     #3a405a;
  --muted:   #7a8098;
}

@media (prefers-color-scheme: dark) {
  :root { --bg:#0c0e14; --surf:#13161f; --surf2:#1a1e2b; --border:#222840; --text:#dde2f2; --sub:#9aa2c0; --muted:#5e677d; }
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.65; -webkit-font-smoothing: antialiased; }
</style>
