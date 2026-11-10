class SpeciesService
{
    // Constructor with db. (db) is the initially empty object that was created inside models/index.js
    constructor(db)
    {
        // The Species-class gets access to the Species-table and the Animals-table
        this.Species = db.Species;
        this.Animals = db.Animals;
        // This is neseccary because the species-table hasMany animals
    }

    // When thinking of CRUD, this async function is performing READ. It reads everything from the Species-table. SQL command would be SELECT * FROM Species;
    async getAll()
    {
        return await this.Species.findAll();
    }

    // Thinking of CRUD again, this function performs CREATE. It Posts something to the table. SQL command could be INSERT INTO Species (name) VALUES ('Dinosaur');
    async create(name)
    {
        return await this.Species.create({ name });
    }

    // This time, UPDATE is the method for this function. Updates the name on a selected id. SQL command could be UPDATE Species SET name = 'NewName' WHERE id = 5;
    async update(id, name)
    {
        return await this.Species.update
        (
            { name },
            { where: { id } }
        );
    }

    // Last of the CRUD methods. DELETE
    async delete(id)
    {
        // To prevent the admin from deleting a species which is connected to the animals table, we wait untill that spesific animal is found
        const animals = await this.Animals.findOne
        ({
            // Foreign key of the animals-table. PK of the species-table
            where: { SpeciesId: id }
        });

        // If an animal is found that species cannot be erased
        if (animals)
        {
            throw new Error("Cannot delete species in use");
        }

        // If a new specie is made it can also be erased by admin
        return await this.Species.destroy
        ({
            where: { id }
        });
    }
}
// Exporting this class so routes/species.js can import it. (const SpeciesService = require('../services/SpeciesService');
module.exports = SpeciesService;