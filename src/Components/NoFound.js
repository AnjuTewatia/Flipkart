import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Typography} from './Typography';

const NoFound = ({title}) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Typography
        style={{
          alignSelf: 'center',
          color: '#000',
          textAlign: 'center',
          textAlignVertical: 'center',
        }}>
        {title}
      </Typography>
    </View>
  );
};

export default NoFound;

const styles = StyleSheet.create({});
