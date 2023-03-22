import 'dotenv/config'
import express from "express"
import { Server } from 'socket.io'
import {getManagerMensajes} from './dao/daoManager.js'
import routerProd from './routes/productRoutes.js'
import routerCart from './routes/cartRoutes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/products',routerProd)
app.use('/cart',routerCart)

app.set('port',process.env.PORT || 5000)

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