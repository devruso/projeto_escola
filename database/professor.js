const {DataTypes} = require("sequelize");
const {connection} = require("./database");

const Professor = connection.define("professor", {
    nome:{
        type: DataTypes.STRING(130),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(130),
        allowNull:false,
        unique:true
    },
    telefone:{
        type: DataTypes.STRING(20),
        allowNull:false,
    },
    materia:{
        type:DataTypes.STRING(100),
        allowNull:false
    }
})
const Turma = require("./turma");

Professor.hasOne(Turma);
Turma.belongsTo(Professor);

module.exports = Professor;
