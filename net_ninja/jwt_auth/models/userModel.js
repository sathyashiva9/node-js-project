const mongoose = require('mongoose');
const { isEmail } = require('validator');
// const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  }
});
// userSchema.post('save', function(doc, next){
//   console.log("user created and saved to the db.",doc);
//   next();
// })

userSchema.statics.login = async function(email,password){
  const user = await User.findOne({email});
  if(user){
    console.log(user)
    if(user.password == password){
      return user;
    }
    throw Error('Password is incorrect')
  }
  throw Error('User email not registered')
}

// userSchema.pre('save', function(next){
//   // console.log("before saving the doc to the db.",this)

//   next();
// })
const User = mongoose.model('user', userSchema);



module.exports = User;
