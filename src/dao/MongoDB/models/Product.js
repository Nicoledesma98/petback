import { Schema} from "mongoose";
import { GestorMongoDB } from "../db/gestorMongoDB.js";
import paginate from 'mongoose-paginate-v2'


const prodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required:true
    },
    stock: {
        type:Number,
        required:true
    },
    category: {
       type: String,
       enum: ["gato","perro"],
       default : "perro",
       required: true,
        index: true,
    },
    price: {
        type: Number,
        required: true,
        index: true
    },
    image: []
})
prodSchema.plugin(paginate)

export class prodDaoMongoDB extends GestorMongoDB {
    constructor(){
        super(process.env.MONGODBURL,'products',prodSchema)

    }
    async getProducts(limit, page, filter, ord){
        const product = await this.modelo.paginate({filter: filter},{limit: limit,page: page, sort:{price: ord}})
        return product
    } 
}
