import React, { Component } from 'react';
import {Button, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";
import {withNavigationFocus} from "react-navigation-is-focused-hoc";
import PropTypes from 'prop-types';


const MatchedPlayer = ({props, matchedPlayer}) => {
    if (!matchedPlayer) {
        return <View/>;
    }
    return (
        <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('SelectedMatch', {player: matchedPlayer})}>
            <View style={styles.matchedPlayer}>
                <Image style={styles.playerImage} source={matchedPlayer.image}/>
                <View style={styles.playerInfo}>
                    <Text style={styles.name} >{matchedPlayer.name}</Text>
                    <Text style={styles.text} >Rank {matchedPlayer.rank}</Text>
                    <Text style={styles.text} >{matchedPlayer.position}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

class Matches extends Component {
    state = {
        matchedPlayers: "",
    };

    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        isFocused: PropTypes.bool.isRequired,
    };

    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            AsyncStorage.getItem('matchedPlayers').then((value) => this.setState({matchedPlayers: JSON.parse(value)}));
        }
    }

    render() {
        if (!this.props.isFocused) {
            return null;
        }

        if(!this.state.matchedPlayers)
            return <View><Text>You have no matches so far :( </Text></View>

        return (
            <View style={styles.container}>
                <MatchedPlayer props={this.props} matchedPlayer={this.state.matchedPlayers[this.state.matchedPlayers.length - 1]}/>
                <MatchedPlayer props={this.props} matchedPlayer={this.state.matchedPlayers[this.state.matchedPlayers.length - 2]}/>
                <MatchedPlayer props={this.props} matchedPlayer={this.state.matchedPlayers[this.state.matchedPlayers.length - 3]}/>
                <MatchedPlayer props={this.props} matchedPlayer={this.state.matchedPlayers[this.state.matchedPlayers.length - 4]}/>
                <MatchedPlayer props={this.props} matchedPlayer={this.state.matchedPlayers[this.state.matchedPlayers.length - 5]}/>
                <MatchedPlayer props={this.props} matchedPlayer={this.state.matchedPlayers[this.state.matchedPlayers.length - 6]}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        marginTop: 10,
    },
    playerInfo: {
        paddingTop: 15,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
    },
    text: {
        width: 90,
        paddingLeft: 30,
        color: 'black',
        fontSize: 16,
    },
    name: {
        width: 90,
        paddingLeft: 30,
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
    },
    matchedPlayer: {
        marginTop: 35,
        paddingBottom: 15,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
    },
    playerImage: {
        maxHeight: 50,
        width: 90,
    }
});

export default withNavigationFocus(Matches)