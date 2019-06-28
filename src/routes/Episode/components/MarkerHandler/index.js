import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AdMarker from './components/AdMarker'
import ImageMarker from './components/ImageMarker'
import TextMarker from './components/TextMarker'
import './MarkerHandler.scss'

class MarkerHandler extends Component {
  static propTypes = {
    currentTime: PropTypes.number.isRequired,
    markers: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        duration: PropTypes.number,
        link: PropTypes.string,
        start: PropTypes.number,
        type: PropTypes.string
      })
    )
  }

  constructor(props) {
    super(props)

    this.renderMarker = this.renderMarker.bind(this)
  }

  renderMarker(marker) {
    switch(marker.type) {
      case 'ad':
        return (
          <AdMarker
            content={marker.content}
            link={marker.link}
          />
        )
      case 'image':
        return (
          <ImageMarker
            content={marker.content}
          />
        )
      case 'text':
        return (
          <TextMarker 
            content={marker.content}
          />
        )
    }
  }

  render() {
    const { markers, currentTime } = this.props
    let currentMarker = null

    if (markers && markers.length > 0) {
      markers.forEach((marker) => {
        const end = marker.start + marker.duration

        if (marker.start <= currentTime && end >= currentTime) {
          currentMarker = this.renderMarker(marker)
        }
      })
    }

    console.log(markers)

    return (
      <div className="MarkerHandler">
        {currentMarker}
      </div>
    )
  }
}

export default MarkerHandler