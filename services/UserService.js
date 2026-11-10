class UserService
{
    // Constructor with db. (db) is the initially empty object that was created inside models/index.js
    constructor(db)
    {
        // The user-class get's access to the users-table from models/users.js
        this.User = db.Users;
    }

    // CRUD function. This is CREATE. Making it possible to create a user with columns: fullName, username, password and role
    async create(fullName, username, password, role)
    {
        // Returning the body with correct columns
        return this.User.create
        ({
            fullName,
            username,
            password,
            role
        });
        // The SQL-command could be: INSERT INTO Users (fullName, username, password, role) VALUES ('John', 'Johnson', '1234', 'admin');
    }
    
    // CRUD-READ-function. Get's all columns and data from the users table. SQL-command would be: SELECT * FROM users;
    async getAll()
    {
        return this.User.findAll();
    }

    // ALso a READ function but with condition of finding a spesific user with a specific ID
    async getOne(userId)
    {
        return this.User.findOne
        ({
            where: { id: userId }
        });
        // SQL command could be: SELECT * FROM Users WHERE id = 5 LIMIT 1;
    }
    
    // Almost the same logic as above, but this time, the username is the condition. SELECT * FROM Users WHERE name = John LIMIT 1;
    async getOneByName(username)
    {
        return this.User.findOne
        ({
            where: { username: username }
        });
    }
    
    // CRUD-DELETE function. Delets a user with a specific ID. SQL command could be: DELETE FROM Users WHERE id = 5;
    async delete(userId)
    {
        return this.User.destroy
        ({
            where: { id: userId }
        });
    }


}
// Exporting this class so routes/auth.js can import it. (var UserService = require("../services/UserService");
module.exports = UserService;