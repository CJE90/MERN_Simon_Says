import React, { useState } from 'react'

const ColoredButton = ({ color, func }) => {

    switch (color) {
        case 'red':
            return (
                <div className={'redCircle'} onClick={func}></div>
            )
        case 'blue':
            return (
                <div className={'blueCircle'} onClick={func}></div>
            )
        case 'green':
            return (
                <div className={'greenCircle'} onClick={func}></div>
            )
        case 'yellow':
            return (
                <div className={'yellowCircle'} onClick={func}></div>
            )
        default:
            return <div></div>
    }



}

export default ColoredButton