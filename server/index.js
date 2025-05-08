const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute")
const chatRoute = require("./routes/chatRoute")

const app = express();
require("dotenv").config()

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute)
app.use("/api/chat/", chatRoute)
//CRUD 

app.get("/", (req, res) => {
    res.send("Bienvenido a la API de nuestro chat ;P")
});

const port = process.env.PORT || 5000; //Puede que el port no siempre este para usarse
const uri = process.env.ATLAS_URI;

app.listen(port, (req, rest) => {
    console.log(`Server ruuning on port..... ${port}`);
})

mongoose.connect(uri, {}).then(() => console.log("MongoDB connection established")).catch((error) => console.log("MongoDB connection failed: ", error.message));