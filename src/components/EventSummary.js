import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'

const formatDate = datetime =>
  new Date(datetime).toDateString()

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


function EventSummary(props){
  const classes = useStyles()

  return (
    <Link to={`/events/${props.event.id}`} style={{textDecoration: 'none'}} >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.event.image_url}
            title={props.event.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.event.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {moment(props.event.start_datetime).format('ddd, MMM DD, YYYY hh:mm A z')}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button href={`/events/${props.event.id}`} size="small" color="primary">
            View Event Details
          </Button>
        </CardActions>
      </Card>
    </Link>
  )
}

Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    start_datetime: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
  })
}

export default EventSummary
