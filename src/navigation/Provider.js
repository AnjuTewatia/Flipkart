import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppProvider from '../Components/AppContext';
import Route from './Route';
import Toast from 'react-native-toast-message';

const Provider = () => {
  return (
    <AppProvider>
      <Route />
      <Toast visibilityTime={1000} />
    </AppProvider>
  );
};

export default Provider;

const styles = StyleSheet.create({});
