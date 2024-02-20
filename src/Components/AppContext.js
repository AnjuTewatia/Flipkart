import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);
const AppProvider = ({children}) => {
  const {width, height} = Dimensions.get('window');
  const [windowWidth] = useState(width);
  const [windowHeight] = useState(height);
  const [userData, setUserData] = useState(null);

  const setUser = async () => {
    setUserData('100');
    AsyncStorage.setItem('userData', '100');
  };

  const removeUser = async () => {
    setUserData(null);
    AsyncStorage.removeItem('userData');
  };
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        // We have data!!
        setUserData(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <AppContext.Provider
      value={{
        windowWidth,
        windowHeight,
        userData,
        setUserData,
        setUser,
        removeUser,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
