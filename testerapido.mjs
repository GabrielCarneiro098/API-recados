"use strict";

import express from "express";

const app = express();
app.use(express.json());

const usuarios = [
  {
    identificador: 0,
    nome: "Teste 1",
    email: "teste1@teste.com",
    senha: "teste1",
    recado: [],
  },
  {
    identificador: 1,
    nome: "Teste 2",
    email: "teste2@teste.com",
    senha: "teste2",
    recado: [],
  },
];
let contador = 2;

let identificadorUnico = 0;

const recados = [];
let identificadorRecado = 0;

app.post("/usuarios", function (requisicao, resposta) {
  let bodyInvalido =
    !requisicao.body.nome || !requisicao.body.senha || !requisicao.body.email;

  const existeEmail = usuarios.some(function (usuario) {
    return usuario.email === requisicao.body.email;
  });

  if (bodyInvalido) {
    resposta.status(400);
    resposta.send("Email inválido");
  } else if (existeEmail) {
    resposta.status(400);
    resposta.send("Email já cadastrado");
  } else {
    const novoUsuario = {
      nome: requisicao.body.nome,
      senha: requisicao.body.senha,
      email: requisicao.body.email,
    };
    novoUsuario.identificador = identificadorUnico;
    identificadorUnico++;
    usuarios.push(novoUsuario);
    resposta.send("Usuário criado com sucesso!");
  }
});

app.post("/usuarios/login", function (requisicao, resposta) {
  const email = requisicao.query.email;
  const senha = requisicao.query.senha;

  const usuarioEncontrado = usuarios.find(function (usuario) {
    return usuario.email === email && usuario.senha === senha;
  });
  if (usuarioEncontrado) {
    resposta.json({
      mensagem: "Usuário logado com sucesso!",
      usuario: usuarioEncontrado,
    });
  } else {
    resposta.status(401);
    resposta.send("Email ou senha inválidos");
  }
});

//CRUD

app.post("/recados", function (requisicao, resposta) {
  const bodyInvalido = !requisicao.body.titulo || !requisicao.body.descricao;
  if (bodyInvalido) {
    resposta.status(400);
    resposta.send("Dados inválidos");
  } else {
    const novoRecado = {
      titulo: requisicao.body.titulo,
      descricao: requisicao.body.descricao,
    };
    novoRecado.identificador = identificadorRecado;
    identificadorRecado++;
    recados.push(novoRecado);
    resposta.json({
      mensagem: "Recado criado com sucesso!",
      recado: novoRecado,
    });
  }
});

app.get("/recados", function (requisicao, resposta) {
  resposta.json({
    quantidade: recados.length,
    recados: recados,
  });
});

app.get("/recados/:id", function (requisicao, resposta) {
  const id = parseInt(requisicao.params.id);
  const recadoEncontrado = recados.find(function (recado) {
    return recado.identificador === id;
  });
});
if (recadoEncontrado) {
  resposta.json({
    mensagem: "Recado encontrado",
    recado: recadoEncontrado,
  });
} else {
  resposta.status(404);
  resposta.send("Recado não encontrado");
}

app.put("/recados/:id", function (requisicao, resposta) {
  const bodyInvalido = !requisicao.body.titulo || !requisicao.body.descricao;
  const id = parseInt(requisicao.params.id);
  const recadoEncontrado = recados.find(function (recado) {
    return recado.identificador === id;
  });
  if (bodyInvalido) {
    resposta.status(400);
    resposta.send("Dados inválidos");
  } else if (!recadoEncontrado) {
    resposta.status(404);
    resposta.send("Recado não encontrado");
  } else {
    recadoEncontrado.titulo = requisicao.body.titulo;
    recadoEncontrado.descricao = requisicao.body.descricao;
    resposta.json({
      mensagem: "Recado atualizado com sucesso",
      recado: recadoEncontrado,
    });
  }
});

app.delete("/recados/:id", function (requisicao, resposta) {
  const id = parseInt(requisicao.params.id);
  const indice = recados.findIndex(function (recado) {
    return recado.identificador === id;
  });
  if (indice === -1) {
    resposta.status(404);
    resposta.send("Recado não encontrado");
  } else {
    recados.splice(indice, 1);
    resposta.json({
      mensagem: "Recado removido com sucesso",
    });
  }
});

app.listen(3000, function () {
  console.log("servidor rodando na porta 3000: url http://localhost:3000");
});
