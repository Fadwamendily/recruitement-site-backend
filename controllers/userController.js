const bcrypt = require('bcrypt')
var jwt = require("jsonwebtoken");
var _ = require("lodash");
var nodemailer = require("nodemailer");

var refreshTokens = {} //dectation de nouveau jwt

const validator = require('validator')

const userModel = require('../models/UserModel');
require('dotenv').config()

module.exports = {

    getAllUser: async (req, res) => {

        UserModel.find({})
            .populate('test', 'valide')
            .populate('Userure', 'cv')
            .then(Users => {
                res.status(200).json({
                    message: 'all Users',
                    data: Users
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'something went wrong',
                    data: null
                })
            })
    },


    getUserById: function (req, res) {

        UserModel.findById({ _id: req.params.id }).populate('test', 'validate').populate('Userure', 'cv'), (err, User) => {

            if (err) {

                res.json({ message: 'error get one User' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one User in system', data: Users, status: 200 })

            }

        }
    },



    deleteUserById: function (req, res) {

        UserModel.findByIdAndDelete({ _id: req.params.id }, (err, User) => {

            if (err) {

                res.json({ message: 'error delete  one User' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one User delete system', data: User, status: 200 })

            }

        })



    },





    updateUserById: function (req, res) {



        UserModel.updateOne({ _id: req.params.id }, req.body, (err, User) => {
            if (err) {

                res.json({ message: 'error update  one User' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one User updated', data: User, status: 200 })

            }

        })



    },


    signin: function(req, res) {
        userModel.findOne({
            email: req.body.email
        }, (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(400).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ id: user.id }, process.env.SEKRET, {
                expiresIn: 86400 // 24 hours
            });
            var refreshToken = jwt.sign({ id: user.id }, process.env.SEKRET, {
                expiresIn: 86400 // 24 hours
            });
            refreshTokens[refreshToken] = user._id
            res.status(200).send({
                message: 'user found',
                user: user,
                accessToken: token,
                refreshToken: refreshToken,
                status: 200
            });
        })
    },
    refreshToken: function(req, res) {
        var id = req.body._id
        var refreshToken = req.body.refreshToken
        console.log('inBody', req.body)
        console.log('refreshTokens', (refreshTokens[refreshToken] == id))
        console.log('refresh', (refreshToken in refreshTokens))
        if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == id)) {
            var userId = {
                'id': id
            }
            var token = jwt.sign(userId, req.app.get('secretKey'), { expiresIn: 3600 })
            res.json({ accesstoken: token })
        } else {
            res.sendStatus(401)
        }
    },

    LogOut: function(req, res) {
        var refreshToken = req.body.refreshToken

        jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'))
        if (refreshToken in refreshTokens) {
            delete refreshTokens[refreshToken]
        }
        res.json({ msg: 'token experied', status: 204 })
    },


    sendMail: function(req, res) {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '*************',
                pass: '*********',
            }
        });



        var mailOptions = {
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text,



        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                res.json({ message: 'error ' + error });
            } else {

                res.json({ message: 'Email sent: ' + info.response });
            }
        })


    },




    forgotPassword: function(req, res) {
        const Email = req.body.email;
        userModel.findOne({ email: Email }, (err, user) => {
            if (err || !user) {
                return res.json({
                    status: 'Email error',
                    error: 'Email does not exist',
                });
            }
            const token = jwt.sign({ _id: user._id }, req.app.get('secretKey'), {
                expiresIn: '20min',
            });
            console.log(token);
            var data = {
                from: '*****',
                to: Email,
                subject: 'Reset Password',

                text: `http://localhost:4000/reset-password/${token}`,

            };

            return userModel.findOneAndUpdate({ email: Email }, { resetLink: token },
                (err, info) => {
                    var transporter4 = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: "*********************",
                            pass: '***********',
                        },
                    });
                    transporter4.sendMail(data, function(error, info) {
                        if (error) {
                            console.log(error);
                            return res.json({ err: 'Error in email' });
                        } else {
                            return res.json({
                                status: 'Success',
                                message: 'Email has been send',
                            });
                        }
                    });
                }
            );
        });
    },



    resetPassword: function(req, res) {
        resetLink = req.body.resetLink;
        newPass = req.body.newPass;
        if (resetLink) {
            jwt.verify(
                resetLink,
                req.app.get('secretKey'),
                function(err, decodeData) {
                    if (err) {
                        return res.json({
                            message: 'invalid token',
                            error: 'Incorrect token or it is expired',
                        });
                    }
                    userModel.findOne({ resetLink: resetLink }, (err, user) => {
                        if (err || !user) {
                            return res.json({
                                message: 'invalid token',
                                error: 'User with this token does not exist',
                            });
                        }
                        const obj = {
                            password: newPass,


                        };
                        user = _.extend(user, obj);
                        user.save((err, result) => {

                            console.log(result)
                            if (err) {
                                return res.status(400).json({
                                    error: 'Reset password error',
                                });
                            } else {
                                return res.status(200).json({
                                    status: 'Success',
                                    message: 'Password has been changed!',
                                });
                            }
                        });
                    });
                }
            );
        } else {
            return res.status(401).json({
                error: 'Authentification error',
            });
        }
    },
    uploadavatar: (req, res) => {
        const data = {
          avatar: req.file.filename,
        };
    
        userModel.findByIdAndUpdate({ _id: req.params.id }, data, (err, user) => {
          if (err) {
            res.status(500).json({ message: "avatar not uploaded" });
          } else {
            userModel.findById({ _id: user.id }, (err, user) => {
              if (err) {
                res.json("error");
              } else {
                res.status(200).json({
                  message: "user updated",
                  data: user,
                });
              }
            });
          }
        });
      },
}