import { getManagerCart } from "../dao/daoManager.js";
const data = await getManagerCart()
const cartMongoDB = new data.cartDaoMongoDB

cartMongoDB.setConexion()

export const getProductsCart = async (req,res) => {
    try {
        const { cid } = req.params
        const products = await cartMongoDB.getProductsCart(cid)
        console.log(cid, 'esto es id')
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

}

export const createCarrito = async (req, res) => {
    try {
        const respuesta = await cartMongoDB.addElements()
        console.log('esto es respuesta', respuesta)
        return res.status(200).json(respuesta)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}
export const addProductCart = async (req, res) => {////anda
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
}

export const deleteCart = async (req,res) =>{
    const { cid } = req.params
    try{
        const product = await cartMongoDB.deleteProductsCart(cid)
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
        const product = await cartMongoDB.deleteProductCart(cid,pid)
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
        const product = await cartMongoDB.updateElement(pid, { title: title, description: description, code: code, price: price, status: status, stock: stock, category: category, thumbnails: thumbnails })
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
