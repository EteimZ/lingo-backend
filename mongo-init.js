// database setup for mongodb container
db.createUser(
    {
        user: "lingo_user",
        pwd: "lingo_pwd",
        roles: [
            {
                role: "readWrite",
                db: "lingo_db"
            }
        ]
    }
);