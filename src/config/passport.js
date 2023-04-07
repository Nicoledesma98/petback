import local from 'passport-local' 
import passport from 'passport'
import { userMongoDB } from '../controllers/user.controller.js'
import { createHash,validatePassword} from '../utils/bcrypt.js'
///passport se va a trabajar como un middleware
const LocalStrategy = local.Strategy  ///defino mi estrategia

const initializePassport = () =>{
    passport.use('register',new LocalStrategy(
        {passReqToCallback: true, usernameField :'email'},async(req,username,password,done)=>{
            const {first_name, last_name, email, age} = req.body
            try{
                const user = await userMongoDB.getElementByEmail(username)
                if(user){
                    return done(null,false)
                }
                const passwordHash = createHash(password)
                const userCreated = await userMongoDB.addElements([{
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    passport: passwordHash
                }])
                console.log(userCreated)
                return done (null,userCreated)
            }catch(error){
                return done (error)
            }
        }))
        ///inicializar la session del user
        
        passport.serializeUser((user,done) =>{
            done(null, user._id)
        })
        // eliminar la session del user
        passport.deserializeUser(async(id,done)=>{
            const user = userMongoDB.getElementById(id)
            done(null,user)
        })
        
        passport.use('login',new LocalStrategy({usernameField : email}, async ( username, password,done) =>{
            try {
                const user = await userMongoDB.getElementByEmail(username)
                if(!user){//usuario no encontrado
                    return done (null,false)
                }
                if(validatePassword(password,user.password)){//usuario y contraseña validos
                    return done(null,user)
                }
                return done (null,false) // contraseña no valida
            }catch(error){
                return done(error)
            }
        }))
}

export default initializePassport