var formulario = document.getElementById("formularioCadastro");
var aviso = document.getElementById("aviso");
var mensagem = document.getElementById("mensagem");

var botoesSenha = document.querySelectorAll(".alternar-senha");

for (var i = 0; i < botoesSenha.length; i++) {
  botoesSenha[i].onclick = function () {
    var idDoCampo = this.getAttribute("data-alvo");
    var campo = document.getElementById(idDoCampo);

    if (campo.type == "password") {
      campo.type = "text";
      this.setAttribute("aria-label", "Ocultar senha");
    } else {
      campo.type = "password";
      this.setAttribute("aria-label", "Mostrar senha");
    }
  };
}

function mostrarErro(idCampo, idErro, texto) {
  var campo = document.getElementById(idCampo);
  var erro = document.getElementById(idErro);

  if (texto != "") {
    campo.className = "invalido";
    campo.setAttribute("aria-invalid", "true");
  } else {
    campo.className = "";
    campo.setAttribute("aria-invalid", "false");
  }

  erro.textContent = texto;
  return texto == "";
}

function verificarCpf(cpf) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length != 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  var soma = 0;
  var resto;

  for (var i = 1; i <= 9; i++) {
    soma = soma + Number(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) {
    resto = 0;
  }
  if (resto != Number(cpf.substring(9, 10))) {
    return false;
  }

  soma = 0;

  for (var j = 1; j <= 10; j++) {
    soma = soma + Number(cpf.substring(j - 1, j)) * (12 - j);
  }

  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) {
    resto = 0;
  }

  return resto == Number(cpf.substring(10, 11));
}

function verificarEndereco(endereco) {
 endereco = endereco.trim();

 if (endereco.length < 5 || endereco.length > 150) {
   return false;
 }

 if (!/[A-Za-zÀ-ÿ]/.test(endereco)) {
   return false;
 }

 if (!/^[A-Za-zÀ-ÿ0-9\s,.º°\-\/]+$/.test(endereco)) {
   return false;
 }

 if (/^(.)\1+$/.test(endereco.replace(/\s/g, ""))) {
   return false;
 }

 return true;
}

function verificarLogin(login) {
 if (!/^[A-Za-z0-9]{4,6}$/.test(login)) {
   return false;
 }

 if (/^([A-Za-z0-9])\1+$/.test(login)) {
   return false;
 }

 var loginMinusculo = login.toLowerCase();
 var ficticios = ["xxxxxx", "xxxxx", "xxxx", "teste", "abc", "abcd", "abcde", "abcdef", "1234", "12345", "123456"];

 return ficticios.indexOf(loginMinusculo) == -1;
}

