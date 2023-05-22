import { Router } from "express";
// import { createRandomUser } from "../controllers/mock.controller.js";
import { getProducts,getProductById,updateProduct,deleteProduct,createProduct } from "../controllers/product.controller.js";
const routerProd = Router()

routerProd.get("/", getProducts)
routerProd.get("/:id", getProductById)
routerProd.post("/", createProduct)
routerProd.put("/:id", updateProduct)
routerProd.delete("/:id", deleteProduct)
// routerProd.post('/mockingproducts',createRandomUser)
export default routerProd