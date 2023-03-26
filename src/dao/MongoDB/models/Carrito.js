import mongoose, { Schema } from "mongoose";
import { GestorMongoDB } from "../../../db/gestorMongoDB.js";
const url = process.env.MONGODBURL

const cartsSchema = new Schema({
    products: {
        type: [
            {
                id_prod: {
                    type: mongoose.Types.ObjectId,
                    ref: "products"
                },
                quantity: Number
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
        console.log('esto es carrito',carrito)
        const prodId = new mongoose.Types.ObjectId(idProd)
        const hola = carrito.products.push({ prodId, quantity })
        console.log('esto es hola',hola)
        const respuesta = await this.updateElement(id, carrito)
        console.log('esto es respuesta',respuesta)
        return respuesta
    }
    async getProductsCart(id) {
        const prods = await this.modelo.findById(id).populate({
            path: "products.id_prod"
        })
        console.log('esto es prods', prods.products)
        return prods
    }

    async updateProd (cid,pid,newQuantity) {
        console.log('esto es todo de carrito', cid,pid,newQuantity)
         const result = await this.modelo.updateOne(
            {_id : cid,"products.id_prod":pid},
            {$set:{"products.$.quantity":newQuantity}})
            console.log('esto es result',result)
         return result
    }



}
