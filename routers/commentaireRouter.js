const commentaireController =require('../controllers/commentaireController');
const express=require('express');

const route= express.Router();

route.post('/',commentaireController.createCommentaire)
route.get('/allcommentaire',commentaireController.getAllCommentaire)
route.get('/getcommentairebyid/:id',commentaireController.getCommentaireById)
route.delete('/deletecommentaire/:id',commentaireController.deleteCommentaireById)
route.put('/updatecommentaire/:id',commentaireController.updateCommentaireById)



module.exports=route;