import { Router } from "express";
import  __dirname  from "../utils.js";
import {ProductManagerFile} from "../managers/ProductsManagerFile.js";

const path = "products.json";
const productManagerFile = new ProductManagerFile(path);
const router = Router();

router.get("/", async (req, res) => {
    const lista = await productManagerFile.getProducts()
    res.render("home",{lista})
})

router.get("/realtimeproducts", async (req,res)=>{
    res.render("realtimeproducts")
    })

export default router