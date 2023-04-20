require("dotenv").config();


const express = require("express");
const { connection, authenticate } = require("./database/database");
const morgan = require("morgan");

// Configuração DB
authenticate(connection);

const swaggerUi = require("swagger-ui-express");

// Configuração do app
const app = express();
app.use(express.json());

const swaggerJson = require("./swagger.json");
const rotaAlunos = require("./routes/alunos");
const rotaTurmas = require("./routes/turmas");
const rotaProfessores = require("./routes/professores");

//Rotas
app.use(rotaAlunos);
app.use(rotaTurmas);
app.use(rotaProfessores);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));




app.listen(3000, () =>{
    connection.sync({force:true});

    console.log("Servidor rodando em http://localhost:3000.");
});