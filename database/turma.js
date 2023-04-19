const {DataTypes} = require("sequelize");
const {connection} = require("./database");

const Turma = connection.define("turma", {
    nome:{
        type: DataTypes.STRING(130),
        allowNull:false
    },
    ano:{
        type:DataTypes.STRING(130),
        allowNull:false,
        unique:true
    },
})

const Aluno = require("./aluno");

Turma.hasMany(Aluno);
Aluno.belongsTo(Turma);

module.exports = Turma;