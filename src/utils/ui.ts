import { Keyboard } from 'react-native';

/**
 * Wraps rn Keyboard.dismiss();
 * wait 300ms after Keyboard.dismiss call
 * */
export const dismissKeyboard = async () => {
  Keyboard.dismiss();
  return new Promise((r) => setTimeout(r, 300));
};
