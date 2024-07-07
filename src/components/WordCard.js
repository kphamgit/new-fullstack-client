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
    const [ourText, setOurText] = useState("")
    const [hasImage, setHasImage] = useState(false)
    const msg = new SpeechSynthesisUtterance()
    msg.volume = 1; // From 0 to 1
    msg.rate = .8; // From 0.1 to 10
    //msg.pitch = 2; // From 0 to 2
    msg.lang = 'en';

    const handleClick = () => {
        if (!hasImage) {
            if (card.language === 'en') {
                msg.text = card.src
                msg.voice = window.speechSynthesis.getVoices()[1];
                window.speechSynthesis.speak(msg)
            }
        }
        handleChoice(card)
    }

    useEffect(() => {
       if (card.src.indexOf('jpeg') >= 0 ) {
            setHasImage(true)
       }
    },[card])

    if (card.src.indexOf("jpeg") >= 0 ) {
        return (
            <>
            { card.matched === false ?
            <img style={{width:"150px", height:"140px"}}src = {card.src} alt="card"
            onClick={handleClick}
            />
            :
            <span style={{color:"red"}}>
           
            </span>
            }
            </>
        )
    }
    return (
        <>
            { (card.matched === false) ?
            <span style={wordStyle} onClick={() => handleClick()}>
                {card.src}
            </span>
            :
            <span style={{color:"red"}}>
                &nbsp;
            </span>
            }
        </>
    )
}
