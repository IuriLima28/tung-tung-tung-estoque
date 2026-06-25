const {Sequelize} = require('sequelize')
const Produto = require('../../models/produto')
const { Op, col } = require('sequelize');



class MetricController{
    static async index(req, res) {
        //quantidade produtos
        let quantidade = await Produto.count({})

        //produtos abaixo de estoqeu min
        let produtoAbaixo = await Produto.findAll({where: {"quantity": {[Op.lt]: col("min_stock")}}})


        //valor total

        const todosProdutos = await Produto.findAll({});

        const valorTotal = todosProdutos.reduce((total, produto) => {
            return total + Number(produto.price * produto.quantity);
        }, 0);

        // 3. Criar pedido





       
    
        res.status(200).json({ quantidade, produtoAbaixo, valorTotal });

        
    }
    
}
// class ProdutoController {
//   static async index(req, res) {
//     let { nome, publicado, offset, limit } = req.query
//     limit =  limit || 10
//     offset =  offset || 0
//     let query = JSON.parse(JSON.stringify({nome, publicado}))

//     let produtos = await Produto.findAndCountAll({
//       where: query,
//       limit: limit,
//       offset: offset,
//       order: [["id", "asc"]]
//     })
    
//     produtos["offset"] = offset
//     produtos["limit"] = limit
//     res.status(200).json({ produtos });
//   }

module.exports = MetricController