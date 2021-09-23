const CondidatModel = require('../models/condidatModel');

module.exports = {

    createCondidat: function (req, res) {

        CondidatModel.create(req.body, function (err, Condidat) {

            if (err) {

                res.json({ message: 'error add Condidat' + err, data: null, status: 500 })

            } else {

                res.json({ message: 'Condidat added successfuly', data: Condidat, status: 200 })
            }
        })
    },



    getAllCondidat: async (req, res) => {

        CondidatModel.find({})
            .populate('test', 'valide')
            .populate('condidature', 'cv')
            .then(condidats => {
                res.status(200).json({
                    message: 'all condidats',
                    data: condidats
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'something went wrong',
                    data: null
                })
            })
    },


    getCondidatById: function (req, res) {

        CondidatModel.findById({ _id: req.params.id }).populate('test', 'validate').populate('condidature', 'cv'), (err, Condidat) => {

            if (err) {

                res.json({ message: 'error get one Condidat' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one Condidat in system', data: Condidats, status: 200 })

            }

        }
    },



    deleteCondidatById: function (req, res) {

        CondidatModel.findByIdAndDelete({ _id: req.params.id }, (err, Condidat) => {

            if (err) {

                res.json({ message: 'error delete  one Condidat' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one Condidat delete system', data: Condidat, status: 200 })

            }

        })



    },





    updateCondidatById: function (req, res) {



        CondidatModel.updateOne({ _id: req.params.id }, req.body, (err, Condidat) => {
            if (err) {

                res.json({ message: 'error update  one Condidat' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one Condidat updated', data: Condidat, status: 200 })

            }

        })



    },




}

