import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { get } from '../../../utils/networking'
import ReadMore from '../readMore'
import './style.css'
class BarLink extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            titleComponent: null,
            buttonComponent: null,
            showBlog: false
        }
    }
    componentDidMount() {
        get("api/components/get/bar-link", result => {
            const titleComponent = result.filter(x => x.name == "title")[0]
            const buttonComponent = result.filter(x => x.name == "button")[0]
            this.setState({
                titleComponent: titleComponent,
                buttonComponent: buttonComponent
            })
        })
    }

    render() {
        let {
            titleComponent,
            buttonComponent,
            showBlog
        } = this.state
        return (
            <div className="bar-link">
                <div className="content">
                    <span className="decription component" id={(titleComponent) ? titleComponent.id : ""}>
                        {(titleComponent) ? titleComponent.title : ""}
                    </span>
                    <span onClick={() => this.setState({
                        showBlog: true
                    })} className="bt_link" id={(buttonComponent) ? buttonComponent.id : ""}><NavLink className="bt_link" to={(buttonComponent) ? buttonComponent.url : "#"} >{(buttonComponent) ? buttonComponent.title : ""}</NavLink></span>
                </div>
                <ReadMore
                    onShow={showBlog}
                    onClose={() => this.setState({ showBlog: false })}
                />
            </div>
        )
    }
}
export default connect(
    state => ({
        ...state.home
    })
)(BarLink)