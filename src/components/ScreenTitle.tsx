import React from 'react';
import { Text, TextProps } from 'react-native-elements';
import { StyleSheet } from 'react-native';

interface ScreenTitleProps extends TextProps {}

/** iOSish like Screen Title */
export const ScreenTitle: React.FC<ScreenTitleProps> = ({
  style,
  ...props
}) => {
  return <Text style={[styles.title, style]} h3 {...props} />;
};

const styles = StyleSheet.create({
  title: {},
});
