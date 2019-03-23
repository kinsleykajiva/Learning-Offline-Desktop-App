/* eslint-disable no-unused-vars */
'use strict';

/**
 * This is the base js file to give functionality to the View  .
 * Will be included in the view file or html file
 */
const lowerAlph = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const upperCaseAlp = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const alphabetArray= "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
//
const navLinks       = document.querySelectorAll('link[rel="import"]');
const contentHolder  = $("#mainContent") ;
let   lastClickedNav = null;
/*********************************************************************************************/
// if all die you like thu
/**This controls the navigation of the side bar */
function thisNav( navObject ) {
    // get the id of the html element
    const nav = $(navObject).attr('id');
    if(lastClickedNav === nav) {
        return ;
    }

    let template = null ;
    let clone    = null ;


    switch ( nav ) {
        case 'temp_create_questions':
            template = navLinks[0] .import.querySelector("."+nav) ;
            break;
        case 'temp_answer_questions':
            template = navLinks[1].import.querySelector("." + nav);
            break;
        }

        clone    = document.importNode(template.content , true);
        contentHolder.empty().delay(500).append(clone);
        lastClickedNav = nav ;

}

/*********************************************************************************************/


function error_input_element(isTrue , elementId) {
    if(isTrue){
        $('#'+elementId).css({
            "border": "1px solid red",
            "background": "#ff4e44"
        });

    }else{
        $('#'+elementId).css({
            "border": "",
            "background": ""
        });
    }

}

/*********************************************************************************************/
function emptyInputs ( arrInput_ids , arrSelect_ids ) {

    for(let i = 0 ; i < arrInput_ids.length ; i ++){
        let id = arrInput_ids[i];
        $("#"+id).val('');
    }
    for(let i = 0 ; i < arrSelect_ids.length ; i ++){
        let id = arrSelect_ids[i];
        $("#"+id).val('null');
    }

}

/*********************************************************************************************/
/**
 * This creates an array of numbers with in a given range
 * @param      {Number} start   start from
 * @param      {Number} end     stop at
 * @return     {Integer Array}  .
 */
function rangeArray(start, end) {
    let myArray = [];
    for (let i = start; i <= end; i += 1) {
        myArray.push(i);
    }
    return myArray;
}

/*********************************************************************************************/
function getcurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return mm + '/' + dd + '/' + yyyy;
}


/*********************************************************************************************/


/**
 * This is a method override of the default JS replaceAll method to replace
 * {search} occurrences
 * @param      {String} search  The date to be converted
 * @param      {String} replace The date to be converted
 * @return     {String}  String.
 */
String.prototype.replaceAll2 = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};



/*********************************************************************************************/

/*********************************************************************************************/
function randString(x) {
    var s = "";
    while (s.length < x && x > 0) {
        var r = Math.random();
        s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
    }
    return s;
}
/*********************************************************************************************/
/**
 * Gets the random integer between min and max (both included)
 *
 * @param      {number}  min     The minimum
 * @param      {number}  max     The maximum
 * @return     {<type>}  The random integer.
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*********************************************************************************************/
/**
 * Creates a random receipt Number between min and max (both included)
 * @return     {<String>}  random receipt Number.
 */
function receiptNumber() {
    let ret = "";
    ret = getcurrentDate(); //  dd + '/' + mm + '/' + yyyy;
    let dd = ret.split('/')[0];
    let mm = ret.split('/')[1];
    let yyyy = ret.split('/')[2];
    let millTime = new Date().getMilliseconds() ;
    let ranS = randString(getRndInteger(5, getRndInteger(3, 22))).toUpperCase();
    ret = dd + ranS.substring(2, 4) + ranS.charAt(getRndInteger(1, 2)) + '-' + mm + '-' + ranS.charAt(getRndInteger(1, 8)) + yyyy + '`'+millTime;
    return ret;
}
/*********************************************************************************************/
/**
 * Converts a Turkish Z-Date format to  date form MM/DD/YYYY
 * @param      {String} zDate   The date to be converted
 * @return     {String}  Date String.
 */
