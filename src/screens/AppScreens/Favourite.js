import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import {Typography} from '../../Components/Typography';

const Favourites = ({navigation}) => {
  return (
    <AppBaseComponent title={'Favorites'} renderChild={Content({navigation})} />
  );
};

const Content = ({navigation}) => {
  return (
    <View>
      <Typography type="h1">Favourites</Typography>
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({});
