import express from 'express';
import usuariosManagers from './usuariosManagers.js';

const PORT = 8080;

const app = express();

const productManager = new usuariosManagers('./files/Productos.json');

app.listen(PORT, () => {
    console.log(`Servidor fucnionando en el puerto: ${PORT}`);
});

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    const limit = req.query.limit;
    if(limit) {
        res.send(productList.slice(0, limit));
    } else {
        res.json(products);
    }
});

app.get('/products/:pid', async (req, res) => {
    const products =  await productManager.getProducts();
    const pid = req.params.pid;
    const product = products.find((pro)=>{
        return pro.id === pid;
    });
        if(!product){
            return res.send({
                error: 'Producto no encontrado'
            })
        }
        res.json({product});
});
