import React from 'react'
class NotFound extends React.Component {

    render() {
        return (
            <div>
                <h1>Not Found</h1>
                <a href="javascript:void(0)" onClick={() => this.props.history.push("/")}>Go to home page</a>
            </div>
        )
    }
}
export default NotFound