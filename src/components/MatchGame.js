import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MatchCard } from './MatchCard';
import styles from "./MatchGame.module.css";
import ChatPage from './chat/ChatPage';
import { Link } from 'react-router-dom';
import  Counter  from './Counter'
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
    const rootpath = useSelector(state => state.rootpath.value)
    const [leftCards , setLeftCards] = useState([])
    const [rightCards , setRightCards] = useState([])
    const [rightCardHasImages, setRightCardHasImages] = useState(false)
    const [turns, setTurns] = useState(0)
    const [nummatches, setNumMatches] = useState(0)
    const [gameover, setGameOver] = useState(false)

    const childRef = useRef();
    const myTimeout = useRef(null)

    const [choiceLeft, setChoiceLeft] = useState(null)
    const [choiceRight, setChoiceRight] = useState(null)

    useEffect(() => {
        const clearInt = () => {
            //console.log("Game Time is up...")
            setGameOver(true)
            childRef.current.clearCount()
            clearTimeout(myTimeout.current)
        }
        const populateCards = () =>{
            var url = rootpath + '/api/matching_games/' + gameId + '/play_fullstack'
            axios.get(url).then((response) => {
                //console.log(response.data)
                    let myArray1 = response.data.base.split('/').map((str, index) => {
                    return (
                      {src: str, matched: false, match_index: index, language: response.data.source_language}
                    )
                });
                setLeftCards(myArray1)
                let myArray2 = response.data.target.split('/').map((str, index) => {
                    return (
                      {src: str, matched: false, match_index: index, language: response.data.target_language }
                    )
                });
                setRightCards(myArray2.sort(() => Math.random() - 0.5 ))
                if (myArray2[0].src.indexOf('jpeg') >= 0 ) {
                    setRightCardHasImages(true)
                }
             })
            setTurns(0)
        } // end populate card
        populateCards()
        myTimeout.current = setTimeout(clearInt, 40000);
        return () => {
            clearTimeout(myTimeout.current)
        }  
    },[rootpath, gameId])  //end useEffect

    useEffect(() => {
        return () => {
            clearTimeout(myTimeout.current)
          }  
    },[gameover])

    useEffect (() => {
            if ((choiceLeft !==null) && (choiceRight !== null) ) {
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

    const handleChoice = (card) => {
        choiceLeft ? setChoiceRight(card) : setChoiceLeft(card)
    }

    return (
        <>
           <div className={styles.container}>
            <div className={styles.header}>
                <h3>Play and Learn</h3>
                <div><Link to={`/matching_games/`}>
                    Games</Link>
            
                <Counter ref={childRef} />
            </div>
            </div>
            <div className={styles.nav}>
            {rightCardHasImages.toString()}
            </div>
           
            <div className={styles.main}>
           
                { (gameover) ?
                    <h3>Game Over</h3>
                    :
                    <>
                    <div className={styles.main__grid__item}>
                        { leftCards.map (card => (
                                <div key={card.match_index}>
                                <div>
                                <MatchCard card={card} handleChoice={handleChoice} />
                                </div>
                                </div>
                            ))
                        }
                    </div>
                    <div 
                    className={rightCardHasImages ? styles.img_grid_style : styles.main__grid__item }
                    >
                    { rightCards.map (card => (
                                <div key={card.match_index}>
                                <div>
                                <MatchCard card={card} handleChoice={handleChoice} />
                                </div>
                                </div>
                            ))
                        }
                    </div>
                    </>
                }
            </div>
          
            <div>
                <ChatPage />
            </div>
            <footer className={styles.footer}>footer</footer>
            </div>
        </>
    )
}
