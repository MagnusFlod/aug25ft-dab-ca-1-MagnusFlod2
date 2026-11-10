// Importing sequelize from models-folder/index.js. To gain access to the database
const { sequelize } = require("../models");
// Importing Query-types to specify if a query is SELECT, INSERT, etc
const { QueryTypes } = require("sequelize");
// Importing readfile to be able to read JSON-files from disc
const fs = require("fs");


class PopulateService
{
    // The main function. This is called when 'populate' button is clicked. It decides the order of things and orchestrates the process
    async populate()
    {
        // Calls the function. Waits for the response from the database. Checks if data already exists
        if(await this.isPopulated())
        {
            console.log("Database is already populated");
            return;
        }

        // Reads from species.json-file. Get's the array that's called species. Runs all queries inside the array-elements. Waits untill all queries are inserted
        await this.insertFromFile("species.json", "species");
        // Same procedure as species and for the rest of the json-files. Runs all queries inside. Waits untill all queries are inserted
        await this.insertFromFile("temperaments.json", "temperaments");
        await this.insertFromFile("animals.json", "animals");
        await this.insertFromFile("users.json", "users");
        await this.insertFromFile("temperamentsForAnimals.json", "temperamentsForAnimals");
        // All of the lines above are also function-calls to the insertFromFile-function. 'this' refers to the specific json-file

        console.log("Database populated");
    }

    // Function that check's if the table is already populated
    async isPopulated()
    {
        // This variable stores a function that waits until a query-command is performed to the table
        const result = await sequelize.query
        (
            // Checking if the first table-species is populated as an indicator if the rest of the tables has already been populated
            "SELECT COUNT(*) as count FROM species",
            { type: QueryTypes.SELECT }
        );
        // If the count-result is bigger than 0, return true
        return result[0].count > 0;
    }

    // This function performs the actual insertion of the data to the different tables
    async insertFromFile(filename, key)
    {
        // Reading the data inside the json-file and parsing it to a JavaScript-object
        const data = JSON.parse(fs.readFileSync(`./public/json/${filename}`));

        // Storing the different array-elements from the json-file as data. Key refers to either species, temperaments, animals etc
        const records = data[key];

        // Iterating through every row in the json-array and inserting data to the table
        for(const record of records)
        {
            await sequelize.query(record.query);
        }
    }
}

// Exporting this class so routes/populate.js can import it (const PopulateService = require('../services/PopulateService');
module.exports = PopulateService;