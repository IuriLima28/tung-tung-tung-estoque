const database = require(`../config/database`)
const {DataTypes} = require("sequelize")

const Movimentacao = database.define("Movimentacao", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    type : {
        type: DataTypes.ENUM('entrada', 'saida'),
        defaultValue: 'entrada'
    },
    quantity : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id  : {
        type: DataTypes.INTEGER,
        references: {
            model: "produto",
            key: "id"
        }
    },
    user_id   : {
        type: DataTypes.INTEGER,
        references: {
            model: "usuario",
            key: "id"
        }
    },
},

{
    tableName: 'movimentacao',
    timestamp: true
})

Movimentacao.sync({alter: true})

module.exports = Movimentacao

//Movimentação movimentação