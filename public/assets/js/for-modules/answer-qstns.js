//'use strict' ;

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
	reloadSession = true ;
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
/**
 * This is dead similar to the nextQstn() just that it does not increament current position file global variable [currentQuizPosition]
 * The aim is to resume as the data was reatined when the view changed but the scenes could have changed .
*/
function resumeSession () {
	
	currentQuizPosition-- ;
	currentQuizId = idsArray [currentQuizPosition] ;
	
	let quizes = QuizeArray.flat() ;
	//console.log("Now Position" + [currentQuizPosition]);
	$("#question_quize").html(quizes[currentQuizPosition])
			.promise().done(
				()=> getQuestionImage(currentQuizId)
			) ;
	currentQuizPosition++;		
	$("#qstn_numberer").text('Question Number ' + currentQuizPosition   ) ;
	$("#sessionID").text( ' . Session ID : ' + sessionID);
	$("#counter_out_of").text(' ' + currentQuizPosition    + ' out of ' +  quizes.length ) ;	
}
function nextQstn () {

	currentQuizId = idsArray [currentQuizPosition] ;
	let quizes = QuizeArray.flat() ;
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
	if ( ! reloadSession ) {
		resumeSession () ;
		return;
	}
	sessionID = receiptNumber() ;
	reloadSession = false ;
	getQuestions () ;

}

// setTimeout(()=> startTest() , 1500);

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



