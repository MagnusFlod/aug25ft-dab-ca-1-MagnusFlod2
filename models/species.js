// This is the table for species
module.exports = (sequelize, Sequelize) =>
{
    const Species = sequelize.define(
        'Species',
        {
            // Once again, no need to declare Primary Key. It's auto-incremented

            // Name column
            name:
            {
              type: Sequelize.DataTypes.STRING,
              allowNull: false,
              unique: true // Each species name should exist only once in the species-table
            }

            // Only two columns in this table (id + name)
        },
        {
            // Disabling automatic createdAt and updatedAt columns
            // It's neseccary because Raw SQL Inserts only the values of the name, but not createdAt and updatedAt. Those columns are NOT NULL, so they cannot be empty
            timestamps: false
        }
    );

    Species.associate = function(models)
    {
        // One specie can have many animals. One to many relationship
        Species.hasMany(models.Animals,
        {
            // This refers to the foreign key in the animals-table
            foreignKey: 'SpeciesID'
        });
    };

    return Species;
};