import React, { Component } from 'react'

export default class Page404 extends Component {
  render() {
    return (
      <center>
        <code>{window.location.pathname}</code> not found
      </center>
    )
  }
}
