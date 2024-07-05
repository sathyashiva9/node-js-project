const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please add the username since it is the required field"]
    },
    email: {
        type: String,
        required: [true,"Please add the user-email since it is the required field"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"Please add the user-password since it is the required field"]
    },
    
},{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema);