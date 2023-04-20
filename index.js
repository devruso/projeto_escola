require("dotenv").config();


const express = require("express");
const { connection, authenticate } = require("./database/database");
const morgan = require("morgan");

// Configuração DB
authenticate(connection);

const swaggerJsdoc = require("swagger-jsdoc"),swaggerUi = require("swagger-ui-express");
const options = require("./swagger.json");

// Configuração do app
const app = express();
app.use(express.json());

const especificacoes = swaggerJsdoc(options);

const rotaAlunos = require("./routes/alunos");
const rotaTurmas = require("./routes/turmas");
const rotaProfessores = require("./routes/professores");

//Rotas
app.use(rotaAlunos);
app.use(rotaTurmas);
app.use(rotaProfessores);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(especificacoes));




app.listen(3000, () =>{
    connection.sync({force:true});

    console.log("Servidor rodando em http://localhost:3000.");
});