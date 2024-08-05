import React, {useContext, useRef, useState, useEffect} from 'react'
import { PollyContext } from './App'
import { Button } from 'flowbite-react'
import AudioPlayer from './AudioPlayer'

export function SoundButton({label, parent_setSelectedItem}) {
    const [audioFile, setAudioFile] = useState('')
    const [audioEnded, setAudioEnded] = useState(false)

    const polly = useContext(PollyContext)
    const audioRef = useRef()

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


    const handleChoiceClick = (value) => {
        parent_setSelectedItem(value)
        audioRef.current.playAudio()
        
  }
    return (
        <>
            <Button onClick={event => handleChoiceClick(event.target.innerHTML)}>{label}</Button>
            <AudioPlayer audioFile={audioFile} setAudioEnded={setAudioEnded} ref={audioRef} />
        </>
    )
}
