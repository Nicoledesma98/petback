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
        let carrito = await this.model.findById(id)
        let prodId = new mongoose.Types.ObjectId(idProd)
        carrito.products.push({ prodId, quantity })
        const respuesta = await this.model.findByIdAndUpdate(id, carrito)
        return respuesta
    }
    async getProductsCart() {
        const prods = await this.model.find().populate({
            path: "products.id_prod"
        })
        return prods
    }
    async deleteProductCart(id) {
        const respuesta = await this.model.products.findByIdAndDelete(id)
        return respuesta
    }

    async updateProductCart(id, cart) {
        await this.model
    }

    async deleteProductCart(id) {
        await this.model.products.findByIdAndDelete(id)
    }
}


