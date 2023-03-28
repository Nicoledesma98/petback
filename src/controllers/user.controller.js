import { getManagerUsers } from "../dao/daoManager";

const data = await getManagerUsers()
const userManager = new data.UserDaoMongoDB

export const createUser = async (req,res) =>{
    const {first_name, last_name, email, age ,password} = req.body
    try{
        const user = await userManager.getEle
    }catch(error){

    }
}

