import { Router } from "express";
import { getTicket,getTicketById,postTicket } from "../controllers/ticket.controller.js";

const routerTicket = Router()

routerTicket.get('/',getTicket)
routerTicket.get('/tid',getTicketById)
routerTicket.post('/',postTicket)


export default routerTicket