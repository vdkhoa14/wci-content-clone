import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import $ from 'jquery'
import './style.css'

const iconList = [
    "fa fa-times", "fa fa-random", "fa fa-key", "fa fa-lock", "fa fa-address-book", "fa fa-address-card", "fa fa-ambulance",
    "fa fa-th-large", "fa fa-database", "fa fa-plug", "fa fa-cloud-download-alt", "fa fa-graduation-cap"
]
export default class FileDropZone extends Component {

    constructor(props) {
        super(props)

    }

    render() {

        return (
            <div className="icon-table">
                {
                    iconList.map((item, i) =>
                        <i
                            className={item + ((item === this.props.icon) ? " active" : "")}
                            key={i}
                            onClick={() => this.props.handleSelectIcon(item)}
                        />
                    )
                }
            </div >
        )
    }
}