import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import AudioPlayer from './AudioPlayer'
import ScoreBtns from './ScoreBtns'
import DownloadBtn from './DownloadBtn'
export default class UploadCard extends Component {
  render() {
   
    return (
      <>
        <Card className="m-2">
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Uploaded by {this.props.author} on {new Date(this.props.date).toLocaleDateString()}</Card.Subtitle>
           <hr/>
            <AudioPlayer className="pt-2" src={this.props.url} />
            
            <Card.Text className="pt-2" >
              {this.props.desc}
            </Card.Text>
            <hr/>
            <DownloadBtn srcURL={this.props.url} />
            <ScoreBtns srcID={this.props.id} srcScore={this.props.score} />
          </Card.Body>
        </Card>
      </>
    )
  }
}
