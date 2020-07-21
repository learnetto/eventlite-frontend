import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const handleSignOut = function(e) {
  e.preventDefault();
  axios({
    method: 'DELETE',
    url: 'http://localhost:3001/auth/sign_out',
    data: JSON.parse(localStorage.user)
  })
  .then(() => {
    localStorage.removeItem('user')
    window.location = '/'
  })
}

function AppHeader() {
  const currentUser = localStorage.getItem('user')
  return (
    <div>
      <div>
        {currentUser ?
          <>
            {JSON.parse(currentUser).uid}
            <a href="#" onClick={handleSignOut} >Sign out</a>
          </> :
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        }
      </div>
      <Link to="/">
        <h1 className="logo">Eventlite</h1>
      </Link>
    </div>
  )
}

export default AppHeader
