const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//Hash password before being saved to database
userSchema.pre("save", function (next) {
  //Makes sure that the hash is not being hashed / makes sure it has been modified
  if (!this.isModified("password")) {
    return next();
  }

  //generate salt
  bcrypt.genSalt(saltRounds, (saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }
    //hash password using new salt
    bcrypt.hash(this.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
