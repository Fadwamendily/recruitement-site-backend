const mongoose=require('mongoose')
const Schema = mongoose.Schema



const commentaireSchema = new Schema({
  
    msg:{

        type:String,
        required:true

    },


entreprise:[{

type:mongoose.Schema.Types.ObjectId,
ref:"entreprise"

}],

condidat:[{

  type:mongoose.Schema.Types.ObjectId,
  ref:"condidat"
  
  }],


offreEmploi:{

  type:mongoose.Schema.Types.ObjectId,
  ref:"offreEmploi"
  
  }
},

{timestamps:true}

)


module.exports=mongoose.model('commentaire',commentaireSchema);