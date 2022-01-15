import React, { useState, useEffect, useRef } from 'react'
import Leaderboard from './components/Leaderboard'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import signUpService from './services/signup'
import userDataService from './services/userData'
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
  const [gamesPlayed, setGamesPlayed] = useState('')
  const [lastScore, setLastScore] = useState('')
  const [userHighScore, setUserHighScore] = useState('')

  const choices = ['red', 'yellow', 'green', 'blue']

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      userDataService.setToken(user.token)
      setGamesPlayed(user.gamesPlayed)
      setLastScore(user.lastScore)
      setUserHighScore(user.highestScore)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      userDataService.setToken(user.token)
      setUser(user)
      console.log('this is the user id', user.id)
      setGamesPlayed(user.gamesPlayed)
      setLastScore(user.lastScore)
      setUserHighScore(user.highestScore)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error logging in')
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const user = await signUpService.signup({
        username, password
      })
      console.log(user)
    } catch (exception) {
      console.log('exception', exception)
    }
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
        handleSubmit={handleLogin}
        handleSignUp={handleSignUp} />
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
        handleEndGameUserData()
        setUserColors([])
        setColors([])
        setSelectionsNeeded(0)
        setGameActive(false)
        resetGame()
      }
      setUserColors([])

    }
  }
  const handleEndGameUserData = () => {
    const newGamesPlayed = Number(gamesPlayed) + 1
    setGamesPlayed(newGamesPlayed)
    const newLastScore = pickedColors.length - 1
    setLastScore(newLastScore)
    if (newLastScore > userHighScore) {
      setUserHighScore(newLastScore)
    }

    const newUserData = {
      ...user,
      highestScore: userHighScore,
      gamesPlayed: newGamesPlayed,
      lastScore: newLastScore
    }
    console.log(newUserData)
    userDataService.update(user.id, newUserData)
  }
  const resetGame = () => {
    setTimeout(() => {
      setGameMessage('Play')

    }, 1000)
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }
  const displayUsername = () => {
    return (
      <div>
        {user.username} is logged in.
        <div>
          <div>
            Games Played: {gamesPlayed}
          </div>
          <div>
            Highest Score: {userHighScore}
          </div>
          <div>
            Last Score: {lastScore}
          </div>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
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