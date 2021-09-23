const TestModel = require('../models/testModel');


module.exports={

    createTest:function(req,res){
    
    TestModel.create(req.body,function(err,Test){
    
    if (err) {
    
        res.json({message:'error add Test'+err,data:null ,status:500})
        
    } else {
        
        res.json({message:'Test added successfuly',data:Test ,status:200})
    }
    
    
    })
    
    
    },
    
    
    
    getAllTest: async(req,res)=>{
    
    
    
    TestModel.find({}).populate('condidat','nom,prenom').populate('entreprise','nom').populate('offreEmploi','id'),(err,Test)=>{
    
    if (err) {
        
        res.json({message:'error get all Tests'+err,data:null ,status:500})
    } else {
        
        res.json({message:'all Tests in system',data:Test ,status:200})
    
    }
    
    }
    
    },
    
    
    getTestById :function(req,res){
    
        TestModel.findById({_id:req.params.id}).populate('condidat','nom,prenom').populate('entreprise','nom').populate('offreEmploi','id'),(err,Test)=>{
    
            if (err) {
                
                res.json({message:'error get one Test'+err, data:null ,status:500})
            } else {
                
                res.json({message:'one Test in system',data:Tests,status:200})
            
            }
            
            }
    },
    
    
    
    
    
    
    deleteTestById :function(req,res){
    
        TestModel.findByIdAndDelete({_id:req.params.id},(err,Test)=>{
    
            if (err) {
                
                res.json({message:'error delete  one Test'+err,data:null ,status:500})
            } else {
                
                res.json({message:'one Test delete system', data:Test ,status:200})
            
            }
            
            })
            
    
    
    } ,
    
    
    
    
    
    updateTestById :function(req,res){
    
       
    
        TestModel.updateOne({_id:req.params.id},req.body,(err,Test)=>{
            if (err) {
                
                res.json({message:'error update  one Test'+err,data:null ,status:500})
            } else {
                
                res.json({message:'one Test updated', data:Test ,status:200})
            
            }
            
            })
            
    
    
    },
    



}

