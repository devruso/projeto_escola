const Aluno = require("../database/aluno");
const Turma = require("../database/turma");

const {Router} = require("express");

const router = Router();

router.get("/turmas", async (req, res) =>{
    const listaTurmas = await Turma.findAll();
    res.json(listaTurmas);
});

router.get("/turmas/:id", async (req, res) =>{
    const {id} = req.params;
    const findTurma = await Turma.findOne({where:{id}});
    if(findTurma){
        res.json(findTurma);
    }else{
        res.status(404).json({message:"Turma não encontrada"});
    }
})

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

router.put("/turmas/:id", async (req,res) =>{
    const {id} = req.params;
    const {nome, ano} = req.body;
    try{
        const findTurma = Turma.findByPk(id);
        if(findTurma){
            await findTurma.update({nome, ano});
            res.json({message:"Turma atualizada com sucesso"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Um erro inesperado ocorreu"});
    }
})

router.delete("/turmas/:id", async (req, res) =>{
    const findTurma = await Turma.findByPk(req.params.id);
    if(findTurma){
        findTurma.destroy();
        res.json({message: "Turma deletado com sucesso"});
    }else{
        res.status(404).json({message:"Turma não encontrada"});
    }
});

module.exports = router;