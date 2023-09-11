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
    id: 1,
    nome: "Beltrano",
    titulo: "Reunião de equipe",
    descricao: "Lembre-se da reunião de equipe às 10h amanhã.",
  },
  {
    id: 2,
    nome: "Ciclano",
    titulo: "Aniversário",
    descricao:
      "Hoje é o aniversário do nosso colega João. Não se esqueça de desejar a ele um feliz aniversário!",
  },
  {
    id: 3,
    nome: "Maria",
    titulo: "Tarefa importante",
    descricao:
      "Por favor, lembre-se de concluir a tarefa importante até o final do dia.",
  },
  {
    id: 4,
    nome: "João",
    titulo: "Lembrete de pagamento",
    descricao: "Não se esqueça de pagar a conta de luz até o dia 20 deste mês.",
  },
  {
    id: 5,
    nome: "Ana",
    titulo: "Novo projeto",
    descricao:
      "Vamos começar um novo projeto na próxima semana. Prepare-se para a reunião de planejamento.",
  },
  {
    id: 6,
    nome: "Pedro",
    titulo: "Ideias para o evento",
    descricao:
      "Por favor, compartilhe suas ideias para o próximo evento da empresa na nossa plataforma de colaboração.",
  },
  {
    id: 7,
    nome: "Luiza",
    titulo: "Atualização do sistema",
    descricao:
      "Haverá uma atualização do sistema no próximo domingo às 23h. Certifique-se de salvar seu trabalho.",
  },
  {
    id: 8,
    nome: "Lucas",
    titulo: "Sugestões de melhorias",
    descricao:
      "Estamos abertos a sugestões de melhorias para o escritório. Envie suas ideias para a equipe de gerenciamento.",
  },
  {
    id: 9,
    nome: "Mariana",
    titulo: "Aviso de ausência",
    descricao:
      "Estarei ausente durante esta semana devido a compromissos pessoais. Entre em contato com o João em caso de urgência.",
  },
  // 11 novos recados adicionados
  {
    id: 10,
    nome: "Carlos",
    titulo: "Reunião de departamento",
    descricao:
      "Haverá uma reunião do departamento de vendas na sexta-feira às 14h.",
  },
  {
    id: 11,
    nome: "Isabela",
    titulo: "Atualização de software",
    descricao:
      "Uma nova versão do software estará disponível para download a partir de hoje.",
  },
  {
    id: 12,
    nome: "Rafael",
    titulo: "Feedback do cliente",
    descricao:
      "Recebemos um feedback positivo de um cliente satisfeito. Ótimo trabalho, equipe!",
  },
  {
    id: 13,
    nome: "Sofia",
    titulo: "Feriado",
    descricao:
      "Lembre-se de que segunda-feira é feriado. Aproveite seu dia de folga!",
  },
  {
    id: 14,
    nome: "Eduardo",
    titulo: "Apresentação de vendas",
    descricao:
      "Preparação para a próxima apresentação de vendas na conferência.",
  },
  {
    id: 15,
    nome: "Patrícia",
    titulo: "Mudança de horário",
    descricao:
      "A partir da próxima semana, nosso horário de expediente será das 9h às 18h.",
  },
  {
    id: 16,
    nome: "Anderson",
    titulo: "Anúncio importante",
    descricao:
      "Fique atento para um anúncio importante que será feito pela diretoria em breve.",
  },
  {
    id: 17,
    nome: "Larissa",
    titulo: "Atualização de política",
    descricao:
      "Houve uma atualização na política de uso de dispositivos móveis da empresa. Leia atentamente.",
  },
  {
    id: 18,
    nome: "Renato",
    titulo: "Lembrete de treinamento",
    descricao:
      "O treinamento obrigatório será realizado na quarta-feira. Certifique-se de participar.",
  },
  {
    id: 19,
    nome: "Camila",
    titulo: "Projeto de sustentabilidade",
    descricao:
      "Participe do projeto de sustentabilidade da empresa. Juntos, podemos fazer a diferença.",
  },
  {
    id: 20,
    nome: "Gustavo",
    titulo: "Aniversário do chefe",
    descricao:
      "Hoje é o aniversário do nosso chefe. Não se esqueça de dar os parabéns!",
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
