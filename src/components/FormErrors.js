import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Alert'

const FormErrors = (props) =>
  <div>
    {Object.keys(props.formErrors).map((formErrorField) => {
      return (
        props.formErrors[formErrorField].map((error) => {
          return (
            <Alert variant="danger">{formErrorField} {error}</Alert>
          )
        })
      )
    })}
  </div>

FormErrors.propTypes = {
  formErrors: PropTypes.object
}

export default FormErrors
