import React, {cloneElement, useEffect, useRef, useState} from 'react'
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
export function MatchGameContinuous({gameId}) {
    const rootpath = useSelector(state => state.rootpath.value)
    const [leftCards , setLeftCards] = useState([])
    const [rightCards , setRightCards] = useState([])
    const [rightCardsBank, setRightCardsBank] = useState(null)
    const [leftCardsBank, setLeftCardsBank] = useState(null)
    const [rightCardHasImages, setRightCardHasImages] = useState(false)
    const [turns, setTurns] = useState(0)
    const [numMatches, setNumMatches] = useState(0)
    const [gameover, setGameOver] = useState(false)

    const childRef = useRef();
    const myTimeout = useRef(null)
    const addPairTimeout = useRef(null)

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
                //get 6 random cards from left cards bank
                let tempArr = []
                let randomIndices = []  //saved for use on right cards bank
                for(let i=0; i<6; i++) {
                    const randomIndex = Math.floor(Math.random() * myArray1.length);
                    randomIndices.push(randomIndex)
                    const random_card = myArray1[randomIndex]
                    //and remove it from leftCardsBank so it won't be reselected
                    tempArr.push(random_card)
                    myArray1.splice(randomIndex, 1)
                }
                setLeftCards(tempArr)
                //setLeftCards(myArray1.splice(0,5))
                setLeftCardsBank(myArray1)
                let myArray2 = response.data.target.split('/').map((str, index) => {
                    return (
                      {src: str, matched: false, match_index: index, language: response.data.target_language }
                    )
                });
                let tempArr1 = []
                //for(let i=0; i<6; i++) {
                randomIndices.forEach( random_index => {
                    const random_card = myArray2[random_index]
                    //and remove it from rightCardsBank so it won't be reselected
                    tempArr1.push(random_card)
                    myArray2.splice(random_index, 1)
                })
                   
                //}
                setRightCards(tempArr1.sort(() => Math.random() - 0.5 ))
                setRightCardsBank(myArray2)

                //let tempRightCards = myArray2.splice(0,6)
                setRightCardsBank(myArray2)
                //setRightCards(tempRightCards.sort(() => Math.random() - 0.5 ) )

                if (myArray2[0].src.indexOf('jpeg') >= 0 ) {
                    setRightCardHasImages(true)
                }
             })
            setTurns(0)
        } // end populate card
        populateCards()
        myTimeout.current = setTimeout(clearInt, 1000000);
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
            const addPair = () => {
                //console.log(" in addPair leftcardsBank lenght = "+leftCardsBank.length)
                if (leftCardsBank.length >= 1) {
                const index_in_left_array = leftCards.findIndex(element => element.match_index === choiceLeft.match_index);
                const randomIndex = Math.floor(Math.random() * leftCardsBank.length);

                //get a random card from leftCardsBank
                //save it in left_random_card
                const left_random_card = leftCardsBank[randomIndex]
                //and remove it from leftCardsBank so it won't be reselected
                leftCardsBank.splice(randomIndex, 1) 
                //add the randomly-selected card to left card pile where the matched card occured
                leftCards.splice(index_in_left_array, 1, left_random_card); //this splice function removes the card at
                // index_in_left_array and add left_random_card to the same position
                //set the state for rerendering
                setLeftCards(leftCards)

                const index_in_right_array = rightCards.findIndex(element => element.match_index === choiceRight.match_index);
                const right_random_card = rightCardsBank[randomIndex]
                rightCardsBank.splice(randomIndex, 1) //remove random card from right cards bank
                rightCards.splice(index_in_right_array, 1, right_random_card);
                setRightCards(rightCards)      
            }     
            }

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
                    addPairTimeout.current = setTimeout(addPair, 2500);
                    
                    resetTurn()
                }
                else {
                    resetTurn()
                }
            }
            return () => {
                //clearTimeout(addPairTimeout.current)
            }  
    }, [choiceLeft, choiceRight, leftCards, rightCards, leftCardsBank, rightCardsBank])

    const resetTurn = () => {
        setChoiceLeft(null)
        setChoiceRight(null)
        setTurns(prevTurns => prevTurns + 1)
    }
   
    useEffect(() => {
        if (numMatches) {
            
            if (numMatches === (leftCardsBank.length + 6)) {
                setGameOver(true)
                childRef.current.clearCount()
            }
            else  {
       
            }
            
        }
    },[numMatches])

    const handleChoiceLeft = (card) => {
        setChoiceLeft(card)
    }

    const handleChoiceRight = (card) => {
       setChoiceRight(card)
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
                                <MatchCard card={card} handleChoice={handleChoiceLeft} />
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
                                <MatchCard card={card} handleChoice={handleChoiceRight} />
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
