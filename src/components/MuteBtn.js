import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
export default class MuteBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          muted: false
        };
      }
      toggleGlobalMute = () => {
        window.Howler.mute(!window.Howler._muted);
        this.setState({
          muted: !this.state.muted
        });
      }
    
      volumeIcons = {
        unmuted: 'fas fa-volume-up',
        muted: 'fas fa-volume-mute'
      };
    
    
  render() {
    return (
      <>
         <Button onClick={this.toggleGlobalMute} variant="outline-dark border-0 mr-2"><i className={this.state.muted ? this.volumeIcons.muted : this.volumeIcons.unmuted}></i></Button>
      </>
    )
  }
}
