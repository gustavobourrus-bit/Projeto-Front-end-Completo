var formulario = document.getElementById("formularioLogin");
var usuario = document.getElementById("usuario");
var senha = document.getElementById("senha");
var mensagem = document.getElementById("mensagem");
var botaoSenha = document.querySelector(".alternar-senha");

sessionStorage.removeItem("lb_sessao_ativa");

usuario.oninput = function () {
  usuario.value = usuario.value.replace(/[^A-Za-z0-9]/g, "").substring(0, 6);
};

if (botaoSenha) {
  botaoSenha.onclick = function () {
    if (senha.type == "password") {
      senha.type = "text";
      botaoSenha.setAttribute("aria-label", "Ocultar senha");
    } else {
      senha.type = "password";
      botaoSenha.setAttribute("aria-label", "Mostrar senha");
    }
  };
}

formulario.onsubmit = function (evento) {
  evento.preventDefault();

  var login = usuario.value.trim();
  var contaTexto = localStorage.getItem("lb_conta");
  var conta = null;

  if (contaTexto) {
    try {
      conta = JSON.parse(contaTexto);
    } catch (erro) {
      conta = null;
      localStorage.removeItem("lb_conta");
    }
  }

  if (login == "" || senha.value == "") {
    mensagem.textContent = "Preencha o login e a senha.";
    return;
  }

  if (!/^[A-Za-z0-9]{4,6}$/.test(login) || /^([A-Za-z0-9])\1+$/.test(login)) {
    mensagem.textContent = "Use um login real com 4 a 6 letras ou números.";
    return;
  }

  var loginMinusculo = login.toLowerCase();
  var ficticios = ["xxxxxx", "xxxxx", "xxxx", "teste", "abc", "abcd", "abcde", "abcdef", "1234", "12345", "123456"];
  if (ficticios.indexOf(loginMinusculo) >= 0) {
    mensagem.textContent = "Esse login não é válido.";
    return;
  }

  if (!conta || conta.login != login || conta.senha != senha.value) {
    mensagem.textContent = "Login ou senha incorretos.";
    return;
  }

  sessionStorage.setItem("lb_sessao_ativa", "1");
  sessionStorage.setItem("lb_usuario", conta.nome);
  window.location.href = "inicio.html";
};
