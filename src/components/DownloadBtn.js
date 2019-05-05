import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
export default class DownloadBtn extends Component {


  render() {

    return (
      <>
        <Button title="Download" href={this.props.srcURL} variant="light"><i className="fas fa-cloud-download-alt"></i> Download</Button>
      </>
    )
  }
}
