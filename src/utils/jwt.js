import jwt from 'jsonwebtoken'  

export const generateToken = (user) => {
    ///objeto de asociacion del token
    const token = jwt.sign({user},process.env.PRIVATE_KEY_JWT,{expiresIn:'12h'})// expiresin es el tiempo de expiracion
    return token
}

export const authToken = (req,res,next) =>{
    //consulto el header
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).send({error:'usuario no autenticado'})
    }
    const token = authHeader.split(' ')[1] //sacar una palabra inecesaria del authHeader
    jwt.sign(token,process.env.PRIVATE_KEY_JWT,(error,credentials) =>{
        //verificar si es un token valido
        if(error){
            return res.status(403).send({error:'no autorizado'})
        }
        //token decifrado correctamente
        req.user = credentials.user
        next()
    })
}