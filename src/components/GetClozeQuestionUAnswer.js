export default function getClozeQuestionUserAnswer() {
    //console.log("collect UserAnser BBBBBBBBBBBBBBBBBBB"+question_format)
    var input_error = false
    var user_answer;
    
    var cloze_answers = document.getElementsByClassName("cloze_answer");
    //console.log("XXXXXXXXXXXX", cloze_answers)
    const marray = [];
    for (let i = 0; i < cloze_answers.length; i++) {
      var input_value = cloze_answers[i].value
      //console.log("ZZZZZZZZZZZZ"+input_value)
      if (input_value.length > 0 ) {
              marray.push(cloze_answers[i].value);
      }
      else {
            input_error = true
      }
    }
    if (!input_error ) {
      if (marray.length > 1) {
        user_answer = marray.join('/')
      }
      else {
        user_answer = marray[0]
      }
      return user_answer
    }
    else {
      return ''
    }
 // }

   
  }