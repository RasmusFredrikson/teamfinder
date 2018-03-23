import React, {Component} from 'react'
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";


function getPlayers() {
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
        require("../..//img/amumu.jpeg"), require("../..//img/ashe.jpeg"), require("../..//img/darius.jpeg"), require("../..//img/jinx.jpeg"), require("../..//img/lux.jpeg"),
        require("../..//img/teemo.jpeg"), require("../..//img/volibear.jpeg"), require("../..//img/annie.jpeg"), require("../..//img/braum.jpeg"), require("../..//img/karthus.jpg"),
        require("../..//img/katarina.jpeg"), require("../..//img/poros.jpeg")
    ];

    let players = [];
    let selectPosition = null;
    let selectedRank = null;

    AsyncStorage.getItem('selectedPosition').then((value) => selectPosition = value);
    AsyncStorage.getItem('selectedRank').then((value) => selectedRank = value);

    for (let i = 0; i < 20; i++) {
        players[i] = {
            id: i,
            name: playerNames[randomizeIndex(playerNames.length)],
            position: selectPosition || playerPositions[randomizeIndex(playerPositions.length)],
            rank: selectedRank || playerRanks[randomizeIndex(playerRanks.length)],
            info: playerInfos[randomizeIndex(playerInfos.length)],
            image: playerImages[randomizeIndex(playerImages.length)]
        }
    }

    return players;
}

function randomizeIndex(listLength) {
    return Math.floor((Math.random() * listLength));
}

export default class Discovery extends Component {
    constructor (props) {
        super(props);
        this.state = {
            cards: getPlayers(),
            swipedAllCards: false,
            swipeDirection: '',
            isSwipingBack: false,
            cardIndex: 0
        }
    }

    renderCard = player => {
        return (
            <View style={styles.card} className="card-content">
                <Image alt={player.image} source={player.image}/>
                    <View className="player-info">
                        <Text>{player.name}, Rank {player.rank}</Text>
                        <Text>Position: {player.position}</Text>
                        <Text>{player.info}</Text>
                    </View>
            </View>
        )
    };

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        })
    };

    swipeBack = () => {
        if (!this.state.isSwipingBack) {
            this.setIsSwipingBack(true, () => {
                this.swiper.swipeBack(() => {
                    this.setIsSwipingBack(false)
                })
            })
        }
    };

    setIsSwipingBack = (isSwipingBack, cb) => {
        this.setState(
            {
                isSwipingBack: isSwipingBack
            },
            cb
        )
    };

    swipeLeft = () => {
        this.swiper.swipeLeft()
    };

    render () {
        return (
            <View style={styles.container}>
                <Swiper
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                    onSwiped={this.onSwiped}
                    onTapCard={this.swipeLeft}
                    cards={this.state.cards}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={80}
                    renderCard={this.renderCard}
                    onSwipedAll={this.onSwipedAllCards}
                    overlayLabels={{
                        bottom: {
                            title: 'BLEAH',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }
                        },
                        left: {
                            title: 'NOPE',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: -30
                                }
                            }
                        },
                        right: {
                            title: 'LIKE',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: 30
                                }
                            }
                        },
                        top: {
                            title: 'SUPER LIKE',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }
                        }
                    }}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                >
                    <Button onPress={this.swipeLeft} title='Swipe Left' />
                </Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    },
    done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent'
    }
});