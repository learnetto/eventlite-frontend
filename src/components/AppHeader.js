import React from 'react'
import axios from 'axios'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

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
    <Navbar fixed="top" bg="white">
      <Navbar.Brand href="/">eventlite</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      {currentUser ?
        <Nav>
          <Nav.Item><Navbar.Text>{JSON.parse(currentUser).uid}</Navbar.Text></Nav.Item>
          <Nav.Item><Nav.Link href="#" onClick={handleSignOut} >Sign out</Nav.Link></Nav.Item>
         </Nav> :
        <Nav>
          <Nav.Item><Nav.Link href="/signup">Signup</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
        </Nav>
      }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppHeader
