const queries = {
  createUserQuery: `
    INSERT INTO users(
        first_name,
        last_name,
        email,
        password,
        state,
        created_at,
        updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
  userSigninQuery: `SELECT * FROM users WHERE email = $1`,
  orderParcelQuery: ` INSERT INTO parcelorders(
     sender_name, 
     user_name,
      price, 
      weight, 
      location,
       destination,
        sender_note, 
        status,
        created_at
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
  getUserOrderByUserName: `SELECT * FROM parcelorders WHERE user_name  = $1`,
  getUserOrderById: `SELECT * FROM parcelorders WHERE id = $1`,

  updateOrderDestination: `UPDATE parcelorders
          SET destination = $1 WHERE id =$2 returning *`,
  deleteParcelOrder: `DELETE FROM parcelorders WHERE id=$1`
};

module.exports = queries;
