const Movimento = require('../../models/movimentação')
const {Sequelize} = require('sequelize')
const Produto = require('../../models/produto')


class MovimentoController{
    static async create(req, res){
        const {type, quantity, product_id} = req.body


        let produto = await Produto.findOne({where: {id: product_id}});
        console.log("Teste1")
        if(type == 'entrada'){
            produto.quantity += quantity
        } else if(type == 'saida'){
            produto.quantity -= quantity
        }        
        console.log("Teste2")
        let criador = req.user 
        
        let movimento = await Movimento.create({
            type: type,
            quantity: quantity,
            product_id: product_id,
            user_id: criador.id
            
            
        });
        console.log("Teste3")

    
    await produto.save()
    res.send(JSON.stringify(movimento));
    // user_id: req.user.id
    }

 static async show(req, res){
    let movimentos = await Movimento.findAll({});



        res.send(JSON.stringify(movimentos))
    }
}
module.exports = MovimentoController