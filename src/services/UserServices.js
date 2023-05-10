import userModel from "../models/User.js";
import mongoose from "mongoose";

export const findElementByEmail = async (email) =>{
    try{
        const result = await userModel.findOne({email:email})
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

export const findAllUser = async () => {
    try {
        const result = await userModel.find()
        return result
    } catch (error) {
        return error
    }
}

export const findUsersById = async (id) =>{
    try {
        const result = await userModel.findById(id)
        return result
    } catch (error) {
        return error
    }
}

export const getElementById = async (id) =>{
    try{
        const elemento = await userModel.findById(id)
        return elemento
    }catch(error){
        return error
    }
}
export const addElements = async (elementos) =>{
    try{
        const mensaje = await userModel.insertMany(elementos)
        return mensaje
    }catch(error){
        return error
    }
}


