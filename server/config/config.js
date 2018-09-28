/** 
 ***************** 
 * Port Configuration
 ****************** 
*/
process.env.PORT = process.env.PORT || 3000; 

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

let urlDB;

if (process.env.NODE_ENV === "dev") {

    urlDB = "mongodb://localhost:27017/softarsweb";

} else {

    urlDB = "mongodb://lyondeveloper:a123456@ds161062.mlab.com:61062/softarsweb";

}

process.env.URLDB = urlDB;

/** 
 ***************** 
 * Token Configuration
 ****************** 
*/

process.env.TOKEN_SEED = process.env.TOKEN_SEED || "this-is-the-development-token-seed";

/** 
 ***************** 
 * Token Configuration
 ****************** 
*/
process.env.TOKEN_EXPIRATION = 60 * 60 * 60 * 60;