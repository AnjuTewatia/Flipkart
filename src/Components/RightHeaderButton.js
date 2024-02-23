import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RenderImages from './RenderImages';

import {Typography} from './Typography';

const RightHeaderButton = ({onPress, icon, title}) => {
  return (
    <Pressable style={styles.rightbtnContainer} onPress={onPress}>
      <RenderImages source={icon} style={styles.icon} />
      <Typography type="sm" style={styles.title}>
        {title}
      </Typography>
    </Pressable>
  );
};

export default RightHeaderButton;

const styles = StyleSheet.create({
  rightbtnContainer: {flexDirection: 'row', alignItems: 'center'},
  icon: {width: 17, height: 17, marginHorizontal: 2},
  title: {
    marginHorizontal: 2,
    color: '#F87E7D',
    fontWeight: '500',
    fontSize: 14,
  },
});
