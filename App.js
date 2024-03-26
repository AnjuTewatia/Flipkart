import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Provider from './src/navigation/Provider';

import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <Provider />
      </View>
    </>
  );
};

export default App;
