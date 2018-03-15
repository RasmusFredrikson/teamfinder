import React, { Component } from 'react';
import Cards, { Card } from 'react-swipe-card'
import './myCards.css';



const Wrapper = ({data: players, onSwipeLeft, onSwipeRight}) => {

    return (
        <Cards className='master-root'>
            {players.map(player => {
                return (
                    <Card
                        key={player.id}
                        onSwipeLeft={() => onSwipeLeft(player.name)}
                        onSwipeRight={() => onSwipeRight(player.name)}>
                        <div className="card-content">
                            <img alt={player.image} src={`img/${player.image}`}/>
                            <div className="player-info">
                                <h1>{player.name}, Rank {player.rank}</h1>
                                <h2>Position: {player.position}</h2>
                                <p>{player.info}</p>
                            </div>
                        </div>
                    </Card>
                )}
            )}
        </Cards>
    )
};

function getPlayers() {
    let playerNames = ["Snow", "Danette", "Ninja", "Nader", "Bomber", "Gunner", "FighTer", "MeD1c", "Pwner", "Muffins"];
    let playerRanks = ["I", "II", "III", "IV", "V"];
    let playerPositions = ["Top", "Bottom", "Mid", "AD-Carrier", "Support"];
    let playerInfos = [
        "My name is David and I love playing, always play for hours.",
        "Hello, I love playing computer games, right now I'm looking for a team.",
        "Wow, games are soooooooooooooo amazing, plx add.",
        "Hi there, do you wanna play?",
        "<3<3<3<3<3<3<3",
        "IM THE BEST PLAYER IN EXISTENT ALL GAMES ARE THE BEZZZT",
        "I just started playing games and don't really like it that much..."
    ];
    let playerImages = [
        "amumu.jpeg", "ashe.jpeg", "darius.jpeg", "jinx.jpeg", "lux.jpeg",
        "teemo.jpeg", "volibear.jpeg", "annie.jpeg", "braum.jpeg", "karthus.jpg",
        "katarina.jpeg", "poros.jpeg"
    ];

    let players = [];


    for (let i = 0; i < 20; i++) {
        players[i] = {
            id: i,
            name: playerNames[randomizeIndex(playerNames.length)],
            position: localStorage.getItem('selectedPosition') || playerPositions[randomizeIndex(playerPositions.length)],
            rank: localStorage.getItem('selectedRank') || playerRanks[randomizeIndex(playerRanks.length)],
            info: playerInfos[randomizeIndex(playerInfos.length)],
            image: playerImages[randomizeIndex(playerImages.length)]
        }
    }

    return players;
}

function randomizeIndex(listLength) {
    return Math.floor((Math.random() * listLength));
}

export default class MyCards extends Component {
    state = {
        players: getPlayers(),
        matched: [],
        turn: 0
    };
    onSwipeLeft = () => {
        this.state.turn++;
    };
    onSwipeRight = () => {
        if (randomizeIndex(10) > 6) {
            this.setState(prevState => ({matched: [...prevState.matched, prevState.players[this.state.turn]]}));
            localStorage.setItem("matchedPlayers", JSON.stringify(this.state.matched));
            console.log(JSON.parse(localStorage.getItem('matchedPlayers')));
        }
        this.state.turn++;
    };
    render() {
        return (
            <div>
                <Wrapper
                    onSwipeLeft={this.onSwipeLeft}
                    onSwipeRight={this.onSwipeRight}
                    data={this.state.players}
                />
            </div>
        )
    }
}
