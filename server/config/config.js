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

process.env.MONGOURI = "mongodb://dashboard:7f3ecef1ef3aea7d7f9bdf852569ea49@dokku-mongo-dashboard:27017/dashboard";

//mongodb://jesus1234:jesus1234@softars-dashboard-shard-00-00-v9jya.mongodb.net:27017,softars-dashboard-shard-00-01-v9jya.mongodb.net:27017,softars-dashboard-shard-00-02-v9jya.mongodb.net:27017/test?ssl=true&replicaSet=SoftArs-Dashboard-shard-0&authSource=admin&retryWrites=true
/**
 *****************
 * Token Configuration
 ******************
 */

process.env.TOKEN_SEED = process.env.TOKEN_SEED || "secret";

process.env.TOKEN_EXPIRATION = 60 * 60 * 60 * 60;
