
//Dagsläge: Express, och database fungerar. Det som fungerar är Get cart & get products

const express = require('express');
const app = express();
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = lowdb(adapter);
const porting = process.env.PORT || 3000;
const cors = require('cors') 

app.use(cors())




// GET PRODUCTS
const getProducts = async () => {
   return await database.get('products');
}

app.get('/products', async (req, res) => {
    products = await getProducts();
    data = products.value();
    res.send(data);
})
// Use product.find(id:1).value(); if you want


// GET CART
const getCart = async () => {
    return await database.get('cart');
}

app.get('/cart', async (req, res) => {
    cart = await getCart();
    data = cart.value()
    res.send(cart);
});


//RANDOM SHIT 27:25
app.get('/cart/:id', async (req, res) => {
    res.send(req.params.id);
} );

// ADD ITEM TO CART
// app.post('cart/addItem', (req, res) => {

//     res.send('')
// });

// app.post('/', function (req, res) {
//     res.send('POST request to homepage')
//   })


// REMOVE ITEM FROM CART
// app.delete(/cart/removeitem)




// CREATE LOCALHOST
app.listen(porting, () => 
console.log(`Creating server on port: ${porting}`))



// ERROR
app.use((req, res,) =>{
    res.status(404).send("404 site does not exist");
});






// EARLIER ADD ITEM
// const addToCart = async (id) => {
//     const res = await database.get('products').find({ id: id }).has().value();
//     if (res = true) {
//      return res;
//     }
//  }

//  app.post('/cart/add', async (req, res) => {
//     const id = req.query.id;
//     const data = await addToCart(parseInt(id));
//     res.send(data);

//     const response = await database.get('cart').push(response).write();
//     // return response;
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









// HOW TO:
/*
https://expressjs.com/en/guide/routing.html
https://medium.com/@etiennerouzeaud/how-create-an-api-restfull-in-express-node-js-without-database-b030c687e2ea
*/


// Change the 404 message modifing the middleware





        /* Felmeddelande produkter */
//___________________________________________________________________________
/*
1.   Man ska inte kunna lägga till samma produkt i varukorgen igen.
2.   Man ska få ett felmeddelande om man försöker lägga till en produkt som inte finns.
3.   Man ska få ett felmeddelande om man försöker ta bort en produkt som inte finns.
*/
//___________________________________________________________________________




// post för lägga till en produkt + kallar på en funktion för att köra db.get osv

// app.delete för att ta bort produkter i + kallar på en funktion för att köra db.get osv