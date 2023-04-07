
export const getManagerProductos = async () =>{
    const modeloProducto = process.env.SELECTEDBDD == 1 ? await import('./MongoDB/models/Product.js') : await import('./Postgresql/models/Product.js')
    return modeloProducto
}
export const getManagerCart = async () => {
    const modelCart = process.env.SELECTEDBDD == 1 ? await import('./MongoDB/models/Cart.js') :
        await import('./Postgresql/models/Cart.js')
    return modelCart
}
export const getManagerMensajes = async () =>{
    const modeloMensajes = process.env.SELECTEDBDD === 1 ? await import('./MongoDB/models/Message.js') : await import('./Postgresql/models/Message.js')
    return modeloMensajes
}
export const getManagerUsers = async () => {
    const modelUser = process.env.SELECTEDBDD == 1 ? await import('./MongoDB/models/User.js') :
        await import('./Postgresql/models/User.js')

    return modelUser
}