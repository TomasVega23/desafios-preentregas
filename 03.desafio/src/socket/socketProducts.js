import {ProductManagerFile} from "../managers/ProductsManagerFile.js";
import  __dirname  from "../utils.js";

const path = "products.json";
const pm = new ProductManagerFile(path);

const socketProducts = (socketServer) => {
    socketServer.on("connection",async(socket)=>{
        console.log("client connected con ID:",socket.id)
        const listadeproductos=await pm.getProductsView()

        socketServer.emit("enviodeproducts",listadeproductos)

        socket.on("addProduct",async(obj)=>{
            await pm.createProduct(obj)
            const listadeproductos=await pm.getProductsView()
            socketServer.emit("enviodeproducts",listadeproductos)
            })

            socket.on("deleteProduct",async(id)=>{
               
               await pm.deleteProduct(id)
                const listadeproductos=await pm.getProductsView()
                socketServer.emit("enviodeproducts",listadeproductos)
                })
        
    })
};

export default socketProducts;