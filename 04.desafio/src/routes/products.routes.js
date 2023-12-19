import { Router } from "express";
import productModel from "../dao/models/products.model.js";


const router = Router();

router.get("/", async (req, res) => {
    
    const products = await productModel.find();

    res.send({
        status: "success",
        message: products
    })
})


router.get("/:pid", async (req, res) => {
    
    const id = req.params.pid;

    const product = await productModel.find({ _id: id });

    res.send({
        status: "success",
        message: product
    })
})


router.post("/", async (req, res) => {
    
    const {title, description, code, price, stock, category}= req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).send({
            status: "error",
            message: "Todos los campos son obligatorios"
        })
    }
    const product = {
        title,
        description,
        code,
        price,
        stock,
        category
    }
    const result = await productModel.create(product);

    res.send({
        status: "success",
        message: result
    })
})

router.put("/:pid", async (req, res) => {

    const id = req.params.pid;

    const {title, description, code, price, stock, category}= req.body;

    const updatedProduct = {
        title,
        description,
        code,
        price,
        stock,
        category
    }
    const result = await productModel.updateOne({ _id: id }, {$set:updatedProduct});
    res.send({
        status: "success",
        message: result
    })
})

router.delete("/:pid", async (req, res) => {
    
    const id = req.params.pid;
    const result = await productModel.deleteOne({ _id: id });

    res.send({
        status: "success",
        message: result
    })
})

export default router;