
const nodemailer = require('nodemailer');
const smtpTransport = require( 'nodemailer-smtp-transport');
const path = require('path');
const ejs = require("ejs");

var transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // use SSL
  auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
  }
});

function sendEmail(userEmail,subject, responseObj, type) {
    const locals = Object.assign({}, { data: responseObj });
        ejs.render((__dirname,'../../template' +`${type}.ejs`),locals, (err, results) => {
          if (err) {
            return err;
          }
          const mailOptions = {
            from: process.env.FROM_EMAIL, // sender address
            to: userEmail, // list of receiver
            subject: subject ,  // Subject line
            text: results.text, // plain text body
            html: results.html // html body
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return error;
            }
            return info;
          });
        });

}
module.exports = sendEmail;
