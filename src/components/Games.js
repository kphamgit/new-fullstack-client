import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getGames} from './services/list'

function Games() {
  const [games, setGames] = useState([])
  
useEffect(() => {
    getGames()
    .then ( response => {
        setGames(response.data);
    })
},[])
 //<Image src="https://kevinphambucket.s3.amazonaws.com/images/a/apple.jpeg" />
 
  return (
   <>
     <div className="m-16 underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
          <Link to='/' >Home</Link>
         </div>
    <div className='flex flex-wrap gap-10 m-16'>
        { 
          games.map((game, index) => (
            <div key={index}>
            <Link to={`/matching_games/play/${game.id}`}
            className="underline text-blue-600 hover:text-blue-800 visited:text-green-600"
            >
                {game.name}
            </Link>
            </div>
        ))
        }
    </div>
    </>
  )
}

export default Games