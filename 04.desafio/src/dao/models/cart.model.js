import mongoose from "mongoose";

const collection2 = "Cart";

const cartSchema = new mongoose.Schema({
    id: String,
    products: Array
})


const cartModel = mongoose.model(collection2, cartSchema);


export default  cartModel;