import React, { Component } from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";
import {withNavigationFocus} from "react-navigation-is-focused-hoc";
import PropTypes from 'prop-types';

class SelectedMatch extends Component {
    state = {
        player: this.props.navigation.state.params.player,
    };

    static propTypes = {
        isFocused: PropTypes.bool.isRequired,
    };

    static navigationOptions = {
        title: 'Matched Player',
        headerStyle: {
            backgroundColor: '#8B0000',
        },
        headerTitleStyle: {
            color: '#FFFFFF',
        },
        headerTintColor: '#FFFFFF'
    };

    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            AsyncStorage.getItem('matchedPlayers').then((value) => this.setState({matchedPlayers: JSON.parse(value)}));
        }
    }

    render() {
        return (
            <View style={styles.card}>
                <Image style={styles.playerImage} source={this.state.player.image}/>
                <View style={styles.playerContainer}>
                    <Text style={styles.playerName}>{this.state.player.name}, Rank {this.state.player.rank}</Text>
                    <Text style={styles.playerPosition}>Position: {this.state.player.position}</Text>
                    <Text style={styles.playerInfo}>{this.state.player.info}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: 'white',

    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    },
    playerImage: {
        width: 420,
        height: 300,
    },
    playerInfo: {
        paddingTop: 5,
        fontSize: 14,
        color: 'black',
    },
    playerName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
    },
    playerPosition: {
        fontSize: 18,
        color: 'black',
    },
    playerContainer: {
        padding: 20,
    }
});

export default withNavigationFocus(SelectedMatch)