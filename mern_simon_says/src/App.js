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
  const [selectionsNeeded, setSelectionsNeeded] = useState(0)
  const [gameMessage, setGameMessage] = useState('Play')
  const [gameActive, setGameActive] = useState(false)
  const [lightUp, setLit] = useState(false)
  const [stringcolor, setStringColor] = useState('');

  const choices = ['red', 'yellow', 'green', 'blue']

  const handleLogin = (event) => {
    event.preventDefault()

    setUser('user')
  }

  const startGame = () => {
    if (!gameActive) {
      selectRandomColor()
    }
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

    const newColorArray = pickedColors.concat(newColor)

    setColors(newColorArray)
    setGameMessage(newColorArray.length)
    setGameActive(true)

    newColorArray.forEach((ele, i) => {

      setTimeout(() => {

        setTimeout(() => {
          setLit(false)
        }, 500)
        setLit(true)
        setStringColor(ele)
        setTimeout(() => {
          setStringColor('')
        }, 500)
      }, i * 1000)

    })

  }

  const handleUserInput = (newColorArr) => {

    let correctChoice = evaluteUserChoice(newColorArr);
    if (correctChoice) {
      let count = selectionsNeeded + 1
      setSelectionsNeeded(count)

      if (count === pickedColors.length) {
        setTimeout(() => {
          setSelectionsNeeded(0)
          setUserColors([])
          selectRandomColor()
        }, 500)

      }
    } else {
      if (gameActive) {
        setGameMessage('Nope')
        setUserColors([])
        setColors([])
        setSelectionsNeeded(0)
        setGameActive(false)
        resetGame()
      }
      setUserColors([])

    }
  }

  const resetGame = () => {
    setTimeout(() => {
      setGameMessage('Play')

    }, 1000)
  }
  const displayUsername = () => {
    return (
      <p>You are logged in.</p>
    )
  }

  const evaluteUserChoice = newColorArr => {
    let lastPick = newColorArr[newColorArr.length - 1];
    return pickedColors[newColorArr.length - 1] === lastPick
  }

  const handleSimonButtonClick = (color) => {
    const newColorArr = userColors.concat(color)
    setUserColors(newColorArr)
    handleUserInput(newColorArr)
    setTimeout(() => {
      setLit(false)
    }, 150)
    setLit(true)
    setStringColor(color)
    setTimeout(() => {
      setStringColor('')
    }, 150)
  }

  return (
    <div>
      <div className={'doubleContainer'}>
        <div className={'simonContainer'}>
          <Game red={handleSimonButtonClick} green={handleSimonButtonClick} blue={handleSimonButtonClick} yellow={handleSimonButtonClick}
            func={startGame}
            msg={`${gameMessage}`} valu={lightUp} stringColor={stringcolor} />
        </div>
        <div className={'loginContainer'}>
          {user === null ?
            LoginFormDisplay() : displayUsername()}
          <Leaderboard />
        </div>

      </div>

    </div>
  )
}

export default App