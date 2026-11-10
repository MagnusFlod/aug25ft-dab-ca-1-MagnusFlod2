// This is the join-table. An important table to join animals and their temperaments. Many animals can have many temperaments
module.exports = (sequelize, Sequelize) =>
{
    const TemperamentsForAnimals = sequelize.define('TemperamentsForAnimals', {/* The columns are declared in associate */},
    {
        timestamps: false
    }
    );
    // This association connects the animals-table and temperaments-table to the TemperamentsForAnimals-table
    TemperamentsForAnimals.associate = function(models)
    {
        TemperamentsForAnimals.belongsTo(models.Animals,
        {
            foreignKey:
            {
                name: 'AnimalId',
                allowNull: false
            }
        })
        TemperamentsForAnimals.belongsTo(models.Temperaments,
        {
            foreignKey:
            {
                name: 'TemperamentId',
                allowNull: false
            }
        })
    }
    return TemperamentsForAnimals;
}