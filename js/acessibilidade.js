// Exibe ou oculta o menu ao clicar no botão
document.getElementById("acessibilidade-btn").addEventListener("click", function() {
    let menu = document.getElementById("acessibilidade-menu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
});

// Aumenta ou diminui a fonte do site
function alterarFonte(tamanho) {
    let body = document.body;
    let style = window.getComputedStyle(body, null).getPropertyValue('font-size');
    let currentSize = parseFloat(style);

    if (tamanho === '+') {
        body.style.fontSize = (currentSize + 2) + "px";
    } else if (tamanho === '-') {
        body.style.fontSize = (currentSize - 2) + "px";
    }
}

// Ativa o modo de alto contraste
function modoAltoContraste() {
    document.body.classList.toggle("alto-contraste");
}