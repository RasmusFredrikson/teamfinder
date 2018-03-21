import React, { Component } from 'react';
import {Button, Image, Picker, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import ImagePicker from "react-native-image-picker";
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";

export default class MyProfile extends Component {
    state = {
        selectedGame: "",
        selectedPosition: "",
        selectedRank: "",
        playerImage: require("../../img/annie.jpeg")
    };

    componentDidMount = () => {
        AsyncStorage.getItem('selectedGame').then((value) => this.setState({'selectedGame': value}));
        AsyncStorage.getItem('selectedPosition').then((value) => this.setState({'selectedPosition': value}));
        AsyncStorage.getItem('selectedRank').then((value) => this.setState({'selectedRank': value}));
    };

    saveSelection(value, type) {
        switch (type) {
            case "game":
                AsyncStorage.setItem('selectedGame', value);
                this.setState({selectedGame: value});
                break;
            case "position":
                AsyncStorage.setItem('selectedPosition', value);
                this.setState({selectedPosition: value});
                break;
            case "rank":
                AsyncStorage.setItem('selectedRank', value);
                this.setState({selectedRank: value});
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <View style={styles.parentView}>
                <TouchableHighlight onPress={() => this.setSelectedImage()}>
                    <Image source={this.state.playerImage} style={styles.playerImage}/>
                </TouchableHighlight>
                <Text style={styles.playerName}>Muffins1337</Text>
                <View style={styles.discoverySettings}>
                    <Text style={styles.discoverySettingsHeader}>Discovery settings</Text>
                    <Text htmlFor="game-select">Game</Text>
                    <View style={styles.pickerWrapper} >
                        <Picker style={styles.picker} selectedValue={this.state.selectedGame} onValueChange={(itemValue) => this.saveSelection(itemValue, "game")}>
                            <Picker.Item label="Select a game..." value=""/>
                            <Picker.Item label="League of Legends" value="lol"/>
                            <Picker.Item label="Counter Strike: Global Offensive" value="csgo"/>
                        </Picker>
                    </View>

                    <Text htmlFor="position-select">Position</Text>
                    <View style={styles.pickerWrapper} >
                        <Picker style={styles.picker} id="position-select" selectedValue={this.state.selectedPosition} onValueChange={(itemValue) => this.saveSelection(itemValue, "position")}>
                            <Picker.Item label="Select a position..." value=""/>
                            <Picker.Item label="Top" value="Top"/>
                            <Picker.Item label="Mid" value="Mid"/>
                            <Picker.Item label="Jungle" value="Jungle"/>
                            <Picker.Item label="AD-Carrier" value="AD-Carrier"/>
                            <Picker.Item label="Support" value="Support"/>
                        </Picker>
                    </View>

                    <Text style={styles.label} htmlFor="rank-select">Rank</Text>
                    <View style={styles.pickerWrapper} >
                        <Picker style={styles.picker} id="rank-select" selectedValue={this.state.selectedRank} onValueChange={(itemValue) => this.saveSelection(itemValue, "rank")}>
                            <Picker.Item label="Select a rank..." value=""/>
                            <Picker.Item label="I" value="I"/>
                            <Picker.Item label="II" value="II"/>
                            <Picker.Item label="III" value="III"/>
                            <Picker.Item label="IV" value="IV"/>
                            <Picker.Item label="V" value="V"/>
                        </Picker>
                    </View>
                </View>
            </View>
        )
    }

    setSelectedImage = () => {
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
                let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    playerImage: source
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
    playerImage: {
        width: 300,
        minHeight: 200,
        marginTop: 50,
        maxHeight: 300
    },
    playerName: {
        marginTop: 10,
        fontSize: 24,
    },
    pickerWrapper: {
        backgroundColor: '#DDDDDD',
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderStyle: 'solid',
        width: 250,
        marginBottom:20
    },
    picker: {
        height:40,
    },
    discoverySettings: {
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    discoverySettingsHeader: {
        fontWeight: 'bold',
        fontSize: 18,
    }
});

