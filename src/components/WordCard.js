import React, {useEffect, useState} from 'react'

const wordStyle = {
    fontSize: "18px",
    color: "blue", 
    backgroundColor:"yellow",
    textDecorationSkipInk: 'none',
    padding: "5px",
    margin: '40px 0px 40px 30px',
    border: "solid", 
    userSelect: 'none'
};

export function WordCard({card, handleChoice}) {
    const [matchindex, setMatchIndex] = useState(null)

    const handleClick = () => {
        //setCardSelection(matchindex)
        handleChoice(card)
    }
    useEffect(() => {
        //setMatchIndex(card.match_index)
    })

    return (
        <>
            { (card.matched === false) ?
            <span style={wordStyle} onClick={() => handleClick()}>
                {card.src}
            </span>
            :
            <span style={{color:"red"}}>
                {card.src}
            </span>
            }
        </>
    )
}
