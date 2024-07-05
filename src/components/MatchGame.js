import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { WordCard } from './WordCard';
import styles from "./MatchGame.module.css";
import ChatPage from './chat/ChatPage';
//make cards outside of component so that it won't get recreated
//everytime component is refreshed.

const cardImages = [
    {"text" : "test1"},
    {"text" : "test2"},
    {"text" : "test3"},
    {"text" : "test4"},
    {"text" : "test5"},
    {"text" : "test6"}
]
const container = {
    width: "100%", 
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F43596',
};

const container_left = {
    display: 'flex',
    flexDirection: 'column',
    width:"50%",
    backgroundColor: 'blue',
};

const container_right = {
    display: 'flex',
    flexDirection: 'column',
    width:"50%",
    backgroundColor: 'red',
};

const wordStyle = {
    fontSize: "14px",
    color: "blue", 
    backgroundColor:"yellow",
    textDecorationSkipInk: 'none',
    padding: 0.5,
    margin: '40px 70px 40px 30px',
    border: "solid", 
    userSelect: 'none'

};

export function MatchGame(props) {
    const rootpath = useSelector(state => state.rootpath.value)
    const [leftCards , setLeftCards] = useState([])
    const [rightCards , setRightCards] = useState([])
    const [turns, setTurns] = useState(0)

    const [choiceLeft, setChoiceLeft] = useState(null)
    const [choiceRight, setChoiceRight] = useState(null)

    useEffect(() => {
    const populateCards = () =>{
        var url = rootpath + '/api/matching_games/' + '13' + '/play_fullstack'
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
    },[])  //end useEffect

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
   
    const handleChoice = (card) => {
        choiceLeft ? setChoiceRight(card) : setChoiceLeft(card)
    }

    return (
        <>
           
           <div className={styles.container}>
            <header className={styles.header}>
                <h3>Play and Learn</h3>
            </header>
            <nav className={styles.nav}></nav>
            <main className={styles.main}>
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
            </main>
            <aside>
                <ChatPage />
            </aside>
            <footer className={styles.footer}></footer>
            </div>
        </>
    )
}
