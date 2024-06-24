//import { faL } from '@fortawesome/free-solid-svg-icons';
import MicRecorder from 'mic-recorder-to-mp3';
import { useEffect, useState , useContext } from 'react';
import { useSelector } from 'react-redux';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { SocketContext } from './Home';
import Form from 'react-bootstrap/Form';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function RecordViewStudentSave()  {
 
  const socket = useContext(SocketContext);
  const [isBlocked, setIsBlocked] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [hasbeenSent, setHasBeenSent] = useState(false)
  const [blobURL, setBlobURL] = useState('')
  const [myblob, setMyBlob] = useState([0])
  const [language, setLanguage] = useState('en-US')
  
  const username = useSelector((state) => state.username.value)
  //const user = useSelector((state) => state.user.value)

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();  

/*
  useEffect(() => {
    if (finalTranscript !== '') {
     console.log('Got final result:', finalTranscript);
    }
    }, [interimTranscript, finalTranscript]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }
      */
  useEffect( () => {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        setIsBlocked(false)
      },
      () => {
        console.log('Permission Denied');
        //this.setState({ isBlocked: true })
        setIsBlocked(true)
      },
    );
  },[isBlocked])

  const start = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
      .start()
      .then(() => {
         setIsRecording(true);
         resetTranscript()
         listenContinuously()
      }).catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        setIsRecording(false);
        setBlobURL(blobURL)
        setMyBlob(blob)
        setHasBeenSent(false)
        //console.log("STOPPING ")
        SpeechRecognition.stopListening()
        //this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  const send = () => {
    socket.emit('recording', {blob: myblob, username: username});
    setHasBeenSent(true)
  };
  //speech recognition
  const listenContinuously = () => {
    //console.log("listening continuously")
    SpeechRecognition.startListening({
      continuous: true,
      language: language
    });
  };

  return (
    <>
    <p></p>
    <div>
      <div style={{width:"20%"}}>
        <Form.Select aria-label="Default select example" value={language} onChange={(e) => setLanguage(e.currentTarget.value)} >
      <option value="en-US">English</option>
      <option value="vi-VN">Vietnamese</option>
    </Form.Select>
        </div>
          <div style={{color:'white'}}>
                <p>{listening && 'Listening...'}</p>
                <span style={{color:'white'}}>{transcript}</span>
              </div>
          <button 
              style={{backgroundColor: isRecording ? "green" : "red"  }} 
              onClick={start} disabled={isRecording}>Record
          </button>
          &nbsp;&nbsp;
          <button onClick={stop} disabled={!isRecording}>Stop</button>
          &nbsp;&nbsp;
          <button onClick={send} disabled={hasbeenSent} >Send</button>
          <br />
          <audio src={blobURL} controls="controls" />
    </div>
    </>
  );
};

