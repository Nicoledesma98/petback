import messageModel from "../models/Message.js";
import mongoose from "mongoose";

export const addElements = async (elementos) => {
    try{
        const mensaje = await messageModel.insertMany(elementos)
        return mensaje
    }catch(error){
        console.log('Error en insertar elemento en messagemodel,service',error)
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