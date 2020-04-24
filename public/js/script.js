// ******** GET ALL PRODUCTS ********
async function getProduct(){
    try {
        let get = await fetch('http://localhost:3000/products');
        let response = await get.json();
        productList(response);

    }catch (err) {
        console.error(err)
        }
};

getProduct();



function productList(response){
   
    response.forEach(
        (item) => {
            const productListContainer = document.querySelector("#productListContainer")
            // need all three lines. Can shorten the code and add create element and inneHTML together. But then you cant add class in this manner.
            productName = document.createElement('li');
            productName.innerHTML = item.name;
            productName.classList.add("product-name");
            productListContainer.append(productName)

            productPrice = document.createElement('li');
            productPrice.innerHTML = item.price;
            productPrice.classList.add("product-price");
            productListContainer.append(productPrice)

            incrementButton = document.createElement('BUTTON')
            incrementButton.innerHTML = "Add Product";
            incrementButton.classList.add("add-product");
            productListContainer.append(incrementButton)

    
            incrementButton.addEventListener("click", () => {
                productId = item.id
                addProductToCart(productId)
            });
      }   
)};


/*****  ADD TO CART/ INCREASE QUANTITY *****/

  function addProductToCart(productId) {
    const url = 'http://localhost:3000/addToCart';
    console.log()
  fetch(url, { method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({productId}),
})
.then(data => {
  console.log(data)
})
.catch(error => {
    console.error(error);
});
  };
  


// ******** GET ALL CART ********
async function getCart(){
    try {
    let get = await fetch('http://localhost:3000/cart');
    let response = await get.json();
    console.log(response, "cart");

    cartList(response);

}catch (err) {
    console.error(err)
    }


};

getCart();

function cartList(response){
    response.forEach(
        (item) => {
            document.getElementById("cartItem").innerHTML += item.name + "<br>"; 
            document.getElementById("cartItem").innerHTML += item.price + "<br>"; 
            document.getElementById("cartItem").innerHTML += item.quantity + "<br>"; 

        }
)};

async function addItem(){
    try {
    let post = await fetch('http://localhost:3000/add');
    let response = await post.json();
    console.log(response);
}catch (err) {
    console.error(err)
    }
};


