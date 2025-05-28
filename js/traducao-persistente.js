function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pt', // Idioma da página
        includedLanguages: 'en,es,fr,de,pt' // Lista de idiomas incluídos, sem a vírgula extra
    }, 'google_translate_element');
}

function salvarIdioma(idioma) {
    localStorage.setItem("idiomaSelecionado", idioma);
}

function aplicarIdioma() {
    const idioma = localStorage.getItem("idiomaSelecionado");
    if (!idioma || idioma === 'português (brasil)') {
        // Não aplica tradução ao retornar para o padrão
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        localStorage.removeItem("idiomaSelecionado");
        return;
    }

    const tentarAplicar = setInterval(() => {
        const frame = document.querySelector("iframe.goog-te-menu-frame");
        if (frame) {
            const innerDoc = frame.contentDocument || frame.contentWindow.document;
            const options = innerDoc.querySelectorAll(".goog-te-menu2-item span.text");
            options.forEach(option => {
                if (option.innerText.toLowerCase().includes(idioma)) {
                    option.click();
                    clearInterval(tentarAplicar);
                }
            });
        }
    }, 500);
}

function monitorarClique() {
    const observer = new MutationObserver(() => {
        const frame = document.querySelector("iframe.goog-te-menu-frame");
        if (frame) {
            const innerDoc = frame.contentDocument || frame.contentWindow.document;
            innerDoc.addEventListener("click", function (e) {
                const lang = e.target.innerText.toLowerCase().trim();

                if (lang === "português (brasil)") {
                    // Desativa tradução
                    localStorage.removeItem("idiomaSelecionado");
                    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

                    // Salva a posição atual do scroll
                    const scrollY = window.scrollY || document.documentElement.scrollTop;
                    localStorage.setItem('scrollRestaurar', scrollY);

                    // Aguarda 5 segundos, depois recarrega normalmente (como F5)
                    setTimeout(() => {
                        location.reload();
                    }, 5000);
                } else {
                    salvarIdioma(lang);
                }
            });
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function restaurarScroll() {
    const scroll = localStorage.getItem('scrollRestaurar');
    if (scroll) {
        setTimeout(() => {
            window.scrollTo(0, parseInt(scroll));
            localStorage.removeItem('scrollRestaurar');
        }, 200); // pequeno delay para garantir que tudo carregou
    }
}

document.addEventListener("DOMContentLoaded", () => {
    aplicarIdioma();
    restaurarScroll();
    monitorarClique();
});
