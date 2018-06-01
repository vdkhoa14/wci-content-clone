import React from 'react'

import { NavLink } from 'react-router-dom'
import './style.css'
import $ from 'jquery'
import { get } from '../../utils/networking'
class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowContact: false,
            y: 0,
            contactTitle: null,
            contactDescription: null,
            contactDescriptions: null,
            contactPhone: null,
            contactPhone_1: null,
            floatBanner_title: null,
            floatBanner_button: null,
            footer_menu: null,
            footer_icon: null,
            footer_copyright: null
        }
    }

    componentDidMount() {
        $(window).scroll(() => this.setState({ y: $(window).scrollTop() }));
        get("api/components/get/contact", result => {
            const contactTitle = result.filter(x => x.name == "title")[0]
            const contactDescription = result.filter(x => x.name == "description")[0]
            const contactPhone = result.filter(x => x.name == "phone")[0]
            const contactPhone_1 = result.filter(x => x.name == "phone-1")[0]
            let contactDescriptions = this.state.contactDescriptions
            if (contactDescription.description.indexOf("[") == 0) {
                contactDescriptions = JSON.parse(contactDescription.description);
            }
            this.setState({
                contactTitle: contactTitle,
                contactDescription: contactDescription,
                contactPhone: contactPhone,
                contactPhone_1: contactPhone_1,
                contactDescriptions: contactDescriptions
            })
        })
        get("api/components/get/float-banner", result => {
            const floatBanner_title = result.filter(x => x.name == "title")[0]
            const floatBanner_button = result.filter(x => x.name == "button")[0]
            this.setState({
                floatBanner_title: floatBanner_title,
                floatBanner_button: floatBanner_button
            })
        })
        get("api/components/get/footer-menu", result => {
            this.setState({
                footer_menu: result
            })
        })
        get("api/components/get/footer-icon", result => {
            this.setState({
                footer_icon: result
            })
        })
        get("api/components/get/footer-copyright", result => {
            this.setState({
                footer_copyright: result
            })
        })
    }
    handeShowList(e) {
        $(e.target).toggleClass("hide");
    }

    render() {
        let {
            isShowContact,
            y,
            contactTitle,
            contactDescription,
            contactPhone,
            contactPhone_1,
            floatBanner_title,
            floatBanner_button,
            footer_menu,
            footer_icon,
            footer_copyright,
            contactDescriptions
        } = this.state;

        let contact = [
            {
                id: (contactPhone) ? contactPhone.id : 0,
                name: "United States",
                number: (contactPhone) ? contactPhone.title : ""
            },
            {
                id: (contactPhone_1) ? contactPhone_1.id : 0,
                name: "International",
                number: (contactPhone_1) ? contactPhone_1.title : ""
            }
        ]
        return (
            <div className="footer">
                <div className="flying_footer" style={{ position: ((y > 1700) ? "relative" : "fixed") }}>
                    <div className="left">
                        <ul className="list-icon">
                            <li className={(isShowContact) ? "phone active" : "phone"} onClick={() => this.setState({ isShowContact: !isShowContact })}>
                                <i className="fa fa-phone"></i>
                                <div className="phone-box" style={(isShowContact) ? { left: "10px" } : { left: "-1000px" }}>
                                    {
                                        (contactTitle) ? <p className="title component" id={contactTitle.id}>{contactTitle.title}</p> : ""
                                    }
                                    {
                                        (contactDescription) ? <p className="message component" id={contactDescription.id}>
                                            {
                                                (contactDescriptions) && contactDescriptions.map((item, i) => <span key={i}>
                                                    {item}
                                                </span>)
                                            }
                                        </p> : ""
                                    }
                                    <div className="contact">
                                        {
                                            contact.map((item, i) =>
                                                <div className="contact-item" key={i}>
                                                    <span className="name">{item.name}</span>
                                                    <span className="number component menu_parent" id={item.id}>{item.number}</span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                            <li className="chat">
                                <i className="fa fa-comments"></i>
                            </li>
                        </ul>
                    </div>
                    <div className="right">
                        {
                            (floatBanner_title) ? <span className="title component menu_parent" id={floatBanner_title.id}>{floatBanner_title.title}</span> : ""
                        }
                        {
                            (floatBanner_button) ? <i className="s component menu_parent" id={floatBanner_button.id}><NavLink to={floatBanner_button.url} >{floatBanner_button.title}</NavLink></i> : ""
                        }
                    </div>
                </div>
                <div className="footer_nav_list" >
                    {
                        (footer_menu) && footer_menu.map((item, i) => <ul className="products_list clear" key={i}>
                            <li className="title sub hide" onClick={(e) => $(e.target).toggleClass("hide")} >
                                <h3 className="s component menu_parent" id={item.id}>{item.title}</h3>
                                {
                                    (item.children) && item.children.map((item, j) => <ul className="sub-list" key={j}>
                                        <li className="s component menu_child" id={item.id}><NavLink to={item.url} >{item.title}</NavLink></li>
                                    </ul>
                                    )
                                }
                            </li>
                        </ul>
                        )
                    }
                </div>
                <div className="bottom-wrapper">
                    <div className="wrapper-left">
                        {
                            (footer_icon) && <ul className="icon-list">
                                <li className="s component slider" id={footer_icon[0].id}><NavLink to={footer_icon[0].url}><i className="fab fa-facebook-f"></i></NavLink></li>
                                <li className="s component slider" id={footer_icon[1].id}><NavLink to={footer_icon[1].url} ><i className="fab fa-twitter"></i></NavLink></li>
                                <li className="s component slider" id={footer_icon[2].id}><NavLink to={footer_icon[2].url} ><i className="fab fa-google-plus-g"></i></NavLink></li>
                                <li className="s component slider" id={footer_icon[3].id}><NavLink to={footer_icon[3].url} ><i className="fab fa-youtube"></i></NavLink></li>
                                <li className="s component slider" id={footer_icon[4].id}><NavLink to={footer_icon[4].url} ><i className="fab fa-linkedin-in"></i></NavLink></li>
                                <li className="s component slider" id={footer_icon[5].id}><NavLink to={footer_icon[5].url} ><i className="fab fa-pinterest-p"></i></NavLink></li>
                                <li className="s component slider" id={footer_icon[6].id}><NavLink to={footer_icon[6].url} ><i className="fab fa-instagram"></i></NavLink></li>
                            </ul>
                        }
                    </div>
                    <div className="wrapper-right">
                        {
                            (footer_copyright) ? <span className="copy-right component slider" id={footer_copyright[0].id}>{footer_copyright[0].title}</span> : ""
                        }
                    </div>
                </div>
            </div >
        )
    }
}
export default Footer