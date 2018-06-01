export function jsonFromUrlParams(search) {
    if (!search)
        return {}

    search = search.replace('?', '')
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}