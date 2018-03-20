import React, { Component } from 'react';
import {Button, Image, Picker, StyleSheet, Text, View} from 'react-native';

export default class MyProfile extends Component {
    state = {
        selectedGame: "",
        selectedPosition: "",
        selectedRank: ""
    };

    saveSelection(selectionBox) {
        console.log(this);
        // switch (selectionBox) {
        //     case "game":
        //         localStorage.setItem('selectedGame', document.getElementById("game-select").value);
        //         this.setState({selectedGame: document.getElementById("game-select").value});
        //         break;
        //     case "position":
        //         localStorage.setItem('selectedPosition', document.getElementById("position-select").value);
        //         this.setState({selectedPosition: document.getElementById("position-select").value});
        //         break;
        //     case "rank":
        //         localStorage.setItem('selectedRank', document.getElementById("rank-select").value);
        //         this.setState({selectedRank: document.getElementById("rank-select").value});
        //         break;
        //     default:
        //         break;
        // }
    }

    render() {
        return (
            <View style={style.parentView}>
                {/*<input type="file" accept="image/*" id="selectImage" onChange={this.setSelectedImage}/>*/}
                <Image style={styles.outImage} alt="Profile" source={require("../../img/annie.jpeg")} id="outImage" onClick={this.clickSelectImage}/>
                <Text style={styles.label}>Muffins1337</Text>
                <View style={styles.selectSettings}>
                    <Text style={styles.label}>Discovery settings</Text>
                    <Text style={styles.label} htmlFor="game-select">Game</Text>
                    <Picker style={styles.select} id="game-select" value={this.state.selectedGame} onValueChange={(item) => this.saveSelection(item)}>
                        <Picker.Item label="Select a game..." value=""/>
                        <Picker.Item label="League of Legends" value="lol"/>
                        <Picker.Item label="Counter Strike: Global Offensive" value="csgo"/>
                    </Picker>
                </View>
                <View style={styles.selectSettings}>
                    <Text style={styles.label} htmlFor="position-select">Position</Text>
                    <Picker style={styles.select} id="position-select" value={this.state.selectedPosition} onValueChange={() => this.saveSelection("position")}>
                        <Picker.Item label="Select a position..." value=""/>
                        <Picker.Item label="Top" value="Top"/>
                        <Picker.Item label="Mid" value="Mid"/>
                        <Picker.Item label="Jungle" value="Jungle"/>
                        <Picker.Item label="AD-Carrier" value="AD-Carrier"/>
                        <Picker.Item label="Support" value="Support"/>
                    </Picker>
                </View>
                <View style={styles.selectSettings}>
                    <Text style={styles.label} htmlFor="rank-select">Rank</Text>
                    <Picker style={styles.select} id="rank-select" value={this.state.selectedRank} onValueChange={() => this.saveSelection("rank")}>
                        <Picker.Item label="Select a rank..." value=""/>
                        <Picker.Item label="I" value="I"/>
                        <Picker.Item label="II" value="II"/>
                        <Picker.Item label="III" value="III"/>
                        <Picker.Item label="IV" value="IV"/>
                        <Picker.Item label="V" value="V"/>
                    </Picker>
                </View>
            </View>
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


const styles = StyleSheet.create({
    parentView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    outImage: {
        marginTop: 100,
        maxWidth: 300,
        maxHeight: 300
    },
    selectImage: {
        display: 'none'
    },
    playerName: {
        marginTop: 10,
        fontSize: 24,
        color: '#AAAAAA'
    },
    label: {
        textAlign: 'left',
        display: 'flex'
    },
    select: {
        height: 30,
        width: 100,
        display: 'flex'
    },
    p: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 0,
    },
    selectSettings: {
        margin: 0,
        width: 250,
        paddingTop: 20,
    }
});

