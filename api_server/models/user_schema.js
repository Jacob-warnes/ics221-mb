const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 3,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 8
  }
});

userSchema.pre("save", function(next) {
  // hash and salt password
  bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => {
      console.log("Error in hashing password" + err);
      next(err);
    });
});
userSchema.methods.verifyPassword = function(inputedPlainTextPassword) {
  const hashedPassword = this.password;
  return bcrypt.compare(inputedPlainTextPassword, hashedPassword);
};

module.exports = mongoose.model("user", userSchema);
