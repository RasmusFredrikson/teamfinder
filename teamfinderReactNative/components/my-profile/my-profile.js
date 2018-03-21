import React, { Component } from 'react';
import {Button, Image, Picker, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import ImagePicker from "react-native-image-picker";

export default class MyProfile extends Component {
    state = {
        selectedGame: "",
        selectedPosition: "",
        selectedRank: "",
        avatarSource: require("../../img/annie.jpeg")
    };

    saveSelection(selectionBox) {
        console.log(this);
        this.setSelectedImage();
        console.log(this.state.avatarSource);

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
            <View style={styles.parentView}>
                {/*<input type="file" accept="image/*" id="selectImage" onChange={this.setSelectedImage}/>*/}
                <TouchableHighlight onPress={() => this.setSelectedImage()}>
                    <Image source={this.state.avatarSource} style={styles.outImage}/>
                </TouchableHighlight>
                {/*<Image style={styles.outImage} alt="Profile" source={require("../../img/annie.jpeg")} id="outImage"/>*/}
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

    setSelectedImage = () => {
        // More info on all the options is below in the README...just some common use cases shown here
        let options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {

            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can also display the image using data:
                let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });

            }
        });
    };
}

const styles = StyleSheet.create({
    parentView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    outImage: {
        width: 300,
        minHeight: 200,
        marginTop: 100,
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
        backgroundColor: '#AAAAAA',
        borderWidth: 5,
        borderColor: '#000000',
        borderStyle: 'solid'
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

