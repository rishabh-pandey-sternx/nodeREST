const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
email: { type: String, unique: true, lowercase: true, required: true },
password: { type: String, select: false, required: true },
role: { type: String, enum: ['user', 'admin'], default: 'user' },
fullName: {type: String, required: true}
},{ collection:"users", timestamps: true });


/**
 * This is the middleware, It will be called before saving any record
 */
userSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(Number(process.env.BCRYPT_SALT), function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    console.log(candidatePassword, this, "candidatePassword, this.password")
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);