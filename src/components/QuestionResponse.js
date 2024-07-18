import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'

/*
function displayReinforcement(question) {
  return ( 
    <>
    <br />
    <div>{question.help1}</div>
    </>
  )
}
*/

function QuestionResponse({question, response_content}) {
  function formatClozeQuestion() {
    //var regExp = /\[.*?\]/g
    var content_with_new_lines = question.content.replace(/#/g,' ')
    //replace bracket contents with '__________'
    var temp_sentence_with_stars = content_with_new_lines.replace(/ *\[[^\]]*]/g, ' ______ ');
    return <div>{temp_sentence_with_stars}</div>
  }

  function shuffle(array) {
    //("In shuffle .....array", array)
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
    //console.log("In shuffle ..............array1", array)
    
    return (
      <>
    { array.map((item) => (
       //console.log("BBBBBBBBBBB"+item)
        <span>{item}/</span>
    )) }
    </>
  )
  }   

  function displayQuestionContent() {
      switch (question.format) {
        case 1:
          //cloze
          return ( 
            <>
              <pre>{formatClozeQuestion() } </pre>  
            </>
          )
        case 3:
                  //ButtonSelect
            return ( 
              <>
                <div>
                    {question.content}
                </div>
              </>
            )
        case 4: 
                    //Radio
              return ( 
                <>
 
                    <div>
                            {question.content}
                    </div>
                </>
              )
        case 6:
                    //WordScramble
                    return ( 
                      <>
                          <div>
                                  {shuffle(question.content.split('/') ) }
                          </div>
                      </>
                    )
        case 8:
                     //WordsSelect
            return ( 
              <>
                <div>
                    {question.content}
                </div>
              </>
            )
        case 9:
              return <div>{question.prompt}</div>
        default:
          return null
      }
  }

  function displayResponse() {
      return (
        <>
        
        <div>
          
          {response_content.question_attempt_results.answer }
          &nbsp;&nbsp;{ !response_content.question_attempt_results.error_flag ?
                    <FontAwesomeIcon icon={faCheckSquare} size="lg" />
                    :
                    <FontAwesomeIcon icon={faX} size="lg" style={{ color: 'red' }} />
         }
        </div>
        </>
      )
  }

  function displayCorrectAnswer() {
   
    if (response_content.question_format === 6 ) {
      let marr = response_content.question_attempt_results.correct_answer.split('/')
      //words_scramble_direction
      if (response_content.words_scramble_direction === 'y')
      return (
     <ul>
        {marr.map((item, index) =>  
              (<li key = {index}>
                { item }
              </li> 
              )
          )}
      </ul>
      )
      else 
        return (
          <div>
             {marr.map((item, index) =>  
                 (<span key = {index}>
                   { item } &nbsp;
                 </span>
                 )
             )}
          </div>
        )
    }
    else if (response_content.question_format === 7 ) {
      
        const parts = question.answer_key.split('*')
        return (
          <div style = {{color:'blue'}}>
             {parts.map((item, index) =>  
                 (<span key = {index}>
                   {parseInt(index)+1}) { item } <br />
                 </span>
                 )
             )}
          </div>
        )
    }
    else {
    //window.speechSynthesis.speak(msg)
      return ( 
        <>
        <div>{response_content.question_attempt_results.correct_answer}</div>
        </>
      )
    }
    
  }

  /*
  const msg = new SpeechSynthesisUtterance()
    msg.volume = 1; // From 0 to 1
    msg.rate = .8; // From 0.1 to 10
    //msg.pitch = 2; // From 0 to 2
    msg.lang = 'en';
    msg.text = "Are there any pencils in the case? Yes, there are"
    msg.voice = window.speechSynthesis.getVoices()[1];
  */

  const displayElapsedTime = () => {
    const minutes = Math.floor(response_content.elapsed_time / 60);
    const seconds = response_content.elapsed_time - minutes * 60;
    return (
        <div>
          { (minutes > 0) && <span>{minutes} minutes</span> }
          <span> {seconds} seconds</span>
          </div>
    )
  }
  return (
    <>
   <div> 
            <div className='flex flex-col m-4'>
                <div  className= 'bg-cyan-200'>
                  <div>
                    <div>Question {response_content.question_number }</div>
                    <div>The question is (Câu hỏi là) :</div>
                    <div>{question.prompt}</div>
                    <br />
                    <pre>{displayQuestionContent() } </pre>
                  </div>
                </div>
                <div className='bg-orange-200'>
                <div>
                <div>Your answer is (Bạn trả lời là):</div>
                <pre>{displayResponse() } </pre>
                </div>
            </div>
            { response_content.question_attempt_results.error_flag &&
            <div className='bg-cyan-200'>
                <div>
                <br />
                <div>The correct answer is (Câu trả lời đúng là):</div>
                <br />
                <pre>{displayCorrectAnswer(response_content) } </pre> 
                <div>{question.help1}</div>
                </div>
            </div>
            }
              <div>
                  <div>
                    <span>Score:
                    &nbsp;{response_content.accumulated_score}</span>
                    </div>
                    <div>
                      <p>&nbsp;</p>
                    <div>Time elapsed:<span>
                    {displayElapsedTime()}</span>
                    </div>
                    <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default QuestionResponse