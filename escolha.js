// Função auto-executável para proteger a página
(function verificarLogin() {
    const isUserLoggedIn = sessionStorage.getItem('usuarioLogado');

    // Se o item 'usuarioLogado' não for 'true', o acesso é negado.
    if (isUserLoggedIn !== 'true') {
        // Usamos alert para uma mensagem clara, mas o redirecionamento é a ação principal.
        alert('Acesso negado. Por favor, faça o login primeiro.');
        
        // Redireciona o usuário de volta para a página de login
        window.location.href = 'login.html';
    }
})();

// Adiciona a lógica de clique a todos os botões de sistema
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos que têm o atributo 'data-system'
    const systemButtons = document.querySelectorAll('[data-system]');

    systemButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Pega o nome do sistema do atributo data (ex: 'gama', 'oldsigma')
            const systemName = button.dataset.system;
            
            // Constrói a URL de destino seguindo nosso padrão
            const targetUrl = `index_${systemName}.html`;
            
            console.log(`Redirecionando para: ${targetUrl}`);
            
            // Redireciona o navegador para a página do sistema escolhido
            window.location.href = targetUrl;
        });
    });
});