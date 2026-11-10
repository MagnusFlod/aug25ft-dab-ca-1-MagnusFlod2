// Necessary imports
const { isAuthenticated, isAdmin } = require('./authMiddlewares');
// Importing the SpeciesService-class
const SpeciesService = require('../services/SpeciesService');
const db = require('../models');
var express = require('express');
var router = express.Router();

// Making an objekt of the class import
const speciesService = new SpeciesService(db);

// CRUD-READ-function
router.get('/', async function (req, res, next)
{
    // Selects the speciesService-object and gets/reads the table. SQL command would be: SELECT * FROM species;
    const species = await speciesService.getAll();
    // Rendering the localhost:3000/species page
    res.render('species', { user: req.user, species: species });
});

// CRUD-CREATE-function. This function makes sure the user is both authenticated and role: admin. Only admin can add new species
router.post('/create', isAuthenticated, isAdmin, async function (req,res,next)
{
    try
    {
        await speciesService.create(req.body.name);
        res.redirect('/species');
    }
    catch(err)
    {
        next(err);
    }
});

// CRUD-UPDATE-function. This function is similar to the create-function only this time an already existing specie can be updated/changed
router.post('/update/:id', isAuthenticated, isAdmin, async function(req, res, next)
{
    try
    {
        await speciesService.update
        (
            req.params.id,
            req.body.name
        );

        res.redirect('/species');
    }
    catch(err)
    {
        next(err);
    }
});

// CRUD-DELETE-function. This function can delete a specie. Reminding that only new added species can be removed. ref: if (animals) {throw new Error("Cannot delete species in use");}
router.post('/delete/:id', isAuthenticated, isAdmin, async function(req, res, next)
{
    try
    {
        await speciesService.delete(req.params.id);
        res.redirect('/species');
    }
    catch(err)
    {
        next(err);
    }
})

module.exports = router;