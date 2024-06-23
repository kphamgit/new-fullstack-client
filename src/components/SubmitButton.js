import React, {useState, useRef} from 'react'
import Button from "react-bootstrap/Button"
import Counter from './Counter'

function SubmitButton({handleClick}) {
  const childRef = useRef();

  const onHandleClick = () => {
    handleClick(childRef.current.getCount());
  }

  return (
    <>
    <Counter ref={childRef} />
    <div style={{width:"60px"}}>
        <br />
          <Button variant="success" onClick={onHandleClick}>Submit</Button>
    </div>
    </>
  )
}

export default SubmitButton