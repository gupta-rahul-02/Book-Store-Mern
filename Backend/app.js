const express = require("express");
const mongoose = require("mongoose");
const router = require('./routes/book.routes')
const cors = require('cors')
const app = express();

//middleware
app.use(express.json())
app.use(cors())
app.use("/books",router);
app.use('/',(req,res,next) =>{
    res.send('You got connection ')
})

mongoose
  .connect(
    "mongodb+srv://rahulguptaslg20:India11@bookstorecluster.ougt6ma.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
  })
  .then(() => {
    app.listen(5000, () => {
      console.log("Listening on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
