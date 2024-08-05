import React, {useState} from 'react'
import {Button} from 'flowbite-react'
import SubmitButton from './SubmitButton'
import { SoundButton } from './SoundButton';
 
function ButtonSelectQuestionAttempt({question,setUserAnswer}) {
    const [selectedItem, setSelectedItem] = useState(null)
 
    
    const set_selected_item = (item) => {
        setSelectedItem(item)
    }

    const handleSubmitClick = () => {
        if (selectedItem == null) {
          alert("Please selected an option")
        }
        else {
          //call function from parent component (LiveQuestionAttempt) to set user answer
          setUserAnswer(selectedItem)
        }
    }

    const labels = question.content.split('/')

  return (
    <> 
    <ul className='flex flex-1 gap-3'>
      {labels.map(label => 
            <SoundButton key={label} label = {label} 
            parent_setSelectedItem={set_selected_item} />
      )}
      </ul>
      <div style={{width:"60px"}}>
      {
            <SubmitButton handleClick={handleSubmitClick} />
        }
    </div>
    </>
  )
}

export default ButtonSelectQuestionAttempt
//   <Button className='bg-indigo-500' key={item} onClick={() => handleChoiceClick(item)}>{item}</Button>