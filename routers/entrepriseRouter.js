const entrepriseController =require('../controllers/entrepriseController');
const express=require('express');

const route= express.Router();

route.post('/',entrepriseController.createEntreprise)
route.get('/allentreprise',entrepriseController.getAllEntreprise)
route.get('/getentreprisebyid/:id',entrepriseController.getEntrepriseById)
route.delete('/deleteentreprisebyid/:id',entrepriseController.deleteEntrepriseById)
route.put('/updateentreprisebyid/:id',entrepriseController.updateEntrepriseById)



module.exports=route;