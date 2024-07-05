const express = require('express');
const mongoose = require('mongoose');
const authRoutes= require("./routes/authRoutes");
const cookieParser = require('cookie-parser');
const { requireAuth,checkUser } = require("./middleware/authMiddleware");
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://shiva:manager@cluster0.qhs4v1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000,()=> console.log("server on")))
  .catch((err) => console.log(err));

//Applyting this middleware to all the routes(get)
app.get('*', checkUser);
// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

// app.get('/set-cookies', (req,res)=>{
//     res.cookie('newUser',true);
//     res.cookie('anotherCook',false);
//     res.cookie('Cook',"valueisCook");
//     res.send("Cookies created success");
// })
// app.get('/get-cookies', (req,res)=>{
//     const cookies = req.cookies;
//     console.log(cookies);
//     res.json(cookies);
// })
app.use(authRoutes);