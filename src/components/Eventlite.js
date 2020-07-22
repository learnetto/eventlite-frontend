import React from 'react'
import axios from 'axios'
import EventsList from './EventsList'
import EventForm from './EventForm'
import './Eventlite.css'
import Container from 'react-bootstrap/Container'

class Eventlite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/events'
    })
    .then(response => {
      this.setState({events: response.data})
    })
  }

  addNewEvent = (event) => {
    const events = [...this.state.events, event].sort(function(a, b){
      return new Date(a.start_datetime) - new Date(b.start_datetime)
    })
    this.setState({events: events})
  }

  render() {
    const currentUser = localStorage.getItem('user')
    return (
      <Container className="pt-5">
        {currentUser &&
          <div className="mb-5 event-form-homepage-container">
            <EventForm onSuccess={this.addNewEvent} />
          </div>
        }
        <h1 className="h4">Latest events</h1>
        <EventsList events={this.state.events} />
      </Container>
    )
  }
}

export default Eventlite
