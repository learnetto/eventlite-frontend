import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

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
      <Container className="content-container">
        <h2>Sign up</h2>
        <Form onSubmit={this.handleSignup}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" ref={(input) => this.email = input } />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password"  ref={(input) => this.password = input } />
          </Form.Group>
          <Button variant="danger" type="submit">
            Sign up
          </Button>
        </Form>
        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </Container>
    )
  }
}

export default Signup
