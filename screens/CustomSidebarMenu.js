import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import StoryCard from './StoryCard';

import AppLoading from 'expo-app-loading';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';

export default class CustomSidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightTheme: true,
    };
  }
  componentDidMount() {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({
      lightTheme: theme === 'light' ? true : false,
    });
  }
  render() {
    let props = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Image source={require('../assets/logo.png')} style = {styles.sideMenuProfileIcon} />
        <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}/>
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
    alignSelf: 'center',
    marginTop: RFValue(60),
    resizeMode: 'contain',
  },
});
