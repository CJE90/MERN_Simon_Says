import React, { useState, useEffect } from "react";
import ScoreService from '../services/scores'
import HighScore from "./HIghScore";

const Leaderboard = () => {
    const [scores, setScores] = useState([])

    useEffect(() => {
        ScoreService
            .getAll()
            .then(initialNotes => {
                setScores(initialNotes)
            })
    }, [])

    const loadScores = () => {
        const sortedScores = scores.sort((a, b) => a.score > b.score)
        return (
            <div>
                {sortedScores.map(score =>
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