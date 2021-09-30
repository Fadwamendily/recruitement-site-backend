const OffreEmploiModel = require('../models/offreEmploiModel');


module.exports = {

    createOffreEmploi: function (req, res) {

        OffreEmploiModel.create(req.body, function (err, OffreEmploi) {

            if (err) {

                res.json({ message: 'error add OffreEmploi' + err, data: null, status: 500 })

            } else {

                res.json({ message: 'OffreEmploi added successfuly', data: OffreEmploi, status: 200 })
            }


        })


    },



    getAllOffreEmploi: async (req, res) => {



        OffreEmploiModel.find({})
            .populate('entreprise')
            .populate({
                path: 'commentaires',
                populate: {
                    path: 'user'
                }
            })
            .populate('categorie')
            .then(OffreEmploi => {
                res.json({ message: 'all OffreEmplois in system', data: OffreEmploi, status: 200 })

            })
            .catch(err => {
                res.json({ message: 'error get all OffreEmplois' + err, data: null, status: 500 })

            })

    },


    getOffreEmploiById: function (req, res) {

        OffreEmploiModel.findById({_id : req.params.id})
        .populate('entreprise')
        .populate({
            path: 'commentaires',
            populate: {
                path: 'user'
            }
        })
        .populate('categorie')
        .then(offre => {
            res.json({ message: 'all OffreEmplois in system', data: offre, status: 200 })

        })
        .catch(err => {
            res.json({ message: 'error get all OffreEmplois' + err, data: null, status: 500 })

        })

    },


    deleteOffreEmploiById: function (req, res) {

        OffreEmploiModel.findByIdAndDelete({ _id: req.params.id }, (err, OffreEmploi) => {

            if (err) {

                res.json({ message: 'error delete  one OffreEmploi' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one OffreEmploi delete system', data: OffreEmploi, status: 200 })

            }

        })



    },





    updateOffreEmploiById: function (req, res) {



        OffreEmploiModel.updateOne({ _id: req.params.id }, req, body, (err, OffreEmploi) => {
            if (err) {

                res.json({ message: 'error update  one OffreEmploi' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one OffreEmploi updated', data: OffreEmploi, status: 200 })

            }

        })



    },




}

