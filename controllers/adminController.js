const adminModel = require('../models/adminModel');

module.exports={

    createadmin:function(req,res){
    
    adminModel.create(req.body,function(err,admin){
    
    if (err) {
    
        res.json({message:'error add admin'+err,data:null ,status:500})
        
    } else {
        
        res.json({message:'admin added successfuly',data:admin ,status:200})
    }
    
    
    })
    
    
    }
    
    
   

}

