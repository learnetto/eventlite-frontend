import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const formatDate = datetime =>
  new Date(datetime).toDateString()

function Event(props){
  const [event, setEvent] = useState({})
  let { id } = useParams()

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3001/events/${id}`,
      headers: JSON.parse(localStorage.getItem('user'))
    }).then((response) => {
      setEvent(response.data)
    })
  }, [id])

  return (
    <div className="event">
      {event.currentUserCanEdit &&
        <Link to={`/events/${id}/edit`}>
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
