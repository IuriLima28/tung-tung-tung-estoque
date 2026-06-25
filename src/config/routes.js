const express = require("express")


const UsuarioController = require("../controllers/usuario_controller")
const AuthCategoriaController = require("../controllers/auth/categoria_controller")
const AuthProdutoController = require("../controllers/auth/produto_controller")
const AuthMovimentoController = require("../controllers/auth/movimento_controller")
const AuthMetricController = require("../controllers/auth/metric_controller")
const AuthLogController = require("../controllers/auth/log_controller")

function Routes(app) {
    app.get("/", (req, res) => { res.status(200).json({success: true})})

    app.post("/register", (req, res) => { UsuarioController.register(req, res)})
    app.post("/authenticate", (req, res) => { UsuarioController.authenticate(req, res)})

    

    /* Rotas Autenticadas */
    let authRoutes = express.Router()
    authRoutes.use( async (req, res, next) => { await UsuarioController.ValidateToken(req, res, next)})
    authRoutes.get("/", (req, res) => { AuthTarefaController.index(req, res)})
    app.use("/auth", authRoutes)

    
    authRoutes.post('/category', (req, res) => { AuthCategoriaController.create(req, res)})
    authRoutes.get('/category', (req, res) => { AuthCategoriaController.show(req, res)})

    authRoutes.post('/product', (req, res) => { AuthProdutoController.create(req, res)})
    authRoutes.put('/product/:id', (req, res) => { AuthProdutoController.update(req, res)})

    authRoutes.post('/stock/movement', (req, res) => { AuthMovimentoController.create(req, res)})
    
    authRoutes.get('/stock/metrics', (req, res) => { AuthMetricController.index(req, res)})
    authRoutes.get('/logs', (req, res) => { AuthLogController.show(req, res)})
}



module.exports = Routes