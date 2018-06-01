import React, { Component } from 'react'
import $ from 'jquery'
import './style.css'
import { logout } from '../../app/auth'

export default class FileDropZone extends Component {

    constructor(props) {
        super(props)

    }

    render() {

        return (
            <div id="admin-menu">
                <div className="info">
                    <img src={require('../../app/image/admin.png')} onClick={() => {
                        $("#admin-menu").toggleClass("active")
                    }} />
                    <span>{window.localStorage.getItem("username")}</span>
                </div>
                <div className="menu">
                    <ul>
                        <li>Change password</li>
                        <li onClick={() => logout()}>Log out</li>
                    </ul>
                </div>
            </div >
        )
    }
}