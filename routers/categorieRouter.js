const categorieController =require('../controllers/categorieController');
const express=require('express');

const route= express.Router();

route.post('/addcategorie',categorieController.createCategorie)
route.get('/allcategorie',categorieController.getAllCategorie)
route.get('/getcategoriebyId/:id',categorieController.getCategorieById)
route.delete('/deletecategoriebyId/:id',categorieController.getCategorieById)
route.put('/updatecategoriebyId/:id',categorieController.updateCategorieById)



module.exports=route;