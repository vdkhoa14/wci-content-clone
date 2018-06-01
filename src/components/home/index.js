import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import TopSlider from '../home/slider'
import BarLink from '../home/barlink'
import RewardsProgram from '../home/rewardsprogram'
import CloudPane from '../home/cloudpane'
import Services from '../home/services'
import BottomBanner from '../home/bottombanner'
import TradingMining from '../home/tradingMining'
import ReadMore from './readMore'
class Home extends React.Component {

    componentDidMount() {
    }

    render() {
        const {
            title,
            content
        } = this.props
        return (
            <div className="home-page">
                <TopSlider />
                <BarLink />
                <TradingMining />
                <RewardsProgram />
                <CloudPane />
                <Services />
                <BottomBanner />
            </div>
        )
    }
}
export default connect(
    state => ({
    }),
    dispatch => ({
    })
)(Home)