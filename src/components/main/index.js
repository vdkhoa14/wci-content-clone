import React from 'react'
import { Route, Switch } from 'react-router'
import '../../app/style.css'
import About from '../about'
import Home from '../home'
import NotFound from '../notfound'
import Header from '../header'
import Footer from '../footer'
import EditBox from '../edit-box'
import { ToastContainer } from 'react-toastify'
import Login from '../login'
import AdminMenu from '../admin-menu'
import { isAdmin } from '../../app/auth'
import $ from 'jquery'
class Main extends React.Component {

    constructor(props) {
        super(props)

    }
    componentDidMount() {
        $(window).scroll(function (event) {
            var scroll = $(window).scrollTop();
            $("#admin-menu").css("margin-top", scroll + "px")
        });
        setTimeout(() => {
            $(".loader").css("display", "none")
            $(".webcontent").css("display", "block")
        }, 2000);
    }
    render() {
        return (
            <div>
                {
                    <div>
                        <div className="webcontent">
                            {
                                (isAdmin) ? <AdminMenu /> : ""
                            }
                            <Header />
                            <Home />
                            <Footer />
                            <ToastContainer />
                            <EditBox />
                        </div>
                        <div className="loader"></div>
                    </div>
                }
            </div>
        )
    }
}
export default Main