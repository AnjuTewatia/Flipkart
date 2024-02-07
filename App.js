import React from 'react';
import AppProvider from './src/Components/AppContext';

import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import {Text} from 'react-native';
import AppStack from './src/navigation/AppStack';
const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
