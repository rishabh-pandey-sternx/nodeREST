const { get } = require('lodash');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require('../../models/users');
const Token = require('../../models/token');
const jwtLib = require('../../utils/jwt');

const sendEmail = require("../thirdParty/mail");
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
};
services.passwordResetMail = async data => {
    const user = await User.findOne({ email: data.email });
        if (!user) throw new Error("Email does not exist");
        let token = await Token.findOne({ userId: user._id });
        if (token) await token.deleteOne();
        console.log(token,"tokentoken")
        let resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));
        await new Token({
          userId: user._id,
          token: hash,
          createdAt: Date.now(),
        }).save();
        const link = `${process.env.CLIENT_URL}/${process.env.API_PREFIX}/${process.env.API_VERSION}/auth/reset-password?token=${resetToken}&id=${user._id}`;
        sendEmail(
          user.email,
          "Password Reset Request",
          {
            name: user.fullName,
            link: link,
          },
          "./template/requestResetPassword.handlebars"
        );
        return link;

}

 
services.resetPassword = async data => {
    let passwordResetToken = await Token.findOne({ userId:data.id });
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
  
    const user = await User.findById({ _id: userId });
  
    sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.name,
      },
      "./template/resetPassword.handlebars"
    );
  
    await passwordResetToken.deleteOne();
}
module.exports = services;