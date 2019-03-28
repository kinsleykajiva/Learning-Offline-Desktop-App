/*
*
 ***************************************
 ************create-qstns.js************
 ***************************************
 */

'use strict';
let imageStrings = [];


function saveNewQuestion() {
    // make possible validations and save
    let mainQuestion         = $("#mainQuestion").val().trim();
    let image_qstn           = $("#image_qstn").val();
    let inp                  = document.getElementById("inp");
    let response_type        = $("#response_type").val() ;
    let askForResponseSol    = $("#askForResponseSol").val().trim();
    let multiPossibleSelects = [];
    let singlePossibleClass  = [] ;



    if(mainQuestion === ''){
        error_input_element(true , "mainQuestion");

        Toast.fire({
            timer:4000 ,
            type: 'error',
            title: 'Please Fill In Required Detail'
        }) ;
        return ;

    }
    error_input_element(false , "mainQuestion");
    if(image_qstn !== 'null'){

        if(inp.files.length == 0){

            error_input_element(true , "inp");
            Toast.fire({
                timer:4000 ,
                type: 'error',
                title: 'Please Select Diagram File'
            }) ;
            return ;
        }
        error_input_element(false , "inp");
    }
    if(response_type === 'null'){
        error_input_element(true , "response_type");
        Toast.fire({
            timer:4000 ,
            type: 'error',
            title: 'Please Select Response Type'
        }) ;
        return ;
    }
    error_input_element(false , "response_type");
    if(response_type === 'single'){
        let anySlect = false;
        $("input.singlePossibleClass[type=radio]").each( (i ,el) => {
            anySlect = !anySlect ?  $(el).is(':checked') : false ;
            let value_ =$(el).parent().parent().prev("div").find("input").val() ;
            let key_ = $(el).parent().children().attr('value');
            if(value_ !== ''){
                singlePossibleClass . push( $(el).is(':checked') ?  { [key_] : value_}  : {'null' : value_ } );
            }

        } );
        if( !singlePossibleClass.length /*|| !anySlect*/ ){
            Toast.fire({
                timer:4000 ,
                type: 'error',
                title: 'Please Set Possible Solutions single'
            }) ;
            return ;
        }
    }
    if(response_type === 'multiple'){
        let anySlect = false;
        $("input.multiPossibleSelects[type=checkbox]").each( (i ,el) => {
            anySlect = !anySlect ?  $(el).is(':checked') : false ;
            let value_ =$(el).parent().parent().prev("div").find("input").val() ;
            let key_ = $(el).parent().children().attr('value');
            if (value_ !== '') {
                multiPossibleSelects . push($(el).is(':checked') ? { [key_] : value_}  : {'null' : value_ } );
            }

        } );

        if( !multiPossibleSelects.length /* || !anySlect*/ ){
            Toast.fire({
                timer:4000 ,
                type: 'error',
                title: 'Please Set Possible Solutions m'
            }) ;
            return ;
        }
    }

    let save = {
        questionHead : mainQuestion ,
        figure_arr:!imageStrings.length ? null : imageStrings ,
        solution_head : askForResponseSol === '' ?  'Select Solution .' : askForResponseSol ,
        possible_solutions_arr :  singlePossibleClass.length === 0 ? multiPossibleSelects : singlePossibleClass
    };
    //console.log(save);
    let myJSON = JSON.stringify(save);

    Swal.fire({
        type: 'info',
        title: 'Saving ',
        text: 'Saving Please Wait!' ,
        onBeforeOpen : ()=>{
            Swal.showLoading();
        }
    });
    $.post(url_ + "writeQstn", {
        data : myJSON
    }).done( response => {
        Swal.close() ;
        if(response === 'done'){
            Toast.fire({
                timer:4000 ,
                type: 'success',
                title: 'Saved Question !'
            }) ;
            emptyInputs(['mainQuestion' ,'inp'  ] , ['image_qstn' , 'response_type']);
            changeSolutionTypeView() ;
            changeImageSelection() ;
        }else{
            Toast.fire({
                timer:4000 ,
                type: 'error',
                title: 'Failed to save , Try again !'
            }) ;
        }
    }).fail(()=>{
        Swal.close();
    }) ;

    setTimeout(()=> Swal.close() , 5000);


}