function dateConvertor(zDate) {
    return new Date(zDate).toDateString();
}
/*********************************************************************************************/
/**
 * Converts a Turkish Z-Date format to  date form MM/DD/YYYY
 * @param      {String} zDate   The date to be converted
 * @return     {String}  Date String.
 */
function getDateConvertion(zdate) {
    let date = new Date(zdate);
    return ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
}
/*********************************************************************************************/
function getCurrentTimeLong(){
   return new Date().getTime();
}
/*********************************************************************************************/
/**
 * Creates a random String based on the chars input <br>
 * example of usage: randomString(5); or randomString(5,
 * 'PICKCHARSFROMTHISSET');
 * <br>
 * @param {integer} length - size of the output .
 * @param {string} chars - can be ignored ,but the the characters to use in
 *         creating the output.
 * @returns {String} Random string of size @param lenSize
 */
function randomIDString(lenSize, chars) {
    let charSet = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = "";
    for (let i = 0; i < lenSize; i++) {
        let position = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(position, position + 1);
    }
    return randomString;
}
/*********************************************************************************************/
/**
 * Create a random String of alphabet and numbers
 * @returns {string} Random String
 */
function randomStringID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
/*********************************************************************************************/
/**This will reset the form*/
function resteForm(formIdObject) {
    formIdObject[0].reset();
}
/*********************************************************************************************/
function idleTimer() {
    let t;
    //window.onload = resetTimer;
    window.onmousemove = resetTimer; // catches mouse movements
    window.onmousedown = resetTimer; // catches mouse movements
    window.onclick = resetTimer; // catches mouse clicks
    window.onscroll = resetTimer; // catches scrolling
    window.onkeypress = resetTimer; //catches keyboard actions
    function logout() {
        window.location.href = '/action/logout'; //Adapt to actual logout script
    }

    function reload() {
        window.location = self.location.href; //Reloads the current page
    }

    function resetTimer() {
        clearTimeout(t);
        t = setTimeout(logout, 1800000); // time is in milliseconds (1000 is 1 second)
        t = setTimeout(reload, 300000); // time is in milliseconds (1000 is 1 second)
    }
}
/*********************************************************************************************/
function __(elementId) {
    return document.getElementById(elementId);
}
/*********************************************************************************************/
function isNumeric(num){
    return !isNaN(num);
}



/*********************************************************************************************/
function objectsMerge(firstObject, secondObject) {
    for (let key in secondObject) {
        if (secondObject.hasOwnProperty(key)) firstObject[key] = secondObject[key];
    }
    return firstObject;
}
/*********************************************************************************************/
/**
 * This will convert a M/D/Y date format to dddd MMMM D YYYY
 * */
function convertDateToReadable(date_M_slash_D_slash_Y){
    // 02/12/2013
    let longDateStr = moment(date_M_slash_D_slash_Y, 'M/D/Y').format('dddd MMMM D YYYY');
    return (longDateStr);
}

/*********************************************************************************************/
/**
 * This will convert a M/D/Y date format to dddd MMMM D YYYY
 * */
function convertDateToReadableFormat(date_yyy_mm_dd){
    let longDateStr = moment(date_yyy_mm_dd, 'YYYY-MM-DD').format('dddd MMMM D YYYY');
    // alert(new Date("2018-07-27").toUTCString().split(" "))
    return (longDateStr);
}





/*********************************************************************************************/

function emptyInputs ( arrInput_ids , arrSelect_ids ) {

    for(let i = 0 ; i < arrInput_ids.length ; i ++){
        let id = arrInput_ids[i];
        $("#"+id).val('');
    }
    for(let i = 0 ; i < arrSelect_ids.length ; i ++){
        let id = arrSelect_ids[i];
        $("#"+id).val('null');
    }

}

/*********************************************************************************************/
const Toast = Swal.mixin({
                        toast            : true,
                        position         : 'top-end',
                        showConfirmButton: false,
                        timer            : 3000
                });


/*********************************************************************************************/




/*********************************************************************************************/


/*********************************************************************************************/









