const express = require("express");

const app = express();

const client = require("./client");


app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.get("/", (req,res) => {
    res.send("Home Page");
    res.end();
})

app.get("/getUsers", (req,res) => {
    client.getUsers(null, (err,data) => {
        if(err){
            console.log(err.message);
            res.status(500).send({
                message: "Error"
            })
        }
        else {
            res.send(data);
        }
    })
})

app.post("/addUser", (req,res) => {
    const user = req.body;
    client.addUser(user, (err,data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message: "Error in post"
            })
        }
        else{
            res.send({message: "Data post successful"})
            res.end();
        }
    })
})
app.listen(3000, () => {
    console.log("Client Side Server Started on port 3000.");
})