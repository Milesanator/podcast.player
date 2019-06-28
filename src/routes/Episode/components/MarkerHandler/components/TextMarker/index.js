import React from 'react'
import PropTypes from 'prop-types'
import './TextMarker.scss'

const TextMarker = ({ content }) => {
  return (
    <div className="TextMarker">
      <p>{content}</p>
    </div>
  )
}

TextMarker.propTypes = {
  content: PropTypes.string
}

export default TextMarker