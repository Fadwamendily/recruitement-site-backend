const mongoose = require('mongoose')
const Schema = mongoose.Schema



const offreEmploiSchema = new Schema({


        poste: {

            type: String,
            required: true

        },
        description: {

            type: String,
            required: true

        },
        type_contrat: {

            type: String,
            required: true

        },


        lieu: {


            type: String,
            required: true


        },

        entreprise: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "entreprise"

        },

        condidature: [{

            type: mongoose.Schema.Types.ObjectId,
            ref: "condidature"

        }],

        commentaires: [{

            type: mongoose.Schema.Types.ObjectId,
            ref: "commentaire"

        }],

        test: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "test"

        },



        categorie: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "categorie"

        }
    },

    { timestamps: true }

)


module.exports = mongoose.model('offreEmploi', offreEmploiSchema);