// This is the table for temperaments
module.exports = (sequelize, Sequelize) =>
{
    // Making two columns
    const Temperaments = sequelize.define('Temperaments',
    {
        // Int primary-key is auto-incremented as usual

        // Name-column
        name:
        {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true // Name is unique so we don't get repeated values
        },
        },
        {
            timestamps: false
        }
    );
    Temperaments.associate = function(models)
    {
        // Temperaments belongs to many animals. Many to many relation
        Temperaments.belongsToMany(models.Animals,
        {
            // Here we connect or join the Temperaments-table to the TemperamentsForAnimals-table
            through: models.TemperamentsForAnimals,
            foreignKey: 'TemperamentId'
        })
    }
    return Temperaments;
}