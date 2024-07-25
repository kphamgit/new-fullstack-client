import React, {useEffect, useRef, useState} from 'react'
import { MatchCard } from './MatchCard.js';
import { Link } from 'react-router-dom';
import  Counter  from './Counter.js'
//make cards outside of component so that it won't get recreated
//everytime component is refreshed.

/*
const img_grid_style={
    display:"grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto auto auto auto",
    gridGap: "none"
    }
*/
//className={completed ? 'text-strike' : null}
export function MatchGameNormal({theLeftCards, theRightCards}) {
    const [leftCards , setLeftCards] = useState([])
    const [rightCards , setRightCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [nummatches, setNumMatches] = useState(0)
    const [gameover, setGameOver] = useState(false)

    const childRef = useRef();
    const myTimeout = useRef(null)

    const [choiceLeft, setChoiceLeft] = useState(null)
    const [choiceRight, setChoiceRight] = useState(null)

    //const mounted = useRef(true);

    useEffect(() => {
        const clearInt = () => {
            setGameOver(true)
            childRef.current.clearCount()
            clearTimeout(myTimeout.current)
        }
        setLeftCards(theLeftCards)
        setRightCards(theRightCards)
        myTimeout.current = setTimeout(clearInt, 100000);
        return () => {
            clearTimeout(myTimeout.current)
        } 
    },[theLeftCards, theRightCards])

    useEffect(() => {
        return () => {
            clearTimeout(myTimeout.current)
          }  
    },[gameover])

    useEffect (() => {
            if (choiceLeft && choiceRight ) {
                if (choiceLeft.match_index === choiceRight.match_index) {
                    setLeftCards(prevCards => {
                        return prevCards.map(card => {
                            if (card.match_index === choiceLeft.match_index) {
                                return {...card, matched: true}
                            }
                            else {
                                return card
                            }
                        })
                    })
                    setRightCards(prevCards => {
                        return prevCards.map(card => {
                            if (card.match_index === choiceRight.match_index) {
                                return {...card, matched: true}
                            }
                            else {
                                return card
                            }
                        })
                    })
                    setNumMatches(prevNumMatches => prevNumMatches + 1)
                    resetTurn()
                }
                else {
                    resetTurn()
                }
            }
    }, [choiceLeft, choiceRight])

    const resetTurn = () => {
        setChoiceLeft(null)
        setChoiceRight(null)
        setTurns(prevTurns => prevTurns + 1)
    }
   
    useEffect(() => {
        if (nummatches === 8) {
            setGameOver(true)
            childRef.current.clearCount()
        }
    },[nummatches])

    const handleChoiceLeft = (card) => {
        setChoiceLeft(card)
    }

    const handleChoiceRight = (card) => {
       setChoiceRight(card)
    }

    return (
        <>
        <div className='m-9'>
          <Link to='/' 
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" >Home</Link>&nbsp;&nbsp;
          <Link to={`/matching_games/`}
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          >
            Games</Link>
        </div>

        <div className='mx-9 my-0'>
            <div>
                <Counter ref={childRef} />
            </div>
        </div>

            <div>
                { (gameover) ?
                    <h3 className='mx-10 my-0 text-xl'>Game Over</h3>
                    :
                    <div className='mx-44 my-10 grid grid-cols-2 gap-3 w-2/4 bg-yellow-200'>
                        <div className='flex flex-col gap-3 justify-center' >
                        { leftCards && leftCards.map (card => (
                                <div key={card.match_index}>
                                <div>
                                <MatchCard card={card} handleChoice={handleChoiceLeft} />
                                </div>
                                </div>
                            ))
                        }
                        </div>
                        
                        <div className='grid grid-cols-2 gap-x-3 gap-y-3 bg-green-300'>
                        { rightCards && rightCards.map (card => (
                                <div key={card.match_index}>
                                <div>
                                <MatchCard card={card} handleChoice={handleChoiceRight} />
                                </div>
                                </div>
                            ))
                        }
                        
                        </div>
                    </div>
                }
            </div>
        
        </>
    )
}
