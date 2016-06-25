var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// Mongoose Schema
var UserSchema = new Schema({
<<<<<<< HEAD
=======

>>>>>>> thomas_branch

  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  verification: { type: String, required: true },
  enable_texts: { type: Boolean, required: true },
  email: { type: String, required: true },
  first_name: String,
  last_name: String,
  phone: String,
  timeZone: String

<<<<<<< HEAD
=======

>>>>>>> thomas_branch
});

// Called before adding a new user to the DB. Encrypts password.
UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// Used by login methods to compare login form password to DB password
UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
