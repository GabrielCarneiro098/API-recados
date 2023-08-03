"use strict";
import express from "express";
import cors from "cors";
const usuarios = [];
var contador = 0;
var usuarioLogado;
var valido = false;

function numerarRecados() {
  for (const usuario of usuarios) {
    for (let i = 0; i < usuario.recados.length; i++) {
      usuario.recados[i].id = i;
    }
  }
}

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.status(200).send(`Bem vindo ao app!`);
});

app.post("/cadastro", function (req, res) {
  let mesmoEmail = false;

  const novoUsuario = {
    identificador: contador,
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    recados: [],
  };

  if (req.body.nome === "" || req.body.email === "" || req.body.senha === "") {
    res.status(400);
    res.send("Preencha corretamente os campos");
  } else {
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
      contador++;
      res.send("Usuario cadastrado com sucesso");
    }
  }
});

app.post("/login", function (req, res) {
  if (req.body.email == undefined || req.body.senha == undefined) {
    res.status(400).send("Preencha os campos corretamente.");
  }

  const login = {
    email: req.body.email,
    senha: req.body.senha,
  };

  for (const usuario of usuarios) {
    if (login.email == usuario.email && login.senha == usuario.senha) {
      usuarioLogado = usuario;
      valido = true;
    }
  }

  if (valido) {
    res
      .status(200)
      .send(`Login realizado com sucesso! Bem vindo ${usuarioLogado.nome}`);
  } else {
    res.status(400).send("Verifique os dados e tente novamente.");
  }
});

app.get("/recados", function (req, res) {
  if (valido) {
    for (const usuario of usuarios) {
      numerarRecados();
      if (usuario.email == usuarioLogado.email) {
        if (usuarioLogado.recados.length == 0) {
          res.status(400).send("Usuário ainda não tem registro de recados");
        } else {
          usuarioLogado = usuario;
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
      for (const usuario of usuarios) {
        if (usuario.email == usuarioLogado.email) {
          const recado = {
            id: 0,
            titulo: req.body.titulo,
            descricao: req.body.descricao,
          };
          usuario.recados.push(recado);
          numerarRecados();
          usuarioLogado = usuario;
          res.status(200).send("Recados registrado");
        }
      }
    }
  } else {
    res.status(400).send("É necessário fazer um login para criar recados");
  }
});

app.put("/recados", function (req, res) {
  if (valido) {
    var idAtualizar = req.body.id;
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    if (
      idAtualizar == "" ||
      titulo == "" ||
      descricao == "" ||
      idAtualizar == undefined ||
      titulo == undefined ||
      descricao == undefined
    ) {
      res.status(400).send("Preencha os campos corretamente");
    }

    for (const usuario of usuarios) {
      if (usuario.email == usuarioLogado.email) {
        if (usuario.recados.length == 0) {
          res.status(400).send("Usuário não possui recados registrados");
        } else {
          const recadoUpdate = usuario.recados.filter(
            (recado) => recado.id == idAtualizar
          );

          if (recadoUpdate.length == 0) {
            res
              .status(400)
              .send(
                "Não existe nenhum recado registrado com esse ID. Porfavor digite um ID válido."
              );
          } else {
            recadoUpdate.titulo = titulo;
            recadoUpdate.descricao = descricao;

            usuario.recados[idAtualizar].titulo = recadoUpdate.titulo;
            usuario.recados[idAtualizar].descricao = recadoUpdate.descricao;

            numerarRecados();
            usuarioLogado = usuario;
            res.status(200).send("Recado atualizado com sucesso.");
          }
        }
      }
    }
  } else {
    res.status(400).send("É necessário fazer login para atualizar um recado");
  }
});

//CORRIGIR ROTA RECADOS DELETE
app.delete("/recados", function (req, res) {
  if (valido) {
    const idRemover = req.body.id;
    var idInvalido;

    if (idRemover == "" || idRemover == undefined) {
      res.status(400).send("Preencha os campos corretamente.");
    } else {
      for (const usuario of usuarios) {
        if (usuario.email == usuarioLogado.email) {
          const recadosAtualizados = usuario.recados.filter(
            (recado) => recado.id != idRemover
          );
          const recadoApagado = usuario.recados.filter(
            (recado) => recado.id == idRemover
          );
          usuario.recados = recadosAtualizados;
          numerarRecados();
          usuarioLogado = usuario;

          if (usuario.recados.length == 0 && recadoApagado == 0) {
            res.status(400).send("Usuário não possui recados para deletar");
          } else if (recadoApagado.length == 0) {
            res
              .status(400)
              .send(
                "Não existe nenhum recado registrado com esse ID. Porfavor digite um ID válido."
              );
          } else {
            res
              .status(200)
              .send(
                `Recado "${recadoApagado[0].titulo}" foi deletado com sucesso`
              );
          }
        }
      }
    }
  } else {
    res.status(400).send("É necessário fazer um login para deletar recado");
  }
});

app.listen(3000, function () {
  console.log("Aplicação rodando: http://localhost:3000/");
});
