// Exibe ou oculta o menu ao clicar no botão
document.getElementById("acessibilidade-btn").addEventListener("click", function () {
  let menu = document.getElementById("acessibilidade-menu");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
});

// **NOVO CÓDIGO** - Adicionar evento de clique no documento para fechar o menu quando clicar fora dele
document.addEventListener('click', function(event) {
  let menuAcessibilidade = document.getElementById('acessibilidade-menu');
  let botaoAcessibilidade = document.getElementById('acessibilidade-btn');

  if (menuAcessibilidade.style.display === 'flex' && !menuAcessibilidade.contains(event.target) && event.target !== botaoAcessibilidade) {
    fecharMenuAcessibilidade();
  }
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

// Variável para controlar a leitura em voz alta
let leituraEmAndamento = false;
let speech = null;

// Variável para controlar a visibilidade do botão
let leitorRodando = false;

// Leitura em voz alta do conteúdo do site
function leituraTexto() {
  let texto = document.body.innerText;

  let elementosIgnorar = [
    "#acessibilidade-btn",
    ".cancelreading",
    "#acessibilidade-menu"
  ];
  elementosIgnorar.forEach(selector => {
    let elemento = document.querySelector(selector);
    if (elemento) {
      texto = texto.replace(elemento.innerText, '');
    }
  });

  let speech = new SpeechSynthesisUtterance(texto);
  speech.lang = 'pt-BR';
  speech.rate = 1;
  speech.onend = function () {
    // Permitir que o usuário interaja com a página novamente
    document.body.style.pointerEvents = 'none';
    cancelarLeitura()
  };
  window.speechSynthesis.speak(speech);
  // Bloquear a interação com a página enquanto a leitura está em andamento
  document.body.style.pointerEvents = 'none';
  fecharMenuAcessibilidade();
  leitorRodando = true;
  document.querySelector('.cancelreading').style.display = 'block';
}

// Função para cancelar a leitura em voz alta
function cancelarLeitura() {
  let botao = document.querySelector(".cancelreading");
  // Esconder suavemente o botão
  botao.style.opacity = "0";
  botao.style.visibility = "hidden";
  if (speech !== null) {
    window.speechSynthesis.cancel(speech);
    leituraEmAndamento = false;
    leitorRodando = false;
  }
  document.body.style.pointerEvents = 'all'; //adicionado para que o site fique disponivel para alteração novamente
}

document.addEventListener("DOMContentLoaded", function () {
  let botao = document.querySelector("#acessibilidade-btn");

  // Garante que o botão fique sempre visível e clicável
  botao.style.opacity = "1";
  botao.style.visibility = "visible";
  botao.style.display = "block";
  botao.style.zIndex = "1";
  botao.style.pointerEvents = "auto";

  // Se precisar, reatribui o evento de clique
  botao.onclick = function () {
    console.log("Botão de acessibilidade clicado!");
  };
});

document.addEventListener("DOMContentLoaded", function () {
  let botoesAcessibilidade = document.querySelectorAll("#acessibilidade-menu button");
  let botaoCancelarLeitura = document.querySelector(".cancelreading");

  botoesAcessibilidade.forEach(botao => {
    // Garante que os botões fiquem visíveis e clicáveis
    botao.style.opacity = "1";
    botao.style.visibility = "visible";
    botao.style.display = "inline-block";
    botao.style.zIndex = "1";
    botao.style.pointerEvents = "auto";

    // Reatribui o evento de clique conforme a função de cada botão
    if (botao.innerText === "A+") {
      botao.onclick = function () {
        alterarFonte('+');
        console.log("Aumentar fonte clicado!");
      };
    } else if (botao.innerText === "A-") {
      botao.onclick = function () {
        alterarFonte('-');
        console.log("Diminuir fonte clicado!");
      };
    } else if (botao.innerText === "Alto Contraste") {
      botao.onclick = function () {
        modoAltoContraste();
        console.log("Modo alto contraste ativado!");
      };
    } else if (botao.innerText === "Leitor de Texto") {
      botao.onclick = function () {
        leituraTexto();
        console.log("Leitor de texto ativado!");

        // Se o leitor estiver rodando, mostrar o botão "Cancelar Leitura"
        if (leitorRodando) {
          botaoCancelarLeitura.style.opacity = "1";
          botaoCancelarLeitura.style.visibility = "visible";
          botaoCancelarLeitura.style.display = "inline-block";
        }
      };
    }
  });

  // Caso o leitor esteja rodando ao abrir o menu, mostrar o botão de cancelar leitura
  if (leitorRodando) {
    botaoCancelarLeitura.style.opacity = "1";
    botaoCancelarLeitura.style.visibility = "visible";
    botaoCancelarLeitura.style.display = "inline-block";
  }
});
