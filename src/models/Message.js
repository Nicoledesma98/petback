import { Schema, model } from "mongoose"

const messageSchema = new Schema ({
    name: {
        type: String,
        require:true,
        max:50
    },
    email: {
        type: String,
        require:true,
        max:50
    },
    mensaje: {
        type:String,
        require:true
    }

})

const messageModel = model('mensajes',messageSchema)

export default messageModel