function runImageTransformation() {

    if (this.files && this.files[0]) {
        $("#img").slideDown('fast');
        imageStrings = [];
        for (let x = 0; x < this.files.length; x++) {
            let file = this.files[x];

            document.getElementById('b64').innerText = "Loading Image Please wait";
            const fileReader = new FileReader();

            fileReader.addEventListener('load', e => {

                document.getElementById("img").src = e.target.result;
                document.getElementById('b64').innerText = "Done Continue";

                imageStrings.push(e.target.result);

            });
            fileReader.readAsDataURL(file);
        }
    } else {
        $("#img").slideUp('slow');
    }
}
function changeImageFileSelection() {
    runImageTransformation ()  ;
}
//document.getElementById("inp").addEventListener("change", runImageTransformation);
// eslint-disable-next-line no-unused-vars
function changeImageSelection() {
    let image_qstn = $("#image_qstn").val();
    if (image_qstn === 'null') {
        $("#div_image_selection").slideUp('slow');
    } else {
        $("#div_image_selection").slideDown('slow');
    }
}

// eslint-disable-next-line no-unused-vars
function changeSolutionTypeView() {
    let responseType = $("#response_type").val();
    if (responseType === 'null') {
        $("#checkMultiSol").slideUp('slow');
        $("#checkSingleSol").slideUp('slow');
        count_addSinglePossibleSolution = 0;
        count_addPossibleSolution = 0;
    } else if (responseType === 'single') {
        $("#checkMultiSol").slideUp('slow');
        $("#checkSingleSol").slideDown('slow');
        $("input[type='text'] .inputMultiSolution").each( ()=>   $(this).val('') );
        $("#solClones").empty();// remove all the children after emptying the inputs
        count_addSinglePossibleSolution = 0;
        count_addPossibleSolution = 0;
    } else if (responseType === 'multiple') {
        $("#checkMultiSol").slideDown('slow');
        $("#checkSingleSol").slideUp('slow');
        $("input[type='text'] .inputSingleSolution").each( ()=>   $(this).val('') );
        $("#singleSolClones").empty();// remove all the children after emptying the inputs
        count_addSinglePossibleSolution = 0;
        count_addPossibleSolution = 0;
    }
}

let count_addSinglePossibleSolution = 0;
let count_addPossibleSolution = 0;
function addSinglePossibleSolution() {
    // clone div solution
    let div = document.getElementById("clonableSinglePossibleSolution");
    let clone = div.cloneNode(true);
    count_addSinglePossibleSolution ++;
    $(clone).children().closest('div').eq(0).find('input').val("");
    $(clone).children().closest('div').eq(1).find("span.span_ans").text(" " +  alphabetArray[count_addSinglePossibleSolution] + " ? ");
    $(clone).children().closest('div').eq(1).find('input').val(alphabetArray[count_addSinglePossibleSolution]);

    // append the  clone to the existing node
    let solClones = document.getElementById("singleSolClones");
    solClones.append(clone);
}

function addPossibleSolution() {
    // clone div solution
    let div = document.getElementById("clonablePossibleSolution");
    let clone = div.cloneNode(true);
    count_addPossibleSolution++;
    $(clone).children().closest('div').eq(0).find('input').val("");
    $(clone).children().closest('div').eq(1).find("span.span_ans").text(" " +  alphabetArray[count_addPossibleSolution] + " ? ");
    $(clone).children().closest('div').eq(1).find('input').val(alphabetArray[count_addPossibleSolution]);

    // append the  clone to the existing node
    let solClones = document.getElementById("solClones");
    solClones.append(clone);
}


/*
*
 ***************************************
 ************answer-qstns.js************
 ***************************************
 */

