import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const RenderImages = ({source, style, ...props}) => {
  // Check if source is a URI or a local image (require method)
  const isUri =
    typeof source === 'string' &&
    (source.startsWith('http://') ||
      source.startsWith('https://') ||
      source.startsWith('file://'));

  if (isUri) {
    return (
      <FastImage
        resizeMode="contain"
        source={{uri: source}}
        style={[styles.image, style]}
        {...props}
      />
    );
  } else {
    return (
      <FastImage
        source={source}
        resizeMode="contain"
        style={[styles.image, style]}
        {...props}
      />
    );
  }
};

const styles = StyleSheet.create({});

export default RenderImages;
