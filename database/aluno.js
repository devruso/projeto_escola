const {DataTypes} = require("sequelize");
const {connection} = require("./database");

const Aluno = connection.define("aluno", {
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
    media:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
})

module.exports = Aluno;