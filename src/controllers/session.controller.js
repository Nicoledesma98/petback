export const getSession = (req,res,next) =>{
    if(req.session.login) {// sesion activa va a los productos
        res.redirect('/product', 200 , {
            'message': 'Bienvenido a mi tienda'
        })
    } else {///no esta activa la sesion redirecciona al login
        res.redirect('/api/user/login', 500 , {

        })
    }
}

export const testLogin = (req,res,next) =>{
    const {email,password} = req.body
    try{
        if (!req.user) {
            return res.status(401).send({status: "error",error: "invalidate User"})
        }  
        req.session.user = {
            first_name: req.user.first_name,
            last_name : req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }
        res.status(200).send({status: "success",payload: req.user})
    }catch(error){
        res.status(500).send.json({
            message: error.message
        })
    //     if(email == "n@n.com" && password == "1234"){
    //         req.session.login = true
    //         res.redirect("/product")
    //     }else {
    //         res.redirect("/api/user/login")
    //     }
    // }catch(error){
    //     res.status(500).json({
    //         message: error.message
    //     })

    }
}

export const destroySession = (req,res,next) =>{
    if(req.session.login) {
        req.session.destroy(() => {
            res.redirect("/api/user/login")
        })
    }
}