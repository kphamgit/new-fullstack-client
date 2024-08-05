import React, {useContext, useEffect, useState, useRef} from 'react'
import { Reorder } from "framer-motion"
import { PollyContext } from './App'
import AudioPlayer from './AudioPlayer'

const itemStyle =  {
    borderRadius: "5px",
    marginBottom: "5px",
    marginLeft: "10px",
    
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "10px 10px 10px 10px",
    background: "cyan"
}

export function ReOrderSound({label, value}) {
    const [audioEnded, setAudioEnded] = useState(false)
    const [audioFile, setAudioFile] = useState('')
    const polly = useContext(PollyContext)
    const audioRef = useRef()

    const testClick = () => {
        audioRef.current.playAudio()
      }

    useEffect(() => {
        const convertTextToSpeech = () => {
            polly.synthesizeSpeech({
              Engine: "generative",
              LanguageCode: "en-US",
              Text: label,
              OutputFormat: 'mp3',
              VoiceId: "Ruth",
            },
            (error, data) => {
                if (error) {
                  console.log(error);
                } else {
                  setAudioFile(data)
                }
            })
        }
        convertTextToSpeech()
    },[polly, label])

    return (
        <>
            <Reorder.Item onMouseDown={testClick} className="word_scrambler_items" style={ itemStyle}  value={value}>{label}</Reorder.Item>
            <AudioPlayer audioFile={audioFile} setAudioEnded={setAudioEnded} ref={audioRef} />
        </>
    )
}
