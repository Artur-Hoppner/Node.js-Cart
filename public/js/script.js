
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
            productName = document.createElement('li');
            productName.innerHTML = item.name;
            productName.classList.add("product-name");
            productListContainer.append(productName);

            productPrice = document.createElement('li');
            productPrice.innerHTML = item.price;
            productPrice.classList.add("product-price");
            productListContainer.append(productPrice);
            
            productImg = document.createElement("img");
            productImg.src = item.img;
            productImg.classList.add("image");
            productListContainer.append(productImg);

            incrementButton = document.createElement('BUTTON');
            incrementButton.innerHTML = "Add Product";
            incrementButton.classList.add("nes-btn", "is-success");
            productListContainer.append(incrementButton);

            incrementButton.addEventListener("click", () => {
                productId = item.id
                addProductToCart(productId);
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
    response.forEach(
        (item) => {
            const cartListContainer = document.querySelector("#cartListContainer");
            // need all three lines. Can shorten the code and add create element and inneHTML together. But then you cant add class in this manner.
            productName = document.createElement('li');
            productName.innerHTML = item.name;
            productName.classList.add("cart-name");
            cartListContainer.append(productName);

            productPrice = document.createElement('li');
            productPrice.innerHTML = item.price;
            productPrice.classList.add("cart-price");
            cartListContainer.append(productPrice);

            productquantity = document.createElement('li');
            productquantity.innerHTML = item.quantity;
            productquantity.classList.add("cart-quantity");
            cartListContainer.append(productquantity);

            totalPrice = document.createElement('li');
            totalPrice.innerHTML += item.price * item.quantity;
            totalPrice.classList.add("total-price");
            cartListContainer.append(totalPrice);

            incrementButton = document.createElement('BUTTON');
            incrementButton.innerHTML = "Increase";
            incrementButton.classList.add("nes-btn", "jdklsad");
            cartListContainer.append(incrementButton);

            incrementButton.addEventListener("click", () => {
                productId = item.id
                addProductToCart(productId);
            });

            decrementButton = document.createElement('BUTTON');
            decrementButton.innerHTML = "Decrease";
            decrementButton.classList.add("nes-btn", "decrement-button");
            cartListContainer.append(decrementButton);

            decrementButton.addEventListener("click", () => {
                productId = item.id
                deleteCartItem(productId);
            });
        }
)};


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