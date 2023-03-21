import { GestorMongoDB } from "../../../db/gestorMongoDB.js";

const esquema = {
    name:{type: String, require:true,max:50},
    email:{type: String, require:true,max:50},
    mensaje:{type:String, require:true}

}

export class MensajeDaoMongoDB extends GestorMongoDB{
    constructor(){
        super(process.env.MONGODBURL,'mensajes',esquema)
        //al ser una clase hija se pueden agregar atributos propios de la coleccion mensajes
    }
    //tambien se pueden agregar metodos propios de esta coleccion  que no modificarian la de db
}