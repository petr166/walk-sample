import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  ViewProps,
  ActivityIndicatorProps,
} from 'react-native';

import { colors } from '@app/config/colors';

interface LoadingOverlayProps extends ViewProps {
  /** ActivityIndicator properties */
  spinnerProps?: ActivityIndicatorProps;
}

/**
 * Overlay taking up the entire screen;
 * Should be used when you want to block user interaction during data processing etc.
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  style,
  spinnerProps = {},
  children,
  ...props
}) => {
  return (
    <View style={[styles.overlay, style]} {...props}>
      <ActivityIndicator
        size="large"
        color={colors.primary}
        {...spinnerProps}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', // will stay on top of everything else
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .6)', // semitransparent white
  },
});
