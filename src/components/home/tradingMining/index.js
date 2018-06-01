import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { get } from '../../../utils/networking'
import { BASE_API } from '../../../constants/appSettings'
import './style.css'
class TradingMining extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            trading: null,
            mining: null
        }
    }
    componentDidMount() {
        get("api/components/get/trading-mining", result => {
            result.map((item, i) => {
                if (item.description.indexOf("[") == 0) {
                    item.descriptions = JSON.parse(item.description);
                }
                else {
                    item.descriptions = [item.description]
                }
            })
            const trading1 = result.filter(x => x.name == "trading")[0]
            const mining1 = result.filter(x => x.name == "mining")[0]
            this.setState({
                trading: trading1,
                mining: mining1
            })
        })
    }



    render() {
        let {
            trading,
            mining
        } = this.state


        return (
            <div className="trading-mining">
                {
                    (trading) && <div className="item trading component" id={trading.id}>
                        <div className="image">
                            <img src={BASE_API + trading.photo} />
                        </div>
                        <div className="content">
                            <span>{trading.title}</span>
                            {
                                (trading.descriptions) ? trading.descriptions.map((item, i) => <p key={i}>
                                    {
                                        item
                                    }
                                </p>) : ""
                            }
                        </div>
                    </div>
                }
                {
                    (mining) && <div className="item mining component" id={mining.id}>
                        <div className="image">
                            <img src={BASE_API + mining.photo} />
                        </div>
                        <div className="content">
                            <span>{mining.title}</span>
                            {
                                (mining.descriptions) ? mining.descriptions.map((item, i) => <p key={i}>
                                    {
                                        item
                                    }
                                </p>) : ""
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default connect(
    state => ({
        ...state.home
    })
)(TradingMining)