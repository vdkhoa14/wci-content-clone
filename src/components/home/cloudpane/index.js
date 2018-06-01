import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { get } from '../../../utils/networking'
import { BASE_API } from '../../../constants/appSettings'
import './style.css'
class CloudPane extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title_1: null,
            title_2: null,
            message: null,
            buttons: []
        }
    }
    componentDidMount() {
        get("api/components/get/clound-banner", result => {
            const title_1 = result.filter(x => x.name == "title_1")[0]
            const title_2 = result.filter(x => x.name == "title_2")[0]
            const message = result.filter(x => x.name == "message")[0]
            const buttons = result.filter(x => x.name == "button")
            this.setState({
                title_1: title_1,
                title_2: title_2,
                message: message,
                buttons: buttons
            })
        })
    }

    render() {

        let {
            title_1,
            title_2,
            message,
            buttons
        } = this.state
        return (
            <div className="cloud-pane">
                <div className="content">
                    <div className="title">
                        {
                            (title_1) ? <p className="s component slider" id={title_1.id}>{title_1.title}</p> : ""
                        }
                        {
                            (title_2) ? <p className="s component slider" id={title_2.id}>{title_2.title}</p> : ""
                        }
                    </div>
                    <div className="message">
                        {
                            (message) ? <p className="s component slider" id={message.id}>{message.title}</p> : ""
                        }
                    </div>
                    <div className="link-icon-box">
                        {
                            buttons.map((item, i) =>
                                (item.photo != "block") && <span className="s component" key={i} id={item.id}><NavLink to={item.url} >
                                    <div className="link-item">
                                        <img src={BASE_API + item.photo} />
                                        <span>{item.title}</span>
                                    </div>
                                </NavLink></span>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({
        ...state.home
    })
)(CloudPane)