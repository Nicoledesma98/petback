import { Router } from "express";
import { createUser,getUserById,getAllUser } from "../controllers/user.controller.js";
import passport from "passport";

const routerUser = Router()

routerUser.post('/register',passport.authenticate('register'),createUser)
routerUser.get('/:id',getUserById)
routerUser.get('/',getAllUser)


export default routerUser