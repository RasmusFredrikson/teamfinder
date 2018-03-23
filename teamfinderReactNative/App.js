import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import MyProfile from "./components/my-profile/my-profile";
import Discovery from "./components/discovery/discovery";
import {Image} from 'react-native';


export default TabNavigator(
    {
    Home: { screen: MyProfile },
    Settings: { screen: Discovery },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                    iconName = require("./img/home.png")
                } else if (routeName === 'Settings') {
                    // iconName = `ios-options${focused ? '' : '-outline'}`;
                    iconName = require("./img/myprofile.png")
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Image source={iconName} style={{width:25, height: 20}} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);
