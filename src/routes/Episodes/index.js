import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from 'components/LoadingSpinner'
import Error from 'components/Error'
import axios from 'axios'
import './Episodes.scss'

class Episodes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      episodes: null,
      loading: true
    }
  }

  async componentDidMount() {
    await axios.get(`${process.env.REACT_APP_PODBLASTER_SRV}/episodes`)
      .then((resp) => {
        this.setState({
          loading: false,
          episodes: resp.data
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

  render() {
    const { loading, error, episodes } = this.state

    console.log(episodes)
    let episodeRows = []
    
    if (episodes && episodes.length > 0) {
      episodeRows = episodes.map((episode, index) => 
        <div className="EpisodeRow" key={episode.id}>
          <Link to={`/episodes/${episode.id}`}>
            #{index+1} {episode.name}
          </Link>
        </div>
      )
    }

    return (
      <div className="Episodes" data-loading={loading}>
        <LoadingSpinner />
        
        { !error ? (
          <div className="EpisodesContent">
            <h1>Podblaster</h1>

            <h2>Select an episode:</h2>
            <div className="EpisodeList">
              {(episodes && episodes.length > 0) ? 
                episodeRows : (
                <p>No episodes yet.</p>
                )
              }
            </div>
          </div>
          ) : <Error message={error} />
        }
      </div>
    )
  }
}

export default Episodes