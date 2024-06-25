import React from 'react'

export function ConnectionState({isConnected}) {
    
    return (
        <>
         <p>Socket Connected: { '' + isConnected }</p>
        </>
    )
}
