import React, { Component } from 'react'
import $ from 'jquery'
import './style.css'
import { get } from '../../../utils/networking'

export default class ReadMore extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: null
        }
    }

    componentDidMount() {
        get("api/components/get/read-more-coin", result => {
            if (result)
                this.setState({
                    content: result[0]
                })
        })
    }

    render() {
        let {
            content
        } = this.state
        let {
            onShow
        } = this.props
        return (
            (onShow) ? <div className="read-more-page"  >
                {
                    (content) ? <div className="text component slider" id={content.id}>
                        <div className="header">
                            <i className="fa fa-times" onClick={() => this.props.onClose()}></i>
                        </div>
                        <div className="contents">
                            {
                                (content) && <div dangerouslySetInnerHTML={{ __html: JSON.parse(content.description)[0] }} className="text"></div>
                            }
                        </div>
                    </div> : ""
                }
            </div > : ""
        )
    }
}