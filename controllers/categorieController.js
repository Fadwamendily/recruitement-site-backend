const CategorieModel = require('../models/categorieModel');

module.exports = {

    createCategorie: function (req, res) {

        CategorieModel.create(req.body, function (err, Categorie) {

            if (err) {

                res.json({ message: 'error add Categorie' + err, data: null, status: 500 })

            } else {

                res.json({ message: 'Categorie added successfuly', data: Categorie, status: 200 })
            }

        })

    },



    getAllCategorie: async (req, res) => {


        CategorieModel.find({}, (err, Categorie) => {

            if (err) {

                res.json({ message: 'error get all Categories' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'all Categories in system', data: Categorie, status: 200 })

            }

        })

    },


    getCategorieById: function (req, res) {

        CategorieModel.findById({ _id: req.params.id }), (err, Categorie) => {

            if (err) {

                res.json({ message: 'error get one Categorie' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one Categorie in system', data: Categories, status: 200 })

            }

        }
    },






    deleteCategorieById: function (req, res) {

        CategorieModel.findByIdAndDelete({ _id: req.params.id }, (err, Categorie) => {

            if (err) {

                res.json({ message: 'error delete  one Categorie' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one Categorie delete system', data: Categorie, status: 200 })

            }

        })



    },





    updateCategorieById: function (req, res) {



        CategorieModel.updateOne({ _id: req.params.id }, req.body, (err, Categorie) => {
            if (err) {

                res.json({ message: 'error update  one Categorie' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one Categorie updated', data: Categorie, status: 200 })

            }

        })



    },




}