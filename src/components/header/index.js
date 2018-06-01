import React from 'react'
import { connect } from 'react-redux'
import TopBanner from '../header/topbanner'
import TopMenu from '../header/topmenu'
import './style.css'
class Header extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="header">
                <TopBanner
                    edit={true}
                />
                <TopMenu />
            </div>
        )
    }
}
export default connect(
    state => ({
    }),
    dispatch => ({
    })
)(Header)