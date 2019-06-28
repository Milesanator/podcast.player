import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from 'components/LoadingSpinner'
import Error from 'components/Error'
import MarkerHandler from './components/MarkerHandler'
import './Episode.scss'

const SPACE_KEY = 32
const ENTER_KEY = 13

class Episode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      episode: null,
      error: null,
      playing: false,
      currentTime: 0,
      duration: 0
    }

    this.audioRef = React.createRef()
    this.progressBar = React.createRef()

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleProgressClicked = this.handleProgressClicked.bind(this)
    this.togglePlayPause = this.togglePlayPause.bind(this)
    this.handleSeekBack = this.handleSeekBack.bind(this)
    this.handleSeekForward = this.handleSeekForward.bind(this)
    this.displayTime = this.displayTime.bind(this)
  }

  async componentDidMount() {
    const { match } = this.props

    await axios.get(`${process.env.REACT_APP_PODBLASTER_SRV}/episodes/${match.params.id}`)
      .then((resp) => {
        this.setState({
          loading: false,
          episode: resp.data
        })
      })
      .catch((e) => {
        const errorMessage = e && e.response && e.response.data ?
          e.response.data :
          'Generic Error'

        this.setState({
          loading: false,
          error: errorMessage
        })
      })

      this.audioRef.addEventListener("timeupdate", e => {
        this.setState({
          currentTime: e.target.currentTime,
          duration: e.target.duration
        })
      })

      // set's the duration onLoad
      this.audioRef.currentTime = 0.1

      document.addEventListener("keydown", this.handleKeyDown)
  }

  componentWillUnmount() {
    this.audioRef.removeEventListener("timeupdate", () => {})
    document.removeEventListener("keydown", this.handleKeyDown)
  }

  handleKeyDown(event) {
    switch( event.keyCode ) {
        case SPACE_KEY:
            this.togglePlayPause();
            break;
        case ENTER_KEY:
            this.togglePlayPause();
            break;
        default: 
            break;
    }
  }

  handleProgressClicked(e) {
    const { duration } = this.audioRef
    const progressBarBounds = this.progressBar.getBoundingClientRect()
    // Calculate where on the progress bar you clicked
    // ( Click position X - progress bar offset X ) / progressbar width
    const percent = (e.clientX - progressBarBounds.x) / progressBarBounds.width

    this.audioRef.currentTime = percent * duration
    this.progressBar.value = percent
  }

  togglePlayPause() {
    const { playing } = this.state

    if (!playing) {
      this.setState({
        playing: true
      })
      this.audioRef.play()
    } else {
      this.setState({
        playing: false
      })
      this.audioRef.pause()
    }
  }

  handleSeekBack() {
    const newTime = this.audioRef.currentTime - 5

    if (newTime > 0) {
      this.audioRef.currentTime = newTime
    } else {
      this.audioRef.currentTime = 0
    }
  }

  handleSeekForward() {
    const { duration } = this.state
    const newTime = this.audioRef.currentTime + 5

    if (newTime < duration) {
      this.audioRef.currentTime = newTime
    } else {
      this.audioRef.currentTime = duration
    }
  }

  displayTime(time) {
    if(!isNaN(time)) {
      return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    }
  }

  render () {
    const {
      loading,
      error,
      episode,
      currentTime,
      duration,
      playing
    } = this.state

    return (
      <div className="Episode" data-loading={loading}>
        <div className="ContentHeader">
          <Link to="/episodes">
            <div className="BackButton">
              <i className="IconBack" />
              Back to Episodes
            </div>
          </Link>
        </div>

        <LoadingSpinner />
        
        { !error ? (
          <div className="EpisodeContent">
            <div className="EpisodeMarkers">
              <MarkerHandler
                markers={(episode) ? episode.markers : []}
                currentTime={currentTime}
              />
            </div>
            {
              episode && (
                <div className="EpisodeInfo">
                  <h2>{episode.name}</h2>
                  <audio
                    ref={(input) => this.audioRef = input}
                    src={`${process.env.REACT_APP_PODBLASTER_SRV}${episode.audio}`}
                    style={{ display: 'none' }}
                  />
                  <progress
                    value={(duration !== 0) ? currentTime/duration : 0}
                    onClick={this.handleProgressClicked}
                    max="1"
                    ref={(bar) => this.progressBar = bar}
                  />
                  <p className="EpisodeTimer">{this.displayTime(currentTime)} / {this.displayTime(duration)}</p>
                  <div className="EpisodeActions">
                    <div className="EpisodeButtons">
                      <div
                        className="SeekBackButton Button"
                        onClick={this.handleSeekBack}
                      />

                      <div className="PlayButton Button"
                        data-playing={playing}
                        onClick={this.togglePlayPause}
                      /> 

                      <div
                        className="SeekForwardButton Button"
                        onClick={this.handleSeekForward}
                      />
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          ) : <Error message={error} />
        }
      </div>
    )
  }
}

export default Episode