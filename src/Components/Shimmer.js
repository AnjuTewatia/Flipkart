// Shimmer.js
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const RenderItem = ({style, duration, shimmerColors, width}) => {
  return (
    <View style={[styles.shimmer, {width: width ? width : '100%'}]}>
      <ShimmerPlaceholder
        style={styles.img}
        duration={duration}></ShimmerPlaceholder>
      <View style={{marginHorizontal: 22}}>
        <ShimmerPlaceholder
          style={styles.title}
          duration={duration}></ShimmerPlaceholder>
        <ShimmerPlaceholder
          style={styles.text}
          duration={duration}></ShimmerPlaceholder>
      </View>
      <ShimmerPlaceholder
        style={styles.icon}
        duration={duration}></ShimmerPlaceholder>
    </View>
  );
};

const Shimmer = ({style, duration, shimmerColors, width}) => {
  return (
    <FlatList
      data={[1, 1, 1, 1, 1, 1, 1]}
      keyExtractor={item => item}
      renderItem={RenderItem}
    />
  );
};
export default Shimmer;

const styles = StyleSheet.create({
  shimmer: {
    width: '99%',
    height: 99,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  img: {
    width: 67,
    height: 67,
    borderRadius: 10,
  },
  title: {
    height: 20,
    marginVertical: 10,
  },
  text: {
    height: 15,
    marginVertical: 10,
  },
  icon: {
    width: 18,
    height: 18,
    position: 'absolute',
    right: 20,
    top: 20,
    borderRadius: 20,
  },
});
