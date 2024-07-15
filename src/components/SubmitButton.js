import React, { useRef} from 'react'
import {Button} from 'flowbite-react'
import Counter from './Counter'
import { clearNextButtonFlag } from '../redux/nextbuttonflag';
import { useDispatch } from 'react-redux';

function SubmitButton({handleClick}) {
  const childRef = useRef();
  const dispatch = useDispatch()
  //const liveQuestionNumber = useSelector(state => state.)

  const onHandleClick = () => {
    dispatch(clearNextButtonFlag())
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