const Aluno = require("../database/aluno");
const Turma = require("../database/turma");

const {Router} = require("express");

const router = Router();

router.get("/alunos", async (req,res) =>{
    const alunos = await Aluno.findAll();
    res.json(alunos);
});

module.exports = router;
