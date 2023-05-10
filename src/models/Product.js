import { Schema, model } from "mongoose"
import  paginate  from "mongoose-paginate-v2"

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

const prodModel = model('products',prodSchema)

export default prodModel 
