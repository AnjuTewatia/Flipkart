import React from 'react';
import {PixelRatio, StyleSheet, Text, TextProps} from 'react-native';
import {COLORS} from '../utils/styleConst';
interface IProps extends TextProps {
  type?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'error'
    | 'label'
    | 'sm'
    | 'xs';
  white?: boolean;
  children: any;
}
export const Typography: React.FC<IProps> = ({
  type = 'p',
  white,
  children,
  ...rest
}) => {
  const fontFamily = 'DMSans_18pt-Regular';
  const styles = StyleSheet.create({
    h1: {
      fontSize: 30,
      lineHeight: 30 * 1.5,
      fontFamily: fontFamily,
      color: white ? COLORS.secondary : COLORS.heading,
    },
    h2: {
      fontSize: 24,
      fontFamily: fontFamily,
      color: white ? COLORS.secondary : COLORS.heading,
    },
    h3: {
      fontSize: 20,
      color: white ? COLORS.secondary : COLORS.heading,
      fontFamily: fontFamily,
    },
    h4: {
      fontSize: 18,
      fontFamily: fontFamily,
      color: white ? COLORS.secondary : COLORS.heading,
    },
    h5: {
      fontSize: 16,
      fontFamily: fontFamily,
      color: white ? COLORS.secondary : COLORS.heading,
    },
    h6: {
      fontSize: 14,
      fontFamily: fontFamily,
      color: white ? COLORS.secondary : COLORS.heading,
    },
    p: {
      fontSize: 16,
      lineHeight: 16 * 1.45,
      color: white ? COLORS.lightWhite : COLORS.grey,
      fontFamily: fontFamily,
    },
    label: {
      fontSize: 16,
      lineHeight: 16 * 1.25,
      color: COLORS.heading,
      fontFamily: 'mont400',
    },
    sm: {
      fontSize: 14,
      lineHeight: 14 * 1.45,
      color: white ? COLORS.lightWhite : COLORS.grey,
      fontFamily: 'mont400',
    },
    xs: {
      fontSize: 12,
      lineHeight: 12 * 1.35,
      color: white ? COLORS.lightWhite : COLORS.grey,
      fontFamily: 'mont400',
    },
    error: {
      fontSize: 11,
      lineHeight: 12,
      color: COLORS.error,
      fontFamily: 'mont400',
    },
  });
  return (
    <Text {...rest} style={[styles[type], rest.style]}>
      {children}
    </Text>
  );
};
