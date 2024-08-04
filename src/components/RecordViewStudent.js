//import { faL } from '@fortawesome/free-solid-svg-icons';
import MicRecorder from 'mic-recorder-to-mp3';
import { useEffect, useState , useContext } from 'react';
import { useSelector } from 'react-redux';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Checkbox } from "flowbite-react";
import { SocketContext } from './App';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function RecordViewStudent()  {
 
  const socket = useContext(SocketContext);
  const [isBlocked, setIsBlocked] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [hasbeenSent, setHasBeenSent] = useState(false)
  const [blobURL, setBlobURL] = useState('')
  const [myblob, setMyBlob] = useState([0])
  const [language, setLanguage] = useState('en-US')
  const [usingSpeechRecognition, setUsingSpeechRecognition ] = useState(true)
  const [button1_text, setButton1Text] = useState("Turn On Speech Recognition")
  
  const user = useSelector((state) => state.user.value)

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

  const start_no_SR = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
      .start()
      .then(() => {
         setIsRecording(true);
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

  const stop_no_SR = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        setBlobURL(blobURL)
        setMyBlob(blob)
        setHasBeenSent(false)
      }).catch((e) => console.log(e));
  };

  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }

  const send_to_s3 = () => {
    //socket.emit('recording', {blob: myblob, username: user.user_name});
    const rootpath = 'http://localhost:5001'
  const url = `${rootpath}/api/uploads/do_upload_single` 
    //var file_name = 'test.mp3'
//
    const date = new Date();
    //${date.getMonth() + 1}

    let hour = addZero(date.getHours());
    let minute = addZero(date.getMinutes());
    let second = addZero(date.getSeconds());

    //let time = h + ":" + m + ":" + s;
    const month = date.toLocaleString('default', { month: 'short' });
    const formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}-${hour}${minute}${second}`;
    const fileName = `${formattedDate}-${user.user_name}`;

    //console.log(fileName)
    const myFile = new File([myblob], fileName, {
           type: myblob.type,
    });
    const formData = new FormData();
    
    
    const s3_file_path =  `audios/recordings/${user.user_name}`
        formData.append("s3_file_path", s3_file_path)
        formData.append("file", myFile);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        
        axios.post(url, formData, config).then((response) => {
          console.log(response.data);
          setHasBeenSent(true)
          //https://kevinphambucket.s3.amazonaws.com/audios/basic1/2024-Aug-3-170159-basic1
          const full_s3_path = `https://kevinphambucket.s3.amazonaws.com/${s3_file_path}/${fileName}`
          socket.emit('s3_received_recording', {
            username: user.user_name,
            path: full_s3_path
          });
        });
  };

  const toggle_speech_recognition = () => {
    if (usingSpeechRecognition) {
        setButton1Text("Turn On Speech Recognition")
        setUsingSpeechRecognition(false)
    }
    else {
      setButton1Text("Turn Off Speech Recognition")
      setUsingSpeechRecognition(true)
    }
  }
  /*
  const send = () => {
    //socket.emit('recording', {blob: myblob, username: user.user_name});
    var file_name = 'test.mp3'
    const myFile = new File([myblob], file_name, {
           type: myblob.type,
    });
    const formData = new FormData();
    var gcloud_prefix = "audios/recordings/" + user.user_name
       formData.append("language_code","en") 
       formData.append("gcloud_prefix",gcloud_prefix)
       //programming node: kpham, "language_code" has to be appened BEFORE the file
       //otherwise multer will NOT see it in the request (see upload.helper)
        formData.append("file", myFile);
        alert("sent")
         setHasBeenSent(true)
  };
  */
  //speech recognition
  const listenContinuously = () => {
    //console.log("listening continuously")
    SpeechRecognition.startListening({
      continuous: true,
      language: language
    });
  };

  const test_checkbox = () => {
    if (usingSpeechRecognition) {
      setButton1Text("Turn On Speech Recognition")
      setUsingSpeechRecognition(false)
  }
  else {
    setButton1Text("Turn Off Speech Recognition")
    setUsingSpeechRecognition(true)
  }
  }
  return (
    <>
    <div>
    <div className='bg-amber-200 p-2 mb-2 flex flex-row justify-start'>
    <span><Checkbox onChange={test_checkbox} defaultChecked/></span>&nbsp;&nbsp;
      <span className='pr-2' >Speech Recognition:  {usingSpeechRecognition ? "ON" : "OFF"}</span>
     
     
    </div>
        { usingSpeechRecognition && 
        <>
          <div className='mb-2'>
            <Form.Select aria-label="Default select example" value={language} onChange={(e) => setLanguage(e.currentTarget.value)} >
                <option value="en-US">English</option>
                <option value="vi-VN">Vietnamese</option>
            </Form.Select>
          </div>
          <div>
                <p>{listening && 'Listening...'}</p>
                <span style={{color:'black'}}>{transcript}</span>
          </div>
          </>
        }
          <div className='flex flex-1'>
            <Button className='bg-red-600 px-0'
              onClick={start} disabled={isRecording}>Record
            </Button>
            &nbsp;&nbsp;
            <Button onClick={stop} disabled={!isRecording}>Stop</Button>
              &nbsp;&nbsp;
            <Button onClick={send_to_s3} disabled={hasbeenSent} >Send</Button>
          
          
          </div>
              <br />
            <audio src={blobURL} controls="controls" />
    </div>
    </>
  );
};

