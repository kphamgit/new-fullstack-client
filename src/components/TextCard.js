import React, {useState} from 'react'
import AudioPlayer from './AudioPlayer.js';

const wordStyle = {
    fontSize: "18px",
    color: "blue", 
    backgroundColor:"yellow",
    borderRadius:"5px",
    textDecorationSkipInk: 'none',
    padding: "3px",
    margin: '20px 0px 30px 30px',
    border: "solid", 
    borderColor: "#c9cca3",
    userSelect: 'none'
};

export function TextCard({card, polly, handleChoice}) {
  
    const [audioFile, setAudioFile] = useState('')
    
    const convertTextToSpeech = () => {
        polly.synthesizeSpeech({
          Engine: "generative",
          LanguageCode: "en-US",
          Text: card.src,
          OutputFormat: 'mp3',
          VoiceId: "Ruth",
        },
        (error, data) => {
            if (error) {
              console.log(error);
            } else {
              //console.log(data)
              setAudioFile(data)
            }
        })
    }

    const handleClick = (target) => {
            
            target.style.borderColor = "red"
            setTimeout(() => {
                target.style.borderColor = "#c9cca3"
            }, [700])
            if (card.language === 'en') {
                convertTextToSpeech()
                /*
                msg.text = card.src
                msg.voice = window.speechSynthesis.getVoices()[1];
                window.speechSynthesis.speak(msg)
                */
            }
            handleChoice(card)
    }

    return (
        <>
         { (card.matched === false) ?
            <span style={wordStyle} onClick={(e) => handleClick(e.target)}>
                {card.src}
            </span>
            :
            <span style={{color:"red"}}>
                &nbsp;
            </span>
            }
            <AudioPlayer audioFile={audioFile} />
        </>
    )
}
