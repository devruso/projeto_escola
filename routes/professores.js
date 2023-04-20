const Aluno = require("../database/aluno");
const Professor = require("../database/professor");
const Turma = require("../database/turma");

const {Router} = require("express");

const router = Router();

router.get("/professores", async (req,res) =>{
    const professores = await Professor.findAll();
    res.json(professores);
});

router.get("/professores/:id", async (req, res) =>{
    const {id} = req.params;
    const findProf = await Professor.findByPk(id);
    if(findProf){
        res.json(findProf);
    }else{
        res.json({message: "Professor não encontrado"});
    }
})

router.post("/professores/:turmaId", async (req, res) =>{
    const {nome, email, telefone} = req.body;
    const turmaId = parseInt(req.params.turmaId, 10);
    
    try{
        const findTurma = await Turma.findByPk(turmaId);
        if(findTurma){
            const novoProfessor = await Professor.create({nome, email, telefone, turmaId}, {include:[Turma]});
            res.json(novoProfessor);
        }else{
            res.status(404).json({message:"Turma não encontrada"});
        }
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