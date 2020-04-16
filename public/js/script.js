// ******** GET ALL PRODUCTS ********
async function getProduct(){
    try {
    let get = await fetch('http://localhost:3000/products');
    let response = await get.json();
    console.log(response);
    console.log(response[1].price);
}catch (err) {
    console.error(err)
    }
};

getProduct()

// ******** GET ALL CART ********
async function getCart(){
    try {
    let get = await fetch('http://localhost:3000/cart');
    let response = await get.json();
    console.log(response);
}catch (err) {
    console.error(err)
    }
};

getCart()


