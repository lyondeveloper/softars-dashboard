/**
 *****************
 * Enviroment Configuration
 ******************
 */

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

/**
 *****************
 * Database Configuration
 ******************
 */

process.env.MONGOURI = "mongodb://lyondeveloper:a123456@ds161062.mlab.com:61062/softarsweb";
// "";

/**
 *****************
 * Token Configuration
 ******************
 */

process.env.TOKEN_SEED = process.env.TOKEN_SEED || "secret";

/**
 *****************
 * Token Configuration
 ******************
 */
process.env.TOKEN_EXPIRATION = 60 * 60 * 60 * 60;
