import { UserDaoMongoDB } from "../dao/MongoDB/models/User.js";

const userMongoDB = new UserDaoMongoDB()
userMongoDB.setConexion()

export const createUser = async (req,res) =>{
    const { first_name, last_name, email, age, password } = req.body
    try{
        const user = await userMongoDB.getElementByEmail(email)
        if(user){
            res.redirect("/api/user/login",{
              //indicar que el email ya esta registrado  
            })
        }
        await userMongoDB.addElements([{first_name, last_name, email , age, password}])
            res.redirect("/api/user/login",{
                //indicar que el usuario se creo correctamente
            })
    }catch(error){
            res.status(500).json({
                message: error.message
            })

    }
}