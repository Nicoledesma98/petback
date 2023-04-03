export const getSession = (req,res,next) =>{
    if(req.session.login) {// sesion activa va a los productos
        res.redirect('/product',{
            'divMessage': 'hola'
        })
    } else {///no esta activa la sesion redirecciona al login
        res.redirect('/api/user/login',{

        })
    }
}

export const testLogin = (req,res,next) =>{
    const {email,password} = req.body
    try{
        if(email == "n@n.com" && password == "1234"){
            req.session.login = true
            res.redirect("/product")
        }else {
            res.redirect("/api/user/login")
        }
    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
}

export const destroySession = (req,res,next) =>{
    if(req.session.login) {
        req.session.destroy(() => {
            res.redirect("/api/user/login")
        })
    }
}