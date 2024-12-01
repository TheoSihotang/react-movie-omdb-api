import React from 'react'
import { TrophySpin } from 'react-loading-indicators'


export default function LoadingComponent(props) {
    return (
        <div className='container h-100 flex justify-center align-center'>
            <TrophySpin color={props.color} size={props.size}/>       
        </div>
    )
}
