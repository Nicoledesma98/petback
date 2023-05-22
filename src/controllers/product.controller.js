import { findElementById,findProducts,addElements,deleteElement,updateElement,setConexion } from "../services/ProductServices.js"
import getLogger from "../utils/loggers.js"

setConexion()
const logger = getLogger()

export const getProducts = async (req,res)=>{///getproducts//esto es de aca
    const {limit, page, filter, sort} = req.query
    const pag = page != undefined ? page : 1
    const limi = limit != undefined ? limit : 10
    const ord = sort == "asc" ? 1 : -1
    try{
        const products = await findProducts(limi,pag,filter,ord)
        if(products){
            logger.info('estos son tus productos',products)
            return res.status(200).json(products)
        }
        logger.info('productos no encontrados')
        res.status(200).json({
            message:'productos no encontrados'
        })
    }catch(error){
        logger.info('Error al buscar los productos',error)
        res.status(500).json({
            message: error.message
        })

    }
}

export const getProductById =  async(req,res)=>{///getproductsbyid
    const {id} = req.params
    try{
        const product = await findElementById(id)
        if(product){
            logger.info('Producto encontrado',product)
            return res.status(200).json(product)
        }
        logger.info('producto no encontrado')
        res.status(200).json({
            message: 'producto no encontrado'
        })
    }catch(error){
        logger.error('error al buscar producto',error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const createProduct =  async (req,res) =>{///createproduct
    const {name, description, code, stock, category, price} = req.body
    try{
        const producto = await addElements([{name, description, code, stock, category, price}])
        logger.info('Producto creado correctamente: ',producto)
        res.status(204).json(producto)
    }catch (error){
        logger.error('error al crear el producto',error)
        res.status(500).json({
            message: error.message
        })
    }
    
    
}
export const deleteProduct = async (req, res) => {///deleteproduct
    const {id} = req.params
    try{
    const productos = await deleteElement(id) 
    if(productos) {
        logger.info('Producto eliminado correctamente', productos)
        return res.status(200).json({
            message:'producto eliminado'
        })
    }
    logger.info('Producto no encontrado para eliminar')
    res.status(200).json({
        message:'producto no encontrado'
    })
    }catch(error){
        logger.error('Error al eliminar producto',error)
        res.status(500).json({
            message: error.message
        })
    }
    
}
export const updateProduct = async (req,res)=>{///updateproduct
    const {id} = req.params
    const {name, description, code, stock, category, price} = req.body
    try{
        const product = await updateElement(id,{name: name,description: description,code: code,stock: stock,category: category,price: price})
        if(product){
            logger.info('Producto actualizado correctamente',product)
            return res.status(200).json({
                message:'producto actualizado'
            })
        }
        logger.info('Producto no encontrado')
        res.status(200).json({
            message: 'producto no encontrado'
        })
    }catch(error){
        logger.error('Error al actualizar producto',error)
        res.status(500).json ({
            message: error.message
        })

    }
}