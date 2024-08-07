import React , {useEffect, useContext, useRef, useState} from 'react'
import { SocketContext } from './App'
import { getStudentsInClass } from './services/list'
import ReactAudioPlayer from 'react-audio-player';

export function RecordViewTeacherNew({class_id}) {
  const socket = useContext(SocketContext)
  const [path, setPath] = useState(null)
//https://kevinphambucket.s3.amazonaws.com/audios/2024-Aug-3-164900_basic1

const [students, setStudents] = useState([])
const mounted = useRef(true);
const [mysrc, setMySrc] = useState('')
useEffect(() => {
  mounted.current = true;
  getStudentsInClass(class_id)
  .then((response) => {
    if(mounted.current) {
      //console.log("YYYYY", response.data.users)
      setStudents(response.data.users)
    }
  })
  .catch(error => {
      console.log(error)
  });
  return () => mounted.current = false;
},[class_id])

  useEffect(() => {
    socket.on('s3_received_recording', arg => {
        console.log("received", arg) //username: ..., path: ....
        let sound      = document.createElement('audio');
        sound.id       = arg.username;
        sound.controls = 'controls';
        sound.src      = arg.path;
        sound.type     = 'audio/mpeg';
        sound.addEventListener("play", () => {
          const signal_el_id = `${arg.username}_signal`
          document.getElementById(signal_el_id).innerHTML = ''
        })

        const signal_el_id = `${arg.username}_signal`
        document.getElementById(signal_el_id).innerHTML = 'X'
//audioID
        const audio_el_id = `${arg.username}_audio`
        /*
        document.getElementById(audio_el_id).innerHTML = ''
        document.getElementById(audio_el_id).appendChild(sound);
        setPath(arg.path.trim())
        */
        //document.getElementById("audioID").innerHTML = ''
       // document.getElementById("audioID").appendChild(arg.path);
       setPath(arg.path.trim())
    })
    return () => {
        socket.off("s3_received_recording")
    }   
  
}, [socket, setPath])

  return (
    <>
      <div className='mx-2 my-3 gap-1 flex flex-col'> 
               { students.map((student, index) => (
                    <div key={index}>
                        <span className='text-orange-900'>{student.user_name}</span>&nbsp;&nbsp;
                        <span className='text-red-600 text-lg' id={`${student.user_name}_signal`}></span>
                        <span id={`${student.user_name}_audio`}></span>
                    </div>
               
                ))}
       </div>
       <ReactAudioPlayer
          id = "audioID"
          src={path}
          autoPlay
          controls
      />
    </>
  )
}

/*
  {path &&
        <td><audio src = {path} controls></audio></td>
      }
*/