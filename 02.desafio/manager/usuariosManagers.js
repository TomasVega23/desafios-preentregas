import fs from 'fs'

//const path = './files/Productos.json'

export default class productManager{
      constructor(path) {
        this.path = './files/Productos.json';
        this.nextId = 1;
        this.products = [];
        this.loadProducts();
      }
    
      loadProducts() {
        try {
          const data = fs.readFileSync(this.path, 'utf-8');
          this.products = JSON.parse(data);
          if (this.products.length > 0) {
            this.nextId = Math.max(...this.products.map(product => product.id)) + 1;
          }
        } catch (error) {
          // Handle file read error or empty file
          this.products = [];
        }
      }
    
      saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'), 'utf-8');
      }
    
      addProduct(product) {
        product.id = this.nextId++;
        this.products.push(product);
        this.saveProducts();
      }
    
      getProducts() {
        return this.products;
      }
    
      getProductById(id) {
        return this.products.find(product => product.id === id);
      }
    
      updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
          this.products[index] = { ...this.products[index], ...updatedProduct, id };
          this.saveProducts();
          return true;
        }
        return false;
      }
    
      deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
          this.products.splice(index, 1);
          this.saveProducts();
          return true;
        }
        return false;
      }
    }