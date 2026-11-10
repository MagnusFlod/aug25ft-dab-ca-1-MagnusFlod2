// Importing middleware so routing of roles can be possible. Only members can adopt. Only admin can cancel adoptions, etc
const { isAuthenticated, isMember, isAdmin } = require('./authMiddlewares');
var express = require('express');
var router = express.Router();

// Importing the AnimalService-class so the user can GET/READ the animals from the database
const AnimalService = require('../services/AnimalService');

// Importing all files from the models-folder
const db = require('../models');

// Importing the create and delete functions from the AdoptionService file so the user can POST/CREATE an adoption to the database and admin can DELETE
const AdoptionService = require('../services/AdoptionService');

// Making two objects of the AnimalService and AdoptionService files
const animalService = new AnimalService(db);
const adoptionService = new AdoptionService(db);

// Get or READ. This function reads the animals from the database and renders them to the page: localhost:3000/animals
router.get('/', async function (req, res, next)
{
  const animals = await animalService.getAll();
  res.render('animals', { user: req.user, animals: animals });
});


// This function routes the posting of userId and animalId from AdoptionService to the adoptions-table
router.post('/adopt/:id', isAuthenticated, isMember, async function (req, res, next)
{
    // Try-function/block that attemts to execute the adoption logic and database-operation
    try
    {
        const userId = req.user.id;
        const animalId = req.params.id;

        await adoptionService.create(userId, animalId);

        // Redirected to the localhost:3000/animals so the user can see what animals are adopted
        res.redirect('/animals');
    }
    // If something fails, next(err) will 'jump' to the error-handler found in app.js. Try-function is for extra security
    catch (err)
    {
        next(err);
    }
});

// This function routes the delete or cancel of and adoption from the AdoptionService so an adopted animal can be deleted from the adoptions-table in the database
router.post('/cancel/:id', isAuthenticated, isAdmin, async function(req, res, next)
{
    try
    {
        const animalId = req.params.id;

        await adoptionService.deleteByAnimalId(animalId);

        // Redirected to the localhost:3000/animals so the user/admin can see what animal-adoptions are canceled
        res.redirect('/animals');
    }
    catch(err)
    {
        next(err);
    }
});

module.exports = router;
