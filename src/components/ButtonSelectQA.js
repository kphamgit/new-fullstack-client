import React, {useState} from 'react'
//import { setAnswer } from '../../redux/answer.js'
//import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import SubmitButton from './SubmitButton'
//import LiveSubmitButton from './LiveSubmitButton'
import "bootstrap/dist/css/bootstrap.min.css"

function ButtonSelectQuestionAttempt({question,setUserAnswer}) {
    const [selectedItem, setSelectedItem] = useState(null)
    //const livequizflag = useSelector((state) => state.livequizflag.value)
 
    const handleClick = () => {
        //console.log("in handleClick")
        if (selectedItem == null) {
          alert("Please selected an option")
        }
        else {
          //call function from parent component (LiveQuestionAttempt) to set user answer
          setUserAnswer(selectedItem)
        }
    }

    const items = question.content.split('/')

  return (
    <> 
    <ul>
    {items.map(item => 
            <Button style={{margin:"5px"}} variant="primary" key={item} onClick={() => setSelectedItem(item)}>{item}</Button>
      )}
      </ul>
      <div style={{width:"60px"}}>
      {
            <SubmitButton handleClick={handleClick} />
        }
    </div>
    </>
  )
}

export default ButtonSelectQuestionAttempt