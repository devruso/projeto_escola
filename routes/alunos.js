const Aluno = require("../database/aluno");
const Turma = require("../database/turma");

const {Router} = require("express");

const router = Router();

// Listar alunos
router.get("/alunos", async (req,res) =>{
    const alunos = await Aluno.findAll();
    res.json(alunos);
});

//Adicionar Aluno
router.post("/alunos", async (req, res) =>{
    const {nome, email, telefone, media} = req.body;
try{
    const novoAluno = await Aluno.create({nome:nome, email: email, telefone:telefone, media:media});
    res.status(201).json(novoAluno);

}catch(err){
    console.log(err);
    res.status(500).json({message: "Algo errado correu"});
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
