import React, {useState} from 'react'
import {Button} from 'flowbite-react'
import SubmitButton from './SubmitButton'

   //const livequizflag = useSelector((state) => state.livequizflag.value)
   const msg = new SpeechSynthesisUtterance()
   msg.volume = 1; // From 0 to 1
   msg.rate = .8; // From 0.1 to 10
   //msg.pitch = 2; // From 0 to 2
   msg.lang = 'en';
 
function ButtonSelectQuestionAttempt({question,setUserAnswer}) {
    const [selectedItem, setSelectedItem] = useState(null)
 
    const handleChoiceClick = (item) => {
        msg.text = item
        msg.voice = window.speechSynthesis.getVoices()[1];
        window.speechSynthesis.speak(msg)
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

    const items = question.content.split('/')

  return (
    <> 
    <ul className='flex flex-1 gap-3'>
    {items.map(item => 
            <Button className='bg-indigo-500' key={item} onClick={() => handleChoiceClick(item)}>{item}</Button>
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