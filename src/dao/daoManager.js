
export const getManagerProductos = async () =>{
    const modeloProducto = process.env.SELECTEDBDD === 1 ? await import('./MongoDB/models/Product') : await import('./Postgresql/models/Product')
    return modeloProducto
}
export const getManagerCart = async () => {
    const modelCart = process.env.SELECTEDBDD == 1 ? await import('./MongoDB/models/Cart.js') :
        await import('./Postgresql/models/Cart.js')
    return modelCart
}
export const getManagerMensajes = async () =>{
    const modeloMensajes = process.env.SELECTEDBDD === 1 ? await import('./MongoDB/models/Message') : await import('./Postgresql/models/Message')
    return modeloMensajes
}
export const getManagerUsers = async () => {
    const modelUser = process.env.SELECTEDBDD == 1 ? await import('./MongoDB/models/User.js') :
        await import('./Postgresql/models/User.js')

    return modelUser
}