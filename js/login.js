var senha = document.getElementById("senha");
var botaoMostrarSenha = document.querySelector(".alternar-senha");
var formulario = document.getElementById("formularioLogin");
var mensagem = document.getElementById("mensagem");
var usuario = document.getElementById("usuario");

botaoMostrarSenha.addEventListener("click", function () {
  var senhaEscondida = senha.type === "password";

  senha.type = senhaEscondida ? "text" : "password";
  botaoMostrarSenha.setAttribute(
    "aria-label",
    senhaEscondida ? "Ocultar senha" : "Mostrar senha"
  );
});

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  var loginSalvo = localStorage.getItem("login");
  var senhaSalva = localStorage.getItem("senha");
  var loginDigitado = usuario.value.trim();
  var senhaDigitada = senha.value;

  if (!loginSalvo || !senhaSalva) {
    mensagem.textContent = "Algo está incorreto ou nenhuma conta foi cadastrada.";
    return;
  }

  if (loginDigitado !== loginSalvo || senhaDigitada !== senhaSalva) {
    mensagem.textContent = "Algo está incorreto. Confira seu login e sua senha.";
    return;
  }

  mensagem.textContent = "Login realizado com sucesso.";
  window.location.href = "index.html";
});
