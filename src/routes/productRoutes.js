import { Router } from "express";
import { getProducts,getProductById,updateProduct,deleteProduct,createProduct } from "../controllers/product.controller.js";
const routerProd = Router()

routerProd.get("/", getProducts)
routerProd.get("/:id", getProductById)
routerProd.post("/", createProduct)
routerProd.put("/:id", updateProduct)
routerProd.delete("/:id", deleteProduct)

export default routerProd