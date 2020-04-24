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
    // data = products.find({id:1});
    // data = products.fins()[0];

    res.send(products);
})


// ******* GET ALL CART *******
app.get('/cart', async (req, res) => {
    cart = await getCart();
    // data = cart.value()
    res.send(cart);
});


// ******* ADD ITEM TO CART ****** 
app.post('/addToCart', async (req, res) => {
    const bodyitemId = req.body.productId
 
        product = await database.get('products')
          .findIndex( {id:bodyitemId})
          .value();

        cartId = await database.get('cart')
          .find( {id:bodyitemId} )
          .value();

        addToCart = await database.get('cart')   

    if(cartId === undefined) {
          console.log(" Running if: add item to cart")
          adding = addToCart
            .push(product)
            .write();
            
          res.send(adding)

    } if (cartId == bodyitemId) {
          console.log(" Running else if: Increment cart-item")
        try {
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
    } else {
          console.log("shit went down and you did the impossible and tried to add a product thats not in our database. Congratulation for being a hacker or just a dumbass!")
      }

});


app.delete("/delete", async (request, response) => {

  /*
  1 recive id
  2 search id in cart
  3 if: recived id === !id: msg: product doesnt exist in in cart
  4 if else: id === id decrement quantity of id object
      4.1 if quantity of id =<0 
   */
    data = await database.get('cart')
      .remove({id:1})
      .write();
      response.send(data)
});




// CREATE LOCALHOST
app.listen(porting, () => 
console.log(`Creating server on port: ${porting}`))



// ERROR
app.use((req, res,) =>{
    res.status(404).send("404 site does not exist");
});



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











app.post('/addingitem/:id', async (req, res) => {

    const itemId = req.params.id



   
  addToCart = await database.get('cart')

  adding = addToCart
      .push(itemId)
      .write();

  res.send(adding)


});