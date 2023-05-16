import { Schema, model } from "mongoose";

const mockSchema = new Schema({
    code: { 
        type: String
    },
    name: {
        type : String
    },
    product: {
        type : String
    },
    description : {
        type: String
    },
    price: {
        type: String
    },
    stock: {
        type : String
    }
})

const mockModel = model('mocking',mockSchema)

export default mockModel