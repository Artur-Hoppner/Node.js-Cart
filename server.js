
//Uppgift är inte klar.

const express = require('express');
const lowdb = require('lowdb');
const app = express();
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = lowdb(adapter);
const port = process.env.PORT || 2000;



//get product object:
const getProducts = async () => {
    return await database.get('products').value();
}

app.get('/products', async (req, res) => {
    const products = await getProducts();
    res.send(products);
})


//add to cart:
const addToCart = async (id) => {

   const response = await database.get('products').find({ id: id }).has().value();
   if (response = true) {
    return response;


   }
   
    // 1 Kolla om produkten finns i products
    // 2 Kolla så att produkten ej finns i cart
    // 3 Lägg till i cart
    // 4 Annars skicka felmeddelande

}

app.post('/cart/add', async (req, res) => {
    const id = req.query.id;
    const data = await addToCart(parseInt(id));
    res.send(data);

            /*const response = await database.get('cart')
                        .push(response).write(); //går det att använda om getProducts?
    return response;*/
});



//get cart object:
const getCart = async () => {
    return await database.get('cart').value();
}

app.get('/cart', async (req, res) => {
    const cart = await getCart();
    res.send(cart);
});





// app.delete('/delete', async (req, res) => {
//     const products = await getProducts();
//     res.send(products);
// });

app.use((req, res,) =>{
    res.status(404).send("404 site does not exist");
});

app.listen(port, () => 
console.log(`Creating server on port: ${port}`))



// HOW TO:
/*
https://expressjs.com/en/guide/routing.html
https://medium.com/@etiennerouzeaud/how-create-an-api-restfull-in-express-node-js-without-database-b030c687e2ea
*/


// Change the 404 message modifing the middleware




/* 404
Skapa en ny databas:
database.defaults({ products/Cart: [], count: 0 }).write()
Egenskaper?
 */
//___________________________________________________________________________




        /* Felmeddelande produkter */
//___________________________________________________________________________
/*
1.   Man ska inte kunna lägga till samma produkt i varukorgen igen.
2.   Man ska få ett felmeddelande om man försöker lägga till en produkt som inte finns.
3.   Man ska få ett felmeddelande om man försöker ta bort en produkt som inte finns.
*/
//___________________________________________________________________________


// Get alla produkter + kallar på en funktion för att köra db.get osv

// Get varukorg + kallar på en funktion för att köra db.get osv

// post för lägga till en produkt + kallar på en funktion för att köra db.get osv

// app.delete för att ta bort produkter i + kallar på en funktion för att köra db.get osv