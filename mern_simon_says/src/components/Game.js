import React, { useState } from 'react'

const Game = ({ red, blue, green, yellow }) => {

    return (
        <div>
            <div>
                <button>red</button>
                <button>blue</button>
            </div>
            <div>
                <button>green</button>
                <button>yellow</button>
            </div>
        </div>
    )

}

export default Game