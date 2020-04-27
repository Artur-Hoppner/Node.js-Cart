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
  try {
    const bodyitemId = req.body.productId
    
        product = await database.get('products')
          .find( {id:bodyitemId})
          .value();

        cartId = await database.get('cart')
          .find( {id:bodyitemId} )
          .value();

        cartObject = await database.get('cart')   


    if(cartId == undefined) {
          console.log(" Running if: add item to cart")
          addingToCart = await cartObject
            .push(product)
            .write();
            
          res.send(addingToCart)

    } else if (cartId.id == bodyitemId) {
        
          console.log(" Running else if: Increment cart-item")

          itemId = await cartObject
          .find({id:bodyitemId})
          .value()

          itemQuantity = itemId.quantity +1;
          console.log(itemId.img, "testing Img object")

          increment = await cartObject
          .find({id:bodyitemId})
          .assign({quantity: itemQuantity})
          .write()

          res.send(increment)
           
    } 
    else {
      res.status(404).send("Computor says no! https://tenor.com/view/computer-says-no-no-gif-12232216");
      console.log("Shit went down and you did the impossible and tried to add a product thats not in our database. Congratulation for being a hacker or just a dumbass!")
      }
    } catch(err) {
      console.log(err)
    }
});


// ******* Decrement and remove cart-item *******
app.delete('/decrement', async (req, res) => {
    const bodyitemId = req.body.productId
 
        product = await database.get('products')
          .find( {id:bodyitemId})
          .value();

        cartId = await database.get('cart')
          .find( {id:bodyitemId} )
          .value();

        cartObject = await database.get('cart')

        itemId = await cartObject
        .find({id:bodyitemId})
        .value()
        itemQuantity = itemId.quantity -1;

        console.log(cartId.id, "CartID")
        console.log(bodyitemId, "bodyid")

    if(itemId.id == bodyitemId && itemId.quantity > 1) {
      console.log("decrement cart quantity")
      increment = await cartObject
      .find({id:bodyitemId})
      .assign({quantity: itemQuantity})
      .write()

      res.send(increment)
    } else if (itemId.id == bodyitemId && itemId.quantity <= 1){
      console.log("else id: splice cart item")
      cartIndex =await cartObject
      .findIndex({id:bodyitemId})
      .value()


      deleteFromCart = await cartObject
      .splice(cartIndex, 1)
      .write()

      res.send(deleteFromCart)

    } else {
      res.status(404).send("error 404, cant delete what doesnt exist");
      console.log("delete error")
    }

});


// ******* CREATE LOCALHOST *******
app.listen(porting, () => 
console.log(`Creating server on port: ${porting}`))



// ERROR FOR ANY TRY ON PORT 3000 THAT DOESNT EXIST
app.use((req, res,) =>{
    res.status(404).send("404 site does not exist");
});