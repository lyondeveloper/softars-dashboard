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

process.env.MONGOURI =
  "mongodb://jesus1234:jesus1234@softarsdashboard-shard-00-00-v9jya.mongodb.net:27017,softarsdashboard-shard-00-01-v9jya.mongodb.net:27017,softarsdashboard-shard-00-02-v9jya.mongodb.net:27017/test?ssl=true&replicaSet=SoftArsDashboard-shard-0&authSource=admin&retryWrites=true";

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
