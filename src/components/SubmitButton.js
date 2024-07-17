import React, { useRef} from 'react'
import {Button} from 'flowbite-react'
import Counter from './Counter'

function SubmitButton({handleClick}) {
  const childRef = useRef();
 
  const onHandleClick = () => {
    handleClick(childRef.current.getCount());
  }

  return (
    <>
    <Counter ref={childRef} />
    <div>
        <br />
          <Button className='bg-green-600' onClick={onHandleClick}>Submit</Button>
    </div>
    </>
  )
}

export default SubmitButton