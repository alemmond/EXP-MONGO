const { MongoClient } = require("mongodb");

// The uri string must be the connection string for the database (obtained on Atlas).
const uri = "mongodb+srv://user1:tGUTAs9p6Kr7sx7q@cluster0.ky0inel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// --- This is the standard stuff to get it to work on the browser
const express = require('express');
const app = express();
const path = require('path');

const port = 3000;
app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes will go here

// Serve the login page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'login-page.html'));
});

// Serve the registration page
app.get('/registration', function(req, res) {
    res.sendFile(path.join(__dirname, 'registration-page.html'));
});

// Handle registration form submission
app.post('/register', function(req, res) {
  // Handle registration logic

  // Redirect to the dashboard page after successful registration
  res.redirect('/dashboard');
});

// Handle login form submission
app.post('/login', function(req, res) {
  // Handle login logic

  // Redirect to the dashboard page after successful login
  res.redirect('/dashboard');
});

// Serve the dashboard page
app.get('/dashboard', function(req, res) {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Serve static files (like script.js)
app.use(express.static(__dirname));



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
