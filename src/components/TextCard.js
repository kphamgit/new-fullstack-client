import React, {useEffect, useRef, useState} from 'react'
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
    const audioRef = useRef()
    const [audioEnded, setAudioEnded] = useState(false)
    
    useEffect(() => {
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
        convertTextToSpeech()

    },[polly, card])

    /*
    useEffect(() => {
        if (audioFile) {
            const audioArrayBuffer = audioFile.AudioStream.buffer;
            const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer], {type: "audio/mpeg" }));

            const audio = audioRef.current
            audio.src = audioURL;
            audio.play()

            return () => {
                URL.revokeObjectURL(audioURL)
            }
        }
    },[audioFile])
*/


    const handleClick = (target) => {
            
            target.style.borderColor = "red"
            setTimeout(() => {
                target.style.borderColor = "#c9cca3"
            }, [700])
            if (card.language === 'en') {
                //convertTextToSpeech()
                audioRef.current.playAudio()
                /*
                msg.text = card.src
                msg.voice = window.speechSynthesis.getVoices()[1];
                window.speechSynthesis.speak(msg)
                */
            }
            handleChoice(card)
    }

    if (!card.matched ) {
        return (
            <>
            <span style={wordStyle} onClick={(e) => handleClick(e.target)}>
                {card.src}
            </span>
            <AudioPlayer audioFile={audioFile} setAudioEnded={setAudioEnded} ref={audioRef} />
            </>
        )
    }
    return (
        <>
            <span style={{color:"red"}}>
                &nbsp;
            </span>
            <AudioPlayer audioFile={audioFile} setAudioEnded={setAudioEnded} ref={audioRef} />
        </>
    )
}


/*
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
       <AudioPlayer audioFile={audioFile} setAudioEnded={setAudioEnded} ref={audioRef} />
      
        </>
    )
*/