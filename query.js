const queries = {
  createUserQuery: `
    INSERT INTO users(
        first_name,
        last_name,
        email,
        password,
        state,
        created_at,
        updated_at,
        is_admin
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
  userSigninQuery: `SELECT * FROM users WHERE email = $1`,
  orderParcelQuery: ` INSERT INTO orderparcel(
    user_id,
     sender_name, 
      price, 
      weight, 
      location,
       destination,
       status,
        sender_note, 
        created_at,
        updated_at
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
  getUserOrderById: `SELECT * FROM orderparcel WHERE id = $1`,
  getUserOrder: `SELECT * FROM orderparcel `,


  updateOrderDestination: `UPDATE orderparcel SET destination=($1), updated_at=($2) WHERE id=($3)`,
  deleteParcelOrder: `DELETE FROM  orderparcel WHERE id=$1`,
  updateOrderLocation: `UPDATE orderparcel SET location=($1), updated_at=($2) WHERE id=($3)`,
  updateOrderStatus: `UPDATE orderparcel SET status=($1), updated_at=($2) WHERE id=($3)`
};

module.exports = queries;
