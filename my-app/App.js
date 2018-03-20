import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Discovery from "./components/discovery/discovery";
import MyProfile from "./components/my-profile/my-profile"; // Version can be specified in package.json

export default TabNavigator(
    {
        Settings: { screen: MyProfile },
        Home: { screen: Discovery },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Settings') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
        animationEnabled: false,
        swipeEnabled: false,
    }
);