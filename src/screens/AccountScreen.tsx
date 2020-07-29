import React, { useLayoutEffect } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, Alert } from 'react-native';
import { Avatar, ListItem, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { theme } from '@app/config/theme';
import { StateProvider } from '@app/globalState';
import { colors } from '@app/config/colors';
import { deleteUserReq } from '@app/network';
import { globalStyles } from '@app/config/styles';

export const AccountScreen: React.FC = () => {
  const [currentUser, setCurrentUser] = StateProvider.useGlobal('currentUser');
  const [, setIsLoggedIn] = StateProvider.useGlobal('isLoggedIn');
  const [, setAppLoading] = StateProvider.useGlobal('appLoading');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    // setup header buttons
    navigation.setOptions({
      headerRight: () => (
        <Button
          type="clear"
          title="Edit"
          onPress={() => Alert.alert('Coming soon')}
        />
      ),
    });
  }, [navigation]);

  if (!currentUser) {
    return null;
  }

  const windowWidth = Dimensions.get('window').width;
  const rightTitleWidth = windowWidth * 0.6;

  const handleDeleteAccConfirm = async () => {
    setAppLoading(true);
    try {
      await deleteUserReq();
      setCurrentUser(null);
      setIsLoggedIn(false);
    } catch (deleteErr) {
      console.log('AccountScreen -> deleteErr', deleteErr);
      Alert.alert(
        'There was an error contacting the server. Please try again later'
      );
    } finally {
      setAppLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[globalStyles.scrollViewContainer]}>
      <View style={{ backgroundColor: colors.white }}>
        <Avatar
          containerStyle={styles.avatarContainer}
          rounded
          size={theme.avatarSizeBig}
          source={{ uri: currentUser.avatarUrl || undefined }}
        />

        <View>
          <ListItem
            containerStyle={styles.listItemContainer}
            title="Name"
            rightTitle={currentUser.name}
            rightTitleStyle={[styles.rightText, { width: rightTitleWidth }]}
            topDivider
          />
          <ListItem
            containerStyle={styles.listItemContainer}
            title="Email"
            rightTitle={currentUser.email}
            rightTitleStyle={[styles.rightText, { width: rightTitleWidth }]}
            topDivider
          />
          <ListItem
            containerStyle={styles.listItemContainer}
            title="Password"
            rightTitle={'Change'}
            rightTitleStyle={[
              styles.rightText,
              { width: rightTitleWidth, color: colors.link },
            ]}
            chevron={theme.listItemChevron}
            topDivider
            bottomDivider
            onPress={() => Alert.alert('Coming soon')}
          />
        </View>
      </View>

      <View style={styles.nextSectionContainer}>
        <ListItem
          containerStyle={styles.listItemContainer}
          title="Delete account"
          titleStyle={{ color: colors.error }}
          topDivider
          bottomDivider
          onPress={() =>
            Alert.alert(
              'Are you sure?',
              'This will remove your account forever.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete account',
                  style: 'destructive',
                  onPress: handleDeleteAccConfirm,
                },
              ]
            )
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rightText: {
    textAlign: 'right',
    marginLeft: 15,
  },
  listItemContainer: {
    backgroundColor: colors.white,
  },
  avatarContainer: { alignSelf: 'center', marginVertical: 30 },
  nextSectionContainer: { backgroundColor: colors.white, marginTop: 50 },
});
