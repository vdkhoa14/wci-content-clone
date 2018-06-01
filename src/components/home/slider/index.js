import React from 'react'
import { connect } from 'react-redux'
import Slider from 'react-animated-slider';
import { NavLink } from 'react-router-dom'
import { get } from '../../../utils/networking'
import { BASE_API } from '../../../constants/appSettings'
import 'react-animated-slider/build/horizontal.css';
import './slider-animations.css';
import './style.css'
class TopSlider extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            content: null
        }
    }

    componentDidMount() {
        get("api/components/get/top-slider", result => {
            let sliders = []
            result.map((item, i) => {
                let temp = {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    button: item.children[0],
                    image: item.photo,
                    url: item.url,
                    descriptions: []
                }
                if (temp.description.indexOf("[") == 0) {
                    temp.descriptions = JSON.parse(temp.description);
                }

                sliders.push(temp);
            })

            this.setState({
                content: sliders
            })

        })
    }

    render() {

        let {
            content
        } = this.state
        return (
            <div className="top_slider">
                {
                    (content && content.length > 0) ? <Slider className="slider-wrapper"
                        autoplay={2000}
                        infinite={true}
                        touchDisabled={true}
                    >
                        {content.map((item, index) => (
                            <div
                                key={index}
                                className="slider-content"
                                style={{ background: `url('${BASE_API + item.image}') no-repeat center center` }}
                            >
                                <div className="blank component slider" id={item.id}>
                                    <div className="inner">
                                        <h4>{item.title}</h4>
                                        {
                                            (item.descriptions) && item.descriptions.map((item, i) => <p key={i}>
                                                {item}
                                            </p>)
                                        }
                                        {/* <span className="s component" id={item.button.id}><NavLink to={item.button.url}><button >{item.button.title}</button></NavLink></span> */}
                                    </div>

                                </div>
                            </div>
                        ))}
                    </Slider> : ""
                }
            </div>
        )
    }
}
export default connect(
    state => ({
    }),
    dispatch => ({
    })
)(TopSlider)