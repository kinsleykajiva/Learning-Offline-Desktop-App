"use strict";
/**
 * This will handle all the backend routing to the system to make server access to the
 * backend.
 * Access include databases both imports and exports and finally the CRUD operations .
 *
 */

const mUtil      = require('./utils/utilConstants') ;
const xpress     = require('express');
const  assert = require('assert');
const app        = xpress();
const bodyParser = require('body-parser') ;
const qstns      = require('./DBAccess/local/ned/dbQuestions');
//const realm = require("./DBAccess/local/realm/realmQuestions");


app.use(
    bodyParser.urlencoded({
                    limit         : '150mb',
                    extended      : true,
                    parameterLimit: 50000
    })
);
app.use(bodyParser.json({limit:'150mb'}));

/*------------------------------------------------------------------------------------------*/

app.post('/writeQstn' , (req,res)=>{
            const dataObject = JSON.parse(req.body.data);
            // save a new question
            qstns.saveNewQuestion( dataObject ) .then( response => {

            res.json(response) ;

            }) .catch( (err)=> console.log("Error @/writeQstn/ " + err));
});

/*------------------------------------------------------------------------------------------*/
app.get('/fetchqstns' , (req , res) => {
          let sets = req.query.sets ;
          sets = sets.split('-');
          sets = sets.map(Number) ;
          qstns.getAllQuestions(sets).then( response => {
           res.json(response);
          }) .catch ( error => console.log( "Error @/fetchqstns/ " + error ) ) ;
});
/*------------------------------------------------------------------------------------------*/

app.get("/imgGet" , (req , res)=>{
      let id = req.query.imgGet ;
      qstns.getQustionImages(id) . then( response => {

          for(let x  = 0  ; x < response.length  ; x++){
              let el = response [ x ] ;
              if(el._id === id  ) {
                  response = [ el ] ;
                  break;
              }
          }
          res.json (response) ;
      }) .catch ( error => console.log("Error @/imgGet/ " + error) ) ;
});

/*------------------------------------------------------------------------------------------*/

function toDelete(){
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------*/





/*------------------------------------------------------------------------------------------*/




/*------------------------------------------------------------------------------------------*/






/*------------------------------------------------------------------------------------------*/




/*------------------------------------------------------------------------------------------*/





/*------------------------------------------------------------------------------------------*/




/*------------------------------------------------------------------------------------------*/

app.listen( 3500 , ()=> {console.log("Server On ...")});