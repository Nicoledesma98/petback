import { Router } from "express";
import { getProductsCart,createCarrito,postProductCart,deleteCart,deleteProductCart,updateProductCart } from "../controllers/cart.controller.js";

const routerCart = Router()

routerCart.get("/:cid", getProductsCart)
routerCart.post("/:cid/products/:pid", postProductCart)
routerCart.put("/:cid", createCarrito)
routerCart.put("/:cid/products/:pid", updateProductCart)
routerCart.delete("/:cid", deleteCart)
routerCart.delete("/:cid/products/:pid", deleteProductCart)
routerCart.post("/", createCarrito)


export default routerCart