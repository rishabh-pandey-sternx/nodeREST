const { get } = require('lodash');
const User = require('../../models/users');
const jwtLib = require('../thirdParty/auth');

let services = {};

services.signup = async data => {
    let user = await User.findOne({ email: data.email });
    if (user) {
        throw new Error("Email already exist");
    }
    user = new User(data);
    const token = jwtLib.createToken(data)
    await user.save();
    return (data = {
        userId: user._id,
        email: user.email,
        fullName: user.fullName,
        token: token,
    });
}

services.login = async data => {
    let user = await User.findOne({ email: data.email });
    if (!user) {
        throw new Error("No such user exist");
    }
    const token = jwtLib.createToken(data)
    return (data = {
        userId: user._id,
        email: user.email,
        fullName: user.fullName,
        token: token,
    });   
}

// serivces.changePassword= async (data) => {}
// serivces.sendPasswordResetEmail= async (data) => {}
// serivces.refreshToken= async (data) => {}
  

module.exports = services;