import { Theme, IconProps } from 'react-native-elements';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from './colors';

// initialize MaterialCommunity font for icons to work
MaterialComIcon.loadFont();

const iconMarginLeft = -12;

/** icon pack name used across app */
export const MATERIAL_ICON_TYPE = 'material-community';

/** extra properties for Theme */
interface ThemeExtended {
  /** default whitespace between content and screen sides */
  sideMargin: number;
  /** avatar size for profile page */
  avatarSizeBig: number;
  /** default ListItem chevron, as passing boolean true uses a different icon pack;
   *
   * should be used like this `<ListItem {...} chevron={theme.listItemChevron} />`
   */
  listItemChevron: Partial<IconProps>;
}

/** holds default styles and properties for 'react-native-elements' components;
 *
 * tip: not picked up by FastRefresh, have to reload to see changes
 */
export const theme: Theme<ThemeExtended> = {
  colors: { ...colors },
  Text: {
    h1Style: {
      fontWeight: '700',
    },
    /** screen title */
    h3Style: {
      fontWeight: '700',
    },
  },
  Icon: {
    type: MATERIAL_ICON_TYPE,
  },
  Input: {
    leftIcon: {
      type: MATERIAL_ICON_TYPE,
      iconStyle: { marginLeft: iconMarginLeft, marginRight: 10 },
      // to shut ts
      props: {},
      key: 1,
    },
  },
  CheckBox: {
    iconType: MATERIAL_ICON_TYPE,
    uncheckedIcon: 'checkbox-blank-outline',
    checkedIcon: 'checkbox-marked-outline',
    containerStyle: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      paddingLeft: 0,
    },
    textStyle: { marginLeft: 6 },
  },
  sideMargin: 16,
  avatarSizeBig: 90,
  listItemChevron: {
    type: MATERIAL_ICON_TYPE,
    name: 'chevron-right',
    size: 18,
    containerStyle: { marginLeft: iconMarginLeft },
  },
};
