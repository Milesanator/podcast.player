import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from 'components/LoadingSpinner'
import Error from 'components/Error'
import axios from 'axios'
import './Episode.scss'

class Episode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      episode: null,
      error: null
    }
  }

  async componentDidMount() {
    const { match } = this.props

    await axios.get(`${process.env.REACT_APP_PODBLASTER_SRV}/episodes/${match.params.id}`)
      .then((resp) => {
        console.log(resp)
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
  }

  render () {
    const { loading, error } = this.state

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
            <h1>Podblast</h1>
          </div>
          ) : <Error message={error} />
        }
      </div>
    )
  }
}

export default Episode