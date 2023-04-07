import { getManagerUsers } from "../dao/daoManager.js";

const data = await getManagerUsers()
export const userMongoDB = new data.UserDaoMongoDB

userMongoDB.setConexion()

export const createUser = (req,res) =>{
    res.send({status: 'success', message:'User created' })  
}

export const getUserById = async (req,res) =>{
    const {id} = req.params
    try {
        const user = await userMongoDB.getElementById(id)
        if(user){
            return res.status(200).json({
                message: user
            })
        }
        return res.status(200).json({
            message: "Usuario no encontrado"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getUserByEmail = async (email) =>{
    try {
        const user = await userMongoDB.getElementByEmail(email)
        if(user){
            return user
        }
        return 'usuario no encontrado'
    }catch(error){
        return error
    }
}