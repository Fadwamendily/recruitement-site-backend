const mongoose=require('mongoose')
const Schema = mongoose.Schema
// var uniqueValidator = require('mongoose-unique-validator');
const userModel=require('./UserModel')

const condidatSchema = new Schema({
  
    nom:{

        type:String,
        required:true

    },

   
    prenom:{


        type:String,
        required:true


    },


    adresse:{
    
        type:String,
        
        required: true
        
    },
    categorie:{
    
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorie"
        
    },

    téléphone : {

        type:Number,  
        required:true ,
        minLength:8,
        maxLength:20,

    },


condidature:[{

type:mongoose.Schema.Types.ObjectId,
ref:"condidature"

}],

commentaire:[{

    type:mongoose.Schema.Types.ObjectId,
    ref:"commentaire"
    
    }],

test:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"test"
        
        }]
}
,

{timestamps:true}

)

// condidatSchema.plugin(uniqueValidator);
module.exports=userModel.discriminator('condidat',condidatSchema);



