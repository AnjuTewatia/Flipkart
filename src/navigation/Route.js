import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppContext} from '../Components/AppContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/AuthScreens/Splash';
import {getLocalLoginDetail} from '../utils/functions';

const Route = () => {
  const {userData} = useAppContext();
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setSplash(false);
    }, 1500);
  }, []);
  if (splash) return <Splash />;
  else
    return (
      <NavigationContainer>
        {userData ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
};

export default Route;

const styles = StyleSheet.create({});
