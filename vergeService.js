// const moment = require("moment");
// const queries = require("./query");
// const db = require("./database");
// const generateUserToken = require('./validation')

// async function createUserQuery(body){
//     const date = new Date();
//     const created_at = moment(date).format('YYYY-MM-DD HH:mm:ss');
//     const {first_name, last_name, email, password, state} = body;
    
//     const hashedPassword = hashPassword(password)
    
    
//     const queryObject ={
//         text: queries.createUserQuery,
//         values:[first_name,last_name,email,hashedPassword,state,created_at,created_at]
//     };
//     try {
//         const { rows} = await db.query(queryObject);
//         const dbresponse = rows[0];
//         const tokens = generateUserToken(dbresponse.email, dbresponse.id, dbresponse.first_name, dbresponse.last_name, dbresponse.state )
//         const data={
//           token: tokens,
//           dbresponse
//         }
//         res.status

      
//         if (rowCount > 0) {
//             return Promise.resolve({
//                 status: "success",
//                 code: 201,
//                 message: "SignUp successful",
//             });
//         }
//     } catch (e) {
//         console.log(e);
//         return Promise.reject({
//             status: "error",
//             code: 500,
//             message: "Error SigningUp",
//         });
//     }
// }
// // try {
// //     const {rows} = await db.query(queryObject)



// //     const dbresponse = rows[0];
    
// // } catch (error) {
    
// // }

// module.exports = {createUserQuery}

