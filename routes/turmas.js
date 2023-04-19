const Aluno = require("../database/aluno");
const Turma = require("../database/turma");

const {Router} = require("express");

const router = Router();

router.get("/turmas", async (req, res) =>{
    const listaTurmas = await Turma.findAll();
    res.json(listaTurmas);
});

// Adicionar ProfessoreId
router.post("/turmas", async (req, res) =>{
    const {nome, ano} = req.body;

    try{
        const novaTurma = await Turma.create({nome, ano});
        res.json(novaTurma);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Algo errado ocorreu"});
    }
})

module.exports = router;