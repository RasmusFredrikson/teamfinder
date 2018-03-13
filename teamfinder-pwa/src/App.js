import React, { Component } from 'react';
import MyCards from "./components/my-cards/myCards";
import MyProfile from "./components/my-profile/myProfile";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                {/*<MyCards />*/}
                <MyProfile />
                {/*<Matches />*/}
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
