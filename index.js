"use strict";
import express from "express";
const usuarios = [
  {
    identificador: 0,
    nome: "Teste 1",
    email: "teste1@teste.com",
    senha: "teste1",
    recados: [
      {
        identificador: 1,
        titulo: "Alo",
        descricao: "Bom dia",
      },
    ],
  },
  {
    identificador: 1,
    nome: "Teste 2",
    email: "teste2@teste.com",
    senha: "teste2",
    recados: [],
  },
];
let contador = 2;

//A partir do login
var contadorRecados = 2;
var usuarioLogado;
var valido = false;

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.status(200);
  res.send("Bem vindo ao app!");
});

app.post("/cadastro", function (req, res) {
  let mesmoEmail = false;

  if (req.body.nome === "" || req.body.email === "" || req.body.senha === "") {
    res.status(400);
    res.send("Preencha corretamente os campos");
  }

  const novoUsuario = {
    identificador: contador,
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    recados: [],
  };

  for (const usuario of usuarios) {
    if (usuario.email === novoUsuario.email) {
      mesmoEmail = true;
    }
  }

  if (mesmoEmail) {
    res.status(400);
    res.send("Este email já esta cadastrado");
  } else {
    res.status(200);
    usuarios.push(novoUsuario);
    res.send("Usuario cadastrado com sucesso");
    contador++;
  }
});

app.get("/login", function (req, res) {
  const login = {
    email: req.body.email,
    senha: req.body.senha,
  };

  for (const usuario of usuarios) {
    if (usuario.email === login.email && usuario.senha === login.senha) {
      valido = true;
      usuarioLogado = usuario;
      contadorRecados = 0;
    }
  }

  if (valido) {
    res.status(200);
    res.send(
      "Login realizado com sucesso. Seja bem vindo " + usuarioLogado.nome
    );
  } else {
    res.status(400);
    res.send("Verifica os dados e tente novamente");
  }
});

app.get("/recados", function (req, res) {
  if (valido) {
    for (const usuario of usuarios) {
      if (usuario.email == usuarioLogado.email) {
        usuarioLogado = usuario;
        if (usuarioLogado.recados.length == 0) {
          res.status(400).send("Usuário ainda não tem registro de recados");
        } else {
          res.status(200).send(usuario.recados);
        }
      }
    }
  } else {
    res.status(400);
    res.send("É necessário fazer o login para exibir os recados");
  }
});

app.post("/recados", function (req, res) {
  if (valido) {
    if (req.body.titulo == "" || req.body.descricao == "") {
      res.status(400).send("Preencha os campos corretamente");
    } else {
      const recado = {
        id: contadorRecados,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
      };

      for (const usuario of usuarios) {
        if (usuario.email == usuarioLogado.email) {
          usuario.recados.push(recado);
          res.status(200).send("Recados registrado");
          contadorRecados++;
        }
      }
    }
  } else {
    res.status(400).send("É necessário fazer um login para criar recados");
  }
});

app.delete("/recados", function (req, res) {
  if (valido) {
    let id = req.body.id;

    for (const usuario of usuarios) {
      if (usuario.email == usuarioLogado.email) {
        usuario.recados.splice(id - 1, 1);
        console.log(usuario.recados);
      }
    }
    //TERMINAR DE EDITAR
    res.send("Recado deletado com sucesso");
  } else {
    res.status(400).send("É necessário fazer um login para deletar recado");
  }
});

app.put("/recados", function (req, res) {
  if (valido) {
    if (
      req.body.id == "" ||
      req.body.titulo == "" ||
      req.body.descricao == ""
    ) {
      res.status(400).send("Preencha os campos corretamente");
    }
    for (const usuario of usuarios) {
      if (usuario.email == usuarioLogado.email) {
        if (usuario.identificador == req.body.id - 1) {
          usuario.recados[req.body.id - 1].titulo = req.body.titulo;
          usuario.recados[req.body.id - 1].descricao = req.body.descricao;
        }
        usuarioLogado = usuario;
      }
    }
    res.status(200).send("Recado atualizado com sucesso");
  } else {
    res.status(400).send("É necessário fazer login para atualizar um recado");
  }
});

// app.get("/listar-recados", function (req, res) {
//   res.send("listar recados");
// });

app.listen(3000, function () {});
