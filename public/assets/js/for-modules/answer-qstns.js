'use strict' ;

let skip = 0 ;
let next = 10 ;
const url_ = "http://localhost:3500/" ;
let QuizeArray = [] ;
let idsArray = [] ;
let currentQuizPosition = 0 ;
let currentQuizId = null;

function nextQstn () {
	currentQuizPosition++ ;
	currentQuizId = idsArray [currentQuizPosition] ;
	let quizes = QuizeArray.flat() ;
	$("#question_quize").html(quizes[currentQuizPosition]);
	getQuestionImage(currentQuizId) ;
}
function startTest() {
	getQuestions () ;
	currentQuizId = idsArray [currentQuizPosition] ;
	let quizes = QuizeArray.flat() ;
	$("#question_quize").html(quizes[currentQuizPosition]);
	getQuestionImage(currentQuizId) ;
}


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
			 Swal.close();

			/*
			currentQuizId = idsArray [currentQuizPosition] ;
			$("#question_quize").html(xr[currentQuizPosition]);
			getQuestionImage(currentQuizId) ;
			*/
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
				if ( !$("#img_"+imgSrc._id) .length ) {
				       // alert ( 'Error: ' );
				    }
				    $("#diagrame_"+imgSrc._id) . slideUp("slow");
				document.getElementById(id).src = imgSrc.figures[0];

			}
		}
	});
}
// getQuestions () ;
function createQstnAnswers(id,data) {
	let li = ``;
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
		   <li>
	                    <label>
	                        <input type="${type}" name="answerGroup" value="${key}" id="${id}">
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
	                                                <a href="javascript:void(0);" class="button" id="nextquestions">Next</a>
	                                                <a href="javascript:void(0);" class="button" id="skipquestions">Skip</a>
	                                                <span>2 of 20</span>
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



