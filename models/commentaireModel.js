const mongoose = require('mongoose')
const Schema = mongoose.Schema



const commentaireSchema = new Schema({

  msg: {

    type: String,
    required: true

  },


  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  
},

  { timestamps: true }

)


module.exports = mongoose.model('commentaire', commentaireSchema);