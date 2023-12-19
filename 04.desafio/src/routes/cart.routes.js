import { Router } from "express";
import cartModel from "../dao/models/cart.model.js";

const router = Router();

router.get("/", async (req, res) => {

    const carts = await cartModel.find();
    res.send({
        status: "success",
        message: carts
    })
})

router.get("/:cid", async (req, res) => {

    const cid = req.params.cid;

    const cart = await cartModel.find({ _id: cid });

    res.send({
        status: "success",
        message: cart
    })
})

router.post("/", async (req, res) => {

     
    const {id}= req.body;
    if (!id) {
        return res.status(400).send({
            status: "error",
            message: "Todos los campos son obligatorios"
        })
    }
    const cart = {
        id,
        products: []
    }
    const result = await cartModel.create(cart);

    res.send({
        status: "success",
        message: result
    })
})


export default router;