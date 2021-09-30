const mongoose = require('mongoose')
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');

const userModel = require('./UserModel');

const entrepriseSchema = new Schema({

    nom: {

        type: String,
        required: true,
        unique: true

    },

    adresse: {

        type: String,

        required: true

    },

    téléphone: {

        type: Number,
        required: true,
        minLength: 8,
        maxLength: 20,

    },

    compétences: {
        type: String
    },

    categorie:{
    
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorie"
        
    },

    valid: {
        type: Boolean
    },

    commentaire: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "commentaire"

    }],

    offreEmploi: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "offreEmploi"

    }],

    test: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "test"

    }]
}
    ,

    { timestamps: true },///retourne date de creation d entreprise et date 'update

)

entrepriseSchema.plugin(uniqueValidator);

module.exports = userModel.discriminator('entreprise', entrepriseSchema);