const { MongoClient } = require("mongodb");

// The uri string must be the connection string for the database (obtained on Atlas).
const uri = "mongodb+srv://user1:tGUTAs9p6Kr7sx7q@cluster0.ky0inel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// --- This is the standard stuff to get it to work on the browser
const express = require('express');
const app = express();
const fs = require('fs');
const cookieParser = require('cookie-parser');
const port = 3000;
app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes will go here

// Default route:
app.get('/', function(req, res) {
  // Read the content of the HTML file containing the login container
  fs.readFile('login-page.html', 'utf8', function(err, data) {
    if (err) {
      // Handle error if file reading fails
      console.error('Error reading the login page:', err);
      res.status(500).send('Error reading the login page');
      return;
    }
    // Send the content of the login page as the response
    res.send(data);
  });
});

//registration:
app.use(cookieParser());

app.use(express.static('public'));

app.get('/register', function(req, res) {
    res.sendFile(__dirname + '/register');
});

// Handle registration form submission
app.post('/registration-page.html', function(req, res) {
    const { username, password } = req.body;

    // Here, you would typically save the user's information to a database
    // For demonstration purposes, we'll just set a cookie with the user's information
    res.cookie('userData', { username, password }, { maxAge: 900000, httpOnly: true });

    res.send('Registration successful!');
});


// Route to access database:
app.get('/api/mongo/:name', function(req, res) {
const client = new MongoClient(uri);
const searchKey = "{ partID: '" + req.params.name + "' }";
console.log("Looking for: " + searchKey);

async function run() {
  try {
    const database = client.db('database415');
    const parts = database.collection('collection415');

    // Hardwired Query for a part that has partID '12345'
    // const query = { partID: '12345' };
    // But we will use the parameter provided with the route
    const query = { name: req.params.name };

    const part = await parts.findOne(query);
    console.log(part);
    res.send('Found this: ' + JSON.stringify(part));  //Use stringify to print a json

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
});
