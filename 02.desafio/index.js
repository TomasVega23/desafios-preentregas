import usuariosManagers from './src/usuariosManagers.js'

const manager = new usuariosManagers('productos.json');

const product = async () => {
    let newProduct = {
        title: 'Nuevo Producto',
        description: 'Descripción del nuevo producto',
        price: 19.99,
        thumbnail: 'path/to/image.jpg',
        code: 'ABC123',
        stock: 50,
    };

    let agregarProducto = await manager.addProduct(newProduct)
    console.log(agregarProducto)

    let allProducts = await manager.getProducts();
    console.log('Todos los productos:', allProducts);   

    const productId = 1;
    const foundProduct = await manager.getProductById(productId);
    console.log(`Producto con ID ${productId}:`, foundProduct);

    const updatedProduct = {
        title: 'Producto Actualizado',
        price: 24.99,
        stock: 30,
      };
    
    const updateResult =  await manager.updateProduct(productId, updatedProduct);
    console.log('Producto actualizado:', updateResult ? 'Éxito' : 'No se encontró el producto');

    // const deleteResult =  await manager.deleteProduct(productId);
    // console.log('Producto eliminado:', deleteResult ? 'Éxito' : 'No se encontró el producto');
}

product()