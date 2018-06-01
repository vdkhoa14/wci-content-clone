import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'

const userIsLogoutDefaults = {
    authenticatedSelector: state => window.localStorage.getItem("access_token") != null,
    wrapperDisplayName: 'UserIsLogout'
}
const userIsLoginDefaults = {
    authenticatedSelector: state => window.localStorage.getItem("access_token") == null,
    wrapperDisplayName: 'UserIsLogin'
}


export const userIsLogoutRedir = connectedRouterRedirect({
    ...userIsLogoutDefaults,
    redirectPath: '/login'
})

export const userIsLoginRedir = connectedRouterRedirect({
    ...userIsLoginDefaults,
    redirectPath: '/user'
})

const partnerIsLogoutDefaults = {
    authenticatedSelector: state => window.localStorage.getItem("partner_access_token") != null,
    wrapperDisplayName: 'PartnerIsLogout'
}
const partnerIsLoginDefaults = {
    authenticatedSelector: state => window.localStorage.getItem("partner_access_token") == null,
    wrapperDisplayName: 'PartnerIsLogin'
}

export const partnerIsLogoutRedir = connectedRouterRedirect({
    ...partnerIsLogoutDefaults,
    redirectPath: '/partner/login'
})

export const partnerIsLoginRedir = connectedRouterRedirect({
    ...partnerIsLoginDefaults,
    redirectPath: '/partner'
})

export const partnerLogout = () => {
    window.localStorage.removeItem("partner_access_token")
    window.history.go(0)
}

export const logout = () => {
    window.localStorage.removeItem("access_token");
    window.location.assign("/")
}

export const isAdmin = true