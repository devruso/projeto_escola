const {Turma} = require("./database/turma")
const {Aluno} = require("./database/aluno")
const {Professor} = require("./database/professor");
const express = require("express");
const { connection, authenticate } = require("./database/database");
const morgan = require("morgan");
require("dotenv").config();
// Configuração DB
authenticate(connection);

// Configuração do app
const app = express();
app.use(express.json());



//Rotas


app.listen(3000, () =>{
    connection.sync({force:true});

    console.log("Servidor rodando em http://localhost:3000.");
});