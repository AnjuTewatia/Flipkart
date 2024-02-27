import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {getDeviceId} from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

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

  const removeUser = () => {
    setUserData(null);
    AsyncStorage.removeItem('login_user');
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

  const checkAndRequestLocationPermission = async () => {
    try {
      let permission;
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      } else {
        permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      }
      const result = await check(permission);

      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(permission);
        if (requestResult == RESULTS.BLOCKED) {
          console.log('Location permission blocked');
          return;
        }
      }
      getCurrentLocation();
    } catch (error) {
      console.error('Error checking or requesting location permission:', error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setInitialRegion({latitude, longitude});
        // Do something with latitude and longitude
      },
      error => {
        console.error('Error getting current location:', error);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error('Location permission denied');
            break;
          case error.POSITION_UNAVAILABLE:
            console.error('Position unavailable');
            break;
          case error.TIMEOUT:
            console.error('Location request timed out');
            break;
          default:
            console.error('An unknown error occurred');
            break;
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
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
        checkAndRequestLocationPermission,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
