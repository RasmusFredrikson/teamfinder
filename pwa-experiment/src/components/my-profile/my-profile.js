import React, { Component } from 'react'
import {Link, locationShape as action} from 'react-router';
import Cards, { Card } from 'react-swipe-card'
import PropTypes from 'prop-types';
import '../../App.css';


const data = ['Alexandre', 'Thomas', 'Lucien'];

const Wrapper = () => {
    return (
        <Cards onEnd={action('end')} className='master-root'>
            {data.map(item =>
                <Card
                    onSwipeLeft={action('swipe left')}
                    onSwipeRight={action('swipe right')}>
                    <h2>{item}</h2>
                </Card>
            )}
        </Cards>
    )
};


class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            logo: this.props.logo,
        };

    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={this.state.logo} className="App-logo" alt="logo" />
                    <h2>{this.state.title}</h2>
                </div>
                <p className="App-intro">
                    This is the {this.state.title} page.
                </p>
                <p>
                    <Link to="/">Home</Link>
                </p>
                <p>
                    <Link to="/about">About</Link>
                </p>
                <p>
                    <Link to="/settings">Settings</Link>
                </p>

                <Wrapper/>
            </div>
        )
    }
}

export default MyProfile
