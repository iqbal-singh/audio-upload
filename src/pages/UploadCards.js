import React, { Component } from 'react'
import UploadCard from '../components/UploadCard';
import { Button, ButtonGroup } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Storage, API } from 'aws-amplify';


export default class UploadCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      sort: 'none',
      loaded: false,
      errorLoading: false
    };
  }
  componentDidMount() {
    this.handleSortRecent();
  }

  fetchFiles = async (sort = '') => {
    try {

      // fetch the file metadata from a DynamoDB table
      const getFiles = await API.get('api', '/items/' + sort); 
      let fileMetaData = getFiles.data;

      // get AWS S3 url for each item's s3 key
      for (const fileItem of fileMetaData) {
        fileItem.url = await Storage.get(fileItem.s3FileKey);
      }

      this.setState({ files: fileMetaData, loaded: true });
    }
    catch (err) {
      this.setState({ errorLoading: true, loaded: false });
    }
  }


  handleSortRecent = () => {
    this.fetchFiles('recent');
    this.setState({ sort: 'recent' });
  }

  handleSortTop = () => {
    this.fetchFiles('top');
    this.setState({ sort: 'top' });
  }

  render() {
    return (

      <>

        {/* toggle sort state buttons */}
        <ButtonGroup className="ml-2 mt-3 ">
          <Button variant="dark text-light" active={this.state.sort === 'top'} onClick={this.handleSortTop}>Top Rated</Button>
          <Button variant="dark text-light" active={this.state.sort === 'recent'} onClick={this.handleSortRecent}>Recent</Button>
        </ButtonGroup>


        {/* display spinner while loading files */}
        {!this.state.loaded && (<div className="text-center"><Spinner animation="border" variant="dark" /><br /><code>Loading...</code></div>)}

        {/* An error occured while fetching the files */}
        {this.state.errorLoading && (<div className="text-center"><code>Error loading files</code></div>)}


        {/* No errors occured while fetching the files & there no uploads to display */}
        {this.state.loaded && this.state.files.length === 0 && (<div className="text-center"><h3><code>There are no files to display.</code></h3></div>)}

        {/* display a card for each file */}
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
