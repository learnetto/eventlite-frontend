import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const formatDate = datetime =>
  new Date(datetime).toDateString()

function Event(props){
  const [event, setEvent] = useState({})
  return (
    <div className="event">
      {event.currentUserCanEdit &&
        <Link to={`/events/${props.match.params.id}/edit`}>
          Edit
        </Link>
      }
      {event.image_url && <img src={event.image_url} />}
      <h2 className="event-title">{event.title}</h2>
      <div className="event-datetime">{formatDate(event.start_datetime)}</div>
      <div className="event-location">{event.location}</div>
      <div className="event-description">{event.description}</div>
    </div>
  )
}

export default Event
