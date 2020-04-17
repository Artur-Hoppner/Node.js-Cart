
//Dagsläge: Express, och database fungerar. Det som fungerar är Get cart & get products

const express = require('express');
const app = express();
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = lowdb(adapter);
const porting = process.env.PORT || 3000;
const cors = require('cors') 

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())




// ******* INITIATE GET PRODUCTS *******
const getProducts = async () => {
   return await database.get('products');
}

// ******* INITIATE GET CART *******
const getCart = async () => {
    return await database.get('cart');
}


// ******* GET ALL PRODUCTS *******
app.get('/products', async (req, res) => {
    products = await getProducts();
    // data = products.value();     // Can use product.find(id:1).value(); if you want
    res.send(products);
})


// ******* GET ALL CART *******
app.get('/cart', async (req, res) => {
    cart = await getCart();
    data = cart.value()
    // res.send({message: 'party'});
    res.send(data);

});



// RANDOM SHIT 27:25
// app.get('/cart/:id', async (req, res) => {
//     res.send(req.params.id);
// } );



// ADD ITEM TO CART
app.post('/add', async (req, res) => {
    prod = await database.get('products').find({ id: 1 }).value();

cart = await database.get('cart')
.push(prod)
// .write()
;

res.send(cart)

});



// const findIdProducts = async (id) => {
//     const response = await database.get('products').find({ id: id }).value();
    // if (response = !true) {
    //  return response;
    // }
//  }











// CREATE LOCALHOST
app.listen(porting, () => 
console.log(`Creating server on port: ${porting}`))



// ERROR
app.use((req, res,) =>{
    res.status(404).send("404 site does not exist");
});




// tryck på product.
// Om product redan är tillagd får du ett felmeddelande. id == id message error
// om produkten inte är tillagd. push. id, namn, pris, bild
// 
// 
// 


/*

addToCart(state, item) {
      
    state.cart.push({
      id: item.id , //getting duplicate error
      price: item.price,
      title: item.title,
      quantity: 1
    });
  },

addItem({commit, state}, item) {

    let index = item.id
    if(state.cart.find(i => i.id === item.id)) {
      commit("updateItem", index);
    }else{
      commit("addToCart", item);
    }
  }

*/







// EARLIER ADD ITEM
// const addToCart = async (id) => {
//     const res = await database.get('products').find({ id: 1 }).has().value();
//     if (res = true) {
//      return res;
//     }
//  }

//  app.post('/adding', async (req, res) => {
//     const id = req.query.id;
//     const data = await addToCart(parseInt(id));
//     res.send(data);

//     const response = await database.get('cart').push(data).write();
//     res.send(response);

// });








//__________________________________________________________________________________________
// body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
// const bodyParser = require("body-parser");
//  * bodyParser.urlencoded(options)
//  * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
//  * and exposes the resulting object (containing the keys and values) on req.body
//  *
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// *bodyParser.json(options)
 // * Parses the text as JSON and exposes the resulting object on req.body / request.body.
// app.use(bodyParser.json());
//__________________________________________________________________________________________






// post för lägga till en produkt + kallar på en funktion för att köra db.get osv

// app.delete för att ta bort produkter i + kallar på en funktion för att köra db.get osv