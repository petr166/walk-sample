import 'react-native-gesture-handler'; // for react-navigation
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider, Icon } from 'react-native-elements';
import { StatusBar } from 'react-native';

import {
  RegisterScreen,
  SummaryScreen,
  ProfileScreen,
  AccountScreen,
} from './screens';
import {
  REGISTER,
  SUMMARY,
  PROFILE,
  SUMMARY_TAB,
  PROFILE_TAB,
  ACCOUNT,
} from './config/screenNames';
import { theme } from './config/theme';
import { colors } from './config/colors';
import { LoadingOverlay } from './components';
import { initGlobalState, StateProvider } from './globalState';

/** Theme for NavigationContainer */
// TODO: investigate a better way to manage app theming, as now we need to keep 2 theme objects
const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
  },
};

// initialize navigators
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SummaryStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// defining navigators outside App, to avoid unnecessary rerenders and
// some weird navigation issues when updating global state
const SummaryTab = () => (
  <SummaryStack.Navigator>
    <SummaryStack.Screen
      name={SUMMARY}
      component={SummaryScreen}
      options={{ headerStyle: { opacity: 0 } }}
    />
  </SummaryStack.Navigator>
);

const ProfileTab = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name={PROFILE}
      component={ProfileScreen}
      options={{ headerStyle: { opacity: 0 } }}
    />
    <ProfileStack.Screen name={ACCOUNT} component={AccountScreen} />
  </ProfileStack.Navigator>
);

const Main = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={SUMMARY_TAB}
      component={SummaryTab}
      options={{
        title: 'Summary',
        tabBarIcon: ({ color, size }) => (
          <Icon name="heart" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name={PROFILE_TAB}
      component={ProfileTab}
      options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Icon name="account-circle" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
/////

// APP ----->
const App = () => {
  const [splashScreen, setSplashScreen] = useState(true);
  const [isLoggedIn] = StateProvider.useGlobal('isLoggedIn');
  const [appLoading] = StateProvider.useGlobal('appLoading');

  useEffect(() => {
    initGlobalState().then(() => setSplashScreen(false));
  }, []);

  if (splashScreen) {
    return null;
  }

  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer theme={NavigationTheme}>
          <StatusBar barStyle="dark-content" />

          <RootStack.Navigator headerMode="screen">
            {/* if logged in show main tab navigator; else register screen */}
            {isLoggedIn ? (
              <RootStack.Screen
                name={'!Main'} // shouldn't navigate to this directly
                component={Main}
                options={{ headerShown: false }}
              />
            ) : (
              <RootStack.Screen
                name={REGISTER}
                component={RegisterScreen}
                options={{
                  headerStyle: { opacity: 0 },
                }}
              />
            )}
          </RootStack.Navigator>

          {appLoading && <LoadingOverlay />}
        </NavigationContainer>
      </ThemeProvider>
    </StateProvider>
  );
};
export default App;
