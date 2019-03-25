
const body_data = $("#body_data");
const select_options = $("#select_options");
const no_data = $("#no_data");




function groupData (data) {
	let arr = [] ;
	let tempArr = [] ;
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















