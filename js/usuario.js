var nomeUsuario = sessionStorage.getItem("lb_usuario");
var usuarioMenu = document.getElementById("usuarioMenu");
var nomeUsuarioNaPagina = document.getElementById("nomeUsuario");
var sairMenu = document.getElementById("sairMenu");
var linkEntrar = document.getElementById("linkEntrar");
var linkCriarConta = document.getElementById("linkCriarConta");

if (!nomeUsuario) {
  var contaTexto = localStorage.getItem("lb_conta");

  if (contaTexto) {
    try {
      var conta = JSON.parse(contaTexto);
      nomeUsuario = conta.nome;
    } catch (erro) {
      nomeUsuario = null;
      localStorage.removeItem("lb_conta");
    }
  }
}

if (nomeUsuario && usuarioMenu) {
  nomeUsuarioNaPagina.textContent = nomeUsuario;
  usuarioMenu.hidden = false;

  if (sairMenu) {
    sairMenu.hidden = false;
  }

  if (linkEntrar) {
    linkEntrar.hidden = true;
  }

  if (linkCriarConta) {
    linkCriarConta.hidden = true;
  }
}
