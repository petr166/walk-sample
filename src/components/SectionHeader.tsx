import React from 'react';
import { Icon } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

import { globalStyles } from '@app/config/styles';

interface SectionHeaderProps {
  /** icon name */
  icon?: string;
  /** header text */
  title: string;
}

/** SectionList header with? icon */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
}) => (
  <View style={[globalStyles.sideMargined, globalStyles.row, styles.container]}>
    {icon && (
      <Icon containerStyle={styles.iconContainer} name={icon} size={20} />
    )}

    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { marginTop: 30, marginBottom: 6 },
  iconContainer: { marginRight: 3 },
  title: { fontSize: 20, fontWeight: '700' },
});
