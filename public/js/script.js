
// ******** GET ALL PRODUCTS ********
async function getProduct(){
    try {
        let get = await fetch('http://localhost:3000/products');
        let response = await get.json();
        productList(response);

    }catch (err) {
        console.error(err);
        }
};

getProduct();

// ******** Add product to html elementa ********
function productList(response){ 

    response.forEach(
        (item) => {
            const productListContainer = document.querySelector("#productListContainer");
            // need all three lines. Can shorten the code and add create element and inneHTML together. But then you cant add class in this manner.
            
            productContainer = document.createElement('div');
            productContainer.classList.add("nes-container", "is-rounded", "is-dark");
            productListContainer.append(productContainer);

            productName = document.createElement('p');
            productName.innerHTML = item.name;
            productName.classList.add("product-name");
            productContainer.append(productName);
            
            productImg = document.createElement("img");
            productImg.src = item.img;
            productImg.classList.add("image");
            productContainer.append(productImg);

            productPrice = document.createElement('p');
            productPrice.innerHTML = item.price + "kr";
            productPrice.classList.add("product-price");
            productContainer.append(productPrice);


            incrementButton = document.createElement('BUTTON');
            incrementButton.innerHTML = "Add Product";
            incrementButton.classList.add("nes-btn", "is-success");
            productContainer.append(incrementButton);

            incrementButton.addEventListener("click", () => {
                productId = item.id
                addProductToCart(productId);
            });
      }   
)

};

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
      console.log(data);
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

// ******** Add cartProduct to html elementa ********
function cartList(response){
  totalQuantity = 0;
  totalPrice = 0;
    response.forEach(
        (item) => {
            const conatinerCart = document.querySelector("#cartListContainer");



            totalQuantity += item.quantity


            totalPrice += item.quantity  * item.price 

          
            cartListContainer = document.createElement('div');
            cartListContainer.classList.add("nes-container", "is-rounded", "is-dark");
            conatinerCart.append(cartListContainer);

            productName = document.createElement('p');
            productName.innerHTML = item.name;
            productName.classList.add("cart-name");
            cartListContainer.append(productName);

            productPrice = document.createElement('p');
            productPrice.innerHTML = item.price + "kr";
            productPrice.classList.add("cart-price");
            cartListContainer.append(productPrice);

            incrementButton = document.createElement('BUTTON');
            incrementButton.innerHTML = "+";
            incrementButton.classList.add("nes-btn", "is-success");
            cartListContainer.append(incrementButton);

            incrementButton.addEventListener("click", () => {
                productId = item.id
                addProductToCart(productId);
            });

            decrementButton = document.createElement('BUTTON');
            decrementButton.innerHTML = "-";
            decrementButton.classList.add("nes-btn", "is-error");
            cartListContainer.append(decrementButton);

            decrementButton.addEventListener("click", () => {
                productId = item.id
                deleteCartItem(productId);
            });
            
        }
)

document.getElementById("totalQuantity").innerHTML = "[" + totalQuantity + "]";
document.getElementById("totalCartPrice").innerHTML = "TOTAL: " + totalPrice + "kr";



};



function deleteCartItem(productId) {
    const url = 'http://localhost:3000/decrement';
    console.log()
  fetch(url, { method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({productId}),
})
.then(data => {
  console.log(data);
})
.catch(error => {
    console.error(error);
});
  };