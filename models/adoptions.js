// The creation of adoptions-table to the database
module.exports = (sequelize, Sequelize) =>
{
    const Adoptions = sequelize.define('Adoptions',
    {
        // Column for usersID
        UserId:
        {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        // Column for AnimalsID
        AnimalId:
        {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        }
    },
    
        {
            timestamps: false
        }
    );
    Adoptions.associate = function(models)
    {
        // Adoptions from the adoptions-table belongs to ONE user. Many to one relation
        Adoptions.belongsTo(models.Users,
        {
            // The first foreign key is the PK of the users-table
            foreignKey:
            {
                name: 'UserId',
                allowNull: false
            },
            // If a user is deleted, the adoption that refers to said user, is also deleted. Same if an animal is deleted
            onDelete: 'CASCADE'
        })
        Adoptions.belongsTo(models.Animals,
        {
            // The second foreign key is the PK of the animals-table
            foreignKey:
            {
                name: 'AnimalId',
                allowNull: false,
                unique: true // It's a unique key because one animal can be adopted ONLY once! One animal, one adoption. Unlike users. One user can perform many adoptions
            }
        })
    }
    return Adoptions;
}