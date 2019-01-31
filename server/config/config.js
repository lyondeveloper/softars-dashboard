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

if (process.env.NODE_ENV === "production") {
    process.env.MONGOURI =
        "mongodb://dashboard:7f3ecef1ef3aea7d7f9bdf852569ea49@dokku-mongo-dashboard:27017/dashboard";
} else {
    process.env.MONGOURI = "mongodb://localhost:27017/softars-dashboard";
}

// process.env.MONGOURI =
//     "mongodb://jjrincon:Jr946864@ds147233.mlab.com:47233/sadashboard";

// process.env.MONGOURI = "mongodb://jesus1234:jesus1234@main-cluster-shard-00-00-v9jya.mongodb.net:27017,main-cluster-shard-00-01-v9jya.mongodb.net:27017,main-cluster-shard-00-02-v9jya.mongodb.net:27017/SoftArs-Dashboard?ssl=true&replicaSet=Main-Cluster-shard-0&authSource=admin&retryWrites=true";

/**
 *****************
 * Token Configuration
 ******************
 */

process.env.TOKEN_SEED = process.env.TOKEN_SEED || "secret";

process.env.TOKEN_EXPIRATION = "7d";
