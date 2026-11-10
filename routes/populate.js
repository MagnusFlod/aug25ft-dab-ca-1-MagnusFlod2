// Necessary imports
const express = require('express');
const router = express.Router();
// Importing the class and methods from PopulateService.js
const PopulateService = require('../services/PopulateService');

// Making an object of the class
const populateService = new PopulateService();

// CRUD-CREATE-method
router.post('/', async (req, res, next) =>
{
    // Try-function that attempts to execute the populate-logic
    try
    {
        // Populate-table-button is pressed. All the data from the .json-files are populated to the tables in the database
        await populateService.populate();
        // When the table is populated, the user is redirected to localhost:3000/animals
        res.redirect('/animals');
    }
    catch(err)
    {
        next(err);
    }
});

module.exports = router;