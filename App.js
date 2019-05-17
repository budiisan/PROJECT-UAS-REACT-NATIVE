import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "firebase";
import AuthLoadingScreen from "./components/AuthLoadingScreen";
import SignInScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import OtherScreen from "./components/OtherScreen";
import DrawerNavigation from './Navigation/DrawerNavigation';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator({ Home: DrawerNavigation, Other: OtherScreen }, { headerMode: 'none' });
const AuthStack = createStackNavigator({ SignIn: SignInScreen }, { headerMode: 'none' });
const LainStack = createStackNavigator({ HomeDrawer: DrawerNavigation });
const AppContaner =  createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Lain: LainStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default class App extends React.Component {
//sesuaikan dengan project firebase masing-masing
  componentWillMount() {
      firebase.initializeApp({
        apiKey: "AIzaSyA19LZAqAygNqjpxvpPWN3a4d6oZLEULis",
    authDomain: "sapient-origin-221705.firebaseapp.com",
    databaseURL: "https://sapient-origin-221705.firebaseio.com",
    projectId: "sapient-origin-221705",
    storageBucket: "sapient-origin-221705.appspot.com",
    messagingSenderId: "880050992516"

      });
      
  }
  
  render() {
    return (
      <AppContaner />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
