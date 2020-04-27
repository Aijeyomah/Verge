const moment = require("moment");
const queries = require("../query");
const db = require("../database");
const {
  hashPassword,
  generateUserToken,
  isValidEmail,
  validatePassword,
  passwordCompare

} = require("../validation");




exports.createUser = async (req, res, next) => {

  const date = new Date();
  const created_at = moment(date).format("YYYY-MM-DD HH:mm:ss");
  const { first_name, last_name, email, password, state, is_admin } = req.body;
  const isAdmin = false;

  if (is_admin === true) {
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

    ],
  };
  try {
    const { rows } = await db.query(queryObject);
    const dbresponse = rows[0];
    const tokens = generateUserToken(
      dbresponse.id,
      dbresponse.first_name,
      dbresponse.last_name,
      dbresponse.email,
      dbresponse.state,
      dbresponse.isAdmin
    );
    const data = {
      token: tokens,
      dbresponse,
    };
    res.status(201).json({
      message: "User Created Successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.userSignin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
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

  const queryObject = {
    text: queries.userSigninQuery,
    values: [email]
  }

  try {
    const { rows } = await db.query(queryObject);
    const dbresponse = rows[0]
    if (!dbresponse) {
      res.status(400).json({
        message: "error login in",
        dbresponse
      });
    }

    if (!dbresponse) {
      res.status(400).json({
        message: "error login in",
        dbresponse
      });
    }

    if (!passwordCompare(dbresponse.password, password)) {
      res.status(400).json({
        message: "incorrect password",
        dbresponse
      });
    }

    const tokens = generateUserToken(
      dbresponse.id,

      dbresponse.email

    );
    const data = {
      token: tokens,
      dbresponse,
    };
    res.status(201).json({
      message: "login Successfully",
      data,
    });
  }

  catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error login in",

    });
  }
}

