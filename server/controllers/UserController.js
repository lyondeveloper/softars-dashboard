require("../config/config");

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Input validations
const InputValidation = require("../validation/InputValidation");

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
                errors.email = "Email already exist";
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
            console.log(err);
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
                errors.email = "Email incorrect";
                return res.status(404).json(errors);
            }

            //Comparing password
            const didMatch = await bcrypt.compareSync(
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
                const token = await jwt.sign(payload, process.env.TOKEN_SEED, {
                    expiresIn: process.env.TOKEN_EXPIRATION
                });

                res.json({ token: "Bearer " + token });
            } else {
                //In case didMatch is false, throwing an 404 status with the error
                errors.password = "Password incorrect";
                return res.status(404).json(errors);
            }
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    //Method to get the current user
    getCurrentUser(req, res) {
        res.json({
            id: req.user.id,
            name: req.user.name,
            password: req.user.password,
            role: req.user.role,
            date: req.user.date
        });
    }
}

module.exports = new UserController();
