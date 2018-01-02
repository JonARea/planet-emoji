import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation';
import Home from './components/Home';
import Game from './components/Game';

const RootNavigator = StackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home'
    }
  },
  Game: {
    screen: Game,
    navigationOptions: {
      headerTitle: 'Game'
    }
  }
})

export default RootNavigator
