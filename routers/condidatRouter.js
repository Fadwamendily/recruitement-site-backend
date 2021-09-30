const condidatController =require('../controllers/condidatController');
const express=require('express');
const route= express.Router();

route.post('/',condidatController.createCondidat)
route.get('/allcondidat',condidatController.getAllCondidat)
route.get('/getcondidatbyid/:id',condidatController.getCondidatById)
route.delete('/deletecondidatbyid/:id',condidatController.deleteCondidatById)
route.put('/updatecondidatbyid/:id',condidatController.updateCondidatById)



module.exports=route;