import React from 'react'

export function ScoreBoard({response_content}) {
    
    console.log("XXXXX", response_content)

    return (
        <>
            <div className='flex flex-row justify-center text-xl'>{response_content.accumulated_score}</div>
        </>
    )
}
