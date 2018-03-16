import React, { Component } from 'react';
import './matches.css';


const MatchedPlayer = ({matchedPlayer}) => {
    if (!matchedPlayer) {
        return <div></div>;
    }
    return (
        <div className="matchedPlayer">
            <img alt={matchedPlayer.image} src={`img/${matchedPlayer.image}`}/>
            <div className="playerInfo">
                <span className="playerName">{matchedPlayer.name}</span>
                <span>Rank {matchedPlayer.rank}</span>
                <span>{matchedPlayer.position}</span>
            </div>
        </div>
    )
};

export default class Matches extends Component {
    state = {
        matchedPlayers: JSON.parse(localStorage.getItem('matchedPlayers')) || "",
    };

    render() {
        return (
            <div>
                <MatchedPlayer matchedPlayer={this.state.matchedPlayers[this.state.matchedPlayers.length - 1]}/>
                <MatchedPlayer matchedPlayer={this.state.matchedPlayers[this.state.matchedPlayers.length - 2]}/>
                <MatchedPlayer matchedPlayer={this.state.matchedPlayers[this.state.matchedPlayers.length - 3]}/>
                <MatchedPlayer matchedPlayer={this.state.matchedPlayers[this.state.matchedPlayers.length - 4]}/>
                <MatchedPlayer matchedPlayer={this.state.matchedPlayers[this.state.matchedPlayers.length - 5]}/>
            </div>
        )
    }
}


