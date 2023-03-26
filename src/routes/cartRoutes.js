import { Router } from "express";
import { cartDaoMongoDB } from "../dao/MongoDB/models/Carrito.js";

const cartMongoDB = new cartDaoMongoDB()
cartMongoDB.setConexion()
const routerCart = Router()

routerCart.get('/:id', async (req, res) => {//////anda
    try {
        const { id } = req.params
        const products = await cartMongoDB.getProductsCart(id)
        console.log(id, 'esto es id')
        console.log(products, 'esto es products')
        console.log(JSON.stringify(products))
        if (products) {
            return res.status(200).json(products)
        }
        res.status(200).json({
            message: 'productos no encontrados'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
routerCart.post('/', async (req, res) => {
    try {
        const respuesta = await cartMongoDB.addElements()
        console.log('esto es respuesta', respuesta)
        return res.status(200).json(respuesta)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
})
routerCart.post('/:cid/products/:pid', async (req, res) => {////anda
    const { cid } = req.params
    const { id_prod, quantity } = req.body
    console.log('esto es cid', cid)
    console.log('esto es idpord y queantity', id_prod, '+', quantity)
    try {
        const product = await cartMongoDB.addProductCart(cid, id_prod, quantity)
        return res.status(204).json(product)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
routerCart.delete('/:cid/products/:pid', async (req, res) => {
    const { cid } = req.params
    const { pid } = req.params
    const product = await cartMongoDB.getProductsCart(cid)
    console.log('esto es products en prods', product.products)
    const prodCart = product.products.find(p => p.id === pid)
    console.log('esto es prodcart', prodCart)
    try {
        const productos = await cartMongoDB.updateElement(cid,
            { $pull: { products: { _id: prodCart._id } } }
            , { new: true }
        )
        console.log('esto es productos', productos)
        if (productos) {
            return res.status(200).json({
                message: 'producto eliminado'
            })
        }
        res.status(200).json({
            message: 'producto no encontrado'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})
routerCart.delete('/:cid', async (req,res) =>{
    const { cid } = req.params
    console.log('esto es cid',cid)
    const product = await cartMongoDB.getElementById(cid)
    console.log('esto es product',product)
    try{
        product.products = []
        console.log('esto es delproducts',product.products)
        await product.save()
       return res.status(204).json(product)
        message: 'productos eliminados'
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})

routerCart.put('/:cid/products/:pid', async (req,res) =>{
        const { cid, pid } = req.params;
        const { quantity } = req.body;  
        console.log('esto es todo de routes', cid, pid, quantity)
        try {
            const product = await cartMongoDB.updateProd(cid,pid,quantity)
            console.log('esto es product',product)
        }catch(error){

        }
})


export default routerCart