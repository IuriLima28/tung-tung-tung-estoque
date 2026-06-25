const database = require(`../config/database`)
const {DataTypes} = require("sequelize")

const Log = database.define("Log", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    entity : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    entity_id  : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id   : {
        type: DataTypes.INTEGER,
        references: {
            model: "usuario",
            key: "id"
        }
    },
    // created_at : {
    //     type: DataTypes.TIMESTAMP,
    //     allowNull: false,
    // },
},

{
    tableName: 'log',
    timestamp: true
})

Log.sync({alter: true})

module.exports = Log

//Movimentação movimentação TIMESTAMP