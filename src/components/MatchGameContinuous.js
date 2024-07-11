import React, {cloneElement, useEffect, useRef, useState} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TextCard } from './TextCard';
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
    const [leftCardsPile , setLeftCardsPile] = useState([])
    const [rightCardsPile , setRightCardsPile] = useState([])
    const [rightCardHasImages, setRightCardHasImages] = useState(false)
    const [dataSize, setDataSize] = useState(0)
    const [turns, setTurns] = useState(0)

    const [matched, setMatched] = useState(false)
    
    const [numMatches, setNumMatches] = useState(0)
    const [gameover, setGameOver] = useState(false)

    const leftCardsBank = useRef([])
    const rightCardsBank = useRef([])
    const childRef = useRef();
    const myTimeout = useRef(null)
    const testTimeout = useRef(null)
    const addPairTimeout = useRef(null)
    const matchIndex = useRef(null)

    const leftCardsPileRef = useRef(null)
    const rightCardsPileRef = useRef(null)

    const matchIndices = useRef([])

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
                //console.log(" ENTRY POPULATE cards")
                //console.log(response.data)
                let myArray1 = response.data.base.split('/').map((str, index) => {
                    return (
                      {src: str, matched: false, match_index: index, language: response.data.source_language}
                    )
                });
                setDataSize(myArray1.length)
                //get 6 random cards from left cards bank
                let tempArr = []
                let randomIndices = []  //saved for use on right cards bank
                for(let i=0; i<6; i++) {
                    const randomIndex = Math.floor(Math.random() * myArray1.length);
                    randomIndices.push(randomIndex)
                    const random_card = myArray1[randomIndex]
                    tempArr.push(random_card)
                     //and remove it from left cards bank so it won't be reselected
                    myArray1.splice(randomIndex, 1)
                }
                setLeftCardsPile(tempArr)
                //setLeftCardsPile(myArray1.splice(0,5))
                //(myArray1)
                leftCardsBank.current = [...myArray1]
                let myArray2 = response.data.target.split('/').map((str, index) => {
                    return (
                      {src: str, matched: false, match_index: index, language: response.data.target_language }
                    )
                });
                let tempArr1 = []
                //for(let i=0; i<6; i++) {
                randomIndices.forEach( random_index => {
                    const random_card = myArray2[random_index]
                    //and remove it from right cards bank so it won't be reselected
                    tempArr1.push(random_card)
                    myArray2.splice(random_index, 1)
                })
                   
                //}
                setRightCardsPile(tempArr1.sort(() => Math.random() - 0.5 ))
                rightCardsBank.current = [...myArray2]

                //let tempRightCards = myArray2.splice(0,6)
               
                //setRightCardsPile(tempRightCards.sort(() => Math.random() - 0.5 ) )

                if (myArray2[0].src.indexOf('jpeg') >= 0 ) {
                    setRightCardHasImages(true)
                }
             })
            setTurns(0)
            
        } // end populate card
        populateCards()
        myTimeout.current = setTimeout(clearInt,1000000);
        return () => {
            clearTimeout(myTimeout.current)
        }  
    },[rootpath, gameId])  //end useEffect

    useEffect(() => {
        return () => {
            clearTimeout(myTimeout.current)
          }  
    },[gameover])

    useEffect(() => {
        leftCardsPileRef.current = leftCardsPile
        rightCardsPileRef.current = rightCardsPile
       //console.log("useEffect: LEFT/RIGHT CARD PILE CHANGED left card pile: ",leftCardsPile)
        //console.log(" LEFT CARDS PILE LENGHT =", leftCardsPile.length)
    },[leftCardsPile, rightCardsPile])

    
    
    const resetTurn = () => {
        setChoiceLeft(null)
        setChoiceRight(null)
        setTurns(prevTurns => prevTurns + 1)
    }
    useEffect (() => {
        const addPair = () => {
            //console.log("left cards bank lenght:"+leftCardsBank.current.length)
            //console.log("addPair ENTRY left card pile", leftCardsPile)
            if (leftCardsBank.current.length > 0) {
                //console.log("      ")
                //console.log(" ******* addPairTest EEEEENTRY left cards pile:", leftCardsPileRef.current)
                //console.log(" addPairTest match indices :", matchIndices.current)
                const randomIndex = Math.floor(Math.random() * leftCardsBank.current.length);
                const left_random_card = leftCardsBank.current[randomIndex]
                 // remove randomly-selected card from left cards bank so it won't be reselected
                leftCardsBank.current.splice(randomIndex, 1) 
                //add the randomly-selected card to left card pile where the matched card occured
                //at the same time remove the matched card in the card pile
                const index_in_left_array = leftCardsPileRef.current.findIndex(element => 
                    element.match_index === matchIndices.current[0]);
                leftCardsPileRef.current.splice(index_in_left_array, 1, left_random_card)
                //console.log(" left card pile ref after replacing matched card with random card:", leftCardsPileRef.current)
                const tempArr = [...leftCardsPileRef.current]
                setLeftCardsPile(tempArr)
                //DO RIGHT CARDS
                //use the random index for the left cards bank
                const right_random_card = rightCardsBank.current[randomIndex]
                rightCardsBank.current.splice(randomIndex, 1) 
                const index_in_right_array = rightCardsPileRef.current.findIndex(element => 
                    element.match_index === matchIndices.current[0]);
                rightCardsPileRef.current.splice(index_in_right_array, 1, right_random_card)
                const tempArr1 = [...rightCardsPileRef.current]
                setRightCardsPile(tempArr1)

                matchIndices.current.splice(0, 1)
                
            }
        }
        if (choiceLeft && choiceRight ) {
                if (choiceLeft.match_index === choiceRight.match_index) {
                    setLeftCardsPile(prevCards => {
                        return prevCards.map(card => {
                            if (card.match_index === choiceLeft.match_index) {
                                return {...card, matched: true}
                            }
                            else {
                                return card
                            }
                        })
                    })
                    
                    setRightCardsPile(prevCards => {
                        return prevCards.map(card => {
                            if (card.match_index === choiceRight.match_index) {
                                return {...card, matched: true}
                            }
                            else {
                                return card
                            }
                        })
                    })
                    setMatched(true)
                    setNumMatches(prevNumMatches => prevNumMatches + 1)
                    matchIndex.current = choiceLeft.match_index
                    matchIndices.current.push(choiceLeft.match_index)
                    testTimeout.current = setTimeout(addPair, 2500)
                    resetTurn()
                }
                else {
                    resetTurn()
                }
        }
    }, [choiceLeft, choiceRight, leftCardsPile, rightCardsPile])

    useEffect(() => {
        if (numMatches) {
            //console.log(" NUM MATCHES : ", numMatches)
            if (leftCardsBank.current.length === 0) {  //card banks were emptied out
                if (numMatches === dataSize) {
                    //all cards in cards pile have been selected correctly.GAME OVER")
                    setGameOver(true)
                    clearTimeout(testTimeout.current)
                    childRef.current.clearCount()
                }
            }
        }
    },[numMatches, leftCardsBank.current.length, dataSize])

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
                        { leftCardsPile.map (card => (
                                <div key={card.match_index}>
                                <div>
                                <TextCard card={card} handleChoice={handleChoiceLeft} />
                                </div>
                                </div>
                            ))
                        }
                    </div>
                    <div 
                    className={rightCardHasImages ? styles.img_grid_style : styles.main__grid__item }
                    >
                    { rightCardsPile.map (card => (
                                <div key={card.match_index}>
                                <div>
                                <TextCard card={card} handleChoice={handleChoiceRight} />
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
            <footer className={styles.footer}>
              Data size: {dataSize} Num Matches: {numMatches}
            </footer>
            </div>
        </>
    )
}
