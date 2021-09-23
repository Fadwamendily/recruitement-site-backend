const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorieSchema = new Schema({

        nom_categorie: {

            type: String,
            required: true

        },


        /* offreEmploi: [{

            type: mongoose.Schema.Types.ObjectId,
            ref: "offreEmploi"

        }], */

    }, { timestamps: true }

)

module.exports = mongoose.model('categorie', categorieSchema);