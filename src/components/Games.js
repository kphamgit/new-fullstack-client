import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
//import { Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import styles from './Games.module.css'
//mport {GamePage}
import axios from 'axios'

function Games() {
  const rootpath = useSelector((state) => state.rootpath.value)
  const [games, setGames] = useState([])
  /*
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
*/
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
   
    <div className={styles.container}>
        <div className={styles.header}>
        
        </div>
        <div className={styles.nav}></div>
        <div className={styles.main}>
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
        <div className={styles.aside}></div>
        <div className={styles.footer}></div>
    </div>
    </>
  )
}

export default Games