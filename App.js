import React from 'react';
import {View} from 'react-native';
import Provider from './src/navigation/Provider';
const App = () => {
  return (
    <>
      <View style={{flex: 1}}>
        <Provider />
      </View>
    </>
  );
};

export default App;
