import { Router } from "express";
import routerProd from "./productRoutes.js";
import routerCart from "./cartRoutes.js";
import routerSession from "./sessionRoutes.js";
import routerUser from "./userRoutes.js";
import routerGithub from "./github.js";
import routerTicket from "./ticketRoutes.js";
import routerLogg from "./loggRoutes.js";

const router = Router()

router.use('/products',routerProd) 
router.use('/user',routerUser) 
router.use('/api/cart',routerCart)
router.use('/api/session',routerSession)
router.use('/session',routerGithub)
router.use('/ticket',routerTicket)
router.use('/loggerTest',routerLogg)
router.use('*',(req,res) =>{
    res.status(404).send({ error:'404 ruta no encontrada'})
})
export default router