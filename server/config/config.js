/**
 *****************
 * Enviroment Configuration
 ******************
 */

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

/**
 *****************
 * Port Configuration
 ******************
 */
process.env.PORT = process.env.PORT || 5000;

/**
 *****************
 * Database Configuration
 ******************
 */

// if (process.env.NODE_ENV === "production") {
//     process.env.MONGOURI =
//         "mongodb://dashboard:7f3ecef1ef3aea7d7f9bdf852569ea49@dokku-mongo-dashboard:27017/dashboard";
// } else if (process.env.NODE_ENV === "dev") {
//     process.env.MONGOURI = "mongodb://localhost:27017/softars-dashboard";
// }

/**
 *****************
 * Token Configuration
 ******************
 */

process.env.TOKEN_SEED = process.env.TOKEN_SEED || "secret";

process.env.TOKEN_EXPIRATION = 60 * 60 * 60 * 60;
