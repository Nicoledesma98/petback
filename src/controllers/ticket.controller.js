import { findTicket,findTicketById,createTicket,setConexion } from "../services/TicketServices.js";
import userModel from '../models/User.js'
import ticketModel from "../models/Ticket.js";

setConexion()

export const getTicket = async(req,res)=>{
    try{
        const ticket = await findTicket()
        res.status(200).json(ticket)

    }catch(error){
        res.status(500).json('Ocurrio un error en getTicket',error)
    }
}

export const getTicketById = async (req,res) =>{
    try{
    const {tid} = req.params
    const ticket = await findTicketById(tid)
    res.status(200).json(ticket)
    }catch(error){
        res.status(500).json('Ocurrio un error en getTicketById',error)
    }
    
}

export const postTicket = async(req,res) =>{
    // const user = userModel()
    // const ticket = ticketModel()
    // console.log('esto es user',user)
    // console.log('esto es ticket model',ticket) PREGUNTAR COMO HAGO PARA QUE TOME EL EMAIL DE DICHO USUARIO
    try {
        const newTicket = createTicket({
            code: Math.random()+Date.now().toString(),
            purchase_datatime: new Date(),
            amount: 4000,//ver como agregar los subtotales del carrito
            // const totalPrice = () => {
            //     return carrito.reduce((acum, prod) => acum += (prod.quantity * prod.precio), 0)
            // o tambien llamar al metodo getproducts de cart.js en models, hacer el reduce con todo lo que esta ahi
           // }
         //purchaser: tengo que llamar al schema de users y poner el email que seria user.email
         
        })
        res.status(200).json(newTicket)
    } catch (error) {
        res.status(500).json('Ocurrio un error en postTicket',error)
    }
}