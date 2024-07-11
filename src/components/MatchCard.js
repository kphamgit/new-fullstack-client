import React, {useEffect, useState} from 'react'
import {ImageCard} from './ImageCard'
import { TextCard } from './TextCard';

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

export function MatchCard({card, handleChoice}) {
    const [hasImage, setHasImage] = useState(false)
    /*
    const msg = new SpeechSynthesisUtterance()
    msg.volume = 1; // From 0 to 1
    msg.rate = .8; // From 0.1 to 10
    //msg.pitch = 2; // From 0 to 2
    msg.lang = 'en';
    */

    const handleClick = () => {
        handleChoice(card)
    }

    useEffect(() => {
       if (card.src.indexOf('jpeg') >= 0 ) {
            setHasImage(true)
       }
    },[card])

    if (hasImage) {
       return (
            <ImageCard card={card} handleChoice={handleClick} />
       )
    }
    return (
       <TextCard card={card} handleChoice={handleClick} />
    )
}
