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
  const admin_type = req.user.is_admin
  const isAdmin = 'super Admin'
 const date = new Date();
  const created_at = moment(date).format("YYYY-MM-DD HH:mm:ss");
    
  if(admin_type === 'user'){
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
      isAdmin
    ]
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
      dbresponse.admin_type
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

//update a user to Admin

exports.updateUserToAdmin = async (req, res)=>{
  const {id} =req.params
  const {isAdmin}= req.body;

  const admin_type= req.user.admin_type;
  if(admin_type === 'admin'){
    return res.status(400).json({
        message: "you are unauthorized to update a user to an admin",
    })
}
  if(admin_type === ''){
    return res.status(400).json({
        message: "Admin status is needed",
    })
}
  const queryObject = {
    text: queries.findUserQuery,
    values: [
      id
    ]
  };
  try {
    const { rows,rowCount } = await db.query(queryObject);
   
    if(rowCount===0){
      res.status(400).json({
        message: "user not found",
      });
    }
    const queryObject1={
      text: queries.updateUser,
      values:[
        isAdmin,
        id
      ]
    }
    const response = await db.query(queryObject1);
    const dbresult= response.rows[0];
    delete dbresult.password;
    
    res.status(201).json({
      message: "admin updated Successfully",
      dbresult
    });
   
  } catch (error) {
    console.log(error);
    
  }

}

