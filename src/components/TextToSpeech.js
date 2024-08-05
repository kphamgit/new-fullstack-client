import React from 'react'

export function TextToSpeech(props) {
    
    const [audioFile, setAudioFile] = useState('')
    
    const convertTextToSpeech = () => {
        polly.synthesizeSpeech({
          Engine: "generative",
          LanguageCode: "en-US",
          Text: "hello there what a beautiful day. Learning English is challenging, but it can be done.",
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

    return (
        <>
            
        </>
    )
}
