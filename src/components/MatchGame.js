import React, {useEffect, useRef, useState} from 'react'
import { MatchCard } from './MatchCard';
import styles from "./MatchGame.module.css";
import { Link } from 'react-router-dom';
import  Counter  from './Counter'
import {startGame} from './services/list.js'
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
export function MatchGame({gameId}) {
    const [leftCards , setLeftCards] = useState([])
    const [rightCards , setRightCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [nummatches, setNumMatches] = useState(0)
    const [gameover, setGameOver] = useState(false)

    const childRef = useRef();
    const myTimeout = useRef(null)

    const [choiceLeft, setChoiceLeft] = useState(null)
    const [choiceRight, setChoiceRight] = useState(null)

    useEffect(() => {
        const clearInt = () => {
            setGameOver(true)
            childRef.current.clearCount()
            clearTimeout(myTimeout.current)
        }
        startGame(gameId)
        .then(response => {
            setLeftCards(response[0])
            setRightCards(response[1])
            myTimeout.current = setTimeout(clearInt, 100000);
        })
        return () => {
            clearTimeout(myTimeout.current)
        } 
    },[gameId])

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
        <div className="m-10">
          <Link to='/' 
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" >Home</Link>&nbsp;&nbsp;
          <Link to={`/matching_games/`}
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          >
                    Games</Link>
         </div>
           <div className={styles.container}>
            <div className={styles.header}>
                <div>
                <Counter ref={childRef} />
                </div>
            </div>
            <div className={styles.nav}>
            
            </div>
           
            <div className={styles.main}>
           
                { (gameover) ?
                    <h3>Game Over</h3>
                    :
                    <>
                    <div className='flex w-48 justify-center align-bottom flex-col gap-7 m-2'>
                        { leftCards.map (card => (
                                <div key={card.match_index}>
                                <div>
                                <MatchCard card={card} handleChoice={handleChoiceLeft} />
                                </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex w-96 flex-row flex-wrap gap-4'
                    >
                    { rightCards.map (card => (
                                <div key={card.match_index}>
                                <div>
                                <MatchCard card={card} handleChoice={handleChoiceRight} />
                                </div>
                                </div>
                            ))
                        }
                    </div>
                    </>
                }
            </div>
          
            <footer className={styles.footer}>footer</footer>
            </div>
        </>
    )
}
