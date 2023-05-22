import { findProductsCart,delProductCart,addProductCart,deleteProductsCart,addElements,updateElement,setConexion } from "../services/CartServices.js"
import getLogger from "../utils/loggers.js"

setConexion()
const logger = getLogger()

export const getProductsCart = async (req,res) => {
    try {
        const { cid } = req.params
        const products = findProductsCart(cid)
        if (products) {
            logger.info('Productos del carrito',products)
            return res.status(200).send(products)
        }
        logger.info('Productos no encontrados')
        res.status(200).json({
            message: 'productos no encontrados'
        })
    } catch (error) {
        logger.error('Error en buscar productos dentro del carrito',error)
        res.status(500).json({
            message: error.message
        })
    }

}

export const createCarrito = async (req, res) => {
    try {
        const carrito = await addElements()
        logger.info('Carrito creado correctamente',carrito)
        return res.status(200).json(carrito)
    } catch (error) {
        logger.error('Error al crear carrito',error)
        res.status(500).json({
            message: error.message
        })

    }
}
export const postProductCart = async (req, res) => {////anda
    const { cid } = req.params
    const { id_prod, quantity } = req.body
    try {
        const product = await addProductCart(cid, id_prod, quantity)
        logger.info('Producto agregado correctamente al carrito',product)
        return res.status(204).send(product)
    } catch (error) {
        logger.error('Error al agregar producto al carrito',error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteCart = async (req,res) =>{
    const { cid } = req.params
    try{
        const product = await deleteProductsCart(cid)
        logger.info('Carrito eliminado',product)
       return res.status(204).json(product)
    }catch(error){
        logger.error('error al eliminar carrito',error)
        res.status(500).json({
            message: error.message
        })
    }
}
export const deleteProductCart = async (req,res) =>{
    const { cid } = req.params
    const { pid } = req.params
    try{
        const product = await delProductCart(cid,pid)
        logger.info('Producto eliminado correctamente',product)
       return res.status(204).json(product)
    }catch(error){
        logger.error('Error en eliminar producto',error)
        res.status(500).json({
            message: error.message
        })
    }
}


export const updateProductCart = async (req, res) => {
    const { cid } = req.params
    const { pid } = req.params
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    try {
        const product = await updateElement(
            pid,
            { 
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnails: thumbnails
        })
        if (product) {
            logger.info('Producto actualizado correctamente', product)
            return res.status(200).json({
                message: "Producto actualizado"
            })
        }
        logger.info('Producto no encontrado')
        res.status(200).json({
            message: "Producto no encontrado"
        })

    } catch (error) {
        logger.error('Error al actualizar producto',error)
        res.status(500).json({
            message: error.message
        })
    }

}
