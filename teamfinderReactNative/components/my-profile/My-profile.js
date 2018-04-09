import React, { Component } from 'react';
import {Button, Image, Picker, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import ImagePicker from "react-native-image-picker";
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";

export default class MyProfile extends Component {
    state = {
        selectedGame: "",
        selectedPosition: "",
        selectedRank: "",
        playerImage: require("../../img/annie.jpeg"),
        editing: false,
        nickName: "Muffins1337"
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
                <TouchableHighlight underlayColor={'#FFFFFF'} onPress={() => this.setSelectedImage()}>
                    <Image source={this.state.playerImage} style={styles.playerImage}/>
                </TouchableHighlight>
                {!this.state.editing ?
                    <View style={styles.nickNameContainer}>
                        <Text style = {styles.nickName}>{this.state.nickName}</Text>
                        <TouchableHighlight underlayColor={'#FFFFFF'} onPress={() => this.editNickName()}>
                            <Image source={require("../../img/edit.png")} style={styles.editNickNameIcon}/>
                        </TouchableHighlight>
                    </View>
                    :
                    <View style={styles.nickNameContainer}>
                        <TextInput maxLength={13} style={styles.editNickName} onChangeText={(value) => this.setState({ nickName: value })}>{this.state.nickName}</TextInput>
                        <TouchableHighlight underlayColor={'#FFFFFF'} onPress={() => this.saveNickName()}>
                            <Image source={require("../../img/checkmark.png")} style={styles.saveNickNameIcon}/>
                        </TouchableHighlight>
                    </View>
                }
                <View style={styles.discoverySettings}>
                    <Text style={styles.discoverySettingsHeader}>Discovery settings</Text>
                    <Text>Game</Text>
                    <View style={styles.pickerWrapper} >
                        <Picker style={styles.picker} selectedValue={this.state.selectedGame} onValueChange={(itemValue) => this.saveSelection(itemValue, "game")}>
                            <Picker.Item label="Select a game..." value=""/>
                            <Picker.Item label="League of Legends" value="lol"/>
                            <Picker.Item label="Counter Strike: Global Offensive" value="csgo"/>
                        </Picker>
                    </View>

                    <Text>Position</Text>
                    <View style={styles.pickerWrapper} >
                        <Picker style={styles.picker} selectedValue={this.state.selectedPosition} onValueChange={(itemValue) => this.saveSelection(itemValue, "position")}>
                            <Picker.Item label="Select a position..." value=""/>
                            <Picker.Item label="Top" value="Top"/>
                            <Picker.Item label="Mid" value="Mid"/>
                            <Picker.Item label="Jungle" value="Jungle"/>
                            <Picker.Item label="AD-Carrier" value="AD-Carrier"/>
                            <Picker.Item label="Support" value="Support"/>
                        </Picker>
                    </View>

                    <Text style={styles.label}>Rank</Text>
                    <View style={styles.pickerWrapper} >
                        <Picker style={styles.picker} selectedValue={this.state.selectedRank} onValueChange={(itemValue) => this.saveSelection(itemValue, "rank")}>
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

    editNickName = () => {
        this.setState({editing: true});
    };

    saveNickName = () => {
        this.setState({editing: false});
        AsyncStorage.setItem('nickName', this.state.nickName);
    };

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
        minHeight: 150,
        marginTop: 80,
        maxHeight: 300
    },
    nickNameContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
    },
    nickName: {
        marginTop: 20,
        fontSize: 24,
        color: '#000',
        marginBottom: 10,
    },
    editNickName: {
        marginTop: 10,
        fontSize: 24,
    },
    editNickNameIcon: {
        marginTop: 28,
        marginLeft: 10,
        height: 18,
        width: 20,
        resizeMode: 'contain',
    },
    saveNickNameIcon: {
        marginTop: 22,
        marginLeft: 5,
        height: 25,
        maxWidth: 25,
        resizeMode: 'contain',
    },
    pickerWrapper: {
        backgroundColor: '#DDDDDD',
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderStyle: 'solid',
        width: 300,
        marginBottom:20
    },
    picker: {
        height:35,
    },
    discoverySettings: {
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    discoverySettingsHeader: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000',
        marginTop: 10,
        marginBottom: 5,
    }
});

