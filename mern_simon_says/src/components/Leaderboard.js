import React, { useState, useEffect } from "react";
import ScoreService from '../services/scores'
import HighScore from "./HIghScore";

const Leaderboard = () => {
    const [scores, setScores] = useState([])

    useEffect(() => {
        ScoreService
            .getAll()
            .then(initialScores => {
                const sortedScores = initialScores.sort((a, b) => (Number(a.score) > Number(b.score)) ? -1 : 1)
                setScores(sortedScores)
            })
    }, [])

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