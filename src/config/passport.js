import local from 'passport-local' 
import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import jwt from 'passport-jwt'
import { findElementByEmail,getElementById,addElements } from '../services/UserServices.js'
import { createHash,validatePassword} from '../utils/bcrypt.js'
import { generateToken } from '../utils/jwt.js'

///passport se va a trabajar como un middleware
const LocalStrategy = local.Strategy  ///defino mi estrategia
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () =>{

    const cookieExtractor = req =>{
        console.log(req.cookies)
        //{} no hay cookies != esta cookie no existe
        //Si existen las cookies, asigno mi cookie en especifico sino asigno null
        const token = req.cookies ? req.cookies.jwtCookie : {}
        console.log('esto es token',token)
        return token
    }
    

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),/// el token se extrae desde las cookies
        secretOrKey: process.env.PRIVATE_KEY_JWT///desesncriptar
    },async(jwt_payload,done)=>{
        try{
            return done(null,jwt_payload)
        }catch(error){
            return done(error)
        }
    }))

    passport.use('register',new LocalStrategy(
        {passReqToCallback: true, usernameField :'email'},async(req,username,password,done)=>{
            const {first_name, last_name, email, age} = req.body
            try{
                const user = await findElementByEmail(username)
                if(user){
                    return done(null,false)
                }
                const passwordHash = createHash(password)
                const userCreated = await addElements([{
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    passport: passwordHash
                }])
                const accessToken = generateToken(userCreated)
                console.log(accessToken)
                return done (null,userCreated)
            }catch(error){
                return done (error)
            }
        }))
       
        
        passport.use('login',new LocalStrategy({usernameField : 'email'}, async ( username, password,done) =>{
            try {
                const user = await findElementByEmail(username)
                if(!user){//usuario no encontrado
                    return done (null,false)
                }
                if(validatePassword(password,user.password)){//usuario y contraseña validos
                    console.log("esto es validate password", password, "esto es user password",user.password)
                   const accessToken = generateToken(user)
                   console.log(accessToken)
                    return done(null,user)
                }
                return done (null,false) // contraseña no valida
            }catch(error){
                return done(error)
            }
        }))

        passport.use('github',new GitHubStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },async (accessToken, refreshToken,profile,done) =>{
            try{
                console.log(accessToken)
                const user = await findElementByEmail(profile._json.email)
                if(user){//si existe user en la bdd
                    done(null,user)
                }else{
                    const userCreated = await addElements([{
                        first_name: profile._json.name,
                        last_name:' ',//porque github no posee nombre y apellido
                        email: profile._json.email,
                        age: 25,//github no define la edad
                        password:' ',//no puedo asignar una contraseña porque github ya me ofrece una
                    }])
                    done(null,userCreated)
                }
            }catch(error){
                return done(error)
            }
        }))
         ///inicializar la session del user
        
         passport.serializeUser((user, done) => {
            if (Array.isArray(user)) {
                done(null, user[0]._id)
            }else{
                done(null, user._id)
            }
        })
        // eliminar la session del user
        passport.deserializeUser(async(id,done)=>{
            const user = getElementById(id)
            done(null,user)
        })
}

export default initializePassport