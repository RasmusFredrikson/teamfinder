import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MyCards from "./components/my-cards/myCards";
import MyProfile from "./components/my-profile/myProfile";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="navbar" id="myNavbar">
                        <Link to="/">My Profile</Link>
                        <Link to="/discovery">Discover</Link>
                        <Link to="/matches">Matches</Link>
                    </div>
                    <Route exact path="/" component={MyProfile} />
                    <Route path="/discovery" component={MyCards} />
                    {/*<Route path="/topics" component={Matches} />*/}
                </div>
            </Router>
        );
    }
}

export default App;
