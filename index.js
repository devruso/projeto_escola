require("dotenv").config();


const express = require("express");
const { connection, authenticate } = require("./database/database");
const morgan = require("morgan");

// Configuração DB
authenticate(connection);
const {Turma} = require("./database/turma")
const {Aluno} = require("./database/aluno")
const {Professor} = require("./database/professor");

// Configuração do app
const app = express();
app.use(express.json());

const rotaAlunos = require("./routes/alunos");

//Rotas
app.use(rotaAlunos);

app.listen(3000, () =>{
    connection.sync({force:true});

    console.log("Servidor rodando em http://localhost:3000.");
});