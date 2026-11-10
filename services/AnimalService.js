class AnimalService
{
    // Constructor with db. (db) is the initially empty object that was created inside models/index.js
    constructor(db)
    {
        // The AnimalService-class get's access to many of the models/tables and assigns the db-object with Animals, Species, Temperaments and Adoptions
        this.Animal = db.Animals;
        this.Species = db.Species;
        this.Temperaments = db.Temperaments;
        this.Adoptions = db.Adoptions;
        // We need to get so many models because getAll() requires the animal, the specie, the temperament, if adopted
    }
    // Get request. This asyncron function waits untill a get-request is being made. It extracts the data from the animals-table
    async getAll()
    {
        const animals = await this.Animal.findAll
        ({
            // Using include instead of findAll() so related tables also can be imported, not just the animals-table
            include:
            [
               { model: this.Species },
               { model: this.Temperaments },
               { model: this.Adoptions }
            ]
            // This way, related table are JOINED. Species-table, Temperaments, TemperamentsForAnimals-table and Adoptions-table
        });

        // Mapping and returning a new array to show the birthday of the animals
        return animals.map(animal =>
        {
            // Making a plain object
            const plain = animal.get({ plain: true });

            // Calling the calculateAge-function and adding a new property to the object(birthday)
            plain.age = this.calculateAge(plain.Birthday);
            // Returning the correct columns for display in the view-file. All these columns is what the users see when they navigate to /animals in the browser
            return {
                Id: plain.id,
                Name: plain.Name,
                // If species exist, return Name. If it doesn't, return null
                Species: plain.Species ? { Name: plain.Species.name } : null,
                Birthday: plain.Birthday,
                // Temperaments is an array. For instance ["Calm", "Friendly"]. .join gives "Calm, Friendly". Displaying the many to many relation
                Temperament: plain.Temperaments.map(t => t.name).join(', '),
                Size: plain.Size,
                Age: this.calculateAge(plain.Birthday),
                // Is the animal adopted? If true, plain.Adoptions exist. If false, plain.Adoptions is null
                Adopted: plain.Adoption ? true : false
            };
        });
    }
    // This function actually calculates the birthday of the animals. The function is called inside the return animals-block, nested inside getAll-function
    calculateAge(birthday)
    {
        // Setting a new date that marks today
        const today = new Date();

        // Setting a variable for the birthday of the animals
        const birthDate = new Date(birthday);

        // The actual calculation. Today - the birthday of the animals
        let age = today.getFullYear() - birthDate.getFullYear();

        return age;
    }
}

// Exporting the AnimalService so routes/animals.js can import it (const AnimalService = require('../services/AnimalService');
module.exports = AnimalService;