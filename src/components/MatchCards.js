import React, { useState, useEffect } from 'react'
import { WordCard } from './WordCard'

export function MatchCards({cards, handleChoice}) {
    const [hasImage, setHasImage] = useState(false)
    useEffect (() => {
        cards.map ((card, index) => {
            //console.log(card.src)
            if (index === 0 && (card.src.indexOf("jpeg") >= 0 ) ) {
                setHasImage(true)
            }
        })

    },[cards])


    return (
        <>
      
        {hasImage ?
        <div style={
            {display:"grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto auto auto auto",
            gridGap: "none"
            }
        }>
             { cards.map (card => (
                <div key={card.match_index}>
                    <div>
                        <WordCard card={card} handleChoice={handleChoice} />
                        </div>
                    </div>
                ))
            }
        </div>
        :
        <div>
            { cards.map (card => (
                <div key={card.match_index}>
                    <div>
                        <WordCard card={card} handleChoice={handleChoice} />
                        </div>
                    </div>
                ))
            }
        </div>
        }
        </>
    )
}
