import React from "react";

const HighScore = ({ HighScore }) => {
    return (
        <li className='highScore'>
            {HighScore.username} {HighScore.score}
        </li>
    )
}

export default HighScore