import React, {useEffect, useState} from 'react'
import { useFetcher } from 'react-router-dom'

export function ImageCard({card, handle_click}) {
    const [imgSrc, setImgSrc] = useState(null)
    const handleClick = () => {
        handle_click(card)
    }

    useEffect(() => {
        let initial = card.src[0]
        let img_src = "https://kevinphambucket.s3.amazonaws.com/images/" + initial + '/' + card.src
        setImgSrc(img_src)
    },[card.src])
  
    return (
            <>
            { card.matched === false ?
            <img style={{width:"150px", height:"140px"}} src = {imgSrc} alt="card"
            onClick={handleClick}
            />
            :
            <span style={{color:"red"}}>
           
            </span>
            }
            </>
    )
    
}
