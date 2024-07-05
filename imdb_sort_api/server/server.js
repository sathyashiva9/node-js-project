require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./db");
const Movie = require("./models/movieModel");
const movieRoutes = require("./routes/movies");
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use("/api", movieRoutes);





app.listen(5000, () => {
    console.log("Server is on");
})