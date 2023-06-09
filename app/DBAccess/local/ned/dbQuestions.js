'use strict';
/**
 * This will save the local database .
 * All exports are to be named by date but with concatenation of other relevant string .
 */

 const nedDb = require('nedb') ;
 const db = new nedDb({
    filename:'qnsts.db' ,
    autoload : true
 });
 const dbResponses = new  nedDb ( {
          filename : 'qstn_responses.db' ,
          autoload : true
 }) ;

 let RESPONS_SCHEMA = {
                              qstn_id               : 12 ,
                              selected_response_arr : ['A'] ,
                              saved_on_date         : new Date() ,
                              saved_by              : 'user_id' ,
                              session               : 'jyu67n76756rghy'
                         };

 const SCHEMA_MIXED =  { 
                                    id                     : 12 ,
                                    figurearr              : 'what is ...' ,
                                    figure_arr             : ['base64String_1' , 'base64String_2'] ,
                                    solution_head          : 'select possible Solution' ,
                                    possible_solutions_arr : {A:'Option A' , B : 'option B' , null:'OptionC'} ,
                                    selected_answers_arr   : ['A' ,'B' ,'B']
                       } ;

module.exports.getAllSession = () => {  return new Promise ( ( resolve , reject ) => {
                                                  dbResponses.find({} , (err , docs)=>{
                                                        if (err) {
                                                            reject("-9") ;
                                                        } else {
                                                            resolve(docs) ;
                                                        }
                                                  });
                                          } )

};

module.exports.retriveSession = sessionID => { return new Promise ( ( resolve , reject ) => {
                                                      dbResponses.find({
                                                              session : sessionID
                                                      } , ( err , docs ) => {

                                                              if ( err ) {
                                                                reject("-9") ;
                                                              } else {
                                                                resolve(docs) ;
                                                              }
                                                      });
                              } ) };

module.exports.saveInsertAnswer  = responseObject => {
                                      return new Promise ( ( resolve , reject ) =>{

                                                let obj = {
                                                  qstn_id           : responseObject.qstn_id  ,
                                                  qstn_response_arr : responseObject.qstn_response_arr  ,
                                                  qstn_user_id      : responseObject.qstn_user_id ,
                                                  session           : responseObject.session ,
                                                  score             : responseObject.score ,
                                                  saved_on_date     : new Date()
                                                };

                                                dbResponses.insert( obj , ( error , newdoc) =>{
                                                      if( error ) {
                                                        reject("-10") ;
                                                      } else {
                                                        resolve("done") ;
                                                      }
                                                });
                                      } );
};
 module.exports.getQustionImages = id => {
      return new Promise ( ( resolve , reject) => {
                db.find( { /*_id : id*/} , (error , docs) =>{
                    if( error ) {
                      reject("error");
                    } else {
                      resolve(docs) ;
                    }
                });
      });
 };
 /**
  * This willl fetch or get data in the size range or less than the batch if the parameter is set to any size not zero
  * @param  {int array} batchOfSize get data in this size of or less than the set size but of the parameter is set to zero then ignore the size just get all the data from the database
  * @return {Promise}             [Will retuen josn data via a promise of resolve but any errors then trigger reject]
  */
 module.exports.getAllQuestions = batchOfSize => {
                                      return new Promise ( ( resolve , reject ) => {
                                                  const skip  = batchOfSize[0] ; // was the last size
                                                  const next = batchOfSize[1] ;
                                                  db.find ({}) .skip(skip) .limit(next) .exec( ( err , docs) => {
                                                      if(err){
                                                        reject('err')
                                                      } else {
                                                        resolve(docs) ;
                                                      }
                                                  });
                                      });
 }
 /**
  * All the values can be null
  * qstnObject {
  *             _id:12 , figure_arr:'what is ...' , figure_arr:['base64String_1' , 'base64String_2'] ,
  *             solution_head :'select  possible Solution' ,
  *             possible_solutions_arr : [ {A:'Option A'} , {B : 'option B' } ,{null:'OptionC'} ] ,

  *             selected_answers_arr : ['A' ,'B' ,'B'] ,
  *             }
  */
 module.exports.saveNewQuestion = (qstnObject) => {
    return new Promise( (resolve , reject) =>{
        const save = {
                question          : qstnObject.questionHead ,
                figures           : qstnObject.figure_arr    ,
                solution_head     : qstnObject.solution_head || "Select Possible Solution" ,
                possible_solution : qstnObject.possible_solutions_arr ,
                saved_on_date     : new Date()
        };
        db.insert(save , (error , newDoc)=>{
            if(error) {
                reject('-10');
            }else {
                resolve('done') ;

            }
        })
    }

    );
 };

