// Exibe ou oculta o menu ao clicar no botão
document.getElementById("acessibilidade-btn").addEventListener("click", function () {
  let menu = document.getElementById("acessibilidade-menu");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
});

// Função para fechar o menu de acessibilidade
function fecharMenuAcessibilidade() {
  document.getElementById("acessibilidade-menu").style.display = "none";
}

// Aumenta ou diminui a fonte do site
function alterarFonte(tamanho) {
  let elementos = document.querySelectorAll('*');
  let estiloAtual;

  elementos.forEach(elemento => {
    estiloAtual = window.getComputedStyle(elemento, null).getPropertyValue('font-size');
    let tamanhoAtual = parseFloat(estiloAtual);

    if (tamanho === '+') {
      elemento.style.fontSize = (tamanhoAtual + 1) + "px";
    } else if (tamanho === '-') {
      elemento.style.fontSize = (tamanhoAtual - 1) + "px";
    }
  });
}

// Verifica se o autocontraste está ativo
function verificarAutocontraste() {
  const autocontrasteAtivo = document.body.classList.contains('alto-contraste');
  return autocontrasteAtivo;
}

// Salva o estado do autocontraste no localStorage
function salvarAutocontraste() {
  const autocontrasteAtivo = verificarAutocontraste();
  localStorage.setItem('autocontraste', autocontrasteAtivo);
}

// Carrega o estado do autocontraste do localStorage
function carregarAutocontraste() {
  const autocontrasteAtivo = localStorage.getItem('autocontraste');
  if (autocontrasteAtivo === 'true') {
    document.body.classList.add('alto-contraste');
  } else {
    document.body.classList.remove('alto-contraste');
  }
}

// Ativa o modo de alto contraste
function modoAltoContraste() {
  document.body.classList.toggle("alto-contraste");
  document.querySelectorAll("main, body, *").forEach(elemento => {
    elemento.classList.toggle("alto-contraste");
  });
  // Fecha o menu ao clicar no botão "Alto Contraste"
  fecharMenuAcessibilidade();
  salvarAutocontraste();
}

// Carrega o estado do autocontraste ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  carregarAutocontraste();
});


// Variável para controlar se a leitura já foi realizada
let leituraRealizada = false;

// Leitura em voz alta do conteúdo do site
function leituraTexto() {
  let texto = document.body.innerText;
  let speech = new SpeechSynthesisUtterance(texto);
  speech.lang = 'pt-BR';
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}