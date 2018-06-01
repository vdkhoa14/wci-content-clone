import {
    BASE_API,
    FILE_UPLOAD_API
} from '../constants/appSettings'
import { toast } from "react-toastify"
import { logout } from '../app/auth'

const defaultHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}

const SPINNER = '<i class="fa fa-circle-o-notch fa-spin"></i>'

export function get(endpoint, callback) {

    let url = BASE_API + endpoint

    let headers = defaultHeaders
    headers["Authorization"] = "bearer " + window.localStorage.getItem("access_token")

    let response = fetch(url, {
        method: 'GET',
        headers: headers,
    })

    if (callback) {
        handleResponse(response, callback)
    }

}

export function postFormData(api, data) {

    const response = fetch(FILE_UPLOAD_API, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": "bearer " + window.localStorage.getItem("access_token")
        },
        body: data
    })

    response.then(r => {
        if (r.status === 401) {
            logout()
        }
    })

    return response
}


export function post(endpoint, body, callback, target) {
    send('POST', endpoint, body, callback, target)
}

export function put(endpoint, body, callback, target) {
    send('PUT', endpoint, body, callback, target)
}

function send(method, endpoint, body, callback, target) {
    if (!target || !isTargetSubmitting(target)) {
        if (target)
            addSpin(target)
        let url = BASE_API + endpoint

        let headers = defaultHeaders
        headers["Authorization"] = "bearer " + window.localStorage.getItem("access_token")

        body = JSON.stringify(body)

        let response = fetch(url, {
            method: method,
            headers: headers,
            body: body
        })

        if (callback) {
            handleResponse(response, callback)
        }
    }
}


const handleResponse = (response, callback, target) => {
    response.then(r => {
        r.json().then(result => {
            if (r.status === 400) {
                throwError(result.errors.join("\n"))
            } else if (r.status === 200) {
                callback(result)
            }
        }).catch(() => {
            if (r.status === 200) {
                callback()
            } else if (r.status === 401) {
                logout()
            } else {
                throwError("Application error", callback)
            }
        })
        if (target) { removeSpin(target) }
    }).catch(() => {
        response.then(r => {
            if (r.status === 401) {
                logout()
            } else {
                throwError("Network fail", callback)
            }
            if (target) { removeSpin(target) }
        })
    })
}

const throwError = (error, callback) => {
    toast.error(error, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 10000
    })
    callback({ error })
}

const addSpin = (target) => {
    let element = getElement(target)
    if (!element) { return }
    let innerHtml = element.innerHTML
    innerHtml += SPINNER
    element.innerHTML = innerHtml
    element.setAttribute("me_disabled", true)
}

const removeSpin = (target) => {
    let element = getElement(target)
    if (!element) { return }
    let innerHtml = element.innerHTML
    innerHtml = innerHtml.replace(SPINNER, "")
    element.innerHTML = innerHtml
    element.setAttribute("me_disabled", false)
}

const getElement = (target) => {
    if (typeof target === "string") {
        return document.getElementById(target)
    } else if (typeof target === "object") {
        return target
    }
}

const isTargetSubmitting = (target) => getElement(target).hasAttribute("me_disabled") && getElement(target).getAttribute("me_disabled") === "true"

export function getBrowserName() {
    // Opera 8.0+
    let isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
    if (isOpera) return "Opera"
    // Firefox 1.0+
    let isFirefox = typeof InstallTrigger !== 'undefined'
    if (isFirefox) return "Firefox"
    // Safari 3.0+ "[object HTMLElementConstructor]"
    let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    if (isSafari) return "Safari"
    // Internet Explorer 6-11
    let isIE = /*@cc_on!@*/false || !!document.documentMode
    if (isIE) return "Internet Explorer"
    // Edge 20+
    let isEdge = !isIE && !!window.StyleMedia
    if (isEdge) return "Microsoft Edge"
    // Chrome 1+
    let isChrome = !!window.chrome && !!window.chrome.webstore
    if (isChrome) return "Google Chrome"

    return "Unknown"
}