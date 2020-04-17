// ******** GET ALL PRODUCTS ********
async function getProduct(){
    try {
    let get = await fetch('http://localhost:3000/products');
    let response = await get.json();
    console.log(response);
    console.log(response[1].price);
    console.log(response[2]);

    addItem(response);



}catch (err) {
    console.error(err)
    }
};

getProduct();

// CHANGE: create own list se Programming ********************
function addItem(response){
    response.forEach(
        (item) => {
            document.getElementById("demo").innerHTML += item.name + "<br>"; 
            document.getElementById("demo").innerHTML += item.price + "<br>"; 
            document.getElementById("demo").innerHTML += item.img + "<br>"; 
      }
)};



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

getCart();


