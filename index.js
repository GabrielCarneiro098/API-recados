"use strict";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const usuarios = [
  {
    identificador: 0,
    nome: "Gabriel",
    email: "teste@teste",
    senha: "teste",
  },
];

const recados = [
  {
    id: 0,
    nome: "Beltrano",
    titulo: "Reunião de equipe",
    descricao: "Lembre-se da reunião de equipe às 10h amanhã.",
  },
  {
    id: 1,
    nome: "Ciclano",
    titulo: "Aniversário",
    descricao:
      "Hoje é o aniversário do nosso colega João. Não se esqueça de desejar a ele um feliz aniversário!",
  },
];

const usuarioLogado = { identificador: "", nome: "" };

function numerarRecados() {
  var numerador = 0;

  recados.forEach((recado) => {
    recado.id = numerador;
    numerador++;
  });
}

app.get("/", function (req, res) {
  res.status(200).send(`Bem vindo a API de recados do Gabriel!`);
});

app.get("/recados", function (req, res) {
  numerarRecados();
  /** QUANTIDADE DE ITEMS POR PAGINA */
  const itemsPorPagina = 4;
  /** PAGINA QUE QUERO RETORNAR */
  const pagina = req.query.page || 1;

  const indiceInicial = (pagina - 1) * itemsPorPagina;
  const indiceFinal = pagina * itemsPorPagina - 1;

  /** LISTA SOMENTE COM OS ITEMS DAQUELA PAGINA */
  const filtro = recados.slice(indiceInicial, indiceFinal + 1);

  res.json(filtro);
});

app.get("/usuarios", function (req, res) {
  const usuariosParaExibir = [];

  usuarios.forEach((usuario) => {
    const usuarioSeguro = {
      identificador: usuario.identificador,
      nome: usuario.nome,
    };

    usuariosParaExibir.push(usuarioSeguro);
  });

  res.json(usuariosParaExibir);
});

app.post("/register", function (req, res) {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;

  const novoUsuario = {
    identificador: usuarios.length,
    nome: nome,
    email: email,
    senha: senha,
  };

  const verificarMesmoEmail = usuarios.some(
    (usuario) => usuario.email === novoUsuario.email
  );

  if (verificarMesmoEmail) {
    res.status(400).send("Este email já está em uso. Tente outro.");
  } else {
    usuarios.push(novoUsuario);
    res.status(200).send("Usuário registrado com sucesso");
  }
});

app.get("/login", function (req, res) {
  const email = req.body.email;
  const senha = req.body.senha;

  const login = { email: email, senha: senha };

  const validarUsuario = usuarios.some(
    (usuario) => usuario.email === login.email && usuario.senha === login.senha
  );

  if (validarUsuario) {
    usuarios.forEach((usuario) => {
      if (usuario.email === email && usuario.senha === senha) {
        usuarioLogado.identificador = usuario.identificador;
        usuarioLogado.nome = usuario.nome;
      }
    });

    res.json(usuarioLogado);
  } else {
    res
      .status(400)
      .send("Email ou senha incorretos. Porfavor tente novamente.");
  }
});

app.post("/recados", function (req, res) {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;

  const novoRecado = {
    id: 0,
    nome: usuarioLogado.nome,
    titulo: titulo,
    descricao: descricao,
  };

  recados.push(novoRecado);

  numerarRecados();

  res.json(recados);
});

app.put("/recados", function (req, res) {
  const id = req.body.id;
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;

  const acharRecado = recados.some((recado) => recado.id === id);

  if (acharRecado) {
    recados[id].titulo = titulo;
    recados[id].descricao = descricao;

    numerarRecados();

    res.json(recados);
  } else {
    res.status(400).send("Nenhum recado selecionado.");
  }
});

app.delete("/recados", function (req, res) {
  const id = req.body.id;

  const acharRecado = recados.some((recado) => recado.id == id);

  if (acharRecado) {
    recados.splice(id, 1);

    numerarRecados();

    res.json(recados);
  } else {
    res.status(400).send("Nenhum recado selecionado");
  }
});

app.listen(3000, function () {
  console.log("Aplicação rodando: http://localhost:3000/");
});
