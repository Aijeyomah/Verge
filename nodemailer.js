var nodemailer = require('nodemailer');

const dotenv = require('dotenv')
dotenv.config()

const email = process.env.Email
const password = process.env.Password

exports.sendMail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password
  }
});

var mailOptions = {
  from: 'favournassy@gmail.com',
  to: useremail,
  subject: subject,
  text: text
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
   
  } else {
    console.log('Email sent: ' + info.response);
  }
});