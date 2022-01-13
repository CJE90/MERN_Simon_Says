import React, { useState, useEffect, useRef } from 'react'
import Leaderboard from './components/Leaderboard'
import LoginForm from './components/LoginForm'
import Game from './components/Game'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [pickedColors, setColors] = useState([])
  const [userColors, setUserColors] = useState([])
  const [gameOver, setGameOver] = useState(null)
  const [selectionsNeeded, setSelectionsNeeded] = useState(0)

  const choices = ['R', 'Y', 'G', 'B']

  const handleLogin = (event) => {
    event.preventDefault()

    setUser('user')
  }

  const LoginFormDisplay = () => {
    return (
      <LoginForm username={username} password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin} />
    )
  }

  const selectRandomColor = () => {
    let newColor = choices[Math.floor(Math.random() * 4)];
    console.log(`Computer has chose ${newColor}`)
    const newColorArray = pickedColors.concat(newColor)
    console.log(newColorArray)
    setColors(newColorArray)
  }

  const handleUserInput = () => {
    console.log(userColors)
    let correctChoice = evaluteUserChoice();

    if (correctChoice) {
      let count = selectionsNeeded + 1
      setSelectionsNeeded(count)

      if (count === pickedColors.length) {
        setSelectionsNeeded(0)
        setUserColors([])
        selectRandomColor()
      }
    } else {
      //set Game Over message
      setUserColors([])
      setColors([])
      setSelectionsNeeded(0)
    }
  }


  const displayUsername = () => {
    return (
      <p>You are logged in.</p>
    )
  }

  const evaluteUserChoice = () => {
    let lastPick = userColors[userColors.length - 1];
    return pickedColors[userColors.length - 1] === lastPick
  }

  const handleRedClick = () => {
    setUserColors(userColors.concat('R'))
    handleUserInput()
  }
  const handleGreenClick = () => {
    setUserColors(userColors.concat('G'))
    handleUserInput()
  }
  const handleBlueClick = () => {
    setUserColors(userColors.concat('B'))
    handleUserInput()
  }
  const handleYellowClick = () => {
    setUserColors(userColors.concat('Y'))
    handleUserInput()
  }

  return (
    <div>
      <div className={'gameContainer'}>
        <Game red={handleRedClick} green={handleGreenClick} blue={handleBlueClick} yellow={handleYellowClick} func={selectRandomColor} />
      </div>
      <div className={'flexy'}>
        {user === null ?
          LoginFormDisplay() : displayUsername()}
        <br />
        <Leaderboard />
      </div>
    </div>
  )
}

export default App