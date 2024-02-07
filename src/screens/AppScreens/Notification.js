import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import {Typography} from '../../Components/Typography';

const Notification = ({navigation}) => {
  return (
    <AppBaseComponent
      title={'Notifications'}
      renderChild={Content({navigation})}
    />
  );
};

const Content = ({navigation}) => {
  return (
    <View>
      <Typography type="h1">Notification</Typography>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