function verificarSenha(senha, nome, login) {
  if (senha.length < 4 || senha.length > 8) {
    return false;
  }

  if (!/[A-Z]/.test(senha)) {
    return false;
  }

  if (!/[a-z]/.test(senha)) {
    return false;
  }

  if (!/[0-9]/.test(senha)) {
    return false;
  }

  if (!/[!@#$%^&*._-]/.test(senha)) {
    return false;
  }

  if (/^([A-Za-z0-9!@#$%^&*._-])\1+$/.test(senha)) {
    return false;
  }

  var sequencias = ["1234", "2345", "3456", "4567", "5678", "6789", "abcd", "bcde", "cdef", "qwer", "asdf"];
  var senhaMinuscula = senha.toLowerCase();

  for (var i = 0; i < sequencias.length; i++) {
    if (senhaMinuscula.indexOf(sequencias[i]) >= 0) {
      return false;
    }
  }

  return /^[A-Za-z0-9!@#$%^&*._-]+$/.test(senha);
}

function verificarTelefone(telefone) {
  telefone = telefone.replace(/\D/g, "");

  if (telefone.length != 11) {
    return false;
  }

  var ddd = Number(telefone.substring(0, 2));
  var primeiroDigito = telefone.substring(2, 3);
  var dddsValidos = [
    "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "21", "22", "24", "27", "28",
    "31", "32", "33", "34", "35", "37", "38",
    "41", "42", "43", "44", "45", "46", "47", "48", "49",
    "51", "53", "54", "55",
    "61", "62", "63", "64", "65", "66", "67", "68", "69",
    "71", "73", "74", "75", "77", "79",
    "81", "82", "83", "84", "85", "86", "87", "88", "89",
    "91", "92", "93", "94", "95", "96", "97", "98", "99"
  ];
  var dddTexto = telefone.substring(0, 2);

  if (dddsValidos.indexOf(dddTexto) == -1) {
    return false;
  }

  if (primeiroDigito != "9") {
    return false;
  }

  if (/^(\d)\1+$/.test(telefone)) {
    return false;
  }

  return ddd >= 11 && ddd <= 99;
}

function verificarData(data) {
  var partes = data.split("/");

  if (partes.length != 3) {
    return "Use o formato DD/MM/AAAA.";
  }

  var dia = Number(partes[0]);
  var mes = Number(partes[1]);
  var ano = Number(partes[2]);
  var hoje = new Date();
  var anoAtual = hoje.getFullYear();
  var anoMinimo = anoAtual - 120;

  if (dia < 1 || dia > 31 || mes < 1 || mes > 12 ||
      ano < anoMinimo || ano > anoAtual) {
    return "Informe uma data válida e compatível.";
  }

  if (mes == 2) {
    var anoBissexto = (ano % 4 == 0 && ano % 100 != 0) || (ano % 400 == 0);
    var diasDoMes = anoBissexto ? 29 : 28;
    if (dia > diasDoMes) {
      return "Esse dia não existe neste mês.";
    }
  }

  if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia > 30) {
    return "Esse dia não existe neste mês.";
  }

  var nascimento = new Date(ano, mes - 1, dia);

  if (nascimento > hoje) {
    return "A data não pode ser futura.";
  }

  var idade = hoje.getFullYear() - ano;
  if (hoje.getMonth() + 1 < mes ||
      (hoje.getMonth() + 1 == mes && hoje.getDate() < dia)) {
    idade = idade - 1;
  }

  if (idade < 12) {
    return "É necessário ter pelo menos 12 anos.";
  }

  if (idade > 120) {
    return "A idade não pode ultrapassar 120 anos.";
  }

  return "";
}

var campoData = document.getElementById("dataNascimento");
var campoCpf = document.getElementById("cpf");
var campoTelefone = document.getElementById("telefone");
var campoEndereco = document.getElementById("enderecoCompleto");
var campoLogin = document.getElementById("login");

campoCpf.oninput = function () {
  campoCpf.value = campoCpf.value.replace(/\D/g, "");
};

campoTelefone.oninput = function () {
  campoTelefone.value = campoTelefone.value.replace(/\D/g, "");
};

campoEndereco.oninput = function () {
  campoEndereco.value = campoEndereco.value.replace(/[^A-Za-zÀ-ÿ0-9\s,.º°\-\/]/g, "");
};

campoLogin.oninput = function () {
  campoLogin.value = campoLogin.value.replace(/[^A-Za-z0-9]/g, "").substring(0, 6);
};

campoData.oninput = function () {
  var numeros = campoData.value.replace(/\D/g, "");

  if (numeros.length > 8) {
    numeros = numeros.substring(0, 8);
  }

  if (numeros.length > 4) {
    campoData.value = numeros.substring(0, 2) + "/" +
      numeros.substring(2, 4) + "/" +
      numeros.substring(4);
  } else if (numeros.length > 2) {
    campoData.value = numeros.substring(0, 2) + "/" +
      numeros.substring(2);
  } else {
    campoData.value = numeros;
  }

  if (campoData.value.length == 10) {
    var erroData = verificarData(campoData.value);
    mostrarErro("dataNascimento", "erroDataNascimento", erroData);
  } else {
    campoData.className = "";
    campoData.setAttribute("aria-invalid", "false");
    document.getElementById("erroDataNascimento").textContent = "";
  }
};

formulario.onsubmit = function (evento) {
  evento.preventDefault();

  var nome = document.getElementById("nome").value.trim();
  var dataNascimento = document.getElementById("dataNascimento").value.trim();
  var cpf = document.getElementById("cpf").value.trim();
  var telefone = document.getElementById("telefone").value.trim();
  var endereco = document.getElementById("enderecoCompleto").value.trim();
  var login = document.getElementById("login").value.trim();
  var senha = document.getElementById("senha").value;
  var confirmarSenha = document.getElementById("confirmarSenha").value;

  var nomeOk = mostrarErro("nome", "erroNome", nome.length >= 3 ? "" : "Informe seu nome completo.");
  var erroData = verificarData(dataNascimento);
  var dataOk = mostrarErro("dataNascimento", "erroDataNascimento", erroData);
  var cpfOk = mostrarErro("cpf", "erroCpf", verificarCpf(cpf) ? "" : "Informe um CPF válido.");
  var telefoneOk = mostrarErro("telefone", "erroTelefone", verificarTelefone(telefone) ? "" : "Informe um celular válido com DDD.");
  var enderecoOk = mostrarErro("enderecoCompleto", "erroEnderecoCompleto", verificarEndereco(endereco) ? "" : "Informe uma rua e o número, caso exista.");
  var loginOk = mostrarErro("login", "erroLogin", verificarLogin(login) ? "" : "Use um login real com 4 a 6 letras ou números.");
  var senhaOk = mostrarErro("senha", "erroSenha", verificarSenha(senha, nome, login) ? "" : "Use 4 a 8 caracteres com maiúscula, minúscula, número e símbolo.");
  var confirmarOk = mostrarErro("confirmarSenha", "erroConfirmarSenha", confirmarSenha == senha ? "" : "As senhas não coincidem.");

  if (!nomeOk || !dataOk || !cpfOk || !telefoneOk || !enderecoOk ||
      !loginOk || !senhaOk || !confirmarOk) {
    mensagem.textContent = "Revise os campos destacados.";
    return;
  }

  var conta = {
    nome: nome,
    login: login,
    senha: senha
  };

  localStorage.setItem("lb_conta", JSON.stringify(conta));

  aviso.textContent = "Conta criada com sucesso.";
  aviso.className = "aviso visivel sucesso";

  setTimeout(function () {
    window.location.href = "index.html";
  }, 700);
};
