import React from 'react';
import { Text, TextProps } from 'react-native-elements';
import { StyleSheet, Linking, Alert } from 'react-native';

import { colors } from '@app/config/colors';

interface LinkProps extends TextProps {
  /** url to open */
  to: string;
}

/** Link Component, opens url in default app */
export const Link: React.FC<LinkProps> = ({ to, style, ...props }) => {
  return (
    <Text
      style={[styles.link, style]}
      onPress={() => {
        // will use system's default app for opening url
        Linking.openURL(to).catch((err) => {
          console.log('Link -> Linking.openURL -> err', err);
          Alert.alert('Error', 'You cannot open this url.');
        });
      }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  link: {
    color: colors.link,
    textDecorationLine: 'underline',
  },
});
