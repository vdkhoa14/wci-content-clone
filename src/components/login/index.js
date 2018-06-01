import React, { Component } from 'react'
import { connect } from 'react-redux'
import { post } from '../../utils/networking'
import { ToastContainer, toast } from "react-toastify"
import '../../../node_modules/react-toastify/dist/ReactToastify.css'
import './style.css'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isVerified: true,
            username: "",
            password: "",
            isProccessing: false
        }
    }

    handleSubmit() {
        this.setState({
            isProccessing: true
        })
        let param = {
            email: this.state.username,
            password: this.state.password
        }
        if (param.email == "" || param.password == "") {
            toast.error("", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 10000
            })
        }
        else {
            post("admin/api/auth/token", param, result => {
                if (result.error) {
                    this.setState({ isProccessing: false })
                }
                else {
                    window.localStorage.setItem("access_token", result.access_token);
                    window.localStorage.setItem("username", param.username);
                    window.location.assign("/")
                }
            })
        }
    }



    render() {
        let {
            isProccessing
        } = this.state
        return (
            <div className="login-form">
                <div className="login-box wrapper">
                    <div className="login-logo">
                        <a href="javascript:void(0)"><b>WCI</b> Admin</a>
                    </div>
                    <div className="login-box-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form>
                            <div className="form-group has-feedback">
                                <input type="text" className="form-control" placeholder="username" onChange={(e) => this.setState({ username: e.target.value })} />
                                <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <input type="password" className="form-control" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                                <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                            </div>
                            <div className="row">
                                <div className="col-xs-4 pull-right">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat" onClick={() => this.handleSubmit()}>{(isProccessing) ? "Wating..." : "Sign In"}</button>
                                </div>
                            </div>
                        </form>
                        <a href="#">I forgot my password</a><br />
                    </div>
                    <ToastContainer />
                </div>
            </div>
        )
    }
}
export default Login