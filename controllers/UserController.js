require('../config/config');

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendGridTransporter = require('nodemailer-sendgrid-transport');

//Input validations
const InputValidation = require('../validation/InputValidation');

const transporter = nodemailer.createTransport(
    sendGridTransporter({
        auth: {
            api_key:
                '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'
        }
    })
);

class UserController {
    async register(req, res) {
        try {
            //Check input fields
            const { errors, isValid } = InputValidation.validateRegisterInput(
                req.body
            );

            if (!isValid) return res.status(400).json(errors);

            const user = await User.findOne({ email: req.body.email });

            //User already exist with that email
            if (user) {
                //Create user
                errors.email = 'Email already exist';
                return res.status(400).json(errors);
            } else {
                //Creating the new user and saving it
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10)
                });

                const newUser = await user.save();

                res.json({
                    success: true,
                    newUser
                });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async login(req, res) {
        try {
            //Check input fields
            const { errors, isValid } = InputValidation.validateLoginInput(
                req.body
            );

            if (!isValid) return res.status(400).json(errors);

            //Finding User
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                errors.email = 'Email incorrect';
                return res.status(404).json(errors);
            }

            //Comparing password
            const didMatch = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (didMatch) {
                //User matched
                const payload = {
                    id: user.id,
                    name: user.name
                };

                //Creating the JWT
                const token = jwt.sign(payload, process.env.TOKEN_SEED, {
                    expiresIn: process.env.TOKEN_EXPIRATION
                });

                res.json({ token: 'Bearer ' + token });
            } else {
                //In case didMatch is false, throwing an 404 status with the error
                errors.password = 'Password incorrect';
                return res.status(404).json(errors);
            }
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async sendResetPasswordEmail(req, res) {
        try {
            const errors = {};

            const email = req.body.email;

            const buffer = await crypto.randomBytes(32);

            if (!buffer) return res.status(500).json('Buffer Error');

            const token = buffer.toString('hex');

            const userDb = await User.findOne({ email });

            if (!userDb) {
                errors.user = 'User could not be found with that email';
                return res.status(404).json(errors);
            }

            userDb.resetToken = token;
            userDb.resetTokenExpiration = Date.now() + 360000;

            await userDb.save();

            let emailAddress;

            if (process.env.NODE_ENV === 'production') {
                emailAddress = `http://dashboard.apps.softars.com/reset-password/${token}/${email}`;
            } else {
                emailAddress = `http://localhost:3000/reset-password/${token}/${email}`;
            }

            transporter.sendMail({
                to: email,
                from: 'admin@softars.com',
                subject: 'Password reset',
                html: `
                <p> You requested a password reset </p>
                <p> Click this <a href="${emailAddress}"> Link </a> to set a new password. </p>
                `
            });

            res.json({ token, email });
        } catch (err) {
            console.log(err);
        }
    }

    async resetPassword(req, res) {
        try {
            const errors = {};
            const newPassword = req.body.password;
            const passwordToken = req.params.token;
            const { email } = req.params;

            const user = await User.findOne({
                email,
                resetToken: passwordToken
            });

            if (user.resetTokenExpiration < Date.now()) {
                errors.user = 'The token has expired';
                return res.status(404).json(errors);
            }

            if (!user) {
                errors.user = 'Error 404';
                return res.status(404).json(errors);
            }

            const hashPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashPassword;
            user.resetToken = undefined;
            user.resetTokenExpiration = undefined;

            const newUserData = await user.save();

            res.json({
                newUserData: true,
                newUserData
            });
        } catch (err) {
            console.log(err);
        }
    }

    //Method to get the current user
    getCurrentUser(req, res) {
        res.json({
            id: req.user.id,
            name: req.user.name,
            password: req.user.password,
            role: req.user.role,
            date: req.user.date,
            resetToken: req.user.resetToken,
            resetTokenExpiration: req.user.resetTokenExpiration
        });
    }
}

module.exports = new UserController();
