import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { WordCard } from './WordCard';
import styles from "./MatchGame.module.css";
import ChatPage from './chat/ChatPage';
import { Link } from 'react-router-dom';
import  Counter  from './Counter'
//make cards outside of component so that it won't get recreated
//everytime component is refreshed.


/*
const container_right = {
    display: 'flex',
    flexDirection: 'column',
    width:"50%",
    backgroundColor: 'red',
};
*/

export function MatchGame({gameId}) {
    const rootpath = useSelector(state => state.rootpath.value)
    const [leftCards , setLeftCards] = useState([])
    const [rightCards , setRightCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [nummatches, setNumMatches] = useState(0)
    const [gameover, setGameOver] = useState(false)
    const [wasTimedOut, setWasTimedOut] = useState(false)

    const childRef = useRef();
    const childRef1 = useRef();
    const myTimeout = useRef(null)

    const [choiceLeft, setChoiceLeft] = useState(null)
    const [choiceRight, setChoiceRight] = useState(null)

    useEffect(() => {
        const clearInt = () => {
            console.log("Game Time is up...")
            setGameOver(true)
            //setWasTimedOut(true)
            clearTimeout(myTimeout.current)
            //console.log(childRef.current.getCount())
            //childRef.current.clearCount()
        }

    const populateCards = () =>{
        var url = rootpath + '/api/matching_games/' + gameId + '/play_fullstack'
        axios.get(url).then((response) => {
                //console.log(response.data)
                let myArray1 = response.data.base.split('/').map((str, index) => {
                    let mystr1
                    if (response.data.source_has_images) {
                      let initial = str[0]
                      mystr1 = "https://kevinphambucket.s3.amazonaws.com/images/" + initial + '/' + str + '.jpeg'
                    }
                    else {
                      mystr1 = str
                    }
                    return (
                      {src: mystr1, matched: false, match_index: index, has_image: response.data.source_has_images, language: response.data.source_language}
                    )
                });
                //console.log(myArray1)
                setLeftCards(myArray1)
                let myArray2 = response.data.target.split('/').map((str, index) => {
                    let mystr2
                    if (response.data.target_has_images) {
                      let initial = str[0]
                      mystr2 = "https://kevinphambucket.s3.amazonaws.com/images/" + initial + '/' + str + '.jpeg'
                    }
                    else {
                      mystr2 = str
                    }
                    return (
                      {src: mystr2, matched: false, match_index: index, has_image: response.data.target_has_images, language: response.data.target_language }
                    )
                });
                //setRightCards(myArray2)
                //const shuffleCards = 
                
                setRightCards(myArray2.sort(() => Math.random() - 0.5 ))
        })
        setTurns(0)
    } // end populate card
    populateCards()
    myTimeout.current = setTimeout(clearInt, 60000);
    return () => {
        //clearInterval(interval.current)
        clearTimeout(myTimeout.current)
      }  
    },[rootpath, gameId])  //end useEffect

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
    {!gameover &&
                <Counter ref={childRef} />
    }
    <span>Turn:&nbsp;{turns} </span>
    <span>Num matches: {nummatches} </span>
            </div>
            </div>
            <div className={styles.nav}></div>
           
            <div className={styles.main}>
                { (gameover) ?
                    <h3>Game Over</h3>
                    :
                    <>
                    <div className={styles.main__grid__item}>
                        { leftCards.map (card => (
                        <div key={card.match_index}>
                            <div>
                            <WordCard card={card} handleChoice={handleChoice} />
                            </div>
                        </div>
                        ))
                    }
                    </div>
                    <div className={styles.main__grid__item}>
                    { rightCards.map (card => (
                        <div key={card.match_index}>
                            <div>
                            <WordCard card={card} handleChoice={handleChoice} />
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
