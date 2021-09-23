
const userController =require('../controllers/userController');
const express=require('express');
const upload = require('../midlware/uploadFile');

const route= express.Router();
route.get('/allUser',userController.getAllUser)
route.get('/getUserbyid/:id',userController.getUserById)
route.delete('/deleteUserbyid/:id',userController.deleteUserById)
route.put('/updateUserbyid/:id',userController.updateUserById)

route.post('/signin',userController.signin);
route.post('/refrech',userController.refreshToken);
route.post('/logout',userController.LogOut);
route.post('/sendMail',userController.sendMail);
route.post('/forgotPass',userController.forgotPassword);
route.put('/avatar/:id',upload.single("image"),userController.uploadavatar);

module.exports=route;