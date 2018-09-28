const Jwt = require("jsonwebtoken");

/** 
 *********** 
 * Verify token
 *********** 
*/
let verifyToken = (req, res, next) => {

    let token = req.get("token");

    Jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {

        if (err) {

            return res.status(400).json({

                ok: false,
                err,
                message: "Token not valid"

            });

        }

        req.user = decoded.user;
        next();

    });

}


/** 
 *********** 
 * Verify Admin role
 *********** 
 */

let verifyRole = (req, res, next) => {

    let users = req.user;

    if (users.role !== 'ADMIN') {

        return res.status(500).json({

            ok: false,
            message: "You are not allowed to do this, if you want to do this, you've got to have a superior role"

        }); 

    } else {

        next();

    }

}

module.exports = {

    verifyToken,
    verifyRole

}