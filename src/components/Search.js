import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap';

export default class Search extends Component {

  handleSearch = event => {
    if (event.key === 'Enter') {
      const searchTerm = event.target.value;
      if (searchTerm === '') {
        //   searchURL = window.location.origin;
      }
      else {
        let searchURL = window.location.origin + '/search?=' + searchTerm;
        window.location = searchURL;
      }
      console.log(searchTerm);
    }
  }

  render() {
    return (
      <div className="w-100 mr-2">
        <FormControl className="bg-light border-0" onKeyDown={this.handleSearch} type="text" placeholder="Search" />
      </div>
    )
  }
}
