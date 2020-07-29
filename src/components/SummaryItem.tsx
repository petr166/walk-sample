import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';

import { globalStyles } from '@app/config/styles';
import { colors } from '@app/config/colors';

interface SummaryItemProps {
  /** tile data */
  item: {
    /** card name e.g. 'Activity' */
    name: string;
    nameColor: string;
    /** card name icon  */
    nameIcon: string;
    /** last registered  */
    time: string;
    /** custom content render, it's this or data  */
    renderContent?: () => JSX.Element;
    /** default content info */
    data?: Array<{ value: number; unit: string }>;
  };
}

/** SummaryScreen Tile */
export const SummaryItem: React.FC<SummaryItemProps> = ({
  item: { name, time, renderContent, data, nameColor, nameIcon },
}) => {
  return (
    <View style={[globalStyles.sideMargined, styles.container]}>
      <View style={styles.headerRow}>
        <View style={[globalStyles.row]}>
          <Icon
            containerStyle={styles.nameIcon}
            name={nameIcon}
            color={nameColor}
            size={18}
          />
          <Text style={[styles.name, { color: nameColor }]}>{name}</Text>
        </View>

        <View style={[globalStyles.row]}>
          <Text style={styles.time}>{time}</Text>
          <Icon name="chevron-right" size={20} color={colors.grey} />
        </View>
      </View>

      {/* for custom items use renderContent function */}
      {renderContent
        ? renderContent()
        : data && (
            <View style={[globalStyles.row]}>
              {data.map(({ value, unit }) => (
                <Text key={unit} style={[styles.valueText]}>
                  {value} <Text style={styles.unitText}>{unit}</Text>
                </Text>
              ))}
            </View>
          )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 16,
    borderRadius: 12,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    minHeight: 90,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
  },
  nameIcon: { marginRight: 3 },
  time: {
    color: colors.grey,
    fontSize: 13,
  },
  valueText: { fontSize: 24, fontWeight: '700', marginRight: 6 },
  unitText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.grey,
  },
});
