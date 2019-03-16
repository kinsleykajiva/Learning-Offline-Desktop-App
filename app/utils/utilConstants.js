/* eslint-disable no-unused-vars */

/*let  bcrypt = require("bcrypt");*/


const HOST = "localhost" ;

const CONNECTION_PORT = 1000 ;

const USER = "root" ;

const PASSWORD = "windows95" ;

const LOCAL_DB = "";

const REMOTE_IMPORTS = " ";

const LOCAL_DB_KEY = "";

const ENCORDING_ALGORITHM = 'aes-256-ctr' ;



/********************************************************************************************************************************************************************* */
/********************************************************************************************************************************************************************* */
/**
 * Gets current date in the dd/mm/yyyy format .
 * @returns {string} current date String
 */
function getCurrentDate() {
    let today = new Date();
    let dd    = today.getDate();
    let mm    = today.getMonth() + 1;  //January is 0!
    let yyyy  = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + yyyy;

}
/********************************************************************************************************************************************************************* */

/**
 * Gets the random integer between min and max (both included)
 *
 * @param      {number}  min     The minimum
 * @param      {number}  max     The maximum
 * @returns    {number}  The random integer.
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/********************************************************************************************************************************************************************* */




/*-------------------------------------------------------------------------------------------------------*/
/**
 * To encrypt the password .
 * @param {string} password
 * @returns {string} hash
 */
function encryptPassword(password) {
    let saltRounds = 12;
   /* let   salt       = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt)  ;*/
}
/*-------------------------------------------------------------------------------------------------------*/
/**
 * Checks if the pass is valid .
 * @param {string} password - raw string from the user .
 * @param {string} hash - hash from the database .
 * @returns {boolean} boolean - true if valid else false not valid .
 */
function isPassword(password , hash) {

    return 1/* bcrypt.compareSync(password, hash)*/;
}
/*-------------------------------------------------------------------------------------------------------*/










