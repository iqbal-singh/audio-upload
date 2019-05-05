import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
import UploadFileDropzone from './UploadFileDropzone';
export default class UploadBtn extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <>
        <Button className="my-2" variant='outline-dark border-0' onClick={this.handleShow}>Upload</Button>
        <Modal size="lg" centered show={this.state.show} onHide={this.handleClose} >
          <Modal.Body><UploadFileDropzone />
          </Modal.Body>
          <Modal.Footer >
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }


}
