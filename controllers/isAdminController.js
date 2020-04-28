const moment = require("moment");
const queries = require("../query");
const db = require("../database");
const {
  hashPassword,
  generateUserToken,
  isValidEmail,
  validatePassword,
  

} = require("../validation");

exports.createAdmin =async ( req, res) =>{
 const { first_name, last_name, email, password, state} = req.body;

 
 const is_admin = true;
 const date = new Date();
  const created_at = moment(date).format("YYYY-MM-DD HH:mm:ss");
    
  if(is_admin === false){
    return res.status(400).json({
        message: "you are unauthorized",
    })
}
if (!first_name || !last_name || !email || !state || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: "please put in a valid email",
    });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  const hashedPassword = hashPassword(password);
  const queryObject = {
    text: queries.createUserQuery,
    values: [
      first_name,
      last_name,
      email,
      hashedPassword,
      state,
      created_at,
      created_at,
      is_admin
    ],
  };
  try {
    const { rows } = await db.query(queryObject);
    const dbresponse = rows[0];
    const tokens =   generateUserToken(
      dbresponse.id,
      dbresponse.first_name,
      dbresponse.last_name,
      dbresponse.email,
      dbresponse.state,
      dbresponse.is_admin
    );
    const data = {
      token: tokens,
      dbresponse,
    };
    res.status(201).json({
      message: "admin Successfully",
      data,
    });
   
  } catch (error) {
    console.log(error);
    
  }
};

