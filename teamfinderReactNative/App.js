import React, {Component}  from 'react';
import {TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation';
import MyProfile from "./components/my-profile/My-profile";
import Discovery from "./components/discovery/Discovery";
import {Image} from 'react-native';
import Matches from "./components/matches/Matches";
import {updateFocus} from "react-navigation-is-focused-hoc";
import SelectedMatch from "./components/matches/SelectedMatch";

const MatchesStack = StackNavigator({
    Matches: { screen: Matches },
    SelectedMatch: { screen: SelectedMatch },
});

const TabNav = TabNavigator(
    {
        MyProfile: { screen: MyProfile },
        Discovery: { screen: Discovery},
        Matches: { screen: MatchesStack },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'MyProfile') {
                    if (focused)
                        iconName = require("./img/my-profile-focus.png");
                    else
                        iconName = require("./img/my-profile.png");
                } else if (routeName === 'Discovery') {
                    if (focused)
                        iconName = require("./img/discovery-focus.png");
                    else
                        iconName = require("./img/discovery.png");
                } else
                if (focused)
                    iconName = require("./img/matches-focus.png");
                else
                    iconName = require("./img/matches.png");

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Image source={iconName} style={{width:25, height: 22}} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#8B0000',
            inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        lazy: false,
    }
);

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TabNav
                onNavigationStateChange={(prevState, currentState) => {
                    updateFocus(currentState)
                }}
            />
        )
    }
}
