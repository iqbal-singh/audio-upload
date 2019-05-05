import React, { Component } from 'react';
import UploadBtn from './UploadBtn';
import { Navbar } from 'react-bootstrap';
import Search from './Search';
import MuteBtn from './MuteBtn';

export default class TopNav extends Component {
  render() {
    return (
      <Navbar className="bg-light text-dark" collapseOnSelect expand="lg" >
        <Navbar.Brand href="/">
          <h3>Audio Upload <i className='fas fa-headphones App-logo'></i></h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Search />
          <MuteBtn />
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <UploadBtn />
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
