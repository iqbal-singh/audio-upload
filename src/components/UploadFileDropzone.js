import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Button, FormControl } from 'react-bootstrap'
import { Storage, API } from 'aws-amplify';
import hash from 'object-hash';
export default class UploadFileDropzone extends Component {

    constructor() {
        super()
        this.state = {
            uploaded: false,
            file: {},
            user: "",
            notes: ""
        }

    }

    handleUpload = () => {
        const title = this.state.file.name;
        const file = this.state.file;
        const author = this.state.user;
        const desc = this.state.notes;

        if (desc === '' || author === '') {
            console.log('missing info')
        }
        else {
            this.processFile(file, title, author, desc);
        }

    }

    processFile = async (file, title, author, desc) => {
        let uploadDate = new Date().getTime();
        let awsFileKey = `${hash({ title, uploadDate, author, desc })}${title}`; 

        // upload file to s3
        let uploadFileToS3 = await Storage.put(awsFileKey, file);

        // insert metadata into a DynamoDB table
        let insertMetaDataForFile = await API.post('api', '/items',
            {
                body:
                {
                    id: uploadDate * Math.floor(Math.random() * 100),
                    s3FileKey: uploadFileToS3.key,
                    date: new Date(),
                    title: title,
                    author: author,
                    desc: desc,
                    score: 0
                }
            });

        if (insertMetaDataForFile) {
            this.setState({ uploaded: true, file: {}, user: "", notes: "" });
        }

    }


    handleNotesChange = event => {
        this.setState({ notes: event.target.value.trim() });
    }
    handleUserChange = event => {
        this.setState({ user: event.target.value.trim() });
    }

    // invalid file selected
    onDropRejected(file) {
        this.setState({ file: { name: 'Invalid' } });
    }

    onDropAccepted(file) {
        this.setState({ file: file[0] });

    }

    onCancel() {
        this.setState({
            uploaded: false,
            file: {},
            user: "",
            notes: ""
        });
    }

    // truncate long file names 
    truncate(fileName, length) {
        const extIndex = fileName.lastIndexOf('.');
        const ext = fileName.substring(extIndex, fileName.length) || '';
        let name = fileName.substring(0, extIndex);
        if (name.length >= length) {
            name = name.substring(0, length) + '[...]';
        }
        return name + ext;
    }

    render() {
        return (
            <>
                {/*display text when a file is uploaded*/}
                {(this.state.uploaded) && (<center><code>Your file was uploaded.<hr /></code></center>)}


                {/* select a file to upload dropzone*/}
                <Dropzone
                    accept="audio/mp3"

                    onDropRejected={this.onDropRejected.bind(this)}
                    onDropAccepted={this.onDropAccepted.bind(this)}
                    multiple={false}
                    onFileDialogCancel={this.onCancel.bind(this)}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div className='uploadzone'{...getRootProps()}>
                            <input {...getInputProps()} />

                            <h4>Click here to select an .mp3 file </h4>
                        </div>
                    )}
                </Dropzone>



                {/*display upload validation text*/}
                {this.state.file.name === 'Invalid' && (
                    <>
                        <hr />
                        <h5 className='card-title text-danger text-center'>That file type is not supported.</h5>
                    </>
                )
                }


                {/*upload name/notes fields*/}
                {(this.state.file.name && this.state.file.name !== 'Invalid') && (
                    <div >
                        <hr />
                        <h5 className='text-center card-title'>{this.truncate(this.state.file.name, 15)}</h5>
                        <hr />
                        <span className="text-danger">{this.state.user === '' && '* Required'}</span>
                        <FormControl maxLength={25} onChange={this.handleUserChange.bind(this)} type="text" placeholder="Enter your name" />
                        <hr />
                        <span className="text-danger">{this.state.notes === '' && '* Required'}</span>
                        <FormControl maxLength={200} onChange={this.handleNotesChange.bind(this)} as="textarea" placeholder="Enter notes" />
                        <hr />

                        <Button onClick={this.handleUpload.bind(this)}>Upload</Button>
                    </div>
                )
                }
            </>
        );
    }
}


