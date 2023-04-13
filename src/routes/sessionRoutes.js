import { Router } from "express";
import passport from "passport";
import { getSession,testLogin,destroySession } from "../controllers/session.controller.js";

const routerSession = Router()

routerSession.get('/',getSession)
routerSession.post('/login',passport.authenticate('login'),testLogin)
routerSession.get('/logout',destroySession)
routerSession.get('/testJWT',passport.authenticate('jwt',{session:false},(req,res)=>{
    res.send(req.user)
}))

export default routerSession