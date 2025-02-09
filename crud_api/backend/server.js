const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 5000

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals",require("./routes/goalRoutes.js"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log("Server running on port ",port);
})
