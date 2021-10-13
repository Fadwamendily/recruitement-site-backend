
const userController =require('../controllers/userController');
const express=require('express');
const upload = require('../midlware/uploadFile');
const passport = require('passport');
require('../passport_config');
const route= express.Router();
route.get('/allUser',userController.getAllUser)
route.get('/getUserbyid/:id',userController.getUserById)
route.delete('/deleteUserbyid/:id',userController.deleteUserById)
route.put('/updateUserbyid/:id',userController.updateUserById)
//To sign JWT token before sending in cookie to Client
route.post("/login", passport.authenticate('local', {session: false}),userController.login )
//Admin and normal user can access
route.get("/protectedData", passport.authenticate('jwt', {session: false}),userController.protectedData)
//only Admin can access
route.get("/admin/protectedData", passport.authenticate('jwt', {session: false}), userController.AdminprotectedData)
//Check auth status everytime front-end app refreshes
route.get("/authenticated", passport.authenticate('jwt', {session: false}),userController.authenticated)
//Logout need authenticate first because only authenticated user that can log out.
route.get("/logout", passport.authenticate('jwt', {session: false}), userController.logout)
route.post('/sendMail',userController.sendMail);
route.post('/forgotPass',userController.forgotPassword);
route.put('/avatar/:id',upload.single("image"),userController.uploadavatar);

module.exports=route;