import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import { colors } from '@app/config/colors';

interface ActivityItemContentProps {
  /** activity data */
  data: {
    /** calories */
    move: number;
    /** minutes */
    exercise: number;
    /** hours */
    stand: number;
  };
}

/** Custom content for Activity tile */
export const ActivityItemContent: React.FC<ActivityItemContentProps> = ({
  data: { move, exercise, stand },
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.sectionTitle, { color: colors.move }]}>Move</Text>
        <Text style={styles.valueText}>
          {move} <Text style={styles.unitText}>Cal</Text>
        </Text>
      </View>

      <View style={styles.separator} />

      <View>
        <Text style={[styles.sectionTitle, { color: colors.exercise }]}>
          Exercise
        </Text>
        <Text style={styles.valueText}>
          {exercise} <Text style={styles.unitText}>min</Text>
        </Text>
      </View>

      <View style={styles.separator} />

      <View>
        <Text style={[styles.sectionTitle, { color: colors.stand }]}>
          Stand
        </Text>
        <Text style={styles.valueText}>
          {stand} <Text style={styles.unitText}>hrs</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 5,
  },
  valueText: { fontSize: 24, fontWeight: '700' },
  unitText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.grey,
  },
  separator: {
    width: 1,
    borderRadius: 10,
    marginHorizontal: 13,
    backgroundColor: colors.darkGrey,
  },
});
