require("dotenv").config();
const express = require("express");
const axios = require("axios");
const connectDB = require("./db")
const TodoList = require("./models/todoModel");
// const path = require("path");
const app = express();



connectDB();


app.set("view engine","ejs");

app.get("/", async (req,res) => {
    const allTodos = await axios.get('http://localhost:5000/api/todo/allTodos')
    const all = allTodos.data
    const today = new Date()
    const overDue = await TodoList.find({ dueDate: {$lt: today},completed:false});
    const dueToday = await TodoList.find({ dueDate: today,completed:false});
    const dueLater = await TodoList.find({ dueDate: {$gt: today},completed:false});
    const completedItem = await TodoList.find({completed: true})
    console.log("all is",all);
    if(req.accepts('html')){
        // console.log("in browser console\n",allTodos.data);
        
        res.render('index',{ all, overDue, dueToday, dueLater, completedItem });
    }
    else{
        res.json(all);
    }
})

app.use(express.static(__dirname+"/public"));
// app.use(express.static(path.join(__dirname,'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todo", require("./routes/todoRoute"));

app.listen(5000, () => {
    console.log("Server listening on port 5000");
});