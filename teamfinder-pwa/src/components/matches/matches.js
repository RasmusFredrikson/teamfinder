import React, { Component } from 'react';
import './matches.css';


const MatchedPlayer = ({matchedPlayer, onClick}) => {
    if (!matchedPlayer) {
        return null;
    }

    return (
        <div className="matchedPlayer" onClick={() => onClick(matchedPlayer)}>
            <img alt={matchedPlayer.image} src={`img/${matchedPlayer.image}`}/>
            <div className="playerInfo">
                <div className="playerName">{matchedPlayer.name}</div>
                <div>Rank {matchedPlayer.rank}</div>
                <div>{matchedPlayer.position}</div>
            </div>
        </div>
    )
};

export default class Matches extends Component {
    state = {
        matchedPlayers: JSON.parse(localStorage.getItem('matchedPlayers')).reverse() || "",
        playerDetails: null,
    };

    render() {
        if (!this.state.matchedPlayers)
            return null;
        return (
            !this.state.playerDetails ?
                <div>
                    <div>
                        {
                            this.state.matchedPlayers.map((matchedPlayer, index) =>
                                <MatchedPlayer
                                    matchedPlayer={matchedPlayer}
                                    onClick={(matchedPlayer) => this.setState({playerDetails: matchedPlayer})}
                                    key={index}
                                />
                            )
                        }
                    </div>
                    <div className="placeHolder">&nbsp</div>
                </div>
                :
                <div>
                    <div className="header">
                        <img src="img/back-arrow.png" onClick={() => this.setState({playerDetails: null})}/>
                        <div className="headerText">Matched Player</div>
                    </div>
                    <div className="player-details">
                        <img alt={this.state.playerDetails.image} src={`img/${this.state.playerDetails.image}`}/>
                        <div className="player-info">
                            <h1>{this.state.playerDetails.name}, Rank {this.state.playerDetails.rank}</h1>
                            <h2>Position: {this.state.playerDetails.position}</h2>
                            <p>{this.state.playerDetails.info}</p>
                        </div>
                    </div>
                </div>
        )
    }
}


