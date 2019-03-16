/**
 * This will handle all the backend routing to the system to make server access to the
 * backend.
 * Access include databases both imports and exports and finally the CRUD operations .
 *
 */

const mUtil      = require('./utils/utilConstants') ;
const xpress     = require('express');
const app        = xpress();
const bodyParser = require('body-parser') ;
const qstns      = require('./DBAccess/local/ned/dbQuestions');


app.use(
    bodyParser.urlencoded({
        extended : false
    })
);
app.use(bodyParser.json());

/*------------------------------------------------------------------------------------------*/

app.post('/writeQstn' , (req,res)=>{
	   const dataObject = JSON.parse(req.body.data);
	    // save a new question
	    qstns.saveNewQuestion( dataObject ) .then( response => {

	    	res.json(response) ;

	    }) .catch( (err)=> console.log("Error @/writeQstn/ " + err));
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