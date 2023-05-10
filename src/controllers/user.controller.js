import { findElementByEmail, findUsersById,setConexion,findAllUser } from "../services/UserServices.js"

setConexion()

export const createUser = (req,res) =>{
    res.send({status: 'success', message:'User created' })  
}

export const getAllUser = async (req,res) => {
    try {
        const users = await findAllUser()
        console.log('esto es users',users)
        return res.status(200).json(users)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getUserById = async (req,res) =>{
    const {id} = req.params
    try {
        const user = await findUsersById(id)
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

export const getUserByEmail = async (email,req,res) =>{
    try {
        const user = await findElementByEmail(email)
        if(user){
            return res.status(200).json(user)
        }
        res.status(200).json({
            message:'usuario no encontrado'
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}