# Projeto Front-end

Este é um projeto de faculdade desenvolvido como parte de uma atividade acadêmica.

O projeto completo ainda está em desenvolvimento. Esta versão representa apenas
uma parte do sistema: as telas de login e cadastro de usuários de um consultório
fonoaudiológico.

## Funcionalidades

- Tela de login;
- Tela de cadastro;
- Validação dos campos com JavaScript;
- Mensagens de erro para dados inválidos;
- Armazenamento do login e da senha no `localStorage` do navegador;
- Autenticação simples entre as telas de cadastro e login;
- Redirecionamento após o login correto.

## Tecnologias utilizadas

- HTML;
- CSS;
- JavaScript.

## Organização do projeto

```text
.
├── cadastro.html
├── login.html
├── css/
│   ├── cadastro.css
│   └── login.css
├── js/
│   ├── cadastro.js
│   └── login.js
└── img/
    └── consultorio.jpg
```

## Observação

A autenticação foi criada apenas para fins de estudo. Os dados são armazenados
no `localStorage` e, por isso, esta solução não deve ser utilizada em um sistema
real com informações sensíveis.
