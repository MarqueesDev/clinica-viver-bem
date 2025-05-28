function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pt',
        includedLanguages: 'en,es,fr,de,pt'
    }, 'google_translate_element');

    // Espera o widget carregar para aplicar idioma
    waitForTranslateWidget(() => {
        aplicarIdioma();
        monitorarClique();
        restaurarScroll();
    });
}

// Espera o iframe do Google Translate aparecer na DOM
function waitForTranslateWidget(callback) {
    const checkFrame = setInterval(() => {
        const frame = document.querySelector("iframe.goog-te-menu-frame");
        if (frame) {
            clearInterval(checkFrame);
            callback();
        }
    }, 500);
}

function salvarIdioma(idioma) {
    localStorage.setItem("idiomaSelecionado", idioma);
}

function aplicarIdioma() {
    const idioma = localStorage.getItem("idiomaSelecionado");
    if (!idioma || idioma === 'português (brasil)') {
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
                    localStorage.removeItem("idiomaSelecionado");
                    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

                    const scrollY = window.scrollY || document.documentElement.scrollTop;
                    localStorage.setItem('scrollRestaurar', scrollY);

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
        }, 200);
    }
}
