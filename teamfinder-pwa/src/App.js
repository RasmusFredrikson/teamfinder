import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MyCards from "./components/my-cards/myCards";
import MyProfile from "./components/my-profile/myProfile";
import Matches from "./components/matches/matches";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="navbar" id="myNavbar">
                        <Link to="/"
                              id="my-profile-link"
                              onMouseEnter={() => this.switchColorOnFocusIn("my-profile")}>
                            <img alt="my-profile" id="my-profile" src={require("./img/my-profile-focus.png")}/>My Profile
                        </Link>
                        <Link to="/discovery"
                              id="discovery-link"
                              onMouseEnter={() => this.switchColorOnFocusIn("discovery")}>
                            <img alt="discovery" id="discovery" src={require("./img/discovery.png")}/>Discover
                        </Link>
                        <Link to="/matches"
                              id="matches-link"
                              onMouseEnter={() => this.switchColorOnFocusIn("matches")}>
                            <img alt="matches" id="matches" src={require("./img/matches.png")}/>Matches
                        </Link>
                    </div>
                    <Route exact path="/" component={MyProfile} />
                    <Route path="/discovery" component={MyCards} />
                    <Route path="/matches" component={Matches} />
                </div>
            </Router>
        );
    }

    switchColorOnFocusIn(element) {
        this.switchColorOnFocusOut("matches");
        this.switchColorOnFocusOut("discovery");
        this.switchColorOnFocusOut("my-profile");
        document.getElementById(element).setAttribute('src', require(`./img/${element}-focus.png`));
        document.getElementById(`${element}-link`).style.color = '#8B0000';
        document.getElementById(`${element}-link`).style.fontSize = '14px';
    }

    switchColorOnFocusOut(element) {
        document.getElementById(element).setAttribute('src', require(`./img/${element}.png`));
        document.getElementById(`${element}-link`).style.color = 'grey';
        document.getElementById(`${element}-link`).style.fontSize = '12px';

    }
}

export default App;
