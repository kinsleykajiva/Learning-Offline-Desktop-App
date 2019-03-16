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

 const SCHEMA_MIXED =  { id:12 , figurearr:'what is ...' ,
    figure_arr:['base64String_1' , 'base64String_2'] ,
    solution_head :'select possible Solution' ,
    possible_solutions_arr : {A:'Option A' , B : 'option B' , null:'OptionC'} ,

    selected_answers_arr : ['A' ,'B' ,'B']
 } ;
 /**
  * All the values can be null
  * qstnObject {
  *             _id:12 , figure_arr:'what is ...' , figure_arr:['base64String_1' , 'base64String_2'] ,
  *             solution_head :'select  possible Solution' ,
  *             possible_solutions_arr : {A:'Option A' , B : 'option B' , null:'OptionC'} ,

  *             selected_answers_arr : ['A' ,'B' ,'B'] ,
  *             }
  */
 module.exports.saveNewQuestion = (qstnObject) => {
    return new Promise( (resolve , reject) =>{
        const save = {
                question : qstnObject.questionHead ,
                figures :qstnObject.figure_arr    ,
                solution_head : qstnObject.solution_head || "Select Possible Solution" ,
                possible_solution : qstnObject.possible_solutions_arr ,
                saved_on_date : new Date()
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