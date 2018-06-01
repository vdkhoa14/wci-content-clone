import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { get } from '../../../utils/networking'
import $ from 'jquery'
import './style.css'
class TopMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            widthView: $(window).width(),
            isShowSmallMenu: false,
            menus: null,
            phone: null
        }
    }

    componentDidMount() {
        get("api/components/get/top-menu", result => {
            this.setState({
                menus: result
            })
        })
        get("api/components/get/contact", result => {
            const phoneComponent = result.filter(x => x.name == "phone")[0]
            this.setState({
                phone: phoneComponent
            })
        })
        $(window).resize(() => {
            this.setState({
                widthView: $(window).width()
            })
        })
    }
    handleShowSubMenu(e) {
        if (e.target.style.maxHeight && e.target.style.maxHeight.indexOf("300px") > -1) {
            e.target.style = "max-height : 50px";
            $(e.target).find("i").addClass("fa-sort-down");
            $(e.target).find("i").removeClass("fa-sort-up");
            $(e.target).find("i").css("padding-top", "10px");
        }
        else {
            e.target.style = "max-height : 300px";
            $(e.target).find("i").addClass("fa-sort-up");
            $(e.target).find("i").removeClass("fa-sort-down");
            $(e.target).find("i").css("padding-top", "20px");
        }
    }

    render() {
        let {
            widthView,
            isShowSmallMenu,
            menus,
            phone
        } = this.state;
        return (
            <div className="top_menu">
                <div className="content">
                    <div className="logo">
                        <div className="container">
                            <NavLink to="/"><img src={require('../../../app/image/logo.png')} style={{ paddingRight: "40px" }} /></NavLink>
                        </div>
                        <div className="shadow"></div>
                    </div>
                    {/* {
                        (phone) && <div className="phone_tab component" id={phone.id}>
                            <span>{phone.title}</span>
                        </div>
                    } */}
                    {
                        (widthView > 768) ? <div className="menu">


                            <ul className="menu_list">
                                {
                                    menus && menus.map((item, i) =>
                                        (item.children.length > 0) ?
                                            <li className="menu_item component menu_parent" key={i} id={item.id}>
                                                <NavLink to="#">{item.title}</NavLink>
                                                <ul className="sub_menu faq">
                                                    {
                                                        item.children.map((item, j) =>
                                                            <li className="sub_menu_item component menu_child" key={j} id={item.id}><NavLink to={item.url}>{item.title}</NavLink></li>
                                                        )
                                                    }
                                                </ul>
                                            </li> :
                                            <li className="menu_item component" key={i} id={item.id}><a href={item.url} >{item.title}</a></li>

                                    )
                                }
                            </ul>

                        </div> : <div className="small-menu">
                                <i className="fa fa-bars" onClick={() => this.setState({ isShowSmallMenu: !isShowSmallMenu })}></i>
                                <ul className="menu-1" style={(isShowSmallMenu) ? { maxWidth: "100%" } : { maxWidth: "0px" }}>
                                    {
                                        menus && menus.map((item, i) =>
                                            (item.children.length > 0) ?
                                                <li className="menu-item" key={i} onClick={this.handleShowSubMenu.bind(this)}>
                                                    <NavLink to="#">{item.title}</NavLink>
                                                    <i className="fa fa-sort-down"></i>
                                                    <ul className="sub-menu-1">
                                                        {
                                                            item.children.map((item, j) =>
                                                                <li className="sub-menu-1-item" key={j} >
                                                                    <NavLink to={item.url}>{item.title}</NavLink>
                                                                </li>
                                                            )
                                                        }
                                                    </ul>
                                                </li> :
                                                <li className="menu-item" key={i}><NavLink to={item.url}>{item.title}</NavLink></li>

                                        )
                                    }
                                </ul>

                            </div>
                    }
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({
    }),
    dispatch => ({
    })
)(TopMenu)