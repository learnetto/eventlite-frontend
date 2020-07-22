import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import moment from 'moment'

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
    <div>
      <header className="headerimage" style={{backgroundImage: `url(${event.image_url})`}} />
      <Container className="content-container">
        <div className="event-details">
          <Row noGutters={true}>
            <Col xs={12} sm={12} md={8} lg={8}>
              {event.image_url && <img alt={event.title} className="event-image" src={event.image_url}/>}
            </Col>
            <Col xs={12} sm={12} md={4} className="bg-light">
              <div className="p-4">
                {event.currentUserCanEdit &&
                  <Button variant="outline-dark" href={`/events/${id}/edit`} className="float-right">
                    Edit
                  </Button>
                }
                <p className="text-uppercase event-date-abbreviated">{moment(event.start_datetime).format('MMM')}</p>
                <p className="event-date-abbreviated">{moment(event.start_datetime).format('DD')}</p>
                <h1 className="pt-4 h5">{event.title}</h1>
                {event.user &&
                  <div className="pb-3 text-muted">by {event.user.name}</div>
                }
                <div className="event-price">
                  <div className="text-muted">
                    Free
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row noGutters={true} className="event-register-button-container">
            <Col xs={12} sm={12} md={8} lg={8}>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className="px-4">
                <Button  variant="success" size="lg" block><small>Register</small></Button>
              </div>
            </Col>
          </Row>


          <Row noGutters={true} className="event-description-container">
            <Col xs={12} sm={12} md={8} lg={8}>
              <h2 className="h4">About this Event</h2>
              {event.description && <p className="lead" dangerouslySetInnerHTML={{__html: event.description}} />}
             </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className="p-4">
                <h3 className="h6">Date and Time</h3>
                <div className="event-details__data">
                  <p>{moment(event.start_datetime).format('ddd, DD MMMM YYYY')}</p>
                  <p>{moment(event.start_datetime).format('hh:mm a')}</p>
                  <p><Link to="#">Add to Calendar</Link></p>
                </div>
                <h3 className="h6">Location</h3>
                <p>{event.location}</p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}
export default Event
