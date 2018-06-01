import React from 'react'
class About extends React.Component {

    render() {
        return (
            <div>
                <h1>About</h1>
                <a href="javascript:void(0)" onClick={() => this.props.history.push("/")}>Back home</a>
            </div>
        )
    }
}
export default About