import React , {useEffect, useContext, useRef, useState} from 'react'
import { SocketContext } from './App'
import { getStudentsInClass } from './services/list'
import ReactAudioPlayer from 'react-audio-player';

export function RecordViewTeacher({class_id}) {
  const socket = useContext(SocketContext)
  const [path, setPath] = useState(null)
  //const [audioPaths, setAudioPaths] = useState([
  //  {user_name: "basic1", path: "https://kevinphambucket.s3.amazonaws.com/audios/recordings/basic1/2024-Aug-6-221035-basic1"}
  //])
  const [audioPaths, setAudioPaths] = useState([])
//https://kevinphambucket.s3.amazonaws.com/audios/2024-Aug-3-164900_basic1

const audioRef = useRef()


const [students, setStudents] = useState([])
const mounted = useRef(true);
useEffect(() => {
  mounted.current = true;
  getStudentsInClass(class_id)
  .then((response) => {
    if(mounted.current) {
      console.log("YYYYY", response.data.users)
      const temp = []
      response.data.users.forEach(user => (
        temp.push({user_name: user.user_name, path: ''})
      ))
      setAudioPaths(temp)
      setStudents(response.data.users)
    }
  })
  .catch(error => {
      console.log(error)
  });
  return () => mounted.current = false;
},[class_id, setStudents])

const test_play = ( () => {
    audioRef.current.play()
})
  useEffect(() => {
    socket.on('s3_received_recording', arg => {
        console.log("recording receivedLLLLLLLMMMMMM ", arg) //username: ..., path: ....
        let sound      = document.createElement('audio');
        sound.id       = arg.username;
        sound.controls = 'controls';
        sound.src      = arg.path;
        sound.type     = 'audio/mpeg';
      
        console.log("audioPath length =", audioPaths.length)
        audioPaths.forEach((student) => {
            console.log("student", student)
        })

      setAudioPaths(audioPaths.map((item,i)=>{
        console.log("XXXXXXXXXXXXXXXXXX item =", item)
        if(item.user_name === "basic1"){
          return {...item, path: arg.path.trim()};
        }
        return item;
      }))

      if(audioRef.current){
        //audioRef.current.pause();
        audioRef.current.load();
        //audioRef.current.play();
         audioRef.current.src = arg.path.trim()
        
      }
        //const audio_el_id = `${arg.username}_audio`
        //const el = document.getElementById("test")
       // el.src = arg.path
        //el.load()
       // document.getElementById(audio_el_id).appendChild(sound);
        //setPath(arg.path.trim())
    })
    return () => {
        socket.off("s3_received_recording")
    }   
  
}, [socket, audioPaths])

useEffect(() => {
  if (audioPaths.length > 0) {
    console.log("QQQQQQQQQQQ", audioPaths)
    audioRef.current.src = audioPaths[0].path
    audioRef.current.load()
  }
},[audioPaths])

  return (
    <>
    {console.log("MMMMMMMMMMMMMMMMMM", audioPaths)}
      <div className='mx-2 my-3 gap-1 flex flex-col'> 
               { students.map((student, index) => (
                    <div key={index}>
                        <span className='text-orange-900'>{student.user_name}</span>&nbsp;&nbsp;
                        <span className='text-red-600 text-lg' id={`${student.user_name}_signal`}></span>
                        <audio id={`${student.user_name}_audio`} src = {audioPaths[index]} controls></audio>

                    </div>
               
                ))}
       </div>
       { audioPaths.length > 0 &&
       <audio controls ref={audioRef}>
          <source src={audioPaths[1].path} type='audio/mpeg' />
      </audio>
      }
       <button onClick={test_play} >PLAY</button>
    </>
  )
}

/*
  {path &&
        <td><audio src = {path} controls></audio></td>
      }
*/