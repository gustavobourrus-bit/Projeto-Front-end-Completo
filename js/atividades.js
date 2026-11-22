var botaoMenu = document.querySelector(".menu-botao");
var menu = document.getElementById("menu-principal");

if (botaoMenu && menu) {
  botaoMenu.onclick = function () {
    menu.classList.toggle("aberto");

    if (menu.className.indexOf("aberto") >= 0) {
      botaoMenu.setAttribute("aria-expanded", "true");
      botaoMenu.setAttribute("aria-label", "Fechar menu");
    } else {
      botaoMenu.setAttribute("aria-expanded", "false");
      botaoMenu.setAttribute("aria-label", "Abrir menu");
    }
  };

  var linksMenu = menu.querySelectorAll("a");

  for (var i = 0; i < linksMenu.length; i++) {
    linksMenu[i].onclick = function () {
      menu.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
    };
  }

  document.onkeydown = function (evento) {
    if (evento.key == "Escape") {
      menu.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
      botaoMenu.setAttribute("aria-label", "Abrir menu");
    }
  };
}

var secao = document.querySelector('[aria-labelledby="ideias-titulo"]');
var cartoes = secao.querySelectorAll(".cartao");
var botoes = secao.querySelectorAll(".filtros button");
var busca = secao.querySelector(".busca");
var contagem = secao.querySelector(".contagem");
var temaAtual = "Todas";

function normalizar(texto) {
  texto = texto.toLowerCase();
  texto = texto.replace(/[áàâãä]/g, "a");
  texto = texto.replace(/[éèêë]/g, "e");
  texto = texto.replace(/[íìîï]/g, "i");
  texto = texto.replace(/[óòôõö]/g, "o");
  texto = texto.replace(/[úùûü]/g, "u");
  texto = texto.replace(/[ç]/g, "c");
  return texto;
}

function atualizarAtividades() {
  var textoBusca = normalizar(busca.value);
  var quantidade = 0;

  for (var i = 0; i < cartoes.length; i++) {
    var etiqueta = cartoes[i].querySelector(".etiqueta").textContent;
    var textoCartao = normalizar(cartoes[i].textContent);
    var temaCorreto = temaAtual == "Todas" || etiqueta == temaAtual;
    var buscaCorreta = textoBusca == "" || textoCartao.indexOf(textoBusca) >= 0;

    if (temaCorreto && buscaCorreta) {
      cartoes[i].hidden = false;
      quantidade = quantidade + 1;
    } else {
      cartoes[i].hidden = true;
    }
  }

  if (quantidade == 0) {
    contagem.textContent = "Nenhuma atividade encontrada";
  } else if (quantidade == 1) {
    contagem.textContent = "1 atividade";
  } else {
    contagem.textContent = quantidade + " atividades";
  }
}

for (var i = 0; i < botoes.length; i++) {
  botoes[i].onclick = function () {
    temaAtual = this.textContent;

    for (var j = 0; j < botoes.length; j++) {
      botoes[j].setAttribute("aria-pressed", "false");
    }

    this.setAttribute("aria-pressed", "true");
    atualizarAtividades();
  };
}

busca.oninput = atualizarAtividades;
