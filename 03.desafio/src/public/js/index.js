const socketClient=io()

socketClient.on("enviodeproducts",(obj)=>{
    updateProductList(obj)
})


function updateProductList(productList) {
 
    const productsDiv  = document.getElementById('list-products')

    let productosHTML = "";
  
    productList.forEach((product) => {
        productosHTML += `<div>
        <div>code: ${product.code}</div>
        <div>
            <h4 >${product.title}</h4>
            <p >
            <ul >
            <li>id: ${product.id}</li>
            <li>description: ${product.description}</li>
            <li>price: $${product.price}</li>
            <li>category: ${product.category}</li>
            <li>status: ${product.status}</li>
            <li>stock: ${product.stock}</li>
            </ul>
            </p>
        </div>
        <div >
        <button type="button" onclick="deleteProduct(${product.id})">Eliminar</button>
        </div>
        
    </div>
</div>`;
    });
  
    productsDiv .innerHTML = productosHTML;
  }


  let form = document.getElementById("formProduct");
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
  
    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let stock = form.elements.stock.value;
    let category = form.elements.category.value;
    let price = form.elements.price.value;
    let code = form.elements.code.value;
  
    socketClient.emit("addProduct", {
      title,
      description,
      stock,
      category,
      price,
      code
  
    });
  
    form.reset();
  });


  
  //para eliminar por ID
  document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteidinput = document.getElementById("id-prod");
    const deleteid = parseInt(deleteidinput.value);
    socketClient.emit("deleteProduct", deleteid);
    deleteidinput.value = "";
  })



//para eliminar el producto directamente 
function deleteProduct(productId) {
  socketClient.emit("deleteProduct", productId);
}