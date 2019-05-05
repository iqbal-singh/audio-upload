import React, { Component } from 'react'
import * as qs from 'query-string'
import { Button, ButtonGroup } from 'react-bootstrap';
import UploadCard from '../components/UploadCard';
import { Storage, API } from 'aws-amplify';
export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      resultsFound: false,
      searchTerm: qs.parse(this.props.location.search)[""]
    };
  }

  fetchSearchResults = async () => {

    try {

      // fetch file metadata from DynamoDB
      const getFiles = await API.get('api', `/items/search/${this.state.searchTerm}`);
      let fileMetaData = getFiles.data;

      // get AWS S3 url for each item's s3 key
      for (const fileItem of fileMetaData) {
        fileItem.url = await Storage.get(fileItem.s3FileKey);
      }

      // results were fetched
      if (fileMetaData.length > 0) {
        this.setState({ files: fileMetaData, resultsFound: true });
      }
    }
    catch (err) {
      this.setState({ resultsFound: false })
    }

  }


  goHome = () => {
    window.location = '/';

  }

  componentDidMount() {
    this.fetchSearchResults();

  }
  render() {

    return (
      <>
        <ButtonGroup className="ml-2 mt-3 ">
          <Button variant="dark text-light" onClick={this.goHome}><i className="fas fa-arrow-left" /></Button>
        </ButtonGroup>
        <h5 className="text-center"> {this.state.files.length} Result(s) for '{this.state.searchTerm}'</h5>

        {/* display a card for each result */}
        {this.state.files.map(file => (
          <UploadCard
            key={file.s3FileKey}
            id={file.id}
            url={file.url}
            title={file.title}
            author={file.author}
            date={file.date}
            desc={file.desc}
            score={file.score}

          />
        ))}
      </>
    )
  }
}