let skip = 0 ;
let next = 10 ;
let QuizeArray = [] ;
let idsArray = [] ;
let currentQuizPosition = 0 ;
let currentQuizId = null;
let sessionID = receiptNumber() ;
let correctCollect = [] ;
let dataSrc = []; // keep this variable in check esp when new questio are added and this will need acheck on references
let scoreSum = 0 ;
function markingProcess() {

    scoreSum = correctCollect.reduce( (total, currentValue) => {   return total + currentValue.score; },  scoreSum);
}

function restartQstns(){

    // this will restart the session
    QuizeArray = [] ;
    idsArray = [] ;
    currentQuizPosition = 0 ;
    currentQuizId = null ;
    sessionID = receiptNumber() ;
    correctCollect = [] ;
    scoreSum = 0 ;
    Swal.fire({
        type: 'info',
        title: 'Process ',
        text: 'Retarting Session Please wait '  ,
        onBeforeOpen : ()=>{
            Swal.showLoading();
        }
    });
    setTimeout(() => {
        Swal.close();
    }, 2500 * getRndInteger (2 , 6) );
}

function stageCompletion () {}

function showNextQstn(){

    if(currentQuizPosition === QuizeArray.flat().length || currentQuizPosition > QuizeArray.flat().length   ) {
        markingProcess() ;
        Swal.fire({
            type: 'info',
            title: 'Progress State ',
            text: "You Have answered all questions ! \n Your Score is " + scoreSum + ' out of ' + QuizeArray.flat().length
        });
        currentQuizPosition = 0 ;
        $("#nextquestions").text("Done , Restart .");
        return;
    }

    let choices = []  ;

    $(".ans_resp_qnst_" + currentQuizId ) .each( (index, el) => {
        if( $(el).is(':checked') ) {
            choices .push( $(el).val()) ;
        }

    });
    let choicesCountAvailble = $(".ans_resp_qnst_" + currentQuizId ).length ;

    if ( !choices.length ){
        $("#nextquestions").prop('disable' , true ) ;
        notify_warning("Select Error Required"  , 'Please select a response from the solutions provided' , 4 );
        return ;
    }
    $("#nextquestions").prop('disable' , false ) ;
    let cuurentQstns = QuizeArray.flat() ;
    let qstn = dataSrc [ currentQuizPosition ] ;

    let qstn_solutions = qstn.map(Object.keys).flat(); // outputs ["A", "B", "null"] or ["A", "B", "null","null"]

    qstn_solutions = qstn_solutions.filter(item => item !== 'null') ; // _.pull(qstn_solutions, 'null');

    if(choices.length){
        let choices_new = choices.filter(item => item !== 'null')  //  _.pull(choices, 'null') ;

        choices_new.forEach( val => {
            if (qstn_solutions.includes( val )) {
                correctCollect.push({'id' : currentQuizId , 'correct' : val , 'score' : 1 }) ;
            }
        });
    }

    Swal.fire({
        type: 'info',
        title: 'Process ',
        text: 'Wait ... '  ,
        onBeforeOpen : ()=>{
            Swal.showLoading();
        }
    });
    let temp_scoreSum = correctCollect.reduce( (total, currentValue) => {   return total + currentValue.score; },  0 );
    let obj = {
        qstn_id : currentQuizId ,
        qstn_response_arr : choices ,
        qstn_user_id : $("#loogedUseer").text().trim() ,
        session : sessionID ,
        score : temp_scoreSum
    };
    let myJSON = JSON.stringify(obj);
    $.post(url_ + 'saveResponse', {data : myJSON
    } ).done(response => {
        let json = response ;
        if( json.length ){
            nextQstn();
        }
        Swal.close();
    }).fail( () => console.log(err));


}
function nextQstn () {

    currentQuizId = idsArray [currentQuizPosition] ;
    let quizes = QuizeArray.flat() ;
    //console.log(quizes[currentQuizPosition]);
    $("#question_quize").html(quizes[currentQuizPosition])
        .promise().done(
        ()=> getQuestionImage(currentQuizId)
    ) ;
    currentQuizPosition++ ;
    $("#qstn_numberer").text('Question Number ' + currentQuizPosition  ) ;
    $("#sessionID").text( ' . Session ID : ' + sessionID);
    $("#counter_out_of").text(' ' + currentQuizPosition + ' out of ' +  quizes.length ) ;

}
function startTest() {
    sessionID = receiptNumber() ;
    getQuestions () ;

}

