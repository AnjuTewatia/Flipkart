import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import {Typography} from '../../Components/Typography';

const Profile = ({navigation}) => {
  return (
    <AppBaseComponent title={'Profile'} renderChild={Content({navigation})} />
  );
};

const Content = ({navigation}) => {
  return (
    <View>
      <Typography type="h1">Profile</Typography>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
