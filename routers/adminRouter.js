const adminController =require('../controllers/adminController');
const express=require('express');

const route= express.Router();

route.post('/',adminController.createadmin)




module.exports=route;