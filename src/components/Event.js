import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const formatDate = datetime =>
  new Date(datetime).toDateString()

class Event extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      event: {}
    }
  }

  componentDidMount () {
    if(this.props.match) {
      axios({
        method: "GET",
        url: `http://localhost:3001/events/${this.props.match.params.id}`,
        headers: JSON.parse(localStorage.getItem('user'))
      }).then((response) => {
        this.setState({event: response.data});
      });
    }
  }

  render() {
    return (
      <div className="event">
        <Link to={`/events/${this.props.match.params.id}/edit`}>Edit</Link>

        {this.state.event.image_url && <img src={this.state.event.image_url} />}
        <h2 className="event-title">{this.state.event.title}</h2>
        <div className="event-datetime">{formatDate(this.state.event.start_datetime)}</div>
        <div className="event-location">{this.state.event.location}</div>
        <div className="event-description">{this.state.event.description}</div>
      </div>
    )
  }
}

export default Event
