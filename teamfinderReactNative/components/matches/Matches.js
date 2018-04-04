import React, { Component } from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
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
            AsyncStorage.getItem('matchedPlayers').then((value) => this.setState({matchedPlayers: JSON.parse(value).reverse()}));
        }
    }

    render() {
        if (!this.props.isFocused) {
            return null;
        }

        if(!this.state.matchedPlayers)
            return <View><Text>You have no matches so far :( </Text></View>;

        return (
            <ScrollView style={styles.container}>
                {
                    this.state.matchedPlayers.map((matchedPlayer, index) =>
                        <MatchedPlayer
                            matchedPlayer={matchedPlayer}
                            props={this.props}
                            key={index}
                        />
                    )
                }
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        backgroundColor: '#ffffff'
    },
    playerInfo: {
        paddingTop: 18,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
    },
    text: {
        width: 90,
        paddingLeft: 0,
        color: 'black',
        fontSize: 16,
    },
    name: {
        width: 100,
        paddingLeft: 30,
        paddingRight: 10,
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
    },
    matchedPlayer: {
        marginTop: 25,
        paddingBottom: 25,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
    },
    playerImage: {
        maxHeight: 60,
        width: 100,
    }
});

export default withNavigationFocus(Matches)