import React, { forwardRef, useImperativeHandle} from 'react'
//import { createQuestion} from '../../services/list'

//import ReactQuill from 'react-quill-new';
//import 'react-quill/dist/quill.snow.css';
import { NewQuestion } from './NewQuestion';

//export function NewCloze({quiz_id}) {
    const NewCloze = forwardRef(function NewCloze({quiz_id}, ref) {

    useImperativeHandle(ref, () => ({
        getAnswerKey(questionContent) {
            //console.log(questionContent)
            var match_arr = questionContent.match(/\[([\u00C0-\u1EF9a-zA-Z^\'\/\s.,])*\]/g);
            if (match_arr == null) {
                alert(" Please add question content");
            }
            else {
                var answer_str = '';
                for(let i=0; i< match_arr.length; i++) {
                    let bracket_content = match_arr[i].replace('[','').replace(']',''); // remove square brackets
                    if (bracket_content.indexOf('/') >= 0 ) {     //dropdown cloze question
                        if (bracket_content.indexOf('^') < 0 ) {
                            alert("Missing caret ^ for dropdown clozequestion");
                        }
                        else {  
                          var choices = bracket_content.split('/');
                          for(let j=0;j<choices.length;j++) {
                            if (choices[j].indexOf('^') >= 0 ) {
                                let my_answer = choices[j].replace('^','');
                                if (i === 0 ) {
                                    answer_str += my_answer;
                                }
                            else {
                                answer_str += '/' + my_answer;
                            }
                            break;
                            }
                          }
                        }
                    }
                    else if (i === 0) {
                         answer_str += bracket_content;
                    }
                    else {
                      answer_str += '/' + bracket_content;
                    }
               }
            }
            return answer_str
        }
      }));
      
    return (
        <>
        NewCloze
        </>
    )
})

export default NewCloze