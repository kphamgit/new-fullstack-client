import React, {useEffect, useState} from 'react'
import WordSelect from './WordSelect';
import { useDispatch, useSelector } from 'react-redux';
//import { setAnswer, clear } from '../../redux/answer';
import SubmitButton from './SubmitButton';
//import LiveSubmitButton from './LiveSubmitButton';

function WordsSelect({question, setUserAnswer}) {
    const [words, setWords] = useState([])
    const [answerarray, setAnswerArray] = useState([])
    const livequizflag = useSelector((state) => state.livequizflag.value)

    useEffect(() => {
    const temp_arr = question.content.split(' ');
    let my_arr = []
    
    temp_arr.forEach( word => { 
        if(word.indexOf('.') >= 0 ) { 
                my_arr.push(word.slice(0, -1))
                my_arr.push('.') 
        }
        else if (word.indexOf(',') >= 0) {
            my_arr.push(word.slice(0, -1))
            my_arr.push(',') 
        }
        else if (word.indexOf('?') >= 0) {
            my_arr.push(word.slice(0, -1))
            my_arr.push('?') 
        }
        else if (word.indexOf('!') >= 0) {
            my_arr.push(word.slice(0, -1))
            my_arr.push('!') 
        }
        else {
                my_arr.push(word)
        }
    })

    let my_arr1 = []
    for (var i=0; i < my_arr.length; i++) { 
        let word = my_arr[i]
        let pair = {}
        if (i < (my_arr.length-1)) {
            pair.word = word
            pair.next_word = my_arr[i+1]
        }
        else {
            pair.word = word
            //pair.next_word = "non"
        }
        my_arr1.push(pair)
    }
    setWords(my_arr1)
    },[question.content])
    

    function addWordToAnswer(word) {
        console.log("addWord")
        setAnswerArray([...answerarray, word])
     }

     function removeWordFromAnswer(word) {
        console.log("remove a word")
       let word_index = answerarray.findIndex(e => e === word )
       setAnswerArray(answerarray.filter((word, idx) => idx !== word_index))
     }

     const handleClick = () => {
        let user_answer = answerarray.join('/')
        if (user_answer.length === 0) {
          alert("Please select word(s)")
        }
        else {
            setUserAnswer(user_answer)
        }
     }

    return (
        <>
        <div>
            {
                words.map((pair, index) => {
                    return <WordSelect key = {index} pair ={pair} addWordToAnswer={addWordToAnswer} removeWordFromAnswer={removeWordFromAnswer} />
                })
            }
        </div>
        <div>&nbsp;</div>
        <div style={{width:"60px"}}>
    
            <SubmitButton handleClick={handleClick} />
        
        </div>
    
        </>
    );

}

export default WordsSelect