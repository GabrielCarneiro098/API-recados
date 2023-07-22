API CRUD de recados

ROTAS:

"/" método GET - Exibe todos os usúarios cadastros e seus recados

"/cadastro" método POST - Cria um usuário através do body

Exemplo:{
"nome": "Fulano,
"email": "fulano@email.com,
"senha": "fulano123"
}

"/login" método GET - Login na conta registrada através da requisicao body

Exemplo:{
"email": "fulano@email.com",
"senha": "fulano123"
}

"/recados" método GET - Exibe todos os recados que o úsuario logado tem

"/recados" método POST - Registra um novo recado através da requisição body

Exemplo:{
"titulo": "Titulo do recado",
"descricao": "Corpo do recado
}

"/recados" método PUT - Atualiza um recado a partir do ID através da requisição body

Exemplo:{
"id": 3, (o número da mensagem que você deseja alterar)
"titulo": "Titulo novo",
"descricao: "Novo corpo do recado"
}

"/recados" método DELETE - Deleta um recado a partir do ID selecionado através da requisicao body
Exemplo:{
"id": 2 (número do recado que deseja apagar)
}
