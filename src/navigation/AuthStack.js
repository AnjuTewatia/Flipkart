import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/AuthScreens/Login';
import SignUp from '../screens/AuthScreens/SignUp';
import Forgot from '../screens/AuthScreens/Forgot';
import ResetPassword from '../screens/AuthScreens/ResetPassword';
import OtpScreen from '../screens/AuthScreens/OtpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{animation: 'slide_from_right'}}
      initialRouteName="login">
      <Stack.Screen
        component={Login}
        name="login"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={SignUp}
        name="signUp"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Forgot}
        name="forgot"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ResetPassword}
        name="resetPassword"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={OtpScreen}
        name="otpScreen"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
