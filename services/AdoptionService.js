class AdoptionService
{
    // Constructor with db. (db) is the initially empty object that was created inside models/index.js
    constructor(db)
    {
        // The adoption-class gets access to the adoptions-table from models/adoptions and assigns the db-object with Adoptions
        this.Adoption = db.Adoptions;
    }

    // CRUD-CREATE-method. When an animal is adopted, the adoptions-table is populated with the UserId that actually adopts the animal and the Id of said animal that's adopted
    async create(userId, animalId)
    {
        return await this.Adoption.create
        ({
            UserId: userId,
            AnimalId: animalId
        });
    }

    // CRUD-DELETE-method. Only the admin can cancel/delete adoptions. To do this, we get the Id of said animal and deletes the data of that specific animal
    async deleteByAnimalId(animalId)
    {
        return await this.Adoption.destroy
        ({
            where: { AnimalId: animalId }
        });
    }
}

// Exporting this class so routes/animals.js can import it (const AnimalService = require('../services/AnimalService');
module.exports = AdoptionService;