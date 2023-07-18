const Sequelize = require("sequelize");
const sequelize = new Sequelize("teste", "root", "Code like me098@", {
  host: "localhost",
  dialect: "mysql",
});

// Postagem
const Recado = sequelize.define("recados", {
  titulo: {
    type: Sequelize.STRING,
  },
  conteudo: {
    type: Sequelize.TEXT,
  },
});

// Recado.create({
//   titulo: "Mensagem de bom dia",
//   conteudo: "Bom dia! O sol já nasceu lá na fazendinha!",
// });

const Usuario = sequelize.define("usuarios", {
  nome: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.TEXT,
  },
  senha: {
    type: Sequelize.TEXT,
  },
});

// Usuario.create({
//   nome: "Lucas",
//   email: "lucas@teste.com",
//   senha: "teste",
// });

// Usuario.sync({ force: true });

// sequelize
//   .authenticate()
//   .then(function () {
//     console.log("conectado com sucesso");
//   })
//   .catch(function (erro) {
//     console.log("Falha ao se conectar: " + erro);
//   });
