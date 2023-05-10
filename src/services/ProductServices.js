import prodModel from "../models/Product.js";
import mongoose from "mongoose";

export const findProducts =  async (limit, page, filter, ord) => {
    const product = await prodModel.paginate({filter: filter},{limit: limit,page: page, sort:{price: ord}})
    return product
}
export const findElementById = async (id) => {
    try{
        const elemento = await prodModel.findById(id)
        return elemento
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

export const addElements = async (elementos) =>{
    try{
        const mensaje = await prodModel.insertMany(elementos)
        return mensaje
    }catch(error){
        return error
    }
}

export const deleteElement = async (id) => {
    try{
        const respuesta = await prodModel.findByIdAndRemove(id)
        return respuesta
    }catch(error){
        return error
    }
}

export const updateElement = async (id, ...info) => {
    try {
        return await prodModel.findByIdAndUpdate(id, ...info)
    } catch (error) {
        return error
    }
}