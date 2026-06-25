const Produto = require('../../models/produto')
const Categoria = require('../../models/categoria')
const {Sequelize} = require('sequelize')
const Log = require('../../models/log')

class ProdutoController{
    static async create(req, res){

        const { name, description, price, quantity, min_stock, category_id } = req.body

        let categoriaID = await Categoria.findOne({where: {id: category_id}});

        if (!categoriaID) {
          return res.status(404).json({
          mensagem: 'categoria não encontrada',
        });
        } 
        console.log(req.body);      
        let produto = await Produto.create({
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            min_stock: min_stock,
            category_id: categoriaID.id,
        }, {user_id: req.user.id, action: 'create'});
        

        /*
        {
          "name": "",
          "description": "",
          "price": ,
          "quantity": ,
          "min_stock": ,
          "category_id":
        }
        */
       
        // let log = await Log.create({
        //     action: 'Create',
        //     entity: name,
        //     entity_id: id,
        //     user_id: 

        // })


    produto.action = 'create'
    produto.user_id = req.user.id
    
    await produto.save();
    res.send(JSON.stringify(produto));
    

    }
    static async show(req, res){
    let produto = await Produto.findAll({});



        res.send(JSON.stringify(produto))
    }

    static async update(req, res) {
    const { id } = req.params;
    const { name, description, price } = req.body;

    let produto = await Produto.findOne({
      where: { id: id },
    });
    
    if (!produto) {
      return res.status(404).json({
        mensagem: 'produto não encontrado',
      });
    }
    if (name !== undefined) produto.name = name;
    if (description !== undefined) produto.description = description;
    if (price !== undefined) produto.price = price;

    produto.user_id = req.user.id
    produto.action = 'update'

    await produto.save();

    res.send(JSON.stringify({ produto }));
  }
}

module.exports = ProdutoController