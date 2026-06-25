const database = require(`../config/database`)
const {DataTypes} = require("sequelize")

const Usuario = database.define("Usuario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false

    },
    timeLife: {
        type: DataTypes.DATE,
    },
    token: {
        type: DataTypes.STRING
    }
},

{
    tableName: 'usuario',
    timestamp: true
})

Usuario.sync({alter: true})

module.exports = Usuario