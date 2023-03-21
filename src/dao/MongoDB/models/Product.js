import { Schema} from "mongoose";
import { GestorMongoDB } from "../../../db/gestorMongoDB.js";
import paginate from 'mongoose-paginate-v2'

const url = process.env.MONGODBURL

const prodSchema = new Schema({
    name: String,
    category: {
       type: String,
       enum: ["gato","perro"],
       default : "perro"
    },
    price: Number,
    quantity: Number,
})
prodSchema.plugin(paginate)

export class prodDaoMongoDB extends GestorMongoDB {
    constructor(){
        super(url,'products',prodSchema)

    }

}
