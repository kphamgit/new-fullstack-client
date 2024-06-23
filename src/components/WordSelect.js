import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import answer from '../../redux/answer';
//import { setAnswerArray } from '../../redux/answerarray.js'

function WordSelect({pair, addWordToAnswer, removeWordFromAnswer} ) {
    const [clickCount, setClickCount] = useState(0)
    const [isHover, setIsHover] = useState(false);
    //const [answerarray, setAnswerArray] = useState([])
    const dispatch = useDispatch()
    
    //const answerarray = useSelector((state) => state.answerarray.value)

   const handleMouseEnter = () => {
      setIsHover(true);
   };
   const handleMouseLeave = () => {
      setIsHover(false);
   };
   const wordStyle = {
       backgroundColor: (
         clickCount%2 == 0 ? '#e6d3c3' : 'lightblue'
        ),
       textDecoration: isHover && "underline #4b85bf" ,
       textDecorationThickness:  isHover && '2px',
       textDecorationSkipInk: 'none',
       padding: 0.5,
       userSelect: 'none'

   };

   /*
    const handleClick = (word) => {
        console.log("handleClick word"+word)
        let new_clickCount = clickCount + 1
        setClickCount(new_clickCount)
        if (clickCount%2 == 0) {
            console.log("XXXXXXXXXXXXXXX even click count",+word)
            setAnswerArray([...answerarray, word])
            //dispatch(setAnswerArray([...answerarray, word]))
        }
        else {
            console.log("YYYYYYYYY odd click count"+word)
            let word_index = answerarray.findIndex(e => e === word )
            setAnswerArray(answerarray.filter((word, idx) => idx !== word_index))
            //dispatch(setAnswerArray(answerarray.filter((word, idx) => idx !== word_index))
            //setAnswerArray(answerarray.filter((word, idx) => idx !== word_index)) )
        }
 
    }
    */
    const handleClick = (word) => {
        let new_clickCount = clickCount + 1
        setClickCount(new_clickCount)
        if (clickCount%2 == 0) {
            addWordToAnswer(word)
        }
        else {
            removeWordFromAnswer(word)
        }
    }
        return (
            <>
        
        <span onClick={() => handleClick(pair.word)}
        style={wordStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
    {pair.word}
    </span>
    { ((pair.next_word !== '.') && (pair.next_word !== ',') 
            && (pair.next_word !== '!')  
             && (pair.next_word !== '?') )  
                && <span>&nbsp;</span>} 
    </>
        )
    
   
}

export default WordSelect