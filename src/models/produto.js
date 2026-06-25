const database = require(`../config/database`)
const {DataTypes} = require("sequelize")

const Produto = database.define("Produto", {
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
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    min_stock : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id : {
        type: DataTypes.INTEGER,
        references: {
            model: "categoria",
            key: "id"
        }
    },
},

{
    tableName: 'produto',
    timestamp: true
})

Produto.sync({alter: true})
 
Produto.afterSave("CriarLog", async (produto, options)=> {
    let action = ''
    let user_id = 0
    if(options.user_id == undefined){
        action = produto.action
        user_id = produto.user_id
    } else{
        action = options.action
        user_id = options.user_id
    }
    console.log(options)
    const Log = require("./log")

    let log = await Log.create({
    action: action,
    entity: 'produto',
    entity_id: produto.id,
    user_id: user_id
    })



})

module.exports = Produto

//Produto produto