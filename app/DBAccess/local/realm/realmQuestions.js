"use strict";
// const realmBase = require("./baseRealm");
const Realm = require ('realm');

/*const  filePath       = "revisionDump.realm";
const QUESTION = "question" ;
const  _question      = {
    name      : QUESTION,
    primaryKey: 'uuid',
    properties: {
        uuid             : 'string',
        question         : 'string',
        figures          : 'string?',
        solution_head    : 'string',
        possible_solution: 'string',
        saved_on_date    : 'date'
    }
};
const realm =   new Realm({
    path  : filePath,
    schema: [
        _question
    ]
});
const uuid_  = require('uuid/v1');
*/
// RealmBase
// let realm = realmBase.realm;


/*module.exports.saveNewQuestion = (qstnObject) => {
    return new Promise((res , rej)=>{
            let id_ = uuid_();
            const save = {
                    uuid:id_ ,
                    question         : qstnObject.questionHead,
                    figures          : qstnObject.figure_arr,
                    solution_head    : qstnObject.solution_head || "Select Possible Solution",
                    possible_solution: qstnObject.possible_solutions_arr,
                    saved_on_date    : new Date()
            };
            try{
                realm.write(()=> {
                    realm.create(realmBase.QUESTION,save)
                });
                res('done');
            } catch (err) {
                rej('-10');
            }

    });
};*/