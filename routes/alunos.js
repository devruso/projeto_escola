const Aluno = require("../database/aluno");
const Turma = require("../database/turma");

const {Router} = require("express");

const router = Router();

// Listar alunos

router.get("/alunos", async (req,res) =>{
    const alunos = await Aluno.findAll();
    res.json(alunos);
});


router.get("/alunos/:id", async (req,res) =>{
    const {id} = req.params;
    const aluno = await Aluno.findByPk(id);
    if(aluno){
        res.json(aluno);
    }else{
        res.status(404).json({message: "Aluno não encontrado"});
    }
});

//Adicionar Aluno
//Corrigir a parte de "não achar turma"
router.post("/alunos/:turmaId", async (req, res) =>{
    const {nome, email, telefone, media} = req.body;
    const turmaId = parseInt(req.params.turmaId, 10);
    try{  
    const findTurma = await Turma.findByPk(turmaId);
    if(findTurma){
        const novoAluno = await Aluno.create({nome, email, telefone, media, turmaId},{include:[Turma]});
        res.status(201).json(novoAluno);
    }else{
        res.status(404).json({message: "Turma não encontrada"});
    }
}catch(err){
    console.log(err);
    res.status(500).json({message: "Algo errado ocorreu"});
}
});

//Atualizar Aluno
router.put("/alunos/:id", async (req,res)=>{
    const {nome, email, telefone, media} = req.body;
    const findAluno = await Aluno.findByPk(req.params.id);
    const {id} = req.params;
    try{
        if(findAluno){
            await Aluno.update({nome,email,telefone,media},{where: {id}});
            res.json({message: "Aluno atualizado!"});
        }else{
            res.status(404).json({message:" Aluno não encontrado"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: `Algo errado ocorreu ${err}` })
    }
})

//Deletar Aluno

router.delete("/alunos/:id", async (req,res) =>{
    const {id} = req.params;
    const isAluno = await Aluno.findByPk(id);
    try{
        if(isAluno){
            await isAluno.destroy();
            res.json({message:"Aluno removido"});
        }else{
            res.status(404).json({message:"Aluno não encontrado"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:`Algo errado aconteceu ${err}`});
    }
})

module.exports = router;
