const Aluno = require("../database/aluno");
const Professor = require("../database/professor");
const Turma = require("../database/turma");

const {Router} = require("express");

const router = Router();

router.get("/professores", async (req,res) =>{
    const professores = await Professor.findAll();
    res.json(professores);
});

router.post("/professores", async (req, res) =>{
    const {nome, email, telefone} = req.body
    try{
        const novoProfessor = await Professor.create({nome, email, telefone});
        res.json(novoProfessor);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Algo errado ocorreu"});
    }
});

router.put("/professores/:id", async (req,res) =>{
    const {id} = req.params;
    const {nome, email, telefone} = req.body;
    try{
        const isProfessor = await Professor.findOne({where:{id}});
        if(isProfessor){
            isProfessor.update({nome,email,telefone});
            res.json({message: "Professor atualizado com sucesso"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Algo errado ocorreu"})
    }
});

router.delete("/professores/:id", async (req,res) =>{
    const {id} = req.params;
    const isProfessor = await Professor.findByPk(id);
    if(isProfessor){
        isProfessor.destroy();
        res.json({messsage: "Professor deletado"});
    }else{
        res.status(404).json({message: "Professor não encontrado"});
    }
});

module.exports = router;