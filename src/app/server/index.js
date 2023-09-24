const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});

mongoose
  .connect('mongodb+srv://CatConnect:catConnect2023@bancocatconnect.qqj0z5w.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use("/", authRoutes);
