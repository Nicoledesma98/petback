import mongoose, { Schema } from "mongoose";
import { GestorMongoDB } from "../db/gestorMongoDB.js";


const url = process.env.MONGODBURL
const cartsSchema = new Schema({
    products: {
        type: [
            {
                id_prod: {
                    type: mongoose.Types.ObjectId,
                    ref: "products",
                },
                quantity: {
                    type: Number,
                    required:true
                }
            }
        ],
        default: []
    }
})

export class cartDaoMongoDB extends GestorMongoDB {
    constructor() {
        super(url, 'carts', cartsSchema)
    }

    async addProductCart(id, idProd, quantity) {
        const carrito = await this.getElementById(id)
         carrito.products.push({ id_prod:idProd, quantity:quantity })
        const respuesta = await this.updateElement(id, carrito)
        return respuesta
    }
  
    async deleteProductCart(cid, pid) {
        const carrito = await this.getElementById(cid);
        console.log('esto es carrito en cart.js', carrito);
        console.log('esto es carrito.products',carrito.products)
        const index = carrito.products.findIndex(prod => prod._id == pid);
        console.log('esto es index',index)
        if (index === -1) {
          // El producto no se encontró en el carrito
          return false;
        } else {
          carrito.products.splice(index, 1); // Elimina el elemento en el índice encontrado
          await carrito.save(); // Guarda el carrito actualizado en la base de datos
          return true;
        }
      }
    async deleteProductsCart(id){
        const carrito = await this.getElementById(id)
        carrito.products = []
        carrito.save()
        return true
    }
    async getProductsCart(id) {
        const prods = await this.modelo.findById(id).populate({
            path: "products.id_prod"
        })
        return prods
    }

    async updateProd (cid,pid,newQuantity) {
         const result = await this.modelo.updateOne(
            {_id : cid,"products.id_prod":pid},
            {$set:{"products.$.quantity":newQuantity}})
         return result
    }
}
