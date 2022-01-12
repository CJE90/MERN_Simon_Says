import React, { useState } from 'react'
import Leaderboard from './components/Leaderboard'
import LoginForm from './components/LoginForm'
import Game from './components/Game'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [pickedColors, setColors] = useState([])
  const [userColors, setUserColors] = useState([])

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

  const selectRandomColor = (lengthOfColorArray) => {
    let randomIndex = Math.floor(Math.random() * lengthOfColorArray);
    console.log(choices[randomIndex])


  }

  const makeDecision = () => {
    let userChoice = false;
    let gameQuit = false
    while (!gameQuit) {
      while (!userChoice) {
        console.log('Computer is adding a new color')
        const newColor = selectRandomColor(choices.length)
        let colors = pickedColors.concat(newColor)
        //do something with the appropriate button
        setColors(colors)
        userChoice = true
      }
      while (userChoice) {
        console.log('user turn')
        //get button inputs and compare to color array
      }

    }

  }

  const displayUsername = () => {
    return (
      <p>You are logged in.</p>
    )
  }

  return (
    <div>
      <div className={'gameContainer'}>
        <Game />
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