const queries={
    createUserQuery:`
    INSERT INTO users(
        first_name,
        last_name,
        email,
        password,
        state,
        created_at,
        updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`
}

module.exports= queries