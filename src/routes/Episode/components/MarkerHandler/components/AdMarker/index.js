import React from 'react'
import PropTypes from 'prop-types'
import './AdMarker.scss'

const AdMarker = ({ link, content }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="AdMarker">
        <p>{content}</p>
      </div>
    </a>
  )
}

AdMarker.propTypes = {
  content: PropTypes.string,
  link: PropTypes.string
}

export default AdMarker