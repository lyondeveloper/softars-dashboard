const Jwt = require("jsonwebtoken");
const Express = require("express");
const Router = Express.Router();
const Bcrypt = require("bcryptjs");
const User = require("../../models/Users");

Router.post('/api/login', (req, res) => {

    let body = req.body;

    User.findOne({email: body.email}, (err, userLogged) => {

        if (err) {

            return res.status(500).json({

                ok: false,
                err,
                message: "Error contacting the database"

            });

        }

        if (!userLogged) {

            return res.status(400).json({

                ok: false,
                err,
                message: "(User) or password are wrong"

            });

        }

        if (!Bcrypt.compareSync(body.password, userLogged.password)) {

            return res.status(400).json({

                ok: false,
                err,
                message: "User or (password) are wrong"

            });

        }

        let token = Jwt.sign({

            user: userLogged

        }, process.env.TOKEN_SEED, {

            expiresIn: process.env.TOKEN_EXPIRATION

        });

        res.json({

            ok: true,
            message: "You've logged in succesfully",
            userLogged,              
            token

            
        });
    });
});

module.exports = Router;