import React, {Component} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";
import {withNavigationFocus} from "react-navigation-is-focused-hoc";
import PropTypes from 'prop-types';
import * as Vibration from "react-native/Libraries/Vibration/Vibration";


class Discovery extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoading: true,
            players: this.getPlayers(),
            cardIndex: 0,
            matchedPlayers: [{}],
        }
    }

    static propTypes = {
        isFocused: PropTypes.bool.isRequired,
    };

    componentDidMount() {
        AsyncStorage.getItem('matchedPlayers').then((value) => this.setState({matchedPlayers: JSON.parse(value)}));
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            this.setState({isLoading: true, players: this.getPlayers()});
        }
    }

    renderCard = player => {
        return (
            <View style={styles.card}>
                <Image style={styles.playerImage} source={player.image}/>
                <View style={styles.playerContainer}>
                    <Text style={styles.playerName}>{player.name}, Rank {player.rank}</Text>
                    <Text style={styles.playerPosition}>Position: {player.position}</Text>
                    <Text style={styles.playerInfo}>{player.info}</Text>
                </View>
            </View>
        )
    };

    render() {
        if (!this.props.isFocused || this.state.isLoading) {
            return null;
        }

        return (
            <View style={styles.container}>
                <Swiper
                    onSwipedRight={this.matchPlayer}
                    cards={this.state.players}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={40}
                    cardHorizontalMargin={13}
                    verticalSwipe={true}
                    swipeAnimationDuration={200}
                    renderCard={this.renderCard}
                    backgroundColor={'#FFFFFF'}
                    stackSize={3}
                    stackSeparation={1}
                    stackScale={0.5}
                    overlayLabels={{
                        left: {
                            title: 'NOPE',
                            style: {
                                label: {
                                    backgroundColor: 'transparent',
                                    color: '#e50000',
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: -30,
                                    elevation: 6,
                                }
                            }
                        },
                        right: {
                            title: 'LIKE',
                            style: {
                                label: {
                                    backgroundColor: 'transparent',
                                    color: '#00b200',
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: 30,
                                    elevation: 6,
                                }
                            }
                        }
                    }}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                >
                </Swiper>
            </View>
        )
    }

    getPlayers() {
        AsyncStorage.multiGet(['selectedPosition','selectedRank']).then((values) => {
            this.populatePlayers(values[0][1],values[1][1]);
        }).catch(() => {
            this.populatePlayers();
        });
    }

    populatePlayers(preferredPlayerPosition, preferredPlayerRank) {
        let players = [];
        let playerNames = ["Snow", "Danette", "Ninja", "Nader", "Bomber", "Gunner", "FighTer", "MeD1c", "Pwner", "Muffins"];
        let playerRanks = ["I", "II", "III", "IV", "V"];
        let playerPositions = ["Top", "Jungle", "Mid", "AD-Carrier", "Support"];
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
            require("../../img/aatrox.jpeg"), require("../../img/ahri.jpg"), require("../../img/akali.jpg"), require("../../img/alistar.jpg"),
            require("../../img/amumu.jpeg"), require("../../img/anivia.jpg"), require("../../img/annie.jpeg"), require("../../img/ashe.jpeg"),
            require("../../img/azir.jpg"), require("../../img/bard.jpg"), require("../../img/blitzcrank.jpg"), require("../../img/brand.jpg"),
            require("../../img/braum.jpeg"), require("../../img/caitlyn.jpg"), require("../../img/camille.jpg"), require("../../img/cassiopeia.jpg"),
            require("../../img/chogath.jpg"), require("../../img/corki.jpg"), require("../../img/darius.jpeg"), require("../../img/diana.jpg"),
            require("../../img/draven.jpg"), require("../../img/drmundo.jpg"), require("../../img/elise.jpg"), require("../../img/evelynn.jpg"),
            require("../../img/ezreal.jpg"), require("../../img/fiddlesticks.jpg"), require("../../img/jinx.jpeg"), require("../../img/karthus.jpg"),
            require("../../img/katarina.jpeg"), require("../../img/lux.jpeg"), require("../../img/poros.jpeg"), require("../../img/teemo.jpeg"),
            require("../../img/volibear.jpeg")

        ];

        for (let i = 0; i < 20; i++) {
            players[i] = {
                id: i,
                name: playerNames[this.randomizeIndex(playerNames.length)],
                position: preferredPlayerPosition || playerPositions[this.randomizeIndex(playerPositions.length)],
                rank: preferredPlayerRank || playerRanks[this.randomizeIndex(playerRanks.length)],
                info: playerInfos[this.randomizeIndex(playerInfos.length)],
                image: playerImages[this.randomizeIndex(playerImages.length)]
            }
        }
        this.setState({players: players, isLoading: false})
    }

    randomizeIndex(listLength) {
        return Math.floor((Math.random() * listLength));
    }

    matchPlayer = cardIndex => {
        if (this.randomizeIndex(10) > 5) {
            Vibration.vibrate(300);
            if (!this.state.matchedPlayers)
                this.setState({matchedPlayers: [this.state.players[cardIndex]]});
            else
                this.setState(prevState => ({matchedPlayers: [...prevState.matchedPlayers, prevState.players[cardIndex]]}));
            AsyncStorage.setItem("matchedPlayers", JSON.stringify(this.state.matchedPlayers));
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        marginTop: 0,
        marginBottom: 80,
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#AAAAAA',
        borderRadius: 25,
        backgroundColor: 'white',
        elevation: 5

    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    },
    playerImage: {
        width: 385,
        height: 300,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
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

export default withNavigationFocus(Discovery)