import React, { Component } from 'react';
import './myProfile.css';

export default class MyProfile extends Component {
    state = {
        selectedGame: localStorage.getItem('selectedGame') || "",
        selectedPosition: localStorage.getItem('selectedPosition') || "",
        selectedRank: localStorage.getItem('selectedRank') || ""
    };

    saveSelection(selectionBox) {
        switch (selectionBox) {
            case "game":
                localStorage.setItem('selectedGame', document.getElementById("game-select").value);
                this.setState({selectedGame: document.getElementById("game-select").value});
                break;
            case "position":
                localStorage.setItem('selectedPosition', document.getElementById("position-select").value);
                this.setState({selectedPosition: document.getElementById("position-select").value});
                break;
            case "rank":
                localStorage.setItem('selectedRank', document.getElementById("rank-select").value);
                this.setState({selectedRank: document.getElementById("rank-select").value});
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <input type="file" accept="image/*" id="selectImage" onChange={this.setSelectedImage}/>
                <img alt="Profile" src="img/annie.jpeg" id="outImage" onClick={this.clickSelectImage}/>
                <div className="player-name">Muffins1337</div>
                <div className="discovery-settings">
                    <div className="select-settings">
                        <p>Discovery settings</p>
                        <label htmlFor="game-select">Game</label>
                        <select id="game-select" value={this.state.selectedGame} onChange={(item) => this.saveSelection(item)}>
                            <option value="">Select a game...</option>
                            <option value="lol">League of Legends</option>
                            <option value="csgo">Counter Strike: Global Offensive</option>
                        </select>
                    </div>
                    <div className="select-settings">
                        <label htmlFor="position-select">Position</label>
                        <select id="position-select" value={this.state.selectedPosition} onChange={() => this.saveSelection("position")}>
                            <option value="">Select a position...</option>
                            <option value="Top">Top</option>
                            <option value="Mid">Mid</option>
                            <option value="Jungle">Jungle</option>
                            <option value="AD-Carrier">AD-Carrier</option>
                            <option value="Support">Support</option>
                        </select>
                    </div>
                    <div className="select-settings">
                        <label htmlFor="rank-select">Rank</label>
                        <select id="rank-select" value={this.state.selectedRank} onChange={() => this.saveSelection("rank")}>
                            <option value="">Select a rank...</option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                            <option value="V">V</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }

    clickSelectImage = () => {
        document.getElementById("selectImage").click();
    };

    setSelectedImage = () => {
        let files = document.getElementById("selectImage").files[0];

        if (files) {
            let fr = new FileReader();
            fr.onload = function () {
                console.log("hej");
                document.getElementById("outImage").src = fr.result;
            };
            fr.readAsDataURL(document.getElementById("selectImage").files[0]);
        }
    };
}


