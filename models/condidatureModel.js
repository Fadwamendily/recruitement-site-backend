const mongoose=require('mongoose')
const Schema = mongoose.Schema
const condidatureSchema = new Schema({
  
    cv:{

        type:String,
        required:true

    },

   
    LM:{


        type:String,
        required:true


    },


offreEmploi:[{

type:mongoose.Schema.Types.ObjectId,
ref:"offreEmploi"

}],

condidat:[{

    type:mongoose.Schema.Types.ObjectId,
    ref:"condidat"
    
    }]
  },


{timestamps:true}

)


module.exports=mongoose.model('condidature',condidatureSchema);