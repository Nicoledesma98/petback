import mongoose, { Schema, model } from "mongoose";

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
const cartModel = model('carts',cartsSchema)

export default cartModel