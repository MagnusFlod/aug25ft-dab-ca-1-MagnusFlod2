
// This block of module.exports-code is the sequelizer. The final step before SQL commands to the database. This block creates table Animals
module.exports = (sequelize, Sequelize) =>
{
    const Animals = sequelize.define('Animals',
    {
        // All the columns of the table
        Name:
        {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        // SpeciesID is the foreign key of the animals-table. And primary keyID of the species-table
        SpeciesID:
        {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        // Birthday column
        Birthday:
        {
            type: Sequelize.DataTypes.DATE,
            allowNull: false
        },
        // Using ENUM for only 3 values
        Size:
        {
            type: Sequelize.DataTypes.ENUM('small', 'medium', 'large'),
            allowNull: false
        }
    },
        {
            timestamps: false
        }
    );
    Animals.associate = function(models)
    {
        // One animal belongs to one species. One species can have many animals. One to many relation
        Animals.belongsTo(models.Species,
        {
            // Animals holds the foreign key which is the a reference to the PK of species-table
            foreignKey:
            {
                name: 'SpeciesID',
                allowNull: false
            }
        })
        // One animal can hav one adoption. One to one relation
        Animals.hasOne(models.Adoptions)

        // Many animals belongs to many temperaments. Many to many
        Animals.belongsToMany(models.Temperaments,
        {
            // Here we join the Animals-table to the TemperamentsForAnimals-table
            through: models.TemperamentsForAnimals,
            foreignKey: 'AnimalId'
        })
    };
    return Animals;
}