"use strict" ;
const Realm = require ('realm');

const  filePath       = "revisionDump.realm";
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
//export default QUESTION , realm;
//export default realm;