import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppProvider from '../Components/AppContext';
import Route from './Route';

const Provider = () => {
  return (
    <AppProvider>
      <Route />
    </AppProvider>
  );
};

export default Provider;

const styles = StyleSheet.create({});
