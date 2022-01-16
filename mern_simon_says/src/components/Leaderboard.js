import React, { useState, useEffect } from "react";

import HighScore from "./HIghScore";

const Leaderboard = ({ scores }) => {

    const loadScores = () => {
        return (
            <div>
                {scores.map(score =>
                    <HighScore
                        key={score.id}
                        HighScore={score}
                    />
                )}
            </div>
        )
    }
    return (
        <div className="leaderboard">
            {loadScores()}
        </div>

    )
}

export default Leaderboard