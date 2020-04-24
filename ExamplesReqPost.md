
HTML:

<form method="post" action="/">
    <input type="text" name="user[name]">
    <input type="text" name="user[email]">
    <input type="submit" value="Submit">
</form>
API client:

fetch('/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: {
            name: "John",
            email: "john@example.com"
        }
    })
});



Node.js: (since Express v4.16.0)

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post('/', function(request, response){
    console.log(request.body.user.name);
    console.log(request.body.user.email);
});
Node.js: (for Express <4.16.0)

const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post("/", function (req, res) {
    console.log(req.body.user.name)
});


__________________________________________________________________________________________________

There are multiple ways to do it. However, the quickest way I know is to use the Express.js library with body-parser.

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.post("/pathpostdataissentto", function(request, response) {
  console.log(request.body);
  //Or
  console.log(request.body.fieldName);
});

app.listen(8080);
That can work for strings, but I would change bodyParser.urlencoded to bodyParser.json instead if the POST data contains a JSON array.

More info: http://www.kompulsa.com/how-to-accept-and-parse-post-requests-in-node-j

__________________________________________________________________________________________________