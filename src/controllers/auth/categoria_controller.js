const Categoria = require('../../models/categoria')
const {Sequelize} = require('sequelize')

class CategoriaController{
    static async create(req, res){
        const { name, description } = req.body

        let categoria = await Categoria.create({
            name: name,
            description: description

    });
    categoria.save();
    res.send(JSON.stringify(categoria));

    }

 static async show(req, res){
    let categoria = await Categoria.findAll({});



        res.send(JSON.stringify(categoria))
    }
}
module.exports = CategoriaController