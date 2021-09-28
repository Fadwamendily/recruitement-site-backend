const entrepriseModel = require('../models/entrepriseModel');
module.exports = {

    createEntreprise: function (req, res) {

        entrepriseModel.create(req.body, function (err, entreprise) {

            if (err) {
                console.log(err);
                res.json({ message: 'error add entreprise' + err, data: null, status: 500 })

            } else {

                res.json({ message: 'entreprise added successfuly', data: entreprise, status: 200 })
            }


        })


    },



    getAllEntreprise: async (req, res) => {



        entrepriseModel.find({}).populate('condidat').populate('test').populate('offreEmploi').populate('commentaire'), (err, entreprise) => {

            if (err) {

                res.json({ message: 'error get all entreprises' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'all entreprises in system', data: entreprise, status: 200 })

            }

        }

    },


    getEntrepriseById: function (req, res) {

        entrepriseModel.findById({ _id: req.params.id }).populate('condidat').populate('test').populate('offreEmploi').populate('commentaire'), (err, entreprise) => {

            if (err) {

                res.json({ message: 'error get one entreprise' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one entreprise in system', data: entreprises, status: 200 })

            }

        }
    },






    deleteEntrepriseById: function (req, res) {

        entrepriseModel.findByIdAndDelete({ _id: req.params.id }, (err, entreprise) => {

            if (err) {

                res.json({ message: 'error delete  one entreprise' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one entreprise delete system', data: entreprise, status: 200 })

            }

        })



    },





    updateEntrepriseById: function (req, res) {


        /* 
                entrepriseModel.updateOne({ _id: req.params.id }, req.body, (err, entreprise) => {
                    if (err) {
        
                        res.json({ message: 'error update  one entreprise' + err, data: null, status: 500 })
                    } else {
        
                        res.json({ message: 'one entreprise updated', data: entreprise, status: 200 })
        
                    }
        
                }) */
        entrepriseModel.findOneAndUpdate({ _id: req.params.id }, req.body, (err, entreprise) => {
            if (!entreprise) {
                res.status(500).json({
                    message: "entreprise not updated ",
                    data: null,
                });
            } else {
                res.status(200).json({
                    message: "entreprise updated successfuly ",
                    data: req.body,
                });
            }
        });
    }




}

