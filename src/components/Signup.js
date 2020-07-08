import React from 'react'
import axios from 'axios'

class Signup extends React.Component {
  handleSignup = (e) => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: 'http://localhost:3001/auth',
      data: {
        email: this.email.value,
        password: this.password.value
      }
    })
    .then(response => {
      localStorage.setItem('user',
        JSON.stringify({
          'access-token': response.headers['access-token'],
          'client': response.headers['client'],
          'uid': response.data.data.uid
      }))
      window.location = '/'
    })
  }

  render () {
    return (
      <div>
        <h2>Sign up</h2>
        <form onSubmit={this.handleSignup} >
          <input name="email" ref={(input) => this.email = input } />
          <input name="password" type="password" ref={(input) => this.password = input } />
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default Signup
