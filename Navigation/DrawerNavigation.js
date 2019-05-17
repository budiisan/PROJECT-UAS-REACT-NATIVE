import React from 'react';
import { Dimensions,Platform } from 'react-native';
import { createAppContainer, createDrawerNavigator, createBottomTabNavigator,createStackNavigator   } from "react-navigation";
import Ionicons from '@expo/vector-icons/Ionicons';
import CameraScreen from '../screens/CameraScreen'
import firebase from "firebase";

import HomeScreen from '../components/HomeScreen';

import SettingScreen from '../screens/SettingScreen';

import MenuDrawer from '../Components_2/MenuDrawer';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OtherScreen from '../components/OtherScreen';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth:WIDTH*0.75 ,
    contentComponent:({navigation}) =>{
        return (<MenuDrawer navigation={navigation} />)
    }
}

const Tabs = createBottomTabNavigator({
    Home: HomeScreen,
    Profile: ProfileScreen,
	SQLite: SettingScreen,
   
}, {
    tabBarOptions: {
        activeTintColor: '#000',
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: '#fff',
        },
        indicatorStyle: {
            backgroundColor: '#000',
        },
    }
});

const DrawerNavigator = createDrawerNavigator(
    {
        Home:{
            screen: Tabs
        },
        // Profile: {
        //     screen: ProfileScreen
        // },
        // Setting: {
        //     screen: SettingScreen
		// },
		// Camera: {
        //     screen: CameraScreen
        // },
        Other: {
            screen: OtherScreen
        },
        Map: {
            screen: MapScreen
        },
        
    },
    DrawerConfig
);

const StackNavigator = createStackNavigator({
    DrawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: {
            header: null,
        }
    }
});
export default createAppContainer(StackNavigator);