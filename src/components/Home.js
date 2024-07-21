import React, {useState, useEffect} from 'react'
import { HomeStudent } from './HomeStudent.js';
import { HomeTeacher } from './HomeTeacher.js';
import { useSelector } from 'react-redux';
import { ConnectionState } from './ConnectionState';
import NavBarTailWind from './NavBarTailwind.js';
function Home({categories, socket}) {
  const user = useSelector( state => state.user.value )
  const [isConnected, setIsConnected] = useState(socket.connected);
  
useEffect(() =>{
  function onConnect() {
    setIsConnected(true);
    socket.emit("join", {username: user.user_name})
  }
    socket.on('connect', onConnect)
    return () => {
      socket.off('connect', onConnect);
    };
    //eslint-disable-next-line
},[user.user_name])
//<div><ConnectionState isConnected={ isConnected } /></div>
  useEffect(() => {
    // no-op if the socket is already connected
    //console.log(" ChatPage connecting to server")
    socket.connect();
    //
    // comment this out so that when the Home component dismounts, i.e, user
    //    go to another link, socket won't get disconnected.
    //    Leave to code here just for reference/learning
    //return () => {
    //  socket.disconnect();
    //};
    //eslint-disable-next-line
},[]);

  return (
    <>
    
    <div className="grid grid-cols-1 w-screen bg-blue-100">
    <div className='bg-orange-300 m-5'>
    <div className='w-full'><NavBarTailWind categories={categories}/></div>
    { user.role === 'teacher' ?
        <HomeTeacher />
        :
        <HomeStudent user = {user} />
        }
    </div>
    </div>
    </>
  )
}

export default Home