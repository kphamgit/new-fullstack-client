import React, {useState, useEffect} from 'react'
import { Link, Route, Routes } from 'react-router-dom'
//import { Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { MatchGame } from './MatchGame'

//mport {GamePage}
import axios from 'axios'

function Games() {
  const rootpath = useSelector((state) => state.rootpath.value)
  const [games, setGames] = useState([])
  
  const myStyle =  {
    borderRadius: "5px",
    marginBottom: "5px",
    marginLeft: "10px",
  
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "10px 10px 10px 10px",
    background: "cyan"
}

  useEffect(() => {
    const url = `${rootpath}/api/matching_games`
    axios.get(url).then((response) => {
      //console.log(response.data)
      setGames(response.data);
    });
  
  },[rootpath])

 //<Image src="https://kevinphambucket.s3.amazonaws.com/images/a/apple.jpeg" />
 
  return (
    <>
   
    <div style={myStyle}>

        <div className='gamegrid'>
        { 
          games.map((game) => (
            <div>
            <Link to={`/matching_games/play/${game.id}`}>
                {game.name}
            </Link>
            </div>
        ))
        }
        </div>
    </div>
      </>
  )
}

export default Games