setTimeout(()=> startTest() , 1500);

function renderQuetsionToScreen(){
    // [array(2) , array(5)]
    let posOtter = QuizeArray.length ;
    let posInner = QuizeArray [ (posOtter - posOtter)  ] ;

}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getQuestions () {
    Swal.fire({
        type: 'info',
        title: 'Process ',
        text: QuizeArray.length ? 'Fetching More Questions Please Wait!' :  'Fetching Questions Please Wait!'  ,
        onBeforeOpen : ()=>{
            Swal.showLoading();
        }
    });
    axios.get( url_ + 'fetchqstns' , {
        params : {
            sets : skip + '-' + next
        }
    }).then(response =>{

        let json = response.data ;
        if(json.length){
            let xr = createQuestionView(json);
            QuizeArray.push ( xr ) ;
            nextQstn (); // start the session
            Swal.close();
        }
    }).catch( err => {
        /*console.log(err);*/
        /*Toast.fire({
                    timer:4000 ,
                    type: 'error',
                    title: 'Failed to get data , Reload again !'
                  }) ;*/

    });
}
//
function getQuestionImage (id_record) {
    if(id_record === null || id_record === 'null') {
        $("#img_" + id_record)  . slideUp('slow') ;
        return ;
    }
    $("#img_" + id_record)  . slideDown('slow') ;
    axios.get(url_ + 'imgGet' , {
        params : {
            imgString : id_record
        }
    }) .then( response => {
        response = response . data ;
        //console.log(response);
        if(response.length) {
            for(let i = 0 ; i < response.length  ; i++) {
                let imgSrc = response[ i ]  ;
                let id = "img_"+imgSrc._id ;
                //console.log(imgSrc._id);
                if ( $("#" + id ) .length ) {
                    if ( imgSrc.figures == null ) {
                        $("#diagrame_" + imgSrc._id ).slideUp("slow");
                    }
                    if ( imgSrc.figures != null ) {
                        $("#diagrame_" + imgSrc._id  ).slideDown("slow");
                        document.getElementById(id).src = imgSrc.figures[0];
                    }

                }


            }
        }
    });
}


function ansCheckChange( type , id ) {
    // the unsed arguments have been set to be used in the future , as it maybe it could redudentant
    let choices = []  ;
    let choicesCountAvailble = $(".ans_resp_qnst_" + currentQuizId ).length ;
    if ( ! choicesCountAvailble ) {
        return ;
    }
    let counter = 0 ;
    $(".ans_resp_qnst_" + currentQuizId ) .each( (index, el) => {
        if( $(el).is(':checked') ) {
            counter++ ;
            choices .push( $(el).val()) ;
        }
    });
    if(counter === choicesCountAvailble ){
        $(".ans_resp_qnst_" + currentQuizId ) .each( (index, el) =>  $(el).prop('checked', false) );
    }

}


