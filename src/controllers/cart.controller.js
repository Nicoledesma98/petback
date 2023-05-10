import { findProductsCart,delProductCart,addProductCart,deleteProductsCart,addElements,updateElement,setConexion } from "../services/CartServices.js"

setConexion()

export const getProductsCart = async (req,res) => {
    try {
        const { cid } = req.params
        const products = findProductsCart(cid)
        if (products) {
            return res.status(200).send(products)
        }
        res.status(200).json({
            message: 'productos no encontrados'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

export const createCarrito = async (req, res) => {
    try {
        const respuesta = await addElements()
        console.log('esto es respuesta', respuesta)
        return res.status(200).json(respuesta)
    } catch (error) {
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
        return res.status(204).send(product)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteCart = async (req,res) =>{
    const { cid } = req.params
    try{
        const product = await deleteProductsCart(cid)
       return res.status(204).json(product)
        message: 'productos eliminados'
    }catch(error){
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
        console.log('esto es product',product)
       return res.status(204).json(product)
        message: 'productos eliminados'
    }catch(error){
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
        console.log('esto es product',product)
        if (product) {
            return res.status(200).json({
                message: "Producto actualizado"
            })
        }

        res.status(200).json({
            message: "Producto no encontrado"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}
