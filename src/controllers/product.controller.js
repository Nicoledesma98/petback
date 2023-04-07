import { getManagerProductos } from "../dao/daoManager.js";

const data = await getManagerProductos()
const prodMongoDB = new data.prodDaoMongoDB

prodMongoDB.setConexion()


export const getProducts = async (req,res)=>{///getproducts
    const {limit, page, filter, sort} = req.query
    const pag = page != undefined ? page : 1
    const limi = limit != undefined ? limit : 10
    const ord = sort == "asc" ? 1 : -1
    try{
        const products = await prodMongoDB.getProducts(limi,pag,filter,ord)
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
    
    console.log('esto es productos en product routes',products)
    console.log(typeof products,'esto es products')
   return products
}

export const getProductById =  async(req,res)=>{///getproductsbyid
    const {id} = req.params
    try{
        const product = await prodMongoDB.getElementById(id)
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
        const producto = await prodMongoDB.addElements([{name, description, code, stock, category, price}])
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
    const productos = await prodMongoDB.deleteElement(id) 
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
        const product = await prodMongoDB.updateElement(id,{name: name,description: description,code: code,stock: stock,category: category,price: price})
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