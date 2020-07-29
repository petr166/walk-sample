import React from 'react';
import { StyleSheet, View, SectionList } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { ScreenTitle, SummaryItem, ActivityItemContent } from '@app/components';
import { theme } from '@app/config/theme';
import { StateProvider } from '@app/globalState';
import { PROFILE_TAB } from '@app/config/screenNames';
import { colors } from '@app/config/colors';
import { useHiddenHeader } from '@app/hooks';
import { globalStyles } from '@app/config/styles';

export const SummaryScreen: React.FC = () => {
  const [currentUser] = StateProvider.useGlobal('currentUser');
  const navigation = useNavigation();
  const { scrollThreshold, handleScroll } = useHiddenHeader();

  if (!currentUser) {
    return null;
  }

  return (
    <SectionList
      contentContainerStyle={[globalStyles.scrollViewContainer]}
      stickySectionHeadersEnabled={false}
      onScroll={handleScroll}
      ListHeaderComponent={
        <View
          style={[styles.margined, styles.titleRow]}
          onLayout={({ nativeEvent: { layout } }) => {
            scrollThreshold.current = layout.y + layout.height;
          }}>
          <ScreenTitle>Summary</ScreenTitle>
          <Avatar
            rounded
            source={{ uri: currentUser.avatarUrl || undefined }}
            onPress={() => navigation.navigate(PROFILE_TAB)}
          />
        </View>
      }
      sections={[
        {
          title: 'Favorites',
          data: [
            {
              id: 1,
              name: 'Activity',
              nameColor: colors.activity,
              nameIcon: 'fire',
              time: '6.40 PM',
              renderContent: () => (
                <ActivityItemContent
                  data={{ move: 204, exercise: 32, stand: 7 }}
                />
              ),
            },
            {
              id: 2,
              name: 'Mindful minutes',
              nameIcon: 'vector-circle',
              nameColor: colors.mindful,
              time: '2.20 PM',
              data: [{ value: 10, unit: 'min' }],
            },
            {
              id: 3,
              name: 'Resting heart rate',
              nameColor: colors.heart,
              nameIcon: 'heart',
              time: '3.30 PM',
              data: [{ value: 62, unit: 'BPM' }],
            },
            {
              id: 4,
              name: 'Sleep Analysis',
              nameColor: colors.sleep,
              nameIcon: 'bed-empty',
              time: '8.45 AM',
              data: [
                { value: 7, unit: 'hr' },
                { value: 30, unit: 'min' },
              ],
            },
            {
              id: 5,
              name: 'Walking Distance',
              nameColor: colors.activity,
              nameIcon: 'fire',
              time: '7.25 PM',
              data: [{ value: 4.5, unit: 'km' }],
            },
          ],
        },
      ]}
      renderItem={({ item }) => <SummaryItem item={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={[styles.margined, styles.sectionHeader]}>{title}</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  margined: { marginHorizontal: theme.sideMargin },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
  },
  titleRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
});
