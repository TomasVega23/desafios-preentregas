// DESAFÍO ENTREGABLE
//Clases con ECMAScript y ECMAScript avanzado

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct = (name, price, description, image, code, stock) => {
    let cantId = this.products.length;
    if (!name || !price || !description || !image || !code || !stock) {
      return "Son todos los datos requeridos";
    }

    const codeFind = this.products.find((product) => product.code === code);

    if (codeFind) {
      return "ya existe este codigo";
    }

    const newProduct = {
      id: cantId++,
      name,
      price,
      description,
      image,
      code,
      stock,
    };
    this.products.push(newProduct);
    return this.products;
  };

  getProducts = () => {
    return this.products;
  };
  getProductById = (idProduct) => {
    const product = this.products.find((product) => product.id === idProduct);

    if (product) {
      return product;
    } else {
      return "Not Found";
    }
  };
}

//Agregar un producto
const productManager = new ProductManager();

//Agregando productos
productManager.addProduct(
  "Cloud III Wireless",
  150,
  "Comodidad y durabilidad",
  "cloud.png",
  "AU1",
  10
);
productManager.addProduct(
  "Alloy Elite 2 ",
  99.9,
  "Retroiluminación RGB",
  "Alloy Elite2.png",
  "TL3",
  9
);

//Mostrar por consola los productos
console.log(productManager.getProducts());

//Productos por id
productManager.getProductById(0);
productManager.getProductById(1);

//Mostrar por consola los productos con su id
console.log(productManager.getProductById(1));
