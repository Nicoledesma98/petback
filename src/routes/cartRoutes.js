import { Router } from "express";
import { cartDaoMongoDB } from "../dao/MongoDB/models/Carrito.js";

const cartMongoDB = new cartDaoMongoDB()
cartMongoDB.setConexion()
const routerCart = Router()

routerCart.post('/', async (req,res) =>{
    try{
        const respuesta = await cartMongoDB.addElements()
        return res.status(200).json(respuesta)
    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
})

routerCart.get('/:id', async (req,res)=>{
    try{
        const products = await cartMongoDB.getProductsCart()
        console.log(JSON.stringify(products))
        if(products){
            return res.status(200).json(products)
        }
        res.status(200).json({
            message:'productos no encontrados'
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
})

routerCart.post('/:id', async (req,res)=>{
    const { id } = req.params
    const { id_prod, quantity} = req.body

    try{
        const product = await cartMongoDB.addProductCart(id, id_prod, quantity)
        res.status(204).json(product)
    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
})


export default routerCart