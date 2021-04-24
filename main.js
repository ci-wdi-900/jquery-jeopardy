// Grey's out DIV and restricts a click listener
function removeSquareFromJeopardyBoard(elementID){
    console.log(`element ID in remove square from: ${elementID}`)
    $(`#${elementID}`).removeClass('clickable');
    $(`#${elementID}`).css("background-color", "grey");
    $(`#${elementID}`).off("click",mainFunctionWhenSquareIsClicked);
    greyedOutSquaresIDsArray.push(elementID);
    window.localStorage.setItem('greyed-out-squares', greyedOutSquaresIDsArray);
    console.log(greyedOutSquaresIDsArray);
}

function removeSquareFromJeopardyBoard2(elementID){
    console.log(`element ID in remove square from: ${elementID}`)
    $(`#${elementID}`).removeClass('clickable');
    $(`#${elementID}`).css("background-color", "grey");
    $(`#${elementID}`).off("click",mainFunctionWhenSquareIsClicked);
}

greyedOutSquaresIDsArray = window.localStorage.getItem('greyed-out-squares');
console.log(greyedOutSquaresIDsArray);

if (greyedOutSquaresIDsArray === null){

    greyedOutSquaresIDsArray = [];

}
else{
    greyedOutSquaresIDsArray = greyedOutSquaresIDsArray.split(',');

    for(const square of greyedOutSquaresIDsArray){
        removeSquareFromJeopardyBoard2(square);
    }

}

function mainFunctionWhenSquareIsClicked(){
    
    
    let elementId = $(this).attr("id");
    console.log(`Element id that was clicked: ${elementId}`);
    
    // makes the square greyed out and not 'clickable' by removing the class
    removeSquareFromJeopardyBoard(elementId);
    
    // makes stuff disappear and other stuff appear
    timedFunctionMakeJeopardyBoardDisappear();
    timedFunctionCreateDivToHoldQuestion();
    timedFunctionExpandDiv();
    
    // gradually decreases the opacity of jeopardy
    $('.app').addClass('opacity');
    
    // whatever user clicks on sets value
    dollars = $(this).text();

    // transforms element's id to match corresponding category


    elementId = elementId.split('');
    elementId = elementId.slice(0, -3);
    elementId = elementId.join('');
    console.log(`category is (from element id): ${newCategory}`)
    console.log(`dollar value of box clicked: ${dollars}`);
    
    // sorts all objects accordingly by dollar value into a new array
    for (const question of ISOLATED_QUESTIONS){
        let regexCategory = question.category;
        regexCategory = regexCategory.replace(/[\W_]+/g,"");
        if (question.value === dollars && regexCategory === elementId){
            newQuestionsArray.push(question);
        };
    };
    console.log(newQuestionsArray)


    // isolate a random question and random answer from the new array
    // (the random function is in it's own file)
    questionObject = random(newQuestionsArray);
    questionFocused = questionObject.question;
    correctAnswer = questionObject.answer;
    
    // console.log() the question and answer for convenience 
    console.log(questionObject);
    console.log(`The question is: ${questionFocused}`);
    console.log(`The answer is: ${correctAnswer}`);
    
    // make new DOM element to display question
    const newItem = $(`<h3 class = "question">${questionFocused}</h3>`);
    
    // display new DOM element
    timedFunctionPlaceQuestion(newItem);
    AddEventListenerAndGrabUserInput();
    
    // clears the array for the next question (sigh)
    newQuestionsArray = []; 
};








// what happens when a Jeopardy block is clicked
$('.clickable').on("click" , mainFunctionWhenSquareIsClicked);




$('#clear-all').on("click" , ()=>{
    window.localStorage.clear();
    location.reload();
});




