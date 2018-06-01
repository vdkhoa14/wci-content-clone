import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { get } from '../../../utils/networking'
import { BASE_API } from '../../../constants/appSettings'
import './style.css'
class Services extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            serviceList: []
        }
    }
    componentDidMount() {
        get("api/components/get/services", result => {
            result.map((item, i) => {
                if (item.description.indexOf("[") == 0) {
                    item.descriptions = JSON.parse(item.description);
                }
            })
            this.setState({
                serviceList: result
            })
        })
    }



    render() {
        let {
            serviceList
        } = this.state

        let services = [
            {
                id: (serviceList[0]) ? serviceList[0].id : 0,
                title: (serviceList[0]) ? serviceList[0].title : "",
                value: (serviceList[0] && serviceList[0].descriptions) ? ((serviceList[0].descriptions.length > 0) ? serviceList[0].descriptions : serviceList[0].description) : [],
                iconClass: (serviceList[0]) ? serviceList[0].photo : "fa fa-times",
                borderColor: "#777",
                iconColor: "#777"
            },
            {
                id: (serviceList[1]) ? serviceList[1].id : 0,
                title: (serviceList[1]) ? serviceList[1].title : "",
                value: (serviceList[1] && serviceList[1].descriptions) ? ((serviceList[1].descriptions.length > 0) ? serviceList[1].descriptions : serviceList[1].description) : [],
                iconClass: (serviceList[1]) ? serviceList[1].photo : "fa fa-times",
                borderColor: "#777",
                iconColor: "#777"
            },
            {
                id: (serviceList[2]) ? serviceList[2].id : 0,
                title: (serviceList[2]) ? serviceList[2].title : "",
                value: (serviceList[2] && serviceList[2].descriptions) ? ((serviceList[2].descriptions.length > 0) ? serviceList[2].descriptions : serviceList[2].description) : [],
                iconClass: (serviceList[2]) ? serviceList[2].photo : "fa fa-times",
                borderColor: "#777",
                iconColor: "#777"
            },
            {
                id: (serviceList[3]) ? serviceList[3].id : 0,
                title: (serviceList[3]) ? serviceList[3].title : "",
                value: (serviceList[3] && serviceList[3].descriptions) ? ((serviceList[3].descriptions.length > 0) ? serviceList[3].descriptions : serviceList[3].description) : [],
                iconClass: (serviceList[3]) ? serviceList[3].photo : "fa fa-times",
                borderColor: "#777",
                iconColor: "#777"
            },
            {
                id: (serviceList[4]) ? serviceList[4].id : 0,
                title: (serviceList[4]) ? serviceList[4].title : "",
                value: (serviceList[4] && serviceList[4].descriptions) ? ((serviceList[4].descriptions.length > 0) ? serviceList[4].descriptions : serviceList[4].description) : [],
                iconClass: (serviceList[4]) ? serviceList[4].photo : "fa fa-times",
                borderColor: "#ADADAD",
                iconColor: "#B9C18F"
            },
            {
                id: (serviceList[5]) ? serviceList[5].id : 0,
                title: (serviceList[5]) ? serviceList[5].title : "",
                value: (serviceList[5] && serviceList[5].descriptions) ? ((serviceList[5].descriptions.length > 0) ? serviceList[5].descriptions : serviceList[5].description) : [],
                iconClass: (serviceList[5]) ? serviceList[5].photo : "fa fa-times",
                borderColor: "#777",
                iconColor: "#777"
            }
        ]

        return (
            <div className="wcx-services">
                <span
                    style={{
                        padding: "20px 0px 30px 0px",
                        display: "inline-block",
                        fontSize: "30px",
                        fontWeight: "100"
                    }}
                >Why choose WCI ?</span>

                <div className="content">
                    {
                        services.map((item, i) =>
                            <div className="service-item component slider" key={i} id={item.id}>
                                <div className="item-content">
                                    <div className="content-icon">
                                        {
                                            (i == 4) ? <img src={BASE_API + item.iconClass} /> :
                                                <i className={item.iconClass} style={{ border: "2px solid" + item.borderColor, color: item.iconColor }} />
                                        }
                                        <span className={(item.title === "WCX Widgets") ? "title wcx" : "title"}>{item.title}</span>
                                    </div>
                                    <div className="content-value">
                                        {
                                            (item.value && item.value.length > 0) && item.value.map((item, j) => <p key={j} className="value">
                                                {
                                                    item
                                                }
                                            </p>)
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({
        ...state.home
    })
)(Services)