const testController =require('../controllers/testController');
const express=require('express');

const route= express.Router();

route.post('/addtest',testController.createTest)
route.get('/alltest',testController.getAllTest)
route.get('/gettestbyid/:id',testController.getTestById)
route.delete('/deletetestbyid/:id',testController.deleteTestById)
route.put('/updatetestbyid/:id',testController.updateTestById)



module.exports=route;