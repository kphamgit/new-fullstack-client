import React, {useState} from 'react'
import {Button} from 'flowbite-react'
import SubmitButton from './SubmitButton'

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
    <ul className='flex flex-1 gap-3'>
    {items.map(item => 
            <Button className='bg-indigo-500' key={item} onClick={() => setSelectedItem(item)}>{item}</Button>
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