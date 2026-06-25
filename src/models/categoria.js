const database = require(`../config/database`)
const {DataTypes} = require("sequelize")

const Categoria = database.define("Categoria", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    description : {
        type: DataTypes.TEXT,
        allowNull: false,
    },
},

{
    tableName: 'categoria',
    timestamp: true
})

Categoria.sync({alter: true})

module.exports = Categoria