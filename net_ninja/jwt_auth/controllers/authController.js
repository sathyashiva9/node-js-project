const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  

    if(err.message === 'User email not registered'){
        errors.email = 'User email not registered';
        return errors;
    }
    if(err.message === 'Password is incorrect'){
        errors.password = 'Password is incorrect';
        return errors;
    }
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

  /////////////////ROUTES//////////////////
const signupGet = (req,res) => {
    res.render("signup");
}

const signupPost = async (req,res) => {
    // res.send("sign up");
    const { email,password } = req.body;
    try {
        const user = await User.create({ email,password });
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly: true, maxAge:3*24*60*60*1000 });
        // user.save();
        res.status(201).json({user:user._id});
    } catch(err) {
        // console.log(err.message);
        // res.status(400).json({ message: err.message });
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const loginGet = (req,res) => {
    res.render("login");
}

const loginPost = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly: true, maxAge:3*24*60*60*1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
  }
}

const logoutGet = (req,res) => {
    res.cookie('jwt', '', { maxAge:1 });
    res.redirect("/");
}

const createToken = (id) => {
    return jwt.sign({id},'my secret',{
    expiresIn: 3*24*60*60*1000
    })
}

module.exports = {
    signupGet,
    signupPost,
    loginGet,
    loginPost,
    logoutGet
}