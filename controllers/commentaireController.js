

const CommentaireModel = require('../models/commentaireModel');
const Offre = require('../models/offreEmploiModel')

module.exports = {

    createCommentaire: function (req, res) {

        CommentaireModel.create(req.body, function (err, Commentaire) {

            if (err) {

                res.json({ message: 'error add Commentaire' + err, data: null, status: 500 })

            } else {

                Offre.findByIdAndUpdate({ _id: req.body.offre }, { $push: { commentaires: Commentaire._id } }, (err, offre) => {
                    if (err) {
                        res.json({ message: 'error pushing comment in offre' + err, data: null, status: 500 })

                    } else {

                        res.json({ message: 'Commentaire pushed in offre successfuly', data: offre, status: 200 })
                    }
                })

            }


        })


    },



    getAllCommentaire: async (req, res) => {



        CommentaireModel.find({}).populate('entreprise', 'name').populate('offreEmploi').populate('condidat', 'nom'), (err, Commentaire) => {

            if (err) {

                res.json({ message: 'error get all Commentaires' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'all Commentaires in system', data: Commentaire, status: 200 })

            }

        }

    },


    getCommentaireById: function (req, res) {

        CommentaireModel.findById({ _id: req.params.id }).populate('entreprise', 'name').populate('offreEmploi').populate('condidat', 'nom'), (err, Commentaire) => {

            if (err) {

                res.json({ message: 'error get one Commentaire' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one Commentaire in system', data: Commentaires, status: 200 })

            }

        }
    },






    deleteCommentaireById: function (req, res) {

        CommentaireModel.findByIdAndDelete({ _id: req.params.id }, (err, Commentaire) => {

            if (err) {

                res.json({ message: 'error delete  one Commentaire' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one Commentaire delete system', data: Commentaire, status: 200 })

            }

        })



    },





    updateCommentaireById: function (req, res) {



        CommentaireModel.updateOne({ _id: req.params.id }, req.body, (err, Commentaire) => {
            if (err) {

                res.json({ message: 'error update  one Commentaire' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one Commentaire updated', data: Commentaire, status: 200 })

            }

        })



    },




}

