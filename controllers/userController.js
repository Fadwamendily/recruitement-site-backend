const bcrypt = require('bcrypt');
const { request } = require('express');
var jwt = require("jsonwebtoken");
var _ = require("lodash");
var nodemailer = require("nodemailer");
var refreshTokens = {} //dectation de nouveau jwt
const validator = require('validator')
const userModel = require('../models/UserModel');
require('dotenv').config()

module.exports = {

    getAllUser: async (req, res) => {

        userModel.find({})
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

        userModel.findById({ _id: req.params.id } /* .populate('test', 'validate').populate('Userure', 'cv') */, (err, User) => {

            if (err) {

                res.json({ message: 'error get one User' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one User in system', data: User, status: 200 })

            }

        })
    },



    deleteUserById: function (req, res) {

        userModel.findByIdAndDelete({ _id: req.params.id }, (err, User) => {

            if (err) {

                res.json({ message: 'error delete  one User' + err, data: null, status: 500 })
            } else {

                res.json({ message: 'one User delete system', data: User, status: 200 })

            }

        })



    },

    updateUserById: (req, res) => {
        console.log(req.body);
        userModel.findOneAndUpdate({ _id: req.params.id  }, req.body, (err, user) => {
            if (!user) {
                res.status(500).json({
                    message: "user not updated ",
                    data: null,
                });
            } else {
                res.status(200).json({
                    message: "user updated successfuly ",
                    data: user,
                });
            }
        });
    },
    login: (req, res) => {
        const { id, email, role } = req.user;
        const token = signToken(id);

        res.cookie("access_token", token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });

        return res.status(200).json({ isAuthenticated: true, user: { email, role } })
    },


    protectedData: (req, res) => {
        return res.status(200).json({ data: "Protected data...hehehe" })
    },


    AdminprotectedData: (req, res) => {
        const { role } = req.user;
        if (role === "admin")
            return res.status(200).json({ data: "Admin Protected data...hehehe" })
        return res.status(403).json({ data: "" })
    },


    authenticated: (req, res) => {
        const { email, role } = req.user;
        return res.status(200).json({ isAuthenticated: true, user: { email, role } })
    },


    logout: (req, res) => {
        res.clearCookie("access_token");
        return res.status(200).json({ success: true, user: { email: "", role: "" } })
    },
    
    sendMail: function (req, res) {

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

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json({ message: 'error ' + error });
            } else {

                res.json({ message: 'Email sent: ' + info.response });
            }
        })


    },




    forgotPassword: function (req, res) {
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
                    transporter4.sendMail(data, function (error, info) {
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



    resetPassword: function (req, res) {
        resetLink = req.body.resetLink;
        newPass = req.body.newPass;
        if (resetLink) {
            jwt.verify(
                resetLink,
                req.app.get('secretKey'),
                function (err, decodeData) {
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