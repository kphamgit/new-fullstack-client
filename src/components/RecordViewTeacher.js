//import { faL } from '@fortawesome/free-solid-svg-icons';
import MicRecorder from 'mic-recorder-to-mp3';
import { useEffect, useState , useContext} from 'react';
import { useSelector } from 'react-redux';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { SocketContext } from './Home';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

  export default function RecordViewTeacher()  {
 
  const socket = useContext(SocketContext);
  const [isBlocked, setIsBlocked] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [hasbeenSent, setHasBeenSent] = useState(false)
  const [blobURL, setBlobURL] = useState('')
  const [myblob, setMyBlob] = useState([0])
  const rootpath = useSelector((state) => state.rootpath.value)
  const username = useSelector((state) => state.username.value)
  const [studentGroup, setStudentGroup] = useState('1')
  const [studentnames, setStudentNames] = useState([])
  

  //const isTeacher = (username === 'kpham');

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

      useEffect(() => {
        //console.log("in useEffect LiveScoreBoard")
        async function fetchData() {
          // You can await here
            const url = rootpath + `/api/classes/${studentGroup}`
            const response = await axios.get(url)
            setStudentNames(response.data)
        }
        fetchData()
      },[studentGroup])

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

  
  useEffect(() => {
    socket.on('recording', arg => {
       //console.log(" in socket ON Chat Recording arg username = ",arg.username)     
       let audio_tag = document.getElementById('audio_'+arg.username)
       const the_blob = new Blob([arg.blob], {type:'audio/mp3'});
       //console.log( URL.createObjectURL(the_blob))
       audio_tag.src = URL.createObjectURL(the_blob)
    })
      return () => {
          //event registration cleanup
          //console.log("cleaned up recording")
          socket.off("recording")
        };
  }, [socket, username]);

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
      language: 'en-US',
    });
  };

  return (
    <>
    <Form.Select aria-label="Default select class" onChange={(e) => setStudentGroup(e.target.value)} >
      <option>Select class</option>
      <option value="1">Big English</option>
      <option value="2">Students</option>
      <option value="3">English Class</option>
    </Form.Select>
    <div>
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
            <div>
              {studentnames.map((student, index) =>  
                (<div key = {index}>
                   <div style={{color:'yellow'}} ><span>{student}</span>
                   <span><audio id = {`audio_${student}`} src="" controls="controls" /></span>
                   </div> 
                </div> 
                )
            )}
            </div>
    </div>
    </>
  );
};

