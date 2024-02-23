import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {getDeviceId} from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);
const AppProvider = ({children}) => {
  const {width, height} = Dimensions.get('window');
  const [windowWidth] = useState(width);
  const [windowHeight] = useState(height);
  const [userData, setUserData] = useState(null);
  const [isUserLogin, setIsUserLogin] = useState(null);
  const [apiMsg, setApiMsg] = useState('');

  const device_id = getDeviceId();

  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    // Fetch current location
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => console.error(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  const removeUser = async () => {
    setUserData(null);
    AsyncStorage.clear();
  };
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('login_user');
      if (value !== null) {
        // We have data!!
        setUserData(JSON.parse(value));
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
        removeUser,
        isUserLogin,
        setIsUserLogin,
        apiMsg,
        setApiMsg,
        device_id,
        initialRegion,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
