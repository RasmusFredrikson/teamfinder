import React, {Component} from 'react'
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";
import {withNavigationFocus} from "react-navigation-is-focused-hoc";
import PropTypes from 'prop-types'


function randomizeIndex(listLength) {
    return Math.floor((Math.random() * listLength));
}

class Discovery extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoading: true,
            players: this.getPlayers(),
            swipedAllCards: false,
            swipeDirection: '',
            isSwipingBack: false,
            cardIndex: 0,
            selectedPosition: null,
            selectedRank: null,
            matchedPlayers: [{name:"test"}],
        }
    }

    static propTypes = {
        isFocused: PropTypes.bool.isRequired,
    };

    componentDidMount() {
        console.log("Mounting");
        AsyncStorage.getItem('matchedPlayers').then((value) => this.setState({matchedPlayers: JSON.parse(value)}));
    }

    renderCard = player => {
        return (
            <View style={styles.card} className="card-content">
                <Image style={styles.playerImage} source={player.image}/>
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

    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            this.setState({isLoading: true, players: this.getPlayers()});
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            // screen exit
        }
    }

    // shouldComponentUpdate(nextProps) {
    //     // Update only once after the screen disappears
    //     if (this.props.isFocused && !nextProps.isFocused) {
    //         console.log("Update only once after the screen disappears")
    //         return true
    //     }
    //
    //     // Don't update if the screen is not focused
    //     if (!this.props.isFocused && !nextProps.isFocused) {
    //         console.log("Don't update if the screen is not focused")
    //         return false
    //     }
    //
    //     // Update the screen if its re-enter
    //     console.log("Update the screen if its re-enter")
    //     return !this.props.isFocused && nextProps.isFocused
    // }

    render() {
        if (!this.props.isFocused) {
            return null
        }
        if(this.state.isLoading) {
            return <View><Text>Loading...</Text></View>;
        }
        return (
            <View style={styles.container}>
                <Swiper
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                    onSwiped={this.onSwiped}
                    onSwipedRight={this.matchPlayer}
                    cards={this.state.players}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={80}
                    verticalSwipe={false}
                    swipeAnimationDuration={200}
                    renderCard={this.renderCard}
                    onSwipedAll={this.onSwipedAllCards}
                    backgroundColor={'#FFFFFF'}
                    overlayLabels={{
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
            require("../../img/amumu.jpeg"), require("../../img/ashe.jpeg"), require("../../img/darius.jpeg"), require("../../img/jinx.jpeg"), require("../../img/lux.jpeg"),
            require("../../img/teemo.jpeg"), require("../../img/volibear.jpeg"), require("../../img/annie.jpeg"), require("../../img/braum.jpeg"), require("../../img/karthus.jpg"),
            require("../../img/katarina.jpeg"), require("../../img/poros.jpeg")
        ];

        let players = [];
        let selectedPosition, selectedRank;
        console.log("hej");
        AsyncStorage.getItem('selectedPosition').then((value) => {
            selectedPosition = value;
        }).then(() => AsyncStorage.getItem('selectedRank').then((value) => selectedRank = value)).then(() => {
                for (let i = 0; i < 20; i++) {
                    players[i] = {
                        id: i,
                        name: playerNames[randomizeIndex(playerNames.length)],
                        position: selectedPosition || playerPositions[randomizeIndex(playerPositions.length)],
                        rank: selectedRank || playerRanks[randomizeIndex(playerRanks.length)],
                        info: playerInfos[randomizeIndex(playerInfos.length)],
                        image: playerImages[randomizeIndex(playerImages.length)]
                    }
                }
                this.setState({players: players})
            }
        ).then(() => { console.log(this.state.isLoading); this.setState({isLoading: false})});
    }

    matchPlayer = cardIndex => {
        this.setState(prevState => ({matchedPlayers: [...prevState.matchedPlayers, prevState.players[cardIndex]]}));
        AsyncStorage.setItem("matchedPlayers", JSON.stringify(this.state.matchedPlayers));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF0000'
    },
    card: {
        flex: 1,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#AAAAAA',
        backgroundColor: 'white',
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
    },
    playerImage: {
        width: 368,
        height: 300,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    }
});

export default withNavigationFocus(Discovery)