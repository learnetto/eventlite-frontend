import React from 'react'
import Login from './components/Login'
import Eventlite from './components/Eventlite'

const currentUser = function() {
  const user = localStorage.getItem('user')
  return(user)
}

function App() {
  return (
    <div className="App">
      {currentUser() ? <Eventlite /> : <Login />}
    </div>
  )
}

export default App
