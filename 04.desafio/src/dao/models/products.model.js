import mongoose from "mongoose";

const collection = "Product";


const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    stock: Number,
    category: String
})


const productModel = mongoose.model(collection, productSchema);

export default productModel;