const express = require('express');
const app = express();
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = lowdb(adapter);
const porting = process.env.PORT || 3000;
const cors = require('cors') 
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// ******* INITIATE GET PRODUCTS *******
const getProducts = async () => {
   return await database.get('products')
}


// ******* INITIATE GET CART *******
const getCart = async () => {
    return await database.get('cart');
}


// ******* GET ALL PRODUCTS *******
app.get('/products', async (req, res) => {
    products = await getProducts();
    res.send(products);
})


// ******* GET ALL CART *******
app.get('/cart', async (req, res) => {
    cart = await getCart();
    res.send(cart);
});


// ******* ADD ITEM TO CART ****** 
app.post('/addToCart', async (req, res) => {
    const bodyitemId = req.body.productId
 
        product = await database.get('products')
          .find( {id:bodyitemId})
          .value();

        cartId = await database.get('cart')
          .find( {id:bodyitemId} )
          .value();

        addToCart = await database.get('cart')   


        console.log(cartId.id, "CartID")
        console.log(bodyitemId, "bodyid")

    if(cartId === undefined) {
          console.log(" Running if: add item to cart")
          adding = await addToCart
            .push(product)
            .write();
            
          res.send(adding)

    } else if (cartId.id == bodyitemId) {
        try {
          console.log(" Running else if: Increment cart-item")

          itemId = await addToCart
          .find({id:bodyitemId})
          .value()

          itemQuantity = itemId.quantity +1;

          increment = await addToCart
          .find({id:bodyitemId})
          .assign({quantity: itemQuantity})
          .write()

          res.send(increment)
        
          } catch(err) {
          console.log(err)
        }
    } 
    else {
      res.status(404).send("Computor says no! https://tenor.com/view/computer-says-no-no-gif-12232216");
      console.log("shit went down and you did the impossible and tried to add a product thats not in our database. Congratulation for being a hacker or just a dumbass!")
      }

});

// ******* Decrement and remove cart-item *******
app.delete("/delete", async (request, response) => {

    data = await database.get('cart')
      .remove({id:1})
      .write();
      response.send(data)
});


// ******* CREATE LOCALHOST *******
app.listen(porting, () => 
console.log(`Creating server on port: ${porting}`))



// ERROR FOR ANY TRY ON PORT 3000 THAT DOESNT EXIST
app.use((req, res,) =>{
    res.status(404).send("404 site does not exist");
});

