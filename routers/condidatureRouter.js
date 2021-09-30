const condidatureController =require('../controllers/condidatureController');
const express=require('express');

const upload = require('../midlware/uploadFile');


const route= express.Router();

route.post('/',upload.single('pdf'),condidatureController.createCondidature)
route.get('/allcondidature',condidatureController.getAllCondidature)
route.get('/getcondidaturebyid/:id',condidatureController.getCondidatureById)
route.delete('/deletecondidaturebyid/:id',condidatureController.deleteCondidatureById)
route.put('/updatecondidaturebyid/:id',condidatureController.updateCondidatureById)



module.exports=route;