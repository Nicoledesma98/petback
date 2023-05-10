import ticketModel from "../models/Ticket.js";
import mongoose from "mongoose";

export const findTicket = async () =>{
    try{
        const result = await ticketModel.find()
        return result
    }catch(error){
        return error
    }
}

export const findTicketById = async (id) =>{
    try{
        const result = await ticketModel.findOne({_id:id})
        return result
    }catch(error){
        return error
    }
}
export const setConexion = async () => {
    try{
        await mongoose.connect(process.env.MONGODBURL)
        console.log('mongoDB esta conectado')
    }catch(error){
        return error
    }
}

export const createTicket = async (ticket) => {
    try {
        const newTicket = new ticketModel(ticket)
        await newTicket.save()
        return newTicket
    } catch (error) {
        return error
    }
}