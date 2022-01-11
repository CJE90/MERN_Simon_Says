import React, { useState } from 'react'
import Leaderboard from './components/Leaderboard'
import LoginForm from './components/LoginForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('click')
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

  const displayUsername = () => {
    return (
      <p>You are logged in.</p>
    )
  }

  return (
    <div>
      {user === null ?
        LoginFormDisplay() : displayUsername()}
      <Leaderboard />
    </div>
  )
}

export default App