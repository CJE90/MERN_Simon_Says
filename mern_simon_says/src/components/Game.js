import React, { useState } from 'react'
import ColoredButton from './ColoredButton'

const Game = ({ red, blue, green, yellow, func, msg, valu, stringColor }) => {

    return (
        <div className='main'>
            <div className='firstInner'>
                <div className='innerSimon'>
                    <ColoredButton className='simon-button button1' func={red} color={'red'} style={valu} stringColor={stringColor}>red</ColoredButton>
                    <ColoredButton className='simon-button button2' func={blue} color={'blue'} style={valu} stringColor={stringColor}>blue</ColoredButton>
                    <ColoredButton className='simon-button button3' func={green} color={'green'} style={valu} stringColor={stringColor}>green</ColoredButton>
                    <ColoredButton className='simon-button button4' func={yellow} color={'yellow'} style={valu} stringColor={stringColor}>yellow</ColoredButton>
                    <ColoredButton className='simon-play' func={func} color={'grey'} style={true} stringColor={'grey'} />
                </div>
                <div className='message'>{msg}</div>
            </div>
        </div>
    )

}

export default Game