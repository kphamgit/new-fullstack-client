import React from 'react'
import CEditor from './code_editor/CEditor.js'
import io from "socket.io-client";
import { clear } from  '../redux/subcategory.js';

export const SocketContext = React.createContext();
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';
//the following code DOES NOT make a connection. It just prevents
//an immediate connection
const socket = io.connect(URL, {
   autoConnect: false
});

function Home() {
    
  return (
    <>
      <div>Hoeeeeeme</div>
      <CEditor />
    </>
  
  )
}

export default Home