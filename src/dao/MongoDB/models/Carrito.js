import {Schema} from "mongoose";
import { GestorMongoDB } from "../../../db/gestorMongoDB.js";
const url = process.env.MONGODBURL

const cartsSchema = new Schema({
    products : []
})

 export class cartDaoMongoDB extends GestorMongoDB {
        constructor(){
            super(url,'carts',cartsSchema)
        }

    }

