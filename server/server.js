require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const vanaciesRoute = require("./routes/vanaciesRoute");
const sparePartsRoutes = require('./routes/spareParts');

// setup cors
const cors = require("cors");

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
//1
app.use("/api/vacancies", vanaciesRoute);
//Pehesarani
app.use('/api/spareParts', sparePartsRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connect to the DB and listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
