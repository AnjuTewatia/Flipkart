import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppContext} from '../Components/AppContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {NavigationContainer} from '@react-navigation/native';

const Route = () => {
  const {userData} = useAppContext();
  return (
    <NavigationContainer>
      {userData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Route;

const styles = StyleSheet.create({});
