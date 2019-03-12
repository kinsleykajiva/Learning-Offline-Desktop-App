/* eslint-disable no-unused-vars */
'use strict';

/**
 * This is the base js file to give functionality to the View  .
 * Will be included in the view file or html file 
 */


const navLinks       = document.querySelectorAll('link[rel="import"]');
const contentHolder  = $("#mainContent") ;
let   lastClickedNav = null;

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
        case 'create_questions': 
            template = navLinks[0] .import.querySelector(".task-template") ;
            clone    = document.importNode(template.content , true);

            contentHolder.empty().delay(500).append(clone);

            lastClickedNav = nav ;
            break;
        }

}







