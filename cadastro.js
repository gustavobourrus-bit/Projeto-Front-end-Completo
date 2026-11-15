var formulario = document.getElementById("formularioCadastro");
var aviso = document.getElementById("aviso");
var tempoDoAviso;

function mostrarAviso(texto, tipo) {
  clearTimeout(tempoDoAviso);
  aviso.textContent = texto;
  aviso.className = "aviso visivel " + (tipo || "erro");

  tempoDoAviso = setTimeout(function () {
    aviso.className = "aviso";
  }, 4500);
}

function mostrarErro(idCampo, idErro, texto) {
  var campo = document.getElementById(idCampo);
  var erro = document.getElementById(idErro);

  campo.classList.toggle("invalido", texto !== "");
  erro.textContent = texto;

  return texto !== "";
}

function validarCampoObrigatorio(idCampo, idErro, mensagem) {
  var campo = document.getElementById(idCampo);

  if (campo.value.trim() === "") {
    return mostrarErro(idCampo, idErro, mensagem);
  }

  mostrarErro(idCampo, idErro, "");
  return false;
}

function validarFormulario() {
  var temErro = false;
  var nome = document.getElementById("nome").value.trim();
  var telefone = document.getElementById("telefone").value.trim();
  var login = document.getElementById("login").value.trim();
  var senha = document.getElementById("senha").value;
  var confirmarSenha = document.getElementById("confirmarSenha").value;

  if (validarCampoObrigatorio("nome", "erroNome", "Informe seu nome.")) temErro = true;
  if (validarCampoObrigatorio("dataNascimento", "erroDataNascimento", "Informe sua data de nascimento.")) temErro = true;
  if (validarCampoObrigatorio("cpf", "erroCpf", "Informe seu CPF.")) temErro = true;
  if (validarCampoObrigatorio("telefone", "erroTelefone", "Informe seu telefone celular.")) temErro = true;
  if (validarCampoObrigatorio("enderecoCompleto", "erroEnderecoCompleto", "Informe seu endereço completo.")) temErro = true;
  if (validarCampoObrigatorio("login", "erroLogin", "Informe seu login.")) temErro = true;
  if (validarCampoObrigatorio("senha", "erroSenha", "Informe sua senha.")) temErro = true;
  if (validarCampoObrigatorio("confirmarSenha", "erroConfirmarSenha", "Confirme sua senha.")) temErro = true;

  if (nome !== "" && !/^[A-Za-zÀ-ÿ ]+$/.test(nome)) {
    mostrarErro("nome", "erroNome", "Use somente letras no nome.");
    temErro = true;
  } else if (nome.length > 45) {
    mostrarErro("nome", "erroNome", "O nome deve ter no máximo 45 caracteres.");
    temErro = true;
  }

  if (telefone !== "" && !/^\d{11}$/.test(telefone)) {
    mostrarErro("telefone", "erroTelefone", "Informe 11 números, como 21999999999.");
    temErro = true;
  }

  if (login !== "" && !/^[A-Za-zÀ-ÿ0-9]{6}$/.test(login)) {
    mostrarErro("login", "erroLogin", "O login deve ter exatamente 6 caracteres.");
    temErro = true;
  }

  if (senha !== "" && !/^[A-Za-zÀ-ÿ0-9]{8}$/.test(senha)) {
    mostrarErro("senha", "erroSenha", "A senha deve ter exatamente 8 caracteres.");
    temErro = true;
  }

  if (confirmarSenha !== "" && senha !== confirmarSenha) {
    mostrarErro("confirmarSenha", "erroConfirmarSenha", "As senhas precisam ser iguais.");
    temErro = true;
  }

  return !temErro;
}

document.getElementById("cpf").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "").slice(0, 11);
});

document.getElementById("telefone").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "").slice(0, 11);
});

document.getElementById("login").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-zÀ-ÿ0-9]/g, "").slice(0, 6);
});

document.getElementById("senha").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-zÀ-ÿ0-9]/g, "").slice(0, 8);
});

document.getElementById("confirmarSenha").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-zÀ-ÿ0-9]/g, "").slice(0, 8);
});

var botoesDeSenha = document.querySelectorAll(".alternar-senha");

for (var i = 0; i < botoesDeSenha.length; i++) {
  botoesDeSenha[i].addEventListener("click", function () {
    var idCampo = this.getAttribute("data-alvo");
    var campo = document.getElementById(idCampo);
    var senhaEscondida = campo.type === "password";

    campo.type = senhaEscondida ? "text" : "password";
    this.setAttribute("aria-label", senhaEscondida ? "Ocultar senha" : "Mostrar senha");
  });
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (!validarFormulario()) {
    mostrarAviso("Revise os campos destacados antes de continuar.");
    return;
  }

  localStorage.setItem("login", document.getElementById("login").value.trim());
  localStorage.setItem("senha", document.getElementById("senha").value);
  mostrarAviso("Cadastro realizado com sucesso. Redirecionando para o login.", "sucesso");

  setTimeout(function () {
    window.location.href = "login.html";
  }, 1600);
});
