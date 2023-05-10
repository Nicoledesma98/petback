import { findElementById,findProducts,addElements,deleteElement,updateElement,setConexion } from "../services/ProductServices.js"

setConexion()

export const getProducts = async (req,res)=>{///getproducts//esto es de aca
    const {limit, page, filter, sort} = req.query
    const pag = page != undefined ? page : 1
    const limi = limit != undefined ? limit : 10
    const ord = sort == "asc" ? 1 : -1
    try{
        const products = await findProducts(limi,pag,filter,ord)
        console.log('esto es products',products)
        if(products){
            return res.status(200).json(products)
        }
        res.status(200).json({
            message:'productos no encontrados'
        })
    }catch(error){
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
            return res.status(200).json(product)
        }
        res.status(200).json({
            message: 'producto no encontrado'
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

export const createProduct =  async (req,res) =>{///createproduct
    const {name, description, code, stock, category, price} = req.body
    try{
        const producto = await addElements([{name, description, code, stock, category, price}])
        res.status(204).json(producto)
    }catch (error){
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
        return res.status(200).json({
            message:'producto eliminado'
        })
    }
    res.status(200).json({
        message:'producto no encontrado'
    })
    }catch(error){
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
            return res.status(200).json({
                message:'producto actualizado'
            })
        }

        res.status(200).json({
            message: 'producto no encontrado'
        })
    }catch(error){
        res.status(500).json ({
            message: error.message
        })

    }
}