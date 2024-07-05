const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req,res) => {
    const { name,email,password } = req.body;
    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Missing fields.Can't create new user");
    }

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    //Hash the password.(10default value)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //Create the user.
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        console.log("User created successfully");
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('invalid data');
    }
})

const loginUser = asyncHandler(async (req,res) => {
    
    const { email,password } = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))) {
        console.log("User created successfully");
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('invalid credentials');
    }
})


const getMe = asyncHandler(async (req,res) => {
    //here req.user will be whatevreuseR HAS authenticated.
   const { _id,name,email } = await User.findById(req.user.id);
   res.status(200).json({
    id: _id,
    name,
    email,
   })
})
//Generate the token(Here we want to put the id as the payload)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
}