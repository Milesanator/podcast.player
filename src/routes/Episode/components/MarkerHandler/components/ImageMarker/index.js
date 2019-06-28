import React from 'react'
import PropTypes from 'prop-types'
import './ImageMarker.scss'

const ImageMarker = ({ content }) => {
  return (
    <div className="ImageMarker" style={{ backgroundImage: `url(${process.env.REACT_APP_PODBLASTER_SRV}${content})` }} />
  )
}

ImageMarker.propTypes = {
  content: PropTypes.string
}

export default ImageMarker