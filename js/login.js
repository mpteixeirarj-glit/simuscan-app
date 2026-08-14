document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usuarioInput = document.getElementById('usuario');
    const senhaInput = document.getElementById('senha');
    const errorMessage = document.getElementById('error-message');
    const somSucesso = document.getElementById('somSucesso');
    const somErroLogin = document.getElementById('somErroLogin');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        errorMessage.textContent = '';
        const usuario = usuarioInput.value.trim();
        const senha = senhaInput.value.trim();

        if (usuario === 'mpteixeira.rj@gmail.com' && senha === '1234') {
            somSucesso.play();
            sessionStorage.setItem('usuarioLogado', 'true');
            setTimeout(() => {
                window.location.href = 'escolha.sistemas.html';
            }, 300);
        } else {
            somErroLogin.play();
            errorMessage.textContent = 'E-mail ou senha incorretos.';
        }
    });
});