//Import of libraries and frameworks
const Express = require('express');
const Router = Express.Router();
const Bcrypt = require('bcryptjs');
const _ = require('underscore');

//Import of external scripts
const User = require('../../models/Users');
const {verifyToken, verifyRole} = require('../../middlewares/authentication');

/** 
 * Create a new user
*/
Router.post('/api/users', [verifyToken, verifyRole], (req, res) => {

    let user = new User({
        
        name: req.body.name,
        email: req.body.email,
        password: Bcrypt.hashSync(req.body.password, 10),
        role: req.body.role,
        birthday: req.body.birthday,

    });

    user.save((err, userSaved) => {

        if (err) {

            return res.status(400).json({

                ok: false,
                err: {
                    
                    err,
                    message: "Error saving into the database"

                }
            });

        }

        res.json({

            ok: true,
            user: userSaved
            
        });
    });
});

/** 
 * Get users
*/
Router.get("/api/users", verifyToken,(req, res) => {

    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);

    User.find({status: true}, "name email status role birthday img")
        .skip(from)
        .limit(limit)
        .sort("name")
        .exec((err, usersDB) => {

            if (err) {

                return res.status(400).json({

                    ok: false,
                    err,
                    message: "Error in the searching of the users"

                });

            }

            User.count({status: true}, (err, count) => {

                res.json({

                    ok: true,
                    users: usersDB,
                    totalusers: count

                });
            });
        });
});

/** 
 * Get users by ID
*/
Router.get("/api/users/:id", verifyToken, (req, res) => {

    let id = req.params.id;

    User.findById(id, (err, userDB) => {

            if (err) {

                return res.status(400).json({

                    ok: false,
                    err,
                    message: "Error in the searching of the user, maybe the ID is invalid"

                });

            }

            if (!userDB) {

                return res.status(400).json({

                    ok: false,
                    err,
                    message: "Maybe the user doesn't exist"

                });

            }

            res.json({

                ok: true,
                user: userDB
               
            });
        });
});

/** 
 * Get users by name
*/
Router.get("/api/users/search-name/:name", verifyToken, (req, res) => {

    let name = req.params.name;

    let regexp = new RegExp(name, "i"); 

    User.find({name: regexp}) 
        .exec((err, userDB) => {

            if (err) {

                return res.status(400).json({

                    ok: false,
                    err,
                    message: "Maybe there isn't a user with that name"

                });

            }

            if (!userDB) {

                return res.status(400).json({

                    ok: false,
                    err,
                    message: "Maybe the user doesn't exist"

                });

            }

            res.json({

                ok: true,
                user: userDB
               
            });
        });
});

/** 
 * Update a user
*/
Router.put("/api/users/:id", verifyToken, (req, res) => {

    let id = req.params.id;

    let body = _.pick(req.body, ["name", "email", "img", "role", "status"]); 

    User.findByIdAndUpdate(id, body, {new: true}, (err, userUpdated) => {

        if (err) {

            return res.status(400).json({

                ok: false,
                err,
                message: "Maybe the ID doesn't exists"

            });

        }

        if (!userUpdated) {

            return res.status(400).json({

                ok: false,
                err,
                message: "Maybe the user doesn't exist"

            });

        }

        res.json({

            ok: true,
            userUpdated

        });
    });
});

/** 
 *************
 * Delete a User
 ************* 
*/
Router.delete("/api/users/:id", verifyToken, (req, res) => {

    let id = req.params.id;

    User.findByIdAndRemove(id, (err, userDeleted) => {

        if (err) {

            return res.status(400).json({

                ok: false,
                err,
                message: "Maybe the ID is invalid"

            });

        }

        if (!userDeleted) {

            return res.status(400).json({

                ok: false,
                err,
                message: "Maybe the user is already deleted"

            });

        }

        res.json({

            ok: true,
            userDeleted

        });
    });
});

module.exports = Router;