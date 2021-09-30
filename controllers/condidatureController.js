const CondidatureModel = require('../models/condidatureModel');

module.exports={

    createCondidature:function(req,res ,next ){
    
        let cvv =req.file
        let lm =req.file

        if((cvv.mimetype!=='cv/pdf')&&(lm.mimetype!=='LM/pdf')){
          res.json({msg:'please enter a valid extention'})/////attachement
        }
        else{
          condidatureModel.create({
           
            cv:cvv.filename,
            LM:lm.filename
           
          },function(err,condidature){
              if (err) {
                  res.json({message:'error add model'+err,data:null,status:500})
              } else {
/*                   res.json({message:'Model created successfully',data:condidature,status:200})
 */                  next()
              }
          })
        }
    
    
    },
    
    
    
    getAllCondidature: async(req,res)=>{
    
    
    
    CondidatureModel.find({}).populate('condidat','nom,prenom').populate('offreEmploi'),(err,Condidature)=>{
    
    if (err) {
        
        res.json({message:'error get all Condidatures'+err,data:null ,status:500})
    } else {
        
        res.json({message:'all Condidatures in system',data:Condidature ,status:200})
    
    }
    
    }
    
    },
    
    
    getCondidatureById :function(req,res){
    
        CondidatureModel.findById({_id:req.params.id}).populate('condidat','nom,prenom').populate('offreEmploi'),(err,Condidature)=>{
    
            if (err) {
                
                res.json({message:'error get one Condidature'+err, data:null ,status:500})
            } else {
                
                res.json({message:'one Condidature in system',data:Condidatures,status:200})
            
            }
            
            }
    },
    
    
    
    
    
    
    deleteCondidatureById :function(req,res){
    
        CondidatureModel.findByIdAndDelete({_id:req.params.id},(err,Condidature)=>{
    
            if (err) {
                
                res.json({message:'error delete  one Condidature'+err,data:null ,status:500})
            } else {
                
                res.json({message:'one Condidature delete system', data:Condidature ,status:200})
            
            }
            
            })
            
    
    
    } ,
    
    
    
    
    
    updateCondidatureById :function(req,res){
    
       
    
        CondidatureModel.updateOne({_id:req.params.id},req.body,(err,Condidature)=>{
            if (err) {
                
                res.json({message:'error update  one Condidature'+err,data:null ,status:500})
            } else {
                
                res.json({message:'one Condidature updated', data:Condidature ,status:200})
            
            }
            
            })
            
    
    
    },
    



}

