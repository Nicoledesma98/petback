import { Router } from "express";
import routerProd from "./productRoutes.js";
import routerCart from "./cartRoutes.js";
import routerSession from "./sessionRoutes.js";
import routerUser from "./userRoutes.js";
import routerGithub from "./github.js";

const router = Router()

router.use('/products',routerProd) 
router.use('/user',routerUser) 
router.use('/api/cart',routerCart)
router.use('/api/session',routerSession)
router.use('/session',routerGithub)
export default router