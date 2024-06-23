//import { faL } from '@fortawesome/free-solid-svg-icons';
import MicRecorder from 'mic-recorder-to-mp3';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//import { SocketContext } from './Home';
import axios from 'axios'
//import SubmitButton2 from './SubmitButton2';
import SubmitButtonRecordQA from './SubmitButtonRecordQA';
//import { setTheBlob } from '../../redux/theblob';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function RecordQA()  {
  //ClozeQuestionAttempt({question, ...props}) {

  const question = useSelector((state) => state.question.value)
    
  //const socket = useContext(SocketContext);
  const [isBlocked, setIsBlocked] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [hasbeenSent, setHasBeenSent] = useState(false)
  const [blobURL, setBlobURL] = useState('')
  const [myblob, setMyBlob] = useState([0])

  //const dispatch = useDispatch()
  
  const rootpath = useSelector((state) => state.rootpath.value)
  const username = useSelector((state) => state.username.value)
  

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
        //dispatch(setTheBlob(blob))
        setHasBeenSent(false)
      }).catch((e) => console.log(e));
  };

  function send () {
 // const send = () => {
    alert("SEND!")
    //socket.emit('recording', {blob: myblob, username: username, question_id: question.id});
    //send_to_google
    var file_name = question.id + '.mp3'
    const myFile = new File([myblob], file_name, {
            type: myblob.type,
    });
    const formData = new FormData();
    var gcloud_prefix = "audios/question_attempts/" + username
    formData.append("gcloud_prefix",gcloud_prefix)
    formData.append("language_code",'en-us')
    //programming node: kpham, "language_code" has to be appened BEFORE the file
    //otherwise multer will NOT see it in the request (see upload.helper)
    formData.append("file", myFile);
    
    var url = rootpath + '/api/uploads/do_upload_single_gcloud'
    //console.log("XXXXXXXXXXXXXXXXXXXXXXXx"+url)
    //console.log("YYYYYYYYYYYYYYYYYYYYYYY form data:")
    //for (var pair of formData.entries()) {
        //console.log(pair[0]+ ', ' + pair[1]); 
    // }
     
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }

  axios.post(url, formData, config )
  .then(function (response) {
    setHasBeenSent(true)
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  //const {response} = await axios.post(url, formData, config)
   // console.log("BBBBBBBBBBBBBBB",response)
   // setHasBeenSent(true)
  };
  
  return (
    <>
    <div>
          <div style={{color:'white'}}>
              </div>
          <button 
              style={{backgroundColor: isRecording ? "green" : "red"  }} 
              onClick={start} disabled={isRecording}>Record
          </button>
          &nbsp;&nbsp;
          <button onClick={stop} disabled={!isRecording}>Stop</button>
          <br />
          <audio src={blobURL} controls="controls" />
    </div>
    <div><SubmitButtonRecordQA 
        sendblob={send} 
    /></div>
    </>
  );
};

