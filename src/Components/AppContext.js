import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Dimensions, Linking} from 'react-native';
import {getDeviceId} from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);
const AppProvider = ({children}) => {
  const {width, height} = Dimensions.get('window');
  const [windowWidth] = useState(width);
  const [windowHeight] = useState(height);
  const [userData, setUserData] = useState(null);
  const [isUserLogin, setIsUserLogin] = useState(null);
  const [apiMsg, setApiMsg] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);
  const [locationpermission, setLocationPermission] = useState(null);
  const device_id = getDeviceId();

  const [initialRegion, setInitialRegion] = useState(null);

  const goToSettings = () => {
    openSettings();
    // Linking.openSettings();
  };

  const removeUser = () => {
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

  const getUserProfile = async () => {
    try {
      const value = await AsyncStorage.getItem('userProfile');
      if (value !== null) {
        // We have data!!
        setUserProfile(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const requestNotificationPermission = async () => {
    try {
      const permission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
      const result = await check(permission);
      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(permission);
        if (requestResult == RESULTS.BLOCKED) {
          console.log('Notification permission blocked');
          return;
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
    }
  };

  const getFcmToken = async () => {
    try {
      const Token = await messaging().getToken();
      setFcmToken(Token);
    } catch (error) {}
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

      if (result === RESULTS.GRANTED) {
        // getCurrentLocation();
        // const requestResult = await request(permission);
        // if (requestResult == RESULTS.BLOCKED) {
        //   setLocationPermission(requestResult);
        //   console.log('Location permission blocked');
        //   return;
        // }
      }
    } catch (error) {
      console.error('Error checking or requesting location permission:', error);
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          resolve({latitude, longitude}); // Resolve the Promise with latitude and longitude
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
          reject(error); // Reject the Promise with the error
        },
        // {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  };
  useEffect(() => {
    // checkAndRequestLocationPermission();
    requestNotificationPermission();
    requestUserPermission();
    getUser();
    getUserProfile();
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
        fcmToken,
        setFcmToken,
        userProfile,
        setUserProfile,
        locationpermission,
        goToSettings,
        getCurrentLocation,
        setInitialRegion,
        getFcmToken,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
