import mongoose, { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code:{
        type: String,

    },
    purchase_datatime:{
        type: String,
    },
    amount:{
        type: Number,
    },
    purchaser:{
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
})

const ticketModel = model("Ticket",ticketSchema)

export default ticketModel