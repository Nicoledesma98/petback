import { findElementByEmail, findUsersById,setConexion,findAllUser } from "../services/UserServices.js"
import getLogger from "../utils/loggers.js"
setConexion()
const logger = getLogger()

export const createUser = (req,res) =>{
    logger.info('usuario creado correctamente')
    res.send({status: 'success', message:'User created' })  
}

export const getAllUser = async (req,res) => {
    try {
        const users = await findAllUser()
        logger.info('Estos son todos los usuarios',users)
        return res.status(200).json(users)
    } catch (error) {
        logger.error('Error en buscar todos los usuarios',error)
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
            logger.info('usuario encontrado por el id',user)
            return res.status(200).json({
                message: user
            })
        }
        logger.info('usuario no encontrado con este id: ',id)
        return res.status(200).json({
            message: "Usuario no encontrado"
        })
    } catch (error) {
        logger.error('Error al obtener usuario por el id',error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const getUserByEmail = async (email,req,res) =>{
    try {
        const user = await findElementByEmail(email)
        if(user){
            logger.info('usuario encontrado: ',user)
            return res.status(200).json(user)
        }
        logger.info('Usuario no encontrado para el email: ', email)
        res.status(200).json({
            message:'usuario no encontrado'
        })
    }catch(error){
        logger.error('Error al obtener usuario por el email: ',error)
        res.status(500).json({
            message: error.message
        })
    }
}