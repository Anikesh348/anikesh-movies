const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const path = require('path');

const mongoose = require("mongoose");
const connect = mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));
app.use('/api/favorite', require('./routes/favorite'));


app.use('/uploads', express.static('uploads'));

// if in production
if (process.env.NODE_ENV === "production") {

  // static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
  let url = path.join(__dirname, '../client/build', 'index.html');
  if (!url.startsWith('/app/')) 
    url = url.substring(1);
  res.sendFile(url);
});
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});