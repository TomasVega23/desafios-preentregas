import {Router} from "express";
import userModel from "../dao/models/users.model.js";
import { createHash, validatePassword } from "../utils.js";
import passport from "passport"
import jwt from "jsonwebtoken";


const router = Router();

router.post("/usersregister", passport.authenticate("register",{passReqToCallback:true, session:false, failureRedirect:'api/sessions/failedRegister',
failureMessage:true}), (req,res)=>{
    res.send({
        status:"success",
        message:"Usuario regsitrado",
        payload:req.user._id
    })
});

router.get("/failedRegister", (req,res)=>{
    console.log('Mal registro');
    res.send("Fallo en el registro")
})

router.post("/login", passport.authenticate("login",{failureRedirect:"api/sessions/failedLogin",
session:false}),(req,res)=>{
    const serializedUser ={
        id: req.user._id,
        name : `${req.user.first_name} ${req.user.last_name}`,
        role: req.user.rol,
        email:req.user.email
    };
    const token = jwt.sign(serializedUser, 'CodeerSecret',{expiresIn:"1h"});
    console.log(token);
    res.cookie('coderCookie',token,{maxAge:3600000}).send({
        status:"succes",
        payload:serializedUser
    })
})

router.get("/failedLogin", (req,res)=>{
    console.log('Mal Login');
    res.send("Fallo en el Login")
})

router.get("/current", (req, res) => {
    if (req.isAuthenticated()) {
      // Si el usuario está autenticado, devuelve la información del usuario
      const serializedUser = {
        id: req.user._id,
        name: `${req.user.first_name} ${req.user.last_name}`,
        role: req.user.role,
        email: req.user.email,
      };
      res.json(serializedUser);
    } else {
      // Si el usuario no está autenticado, devuelve un código de estado 401
      res.status(401).json({ message: 'No autenticado' });
    }
  });

router.get("/github", passport.authenticate("github", {scope:['user:email']}), async (req,res)=>{});

router.get("/githubcallback", passport.authenticate("github", {failureRedirect:'/login'}), async (req,res)=>{
    req.session.user = req.user;
    res.redirect("/products")
});

router.get('/logout', (req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.status(500).send({
                status: 'error',
                error: 'No se pudo desloguear'
            })
        }
        res.redirect('/login')
    })
})
router.post("/restartPassword", async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password) return res.status(400).send(
        res.send({
            status:"error",
            message:"Datos incorrectos"
        })
    )
    const user = await userModel.findOne({email});
    if(!user) return res.status(400).send(
        res.send({
            status:"error",
            message:"No existe el usuario"
        })
    )
    const newHashPassword = createHash(password);

    await userModel.updateOne({_id:user._id},{$set:{password:newHashPassword}});
    res.send({
        status:"success",
        message:"contraseña restaurada"
    })
})
export default router;