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

if (process.env.NODE_ENV === 'production') {
    process.env.MONGOURI =
        'mongodb://jesus1234:jesus1234@main-cluster-shard-00-00-v9jya.mongodb.net:27017,main-cluster-shard-00-01-v9jya.mongodb.net:27017,main-cluster-shard-00-02-v9jya.mongodb.net:27017/SoftArs-Dashboard?ssl=true&replicaSet=Main-Cluster-shard-0&authSource=admin&retryWrites=true';
} else {
    process.env.MONGOURI = 'mongodb://localhost:27017/softars-dashboard';
}
// "";

/**
 *****************
 * Token Configuration
 ******************
 */

process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'secret';

process.env.TOKEN_EXPIRATION = '7d';
