import mongoose,{ Schema, model } from "mongoose";

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

const userModel = model('users',userSchema)

export default userModel