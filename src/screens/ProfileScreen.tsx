import React from 'react';
import { Text, Avatar, ListItem } from 'react-native-elements';
import { SectionList, View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StateProvider } from '@app/globalState';
import { theme } from '@app/config/theme';
import { globalStyles } from '@app/config/styles';
import { ACCOUNT } from '@app/config/screenNames';
import { SectionHeader } from '@app/components';
import { colors } from '@app/config/colors';
import { logoutReq } from '@app/network';
import { useHiddenHeader } from '@app/hooks';

interface ISectionData {
  id: number;
  name: string;
  onPress?: () => any;
  color?: string;
}

/** Current user profile TAB */
export const ProfileScreen = () => {
  const [currentUser, setCurrentUser] = StateProvider.useGlobal('currentUser');
  const [, setAppLoading] = StateProvider.useGlobal('appLoading');
  const [, setIsLoggedIn] = StateProvider.useGlobal('isLoggedIn');
  const navigation = useNavigation();
  const { scrollThreshold, handleScroll } = useHiddenHeader();

  if (!currentUser) {
    return null;
  }

  const handleLogoutPress = async () => {
    setAppLoading(true);

    try {
      await logoutReq();

      setCurrentUser(null);
      setIsLoggedIn(false);
    } catch (logoutErr) {
      console.log('ProfileScreen -> logoutErr', logoutErr);
      Alert.alert(
        'There was an error contacting the server. Please try again later'
      );
    } finally {
      setAppLoading(false);
    }
  };

  return (
    <SectionList
      contentContainerStyle={[globalStyles.scrollViewContainer]}
      onScroll={handleScroll}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={
        <View
          style={styles.avatarBox}
          onLayout={({ nativeEvent: { layout } }) => {
            scrollThreshold.current = layout.y + layout.height;
          }}>
          <Avatar
            size={theme.avatarSizeBig}
            rounded
            source={{ uri: currentUser.avatarUrl || undefined }}
            onPress={() =>
              setCurrentUser({
                ...currentUser,
                // generate new mock avtar url
                avatarUrl: 'https://api.adorable.io/avatars/140/' + Date.now(),
              })
            }
          />
          <Text h4 style={styles.userName}>
            {currentUser.name}
          </Text>
        </View>
      }
      sections={[
        {
          header: { icon: 'account-heart', text: 'You' },
          data: [
            {
              id: 1,
              name: 'Account info',
              onPress: () => navigation.navigate(ACCOUNT),
            },
            { id: 2, name: 'Medical Profile' },
          ] as ISectionData[],
        },
        {
          header: { icon: 'settings', text: 'Settings' },
          data: [
            { id: 1, name: 'Notifications' },
            { id: 2, name: 'Share data' },
          ],
        },
        {
          data: [
            { id: 1, name: 'Export All Health Data' },
            {
              id: 2,
              name: 'Log out',
              color: colors.error,
              onPress: handleLogoutPress,
            },
          ],
        },
      ]}
      renderSectionHeader={({ section: { header } }) =>
        header && header.text ? (
          <SectionHeader icon={header.icon} title={header.text} />
        ) : (
          <View style={styles.sectionHeaderPlaceholder} />
        )
      }
      renderItem={({ item, index, section }) => {
        const isFirst = index === 0;
        const isLast = index === section.data.length - 1;

        return (
          <ListItem
            style={[
              globalStyles.sideMargined,
              styles.listItem,
              isFirst && styles.listItemFirst,
              isLast && styles.listItemLast,
            ]}
            titleStyle={[
              styles.listItemTitle,
              item.color ? { color: item.color } : undefined,
            ]}
            title={item.name}
            chevron={theme.listItemChevron}
            bottomDivider={!isLast}
            onPress={item.onPress}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  avatarBox: { alignItems: 'center', marginBottom: 10 },
  userName: { marginTop: 10, fontWeight: '500' },
  sectionHeaderPlaceholder: { height: 55 },
  listItem: { overflow: 'hidden' },
  listItemFirst: { borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  listItemLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  listItemTitle: { fontSize: 17 },
});
