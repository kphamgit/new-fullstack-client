import React from 'react'

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

export function TextCard({card, handle_click}) {
    const msg = new SpeechSynthesisUtterance()
    msg.volume = 1; // From 0 to 1
    msg.rate = .8; // From 0.1 to 10
    //msg.pitch = 2; // From 0 to 2
    msg.lang = 'en';

    const handleClick = () => {
            if (card.language === 'en') {
                msg.text = card.src
                msg.voice = window.speechSynthesis.getVoices()[1];
                window.speechSynthesis.speak(msg)
            }
            handle_click(card)
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
