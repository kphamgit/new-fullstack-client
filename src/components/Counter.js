import React, {useState, forwardRef, useRef, useEffect, useImperativeHandle} from 'react'

  const Counter = forwardRef(function Counter(props, ref) {
    const [counter, setCounter] = useState(null)
    const interval = useRef(null)
    //const myTimeout = useRef(null)

    useImperativeHandle(ref, () => ({
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
    <div>{counter}</div>
  )
})

export default Counter