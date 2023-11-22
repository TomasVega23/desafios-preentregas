import express from 'express';
import usuariosManagers from './usuariosManagers.js';

const PORT = 8080;

const app = express();

const productManager = new usuariosManagers('./files/Productos.json');

app.listen(PORT, () => {
    console.log(`Servidor fucnionando en el puerto: ${PORT}`);
});

app.get('/products', async (req, res) => {    
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const products = await productManager.getProducts(limit);
    res.json({ products });
});

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});
