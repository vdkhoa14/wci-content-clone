import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { get } from '../../../utils/networking'
import { BASE_API } from '../../../constants/appSettings'
import './style.css'
class RewardsProgram extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rewardList: []
        }
    }
    componentDidMount() {
        get("api/components/get/rewards-program", result => {
            result.map((item, i) => {
                if (item.description.indexOf("[") == 0) {
                    item.descriptions = JSON.parse(item.description);
                }
            })
            this.setState({
                rewardList: result
            })
        })
    }

    render() {
        let {
            rewardList
        } = this.state
        let rewars = [
            {
                id: (rewardList[0]) ? rewardList[0].id : 0,
                title: (rewardList[0]) ? rewardList[0].title : "",
                value: (rewardList[0] && rewardList[0].descriptions) ? ((rewardList[0].descriptions.length > 0) ? rewardList[0].descriptions : rewardList[0].description) : [],
                iconClass: (rewardList[0]) ? rewardList[0].photo : "fa fa-times",
                borderColor: "#6999D8",
                iconColor: "#B9C18F",
                url: (rewardList[0]) ? rewardList[0].url : "#"
            },
            {
                id: (rewardList[1]) ? rewardList[1].id : 0,
                title: (rewardList[1]) ? rewardList[1].title : "",
                value: (rewardList[1] && rewardList[1].descriptions) ? ((rewardList[1].descriptions.length > 0) ? rewardList[1].descriptions : rewardList[1].description) : [],
                iconClass: (rewardList[1]) ? rewardList[1].photo : "fa fa-random",
                borderColor: "#6999D8",
                iconColor: "#B9C18F",
                url: (rewardList[1]) ? rewardList[1].url : "#"
            },
            {
                id: (rewardList[2]) ? rewardList[2].id : 0,
                title: (rewardList[2]) ? rewardList[2].title : "",
                value: (rewardList[2] && rewardList[2].descriptions) ? ((rewardList[2].descriptions.length > 0) ? rewardList[2].descriptions : rewardList[2].description) : [],
                iconClass: (rewardList[2]) ? rewardList[2].photo : "fa fa-key",
                borderColor: "#6999D8",
                iconColor: "#B9C18F",
                url: (rewardList[2]) ? rewardList[2].url : "#"
            },
            {
                id: (rewardList[3]) ? rewardList[3].id : 0,
                title: (rewardList[3]) ? rewardList[3].title : "",
                value: (rewardList[3] && rewardList[3].descriptions) ? ((rewardList[3].descriptions.length > 0) ? rewardList[3].descriptions : rewardList[3].description) : [],
                iconClass: (rewardList[3]) ? rewardList[3].photo : "fa fa-lock",
                borderColor: "#6999D8",
                iconColor: "#B9C18F",
                url: (rewardList[3]) ? rewardList[3].url : "#"
            },
            {
                id: (rewardList[4]) ? rewardList[4].id : 0,
                title: (rewardList[4]) ? rewardList[4].title : "",
                value: (rewardList[4] && rewardList[4].descriptions) ? ((rewardList[4].descriptions.length > 0) ? rewardList[4].descriptions : rewardList[4].description) : [],
                iconClass: (rewardList[4]) ? rewardList[4].photo : "fa fa-lock",
                borderColor: "#6999D8",
                iconColor: "#B9C18F",
                url: (rewardList[4]) ? rewardList[4].url : "#"
            },
            {
                id: (rewardList[5]) ? rewardList[5].id : 0,
                title: (rewardList[5]) ? rewardList[5].title : "",
                value: (rewardList[5] && rewardList[5].descriptions) ? ((rewardList[5].descriptions.length > 0) ? rewardList[5].descriptions : rewardList[5].description) : [],
                iconClass: (rewardList[5]) ? rewardList[5].photo : "fa fa-lock",
                borderColor: "#6999D8",
                iconColor: "#B9C18F",
                url: (rewardList[5]) ? rewardList[5].url : "#"
            }
        ]

        return (
            <div className="rewards-program">
                <span
                    style={{
                        padding: "20px 30px",
                        display: "inline-block",
                        fontSize: "30px",
                        fontWeight: "100",
                        background: "#4C77C7",
                        width: "100%",
                        display: "inline-block",
                        marginTop: "20px",
                        color: "#fff",
                        boxSizing: "border-box"
                    }}
                >Rewards Program</span>
                <div className="content">
                    {
                        rewars.map((item, i) =>
                            <div className="rewar-item component slider" key={i} id={item.id}>
                                {
                                    (i % 2 == 0) ?
                                        <div className="item-content icon-right">
                                            <div className="content-value">
                                                <span className="title">{item.title}</span>
                                                {
                                                    (item.value && item.value.length > 0) && item.value.map((item, j) => <p key={j} className="value">
                                                        {
                                                            item
                                                        }
                                                    </p>)
                                                }
                                                <NavLink to={item.url} style={{ textDecoration: "none", color: "#4C77C7" }}>READ MORE</NavLink>
                                            </div>
                                            <div className="content-icon">
                                                <img src={BASE_API + item.iconClass} />
                                            </div>
                                        </div> :
                                        <div className="item-content icon-left">
                                            <div className="content-icon">
                                                <img src={BASE_API + item.iconClass} />
                                            </div>
                                            <div className="content-value">
                                                <span className="title">{item.title}</span>
                                                {
                                                    (item.value && item.value.length > 0) && item.value.map((item, j) => <p key={j} className="value">
                                                        {
                                                            item
                                                        }
                                                    </p>)
                                                }
                                                <NavLink to={item.url} style={{ textDecoration: "none", color: "#4C77C7" }}>READ MORE</NavLink>
                                            </div>
                                        </div>

                                }
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
)(RewardsProgram)