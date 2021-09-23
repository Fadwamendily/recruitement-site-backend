const offreEmploiController = require('../controllers/offreEmploiController');
const express = require('express');

const route = express.Router();

route.post('/', offreEmploiController.createOffreEmploi)
route.get('/alloffreEmploi', offreEmploiController.getAllOffreEmploi)
route.get('/getoffreEmploibyid/:id', offreEmploiController.getOffreEmploiById)
route.delete('/deleteoffreEmploibyid/:id', offreEmploiController.deleteOffreEmploiById)
route.put('/updateoffreEmploibyid/:id', offreEmploiController.updateOffreEmploiById)



module.exports = route;