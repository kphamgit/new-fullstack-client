import React, {useState, forwardRef, useRef, useEffect, useImperativeHandle} from 'react'

  const Counter = forwardRef(function Counter(props, ref) {
    const [counter, setCounter] = useState(null)
    const interval = useRef(null)
    const [minutesElapsed, setMinutesElapsed] = useState(null)
    const [secondsElapsed, setSecondsElapsed] = useState(null)
    const [stop, setStop] = useState(false)
    //const myTimeout = useRef(null)

    /*
   clearCount is not being used but keep it as demo for calling multiple 
   functions in child from parent component
*/
    
    useImperativeHandle(ref, () => ({
      clearCount() {
        //setCounter(null)
        clearInterval(interval.current)
        const minutes = Math.floor(counter / 60);
        setMinutesElapsed(Math.floor(minutes ))
        const seconds = counter - minutes * 60;
        setSecondsElapsed(seconds)
        setStop(true)
        return
      },
      getCount() {
        return counter;
      }
    }));
    

    useEffect(() => {
        interval.current = setInterval(() => {
          setCounter( (previous) => 
            previous === null ? 1 : (previous + 1)
          );
        },1000);
        return () => {
          clearInterval(interval.current)
        }  
    },[])

  return (
    <>
    {!stop ?
    <div>{counter}&nbsp;&nbsp;&nbsp;</div>
    :
    <div>
        <span>{minutesElapsed} minutes. </span>
        <span>{secondsElapsed} seconds.</span>
    </div>
    }
    </>
  )
})

export default Counter