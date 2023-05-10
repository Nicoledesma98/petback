import cartModel from "../models/Cart.js";
import mongoose from "mongoose";

export const addProductCart = async (id, idProd, quantity) => {
    try {
     const carrito = await cartModel.findById(id)
     carrito.products.push({ id_prod:idProd, quantity:quantity })
    const respuesta = await cartModel.findByIdAndUpdate(id, carrito)
    return respuesta
    } catch (error) {
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
export const addElements = async(elementos) => {
    try{
        const mensaje = await cartModel.insertMany(elementos)
        return mensaje
    }catch(error){
        console.log('Error en insertar elemento en MongoDB',error)
    }
}
export const  delProductCart = async (cid, pid) => {
    try {
    const carrito = await cartModel.findById(cid);
    const index = carrito.products.findIndex(prod => prod._id == pid);
    if (index === -1) {// El producto no se encontró en el carrito
      return false;
    } else {
      carrito.products.splice(index, 1); // Elimina el elemento en el índice encontrado
      await carrito.save(); // Guarda el carrito actualizado en la base de datos
      return true;
    }
    } catch (error) {
        return error
    }
  }

export const deleteProductsCart = async (id) => {
    try {
    const carrito = await cartModel.findById(id)
    carrito.products = []
    carrito.save()
    return true 
    } catch (error) {
        return error
    }
}
export const findProductsCart = async(id) => {
    try {
        const prods = await cartModel.findById(id).populate({
        path: "products.id_prod"
    })
    return prods
    } catch (error) {
        return error
    }
}
export const updateElement = async (id, ...info) => {
    try {
        return await cartModel.findByIdAndUpdate(id, ...info)
    } catch (error) {
        return error
    }
}
export const updateProd = async(cid,pid,newQuantity) => {
    try {
       const result = await cartModel.updateOne(
       {_id : cid,"products.id_prod":pid},
       {$set:{"products.$.quantity":newQuantity}})
    return result 
    } catch (error) {
        return error
    }
}
