import React, { useState } from 'react'
import ColoredButton from './ColoredButton'

const Game = ({ red, blue, green, yellow, func }) => {

    return (
        <div>
            <div>
                <ColoredButton func={red} color={'red'}>red</ColoredButton>
                <ColoredButton func={blue} color={'blue'}>blue</ColoredButton>
            </div>
            <div className={'playButton'}><button onClick={func}>Play</button></div>
            <div>
                <ColoredButton func={green} color={'green'}>green</ColoredButton>
                <ColoredButton func={yellow} color={'yellow'}>yellow</ColoredButton>
            </div>

        </div>
    )

}

export default Game