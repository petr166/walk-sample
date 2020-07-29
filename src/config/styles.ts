import { StyleSheet } from 'react-native';

import { theme } from './theme';

/** styles that can be reused, sort of like CSS helper classes */
export const globalStyles = StyleSheet.create({
  sideMargined: {
    marginLeft: theme.sideMargin,
    marginRight: theme.sideMargin,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollViewContainer: {
    paddingBottom: 30,
  },
});
