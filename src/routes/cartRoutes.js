import { Router } from "express";
import { getProductsCart,createCarrito,addProductCart,deleteProductCart,updateProductCart,deleteCart} from "../controllers/cart.controller.js";

const routerCart = Router()

routerCart.get("/:cid", getProductsCart)
routerCart.post("/:cid/products/:pid", addProductCart)
routerCart.put("/:cid", createCarrito)
routerCart.put("/:cid/products/:pid", updateProductCart)
routerCart.delete("/:cid", deleteCart)
routerCart.delete("/:cid/products/:pid", deleteProductCart)
routerCart.post("/", createCarrito)


export default routerCart