import React, { Component } from 'react';
import './myProfile.css';

export default class MyProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedImage: localStorage.getItem('selectedImage') || "img/annie.jpeg",
            selectedGame: localStorage.getItem('selectedGame') || "",
            selectedPosition: localStorage.getItem('selectedPosition') || "",
            selectedRank: localStorage.getItem('selectedRank') || "",
            nickName: localStorage.getItem('nickName') || "Muffins1337",
            editing: false
        };

        this.setSelectedImage = this.setSelectedImage.bind(this);
    }


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
                <img alt="Profile" src={this.state.selectedImage} id="outImage" onClick={this.clickSelectImage}/>
                {!this.state.editing ?
                    <div className={"nickNameContainer"}>
                        <div className="player-name">{this.state.nickName}</div>
                        <img src={"img/edit.png"} className={"editNickNameIcon"} onClick={() => this.editNickName()}/>
                    </div>
                    :
                    <div className={"nickNameContainer"}>
                        <span id="saveNickName" contentEditable="true" maxLength={13} className={"player-name"} onChange={(event) => this.setState({ nickName: event.target.value })}>{this.state.nickName}</span>
                        <img src={"img/checkmark.png"} className={"saveNickNameIcon"} onClick={() => this.saveNickName()}/>
                    </div>
                }
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

    editNickName = () => {
        this.setState({editing: true});
    };

    saveNickName = () => {
        let value = document.getElementById("saveNickName").innerHTML.replace("&nbsp;", "");
        this.setState({editing: false, nickName: value});
        localStorage.setItem('nickName', value);
    };

    setSelectedImage = () => {
        let files = document.getElementById("selectImage").files[0];

        if (files) {
            let fr = new FileReader();
            fr.onload = () => {
                this.setState({selectedImage: fr.result});
                localStorage.setItem('selectedImage', fr.result);
                document.getElementById("outImage").src = fr.result;
            };
            fr.readAsDataURL(document.getElementById("selectImage").files[0]);
        }
    };
}


