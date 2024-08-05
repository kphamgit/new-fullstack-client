import React, {useEffect, useRef, useState} from 'react'
import { TextCard } from './TextCard';
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


import AWS from 'aws-sdk'

AWS.config.update ({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION
})

const polly = new AWS.Polly()

export function MatchGameContinuous({theLeftCards, theRightCards}) {

    const [leftCardsPile , setLeftCardsPile] = useState([])
    const [rightCardsPile , setRightCardsPile] = useState([])
    const [dataSize, setDataSize] = useState(0)
    const [turns, setTurns] = useState(0)

    const [numMatches, setNumMatches] = useState(0)
    const [gameover, setGameOver] = useState(false)

    const leftCardsBank = useRef([])
    //leftCardsBank.current = theLeftCards
    const rightCardsBank = useRef([])
    //rightCardsBank.current = theRightCards
    const counterRef = useRef();
    const myTimeout = useRef(null)
    const testTimeout = useRef(null)
    const matchIndex = useRef(null)

    const leftCardsPileRef = useRef(null)
    const rightCardsPileRef = useRef(null)

    const matchIndices = useRef([])

    const [choiceLeft, setChoiceLeft] = useState(null)
    const [choiceRight, setChoiceRight] = useState(null)

    useEffect(() => {
        const clearInt = () => {
            setGameOver(true)
            counterRef.current.clearCount()
            clearTimeout(myTimeout.current)
        }
            //get 6 random cards from left cards bank
            leftCardsBank.current = theLeftCards
            rightCardsBank.current = theRightCards
            setDataSize(leftCardsBank.current.length)
            let tempArr = []
            let randomIndices = []  //save random indices for use on right cards bank
            for(let i=0; i<6; i++) {
                 const randomIndex = Math.floor(Math.random() * leftCardsBank.current.length);
                 randomIndices.push(randomIndex)
                 const random_card = leftCardsBank.current[randomIndex]
                 tempArr.push(random_card)
                  //and remove it from left cards bank so it won't be reselected
                 leftCardsBank.current.splice(randomIndex, 1)
            }
            setLeftCardsPile(tempArr)
            // MUST use refs to store left and right cards bank because function "addPair" that are
            // invoked after setTimeout expires (see line 167) does get the most updated states of a component
            // do right cards
            let tempArr1 = []
            randomIndices.forEach( random_index => {    //must use same random indices as for the left cards
                const random_card = rightCardsBank.current[random_index]
                //and remove it from right cards bank so it won't be reselected
                tempArr1.push(random_card)
                rightCardsBank.current.splice(random_index, 1)
            })
            setRightCardsPile(tempArr1.sort(() => Math.random() - 0.5 ))
            myTimeout.current = setTimeout(clearInt, 900000);
        
        return () => {
            clearTimeout(myTimeout.current)
        } 
    },[theLeftCards, theRightCards])

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
                    //setMatched(true)
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
                    counterRef.current.clearCount()
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
           <div className="m-11">
          <Link to='/' 
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" >Home</Link>&nbsp;&nbsp;
          <Link to={`/matching_games/`}
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          >
                    Games</Link>
         </div>
         <div className='mx-11'my-1><Counter ref={counterRef}/></div>
           <div className='flex flex-row justify-center bg-gray-50'>
           
                { (gameover) ?
                    <h3>Game Over</h3>
                    :
                    <>
                    <div className='flex flex-col align-text-bottom m-2 gap-3 bg-green-300'>
                        { leftCardsPile.map (card => (
                                <div key={card.match_index}>
                                <div>
                                <TextCard card={card} polly={polly} handleChoice={handleChoiceLeft} />
                                </div>
                                </div>
                            ))
                        }
                    </div>
                    <div 
                    className ='flex flex-col m-2 gap-3 bg-green-300'
                    >
                    { rightCardsPile.map (card => (
                                <div key={card.match_index}>
                                <div>
                                <TextCard card={card} polly = {polly} handleChoice={handleChoiceRight} />
                                </div>
                                </div>
                            ))
                        }
                    </div>
                    </>
                }
            </div>
        </>
    )
}
