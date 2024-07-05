const express = require('express');
const addressClient = require('./client/client_location');

app = express();

app.get('/',async (req, res) => {
    const address=await addressClient.getMessageData();
    console.log(address)
    res.send("Client side")
})

app.listen(5000,(error) => {
    if(error) console.log(error);
    console.log("listening to port 5000")
})