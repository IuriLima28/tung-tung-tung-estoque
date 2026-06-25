const Log = require('../../models/log')
const {Sequelize} = require('sequelize')

class LogController{
 static async show(req, res){
    let log = await Log.findAll({});

    res.send(JSON.stringify(log))
    }
}
module.exports = LogController