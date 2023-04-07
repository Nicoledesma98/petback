import 'dotenv/config'
import express from "express"
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import multer from 'multer'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'
import * as path from 'path'
import { Server } from 'socket.io'
import {getManagerMensajes} from './dao/daoManager.js'
import router from './routes/routes.js'
import initializePassport from './config/passport.js'


const app = express()
//Middlewares
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODBURL,
        mongoOptions: {useNewUrlParser:true, useUnifiedTopology:true},
        ttl:30,
    }),
    secret : process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
//passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "./views"))

app.set('port',process.env.PORT || 5000)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

//Routes
app.use('/',router)


const server = app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`))
const io = new Server(server)
io.on('connection',async (socket) =>{
    socket.on('message',async (info) =>{
        const data = await getManagerMensajes()
        const managerMessage = new data.MensajeDaoMongoDB
        managerMessage.addElements().then((mensajes) =>{
            console.log(mensajes)
            socket.emit('allMessages',mensajes)
        })
    })
})