const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const adotanteRoutes = require("./routes/adotanteRoutes");
const gatinhosRoutes = require("./routes/gatinhosRoutes");
const adocaoRoutes = require("./routes/adocaoRoutes");
const status = require("./routes/statusRoutes");

require('dotenv').config();

const app = express();

app.listen(process.env.PORT_SERVER, (err) => {
  if (err) {
    console.log(err);
  } else {
      console.log(`Server Started Successfully on port ${process.env.PORT_SERVER}.`);
  }
});

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connection Successful");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use(
  cors({
    origin: [process.env.PORT_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use("/", userRoutes);
app.use("/", gatinhosRoutes);
app.use("/", adotanteRoutes);
app.use("/", adocaoRoutes);
app.use("/", status);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo deu errado!");
});