function createQstnAnswers(id,data) {
    let li = ``;
    let kId = id ;
    dataSrc . push(data) ;
    id = 'anns_' + id ;

    let SingSolutionedFlatArray = data.map(Object.keys).flat(); // outputs ["A", "B", "null"] or ["A", "B", "null","null"]

    const search = 'null' ;
    let nullCount = SingSolutionedFlatArray.reduce( (n,val) => { return n + (val === search) ; } , 0) ; // counts how many times null occures in the flatArray SingSolutionedFlatArray

    let type = nullCount === 1 ?  'radio' : 'checkbox' ;

    for( let i = 0 ; i < data.length ; i++ ){
        let val = data [ i ] ;
        let key = Object.keys(val) ;
        let value = val [ key ]  ;
        li += `
		   <li id='ans_rep${kId}' >
	                    <label>
	                        <input onchange="ansCheckChange('${type}' , '${id}' );"  class="ans_resp_${kId}" type="${type}" name="answerGroup" value="${key}" id="${id}">
	                         ${value}
                                </label>
	                </li>
			`;
    }

    return li ;
}
function createQuestionView (data) {
    let divV = ``;
    let retVal =  [] ;
    for(let x = 0  ; x < data.length ; x++){
        let val = data[x] ;

        let id = "qnst_" + val._id ;

        let answerList = createQstnAnswers( id , val.possible_solution);


        divV = `
			 <div id='${id}' class="privew">
                                            <div class="questionsBox">
                                                <div class="questions">
                                                    ${val.question}
                                                </div>
                                                <div id="diagrame_${val._id}" style="height:465px;border-color: red;">
                                                    <center>
                                                        <img id='img_${val._id}' src="" style="max-height: 450px;padding: 10px;">
                                                    </center>
                                                </div>
                                                <ul class="answerList">
                                                    ${answerList}
                                                </ul>
                                                <div class="questionsRow">
	                                                <a href="javascript:void(0);" onclick="showNextQstn()" class="button" id="nextquestions">Next</a>
	                                                <a style="display:none;" href="javascript:void(0);" class="button" id="skipquestions">Skip</a>
	                                                <span id="counter_out_of">2 of 20</span>
                                                </div>
                                            </div>
                                        </div>
		`;
        retVal .push ( divV ) ;
        idsArray .push(val._id);
        //console.log(val._id) ;

    }

    return retVal ;
}





/*
*
 ***************************************
 ************session_tables.js************
 ***************************************
 */

const body_data = $("#body_data");
const select_options = $("#select_options");
const no_data = $("#no_data");

function groupData (data) {
    let arr = [] ;
    let tempArr = [] ;
    let objKey = null ;
    data.forEach( (val , i) => {
        objKey = val.session;

        if(!tempArr.length) {
            tempArr .push({ 'session' : objKey , 'count' : 0 , 'saved_on_date' :  val.saved_on_date}) ;
        }

        tempArr.forEach( (val_val , i_ ) => {
            let isFound = false ;

            tempArr.forEach( (val_ , i_i ) => {

                if (val_ ['session'] === objKey  ) {
                    isFound = true ;
                }
            }) ;
            if ( ! isFound ) {
                tempArr .push({ 'session' : objKey , 'count' : 0 ,  'saved_on_date' :  val.saved_on_date}) ;
            }
            isFound = false
        }) ;

        tempArr.forEach( (val_ , i_ ) => {
            if (val_ ['session'] === objKey ) {
                val_['count']  = val_['count'] + 1 ;
            }
        }) ;

    });

    return tempArr ;

}
function tableChange() {
    if(select_options.val() !== 'null') {
        getSessionData(select_options.val())
    }
}
function renderOptions(data) {
    let option = `` ;
    data.forEach( (val , ind) =>{
        let time = val.saved_on_date.split('T')[1].split('.')[0] ;
        option += `<option value = '${val.session}' > ${val.session}  ( ${val.saved_on_date.split('T')[0]} @ ${time} )</option>` ;
    });

    select_options.append(option) ;
}
function getSessionData(sessionID) {

    $.get(url_ +  'getsession' ,{
        sess : sessionID
    }).done( response =>{
        // end loading
        //console.log(response);
        if(response.length) {
            response = groupData(response) ;
            let rows = createRows (response);
            body_data.html(rows);
            body_data.slideDown('slow');
            no_data.slideUp('slow');
            if(sessionID ==='1'){
                renderOptions(response);
            }
        }else {
            no_data.slideDown('slow');
            body_data.slideUp('slow');
        }
    }).fail( () =>{
        console.error("failed to connect");
    });
}
setTimeout(() =>{
    getSessionData('1');
},500) ;

function createRows (data) {
    let row = ``;
    for ( let x = 0 ; x < data.length ; x++ ) {
        let val = data [ x ] ;
        let time = val.saved_on_date.split('T')[1].split('.')[0] ;
        row += `
			<tr>
			   <th scope="row">${(x+1)}</th>
                                       <td>${val.saved_on_date.split('T')[0]} @ ${time}</td>
                                       <td>${val.session}</td>
                                       <td>${val.count}</td>
                                    </tr>
                              ` ;
    }

    return row ;
}



