import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { get } from '../../../utils/networking'
import { BASE_API } from '../../../constants/appSettings'
import './style.css'
class BottomBanner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            title: null,
            decription_1: null,
            descriptions: null,
            button_1: null,
            button_2: null,
        }
    }
    componentDidMount() {
        get("api/components/get/bottom-banner", result => {
            const image = result.filter(x => x.name == "image")[0]
            const title = result.filter(x => x.name == "title")[0]
            const decription_1 = result.filter(x => x.name == "decription-1")[0]
            const button_1 = result.filter(x => x.name == "button-1")[0]
            const button_2 = result.filter(x => x.name == "button-2")[0]
            let descriptions = this.state.descriptions
            if (decription_1.description.indexOf("[") == 0) {
                descriptions = JSON.parse(decription_1.description);
            }
            this.setState({
                image: image,
                title: title,
                decription_1: decription_1,
                descriptions: descriptions,
                button_1: button_1,
                button_2: button_2,
            })
        })
    }

    render() {
        let {
            image,
            title,
            decription_1,
            descriptions,
            button_1,
            button_2,
        } = this.state
        return (
            <div className="bottom-banner" style={{ backgroundImage: "url(" + require("../../../app/image/bottom-banner.png") + ")" }}>
                <div className="content">
                    <div className="content-left component slider" id={(image) ? image.id : 0}>
                        <img src={(image) ? (BASE_API + image.photo) : ""} />
                    </div>
                    <div className="content-right">
                        {
                            (title) ? <span className="title component slider" id={title.id}>{title.title}</span> : ""
                        }
                        {
                            (decription_1) ? <div className="decription component" id={decription_1.id}>
                                {
                                    (descriptions) && descriptions.map((item, i) => <p key={i}>
                                        {item}
                                    </p>)
                                }
                            </div> : ""
                        }
                        <div className="link">
                            {
                                (button_1) ? <span className="merchant-location component" id={button_1.id}><NavLink to={button_1.url}><span>{button_1.title}</span></NavLink></span> : ""
                            }
                            {
                                (button_2) ? <span className="become-merchant component" id={button_2.id}><NavLink to={button_2.url}><span >{button_2.title}</span></NavLink></span> : ""
                            }
                        </div>
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
)(BottomBanner)