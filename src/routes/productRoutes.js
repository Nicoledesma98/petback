import { Router } from "express";
import { prodDaoMongoDB } from "../dao/MongoDB/models/Product.js";


const prodMongoDB = new prodDaoMongoDB()
prodMongoDB.setConexion()
const routerProd = Router()
const PAGE_SIZE = 4;


routerProd.get('/', async (req,res)=>{
    const products = await prodMongoDB.getElements()
    console.log('esto es productos en product routes',products)
    console.log(typeof products,'esto es products')
    const pageNumber = parseInt(req.query.pageNumber) || 1
    try{
        const result = await prodMongoDB.paginate({},{page:pageNumber,limit:PAGE_SIZE})
        console.log(result)
    }catch(error){
        console.log('error en paginate',error)
    }
    res.send(products)
})
routerProd.post('/', async (req,res) =>{
    const producto = await prodMongoDB.addElements(req.body)
    console.log("esto es products en apppost", producto)
    res.send(producto)
})
routerProd.delete('/:id', async (req, res) => {
    const productos = await prodMongoDB.deleteElement(req.params.id) 
    res.send(productos)
})
routerProd.put('/:id', async (req,res)=>{
    let producto = await prodMongoDB.updateElement(req.params.id, req.body)
    res.send(producto)

})
export default routerProd