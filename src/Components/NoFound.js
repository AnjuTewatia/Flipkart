import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Typography} from './Typography';

const NoFound = ({title}) => {
  return (
    <Typography
      style={{
        alignSelf: 'center',
        color: '#000',
        textAlign: 'center',
        textAlignVertical: 'center',
        alignSelf: 'center',
      }}>
      {title}
    </Typography>
  );
};

export default NoFound;

const styles = StyleSheet.create({});
