import React, { Component } from 'react';
import MyCards from "./components/myCards.js";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <MyCards />
                <div className="navbar" id="myNavbar">
                    <a href="#myprofile">My Profile</a>
                    <a href="#discovery">Discover</a>
                    <a href="#matches">Matches</a>
                </div>
            </div>
        );
    }
}

export default App;
