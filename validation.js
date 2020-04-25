const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config()


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
  };

  const validatePassword = (password) => {
    if (password.length <= 5) {
      return false;
    } return true;
  };

  const passwordCompare = (hashedPassword, password)=>{
    return bcrypt.compareSync(password, hashedPassword)
  }


const generateUserToken = (email, id, first_name, last_name, state) => {
    const key= process.env.SECRET_KEY
    const token = jwt.sign({
      email,
      user_id: id,
      first_name,
      last_name,
      state
    },
    key,{ expiresIn: '3d' });
    return token;
  };



  module.exports = {
    hashPassword,
    isValidEmail,
    validatePassword,
    generateUserToken,
    passwordCompare
}

