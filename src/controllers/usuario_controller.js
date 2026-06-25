const Usuario = require('../models/usuario')
const {Sequelize} = require('sequelize')
const crypto = require('crypto')

class UsuarioController{
    static async register(req, res){
        const { nome, email, senha } = req.body
        let password = email+senha
        let hash = crypto.createHash('sha256').update(password)
        password = hash.digest('hex')

        let usuarioExiste = await Usuario.findOne({where:
            {email: email,
             // timeLife: {"le": new Date()}
        }})
        if(usuarioExiste){
            res.status(401).json({success: false})
            return
        }


       let newLogin = await Usuario.create({nome, email, password})
    //    await newLogin.save()
        res.status(newLogin ? 200 : 400).json({})
        }

    static async authenticate(req, res) {
        const {email, senha} = req.body
        let password = email+senha
         let hash = crypto.createHash('sha256').update(password)
         password = hash.digest('hex')
        // password = Sequelize.fn('pgp_sym_encrypt', password, senha)

        let uLogin = await Usuario.findOne({where: { password }})

        let token = {}
            if (uLogin) {
                let t = uLogin.email + '-' + Math.random()
                let tokenHash = crypto.createHash("sha-1")
                tokenHash.update(t)
                let hash = tokenHash.digest("hex")
                let timeLife = new Date()
               timeLife.setHours(timeLife.getHours()+1) 
                token = {hash, timeLife}
                uLogin.token = hash
                uLogin.timeLife = timeLife
                await uLogin.save()



            }

        

        

        res.status(uLogin ? 200: 404).json({token})

    }

    static async ValidateToken(req, res, next){
        let key = req.headers.authorization
        if (key == undefined){
            res.status(401).json({success: false})
            return
        }
        let usuario = await Usuario.findOne({where:
            {token: key,
             // timeLife: {"le": new Date()}
            }})

        if (!usuario){
            res.status(401).json({success: false})
            return

        }   
        
        req.user = usuario
        next()
    }
}

module.exports = UsuarioController