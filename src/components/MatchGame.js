import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { getAGame } from './services/list'
import { MatchGameNormal } from './MatchGameNormal'
import { MatchGameContinuous } from './MatchGameContinuous'

export function MatchGame() {
    const [leftCardsBank, setLeftCardsBank] = useState([])
    const [rightCardsBank, setRightCardsBank] = useState([])
    const [continuous, setContinuous] = useState(false)
    const mounted = useRef(true);

     
  const currentLocation = useLocation()
  const arr = currentLocation.pathname.split('/')
  const id = arr[arr.length-1]

    useEffect(() => {
     
        getAGame(id)
        .then ((response) => {
            if (mounted.current) {
                //console.log(response.data.continuous)
                setContinuous(response.data.continuous)
              const left_array = response.data.base.split('/').map((str, index) => {
                return (
                    {src: str, matched: false, match_index: index, language: response.data.source_language}
                )
              });
              
              setLeftCardsBank(left_array)
              const right_array = response.data.target.split('/').map((str, index) => {
                return (
                  {src: str, matched: false, match_index: index, language: response.data.target_language }
                )
              });
              setRightCardsBank(right_array)
            }
        })
        return () => mounted.current = false;
    },[id])

    return (
        <>
            { continuous ?
            <MatchGameContinuous theLeftCards={leftCardsBank} theRightCards={rightCardsBank} />
            :
            <MatchGameNormal theLeftCards={leftCardsBank} theRightCards={rightCardsBank} />
            }
        </>
    )
}
