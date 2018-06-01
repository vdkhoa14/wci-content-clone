import React from 'react'
import { connect } from 'react-redux'
import './style.css'
import { get } from '../../../utils/networking'

class TopBanner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            coindList: [],
            currentCoind: []
        }
    }

    componentDidMount() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://blockchain.info/vi/ticker", false);
        xhr.send();
        this.setState({
            coindList: this.objectToArray(JSON.parse(xhr.response)),
            currentCoind: this.objectToArray(JSON.parse(xhr.response))
        })
    }

    componentDidUpdate() {
        setTimeout(() => {
            let coindList = this.state.coindList
            var tempHead = coindList[0]
            coindList.shift();
            coindList.push(tempHead)
            this.setState({
                coindList
            })
        }, 10000);
    }

    objectToArray(object) {
        var array = []
        for (var i in object) {
            let temp = {
                name: i,
                value: object[i]["15m"]
            }
            array.push(temp)
        }
        return array
    }


    render() {
        let {
            coindList
        } = this.state;

        return (
            <div className="top_fixed_banner">
                <div className="content">
                    {
                        coindList.map((item, i) => <span key={i} >
                            {
                                "BTC/" + item.name + " - " + parseInt(item.value)
                            }
                        </span>)
                    }
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({
        ...state
    }),
    dispatch => ({
    })
)(TopBanner)