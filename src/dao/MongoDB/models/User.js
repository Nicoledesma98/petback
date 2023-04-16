import { GestorMongoDB } from "../db/gestorMongoDB.js";
import { Schema } from "mongoose";

const userSchema = new Schema({
    first_name:{
        type: String,
        requered: true
    },
    last_name:{
        type: String,
        requered:true
    },
    email:{
        type: String,
        unique: true,
        index: true
    },
    age:{
        type: Number,
        requered: true
    },
    rol:{
        type: String,
        default: 'User'
    },
    password:{
        type: String,
        requered:true
    },
    id_cart: {
        type: mongoose.Types.ObjectId,
        ref: "carts",
    },
})

export class UserDaoMongoDB extends GestorMongoDB {
    constructor(){
        super(process.env.MONGODBURL,"users", userSchema)
    }
    async getElementByEmail(email){
        try{
            return await this.modelo.findOne({email: email})
        }catch(error){
            return error
        }
    }
}