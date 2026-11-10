// The making of users-table
module.exports = (sequelize, Sequelize) =>
{
    // Users columns
    const Users = sequelize.define('Users',
    {
        // No need to declare Primary key, identity. Sequelize is performing aouto-increment of PK(id INT PRIMARY KEY AUTO_INCREMENT)

        // First column
        fullName:
        {
            type: Sequelize.DataTypes.STRING,
            allowNull: false, // This column cannot be null of no value. Same as NOT NULL in pure SQL
        },
        // Second column
        username:
        {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true // Must be a unique value. Same as UNIQUE(username) in pure SQL
        },
        // Third column
        password:
        {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        // Fourth column
        role:
        {
            type: Sequelize.DataTypes.ENUM('admin', 'member'), // This column can only contain admin or memeber.Two unique values
            allowNull: false
        }
    },
    {
        timestamps: false
    }
    );
    Users.associate = function(models)
    {
        // A user can adopt many animals. Or has many adoptions from the adoptions-table to be precise. One to many relation
        Users.hasMany(models.Adoptions)
    }
    return Users;
}