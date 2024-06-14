const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// Create User model
const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serving static files

// Route for serving HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route for handling form submission
app.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save((err) => {
    if (err) {
      console.log(err);
      res.send('Error occurred while registering the user.');
    } else {
      res.send('User registered successfully!');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
