import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import $ from 'jquery'
import './style.css'
export default class FileDropZone extends Component {

    constructor(props) {
        super(props)

    }

    onDrop(file) {
        this.props.onAdd(file)
    }

    onRemove(relativeUrl) {
        this.props.onRemove(relativeUrl)
    }

    render() {

        let {
            domainUrl,
            initFiles,
            isUploadding
        } = this.props
        return (
            <div className="dropzone">
                <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone_contain">
                    <p>Try dropping some files here, or click to select files to upload.</p>
                    {
                        (!isUploadding) ? <div className="drop_item">
                            {initFiles && initFiles.map((relativeUrl, i) =>
                                relativeUrl &&
                                <div key={i} className="item_contain">
                                    <img src={domainUrl + relativeUrl} />
                                    <i className="fa fa-times" aria-hidden="true" onClick={() => this.onRemove(relativeUrl)}></i>
                                    <span className="item_name ellipsis">Try dropping some files here</span>
                                </div>
                            )}
                        </div> : <div className="loader"></div>
                    }
                </Dropzone>
            </div >
        )
    }
}