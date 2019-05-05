import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import ReactHowler from 'react-howler'
import ProgressBar from 'react-bootstrap/ProgressBar'
import raf from 'raf'

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: this.props.src,
      playing: false,
      volume: 5,
      muted: false,
      seek: 0,
      duration: 0
    };
  }

  playerIcons = {
    Play: 'fas fa-play',
    Stop: 'fas fa-stop',
    Pause: 'fas fa-pause'
  };

  handlePlayToggle = () => {

    const togglePlay = !this.state.playing;
    this.setState({
      playing: togglePlay
    });

  }

  handleAudioCompleted = () => {
    this.setState({
      playing: false
    });

    // rewind after audio has completed
    setTimeout(() => {
      if (!this.state.playing) {
        this.setState({
          seek: 0
        });
      }
    }, 2000);
  }


  setDuration = () => {
    this.setState({
      duration: Number(this.player.duration().toFixed(1))
    })
  }

  setSeek = () => {
    this.setState({
      seek: Number(this.player.seek() + .10).toFixed(1)
    })
  }

  handleOnPlay = () => {
    if (this.state.playing) {
      this.setSeek();

      raf(this.handleOnPlay);
    }
  }


  render() {

    return (
      <>

        {/* Howler audio compnonent */}
        <ReactHowler onLoad={this.setDuration} onPlay={this.handleOnPlay} ref={(ref) => (this.player = ref)} src={this.state.src} preload={false} html5 onEnd={this.handleAudioCompleted} playing={this.state.playing} />

        {/* Play/Pause Button */}
        <Button className="rounded-circle" onClick={this.handlePlayToggle}>
          <i className={this.state.playing ? this.playerIcons.Pause : this.playerIcons.Play}></i>
        </Button>

        {/* Display progress after audio has started playing*/}
        {
          this.state.duration > 0 &&
          <>
            <ProgressBar className="mt-2" now={Math.floor(this.state.seek / this.state.duration * 100)} />
            <code>{this.state.seek}/{this.state.duration}</code>
          </>
        }

      </>
    )
  }
}
