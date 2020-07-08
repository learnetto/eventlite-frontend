import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import AppHeader from './components/AppHeader'
import Eventlite from './components/Eventlite'

const currentUser = function() {
  const user = localStorage.getItem('user')
  return(user)
}

function App() {
  return (
    <div className="App">
      <AppHeader />
      {currentUser() ?
        <Eventlite /> :
        <><Login /> <Signup /></>}
    </div>
  )
}

export default App
