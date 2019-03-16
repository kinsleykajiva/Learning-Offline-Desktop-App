'use strict';
let imageStrings = [];
const Toast = Swal.mixin({
                        toast            : true,
                        position         : 'top-end',
                        showConfirmButton: false,
                        timer            : 3000
                });

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
        if(!inp.files[0] && !inp.files){

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
         $("input.singlePossibleClass[type=radio]").each( (i ,el) => {
                let value_ =$(el).parent().parent().prev("div").find("input").val() ;
                let key_ = $(el).parent().children().attr('value')/*.find("input[type='checkbox']").val()*//*val().trim() */;
                 if(value_ !== ''){
                    singlePossibleClass . push( $(el).is(':checked') ?  { [key_] : value_}  : {'null' : value_ } );
                }

            } );
        if(singlePossibleClass === null || !singlePossibleClass.length ){
            Toast.fire({
                timer:4000 ,
                type: 'error',
                title: 'Please Set Possible Solutions'
              }) ;
              return ;
        }



    }
    if(response_type === 'multiple'){
        $("input.multipossibleselects[type=checkbox]").each( (i ,el) => {
                let value_ =$(el).parent().parent().prev("div").find("input").val() ;
                let key_ = $(el).parent().children().attr('value')/*.find("input[type='checkbox']").val()*//*val().trim() */;
                if (value_ !== '') {
                    multipossibleselects . push($(el).is(':checked') ? { [key_] : value_}  : {'null' : value_ } );
                }

            } );
        if(multiPossibleSelects === null || !multiPossibleSelects.length ){
            Toast.fire({
                timer:4000 ,
                type: 'error',
                title: 'Please Set Possible Solutions'
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
    console.log(save);
    let myJSON = JSON.stringify(save);

    Swal.fire({
          type: 'info',
          title: 'Saving ',
          text: 'Saving Please Wait!' ,
          onBeforeOpen : ()=>{
            Swal.showLoading();
          }
    });
    $.post("http://localhost:3500/writeQstn", {
                data : myJSON
    }).done( response => {
                        Swal.close() ;
                        if(response === 'done'){
                            Toast.fire({
                                timer:4000 ,
                                type: 'success',
                                title: 'Saved Question !'
                              }) ;
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
document.getElementById("inp").addEventListener("change", runImageTransformation);
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