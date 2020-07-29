import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

/**
 * Mimic iOS behaviour: when scrolling down past the screen title, display header
 *
 * @param initialScrollThreshold - initial value for scrollThreshold
 */
export const useHiddenHeader = (initialScrollThreshold = 40) => {
  const headerVisible = useRef(false);
  const scrollThreshold = useRef(initialScrollThreshold);
  const navigation = useNavigation();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {
      nativeEvent: { contentOffset },
    } = e;

    // scroll position past `scrollThreshold`
    const visible = contentOffset.y > scrollThreshold.current - 5;

    // call navigation.setOptions() only for changing the value
    if (visible !== headerVisible.current) {
      headerVisible.current = visible;

      // TODO: implement animation instead of sudded appearance
      navigation.setOptions({
        headerStyle: {
          opacity: visible ? 1 : 0,
        },
      });
    }
  };

  return {
    /**
     * Header is shown is scrolled past this value
     *
     * Can be set to the height of screen title for example
     *
     * e.g. `<View {...} onLayout={({ nativeEvent: { layout } }) => {
            scrollThreshold.current = layout.y + layout.height;
          }}> />`
     */
    scrollThreshold,
    /**
     * Scroll handler, attach to `ScrollView` or inherited components
     *
     * e.g. `<FlatList {...} onScroll={handleScroll} />`
     */
    handleScroll,
  };
};
