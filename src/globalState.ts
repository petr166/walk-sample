import { createProvider } from 'reactn';
import AsyncStorage from '@react-native-community/async-storage';
import { merge, cloneDeep } from 'lodash';

import { IUser } from './types';
import Callback from 'reactn/types/callback';

const STORAGE_KEY = '@walkapp:data';

export interface IGlobalState {
  currentUser: IUser | null;
  appLoading: boolean;
  isLoggedIn: boolean;
}

/** default global state */
export const initialState: IGlobalState = {
  currentUser: null,
  appLoading: false,
  isLoggedIn: false,
};

/**
 * Global state provider;
 *
 * should be used for read/write as following: `StateProvider.useGlobal('stateName')`
 */
export const StateProvider = createProvider(initialState);

/**
 * State change callback;
 *
 * will write a state copy in AsyncStorage, to store data between app opens
 */
const persistState: Callback<IGlobalState> = (globalState) => {
  console.log('GLOBAL STATE CHANGE:', globalState);

  // will write global state with some exceptions e.g. appLoading
  // this is so if you close the app with loading overlay visible, it will not stay this way on restart
  const { appLoading, ...toPersist } = globalState;

  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
  return null;
};

/**
 * Pull state from storage & setup Provider;
 *
 * should be waited for before any app action
 */
// TODO: should probably implement global state with reducer, to restrict direct manipulation
export const initGlobalState = async (): Promise<IGlobalState> =>
  new Promise(async (resolve) => {
    // await AsyncStorage.clear(); // to clean storage on development
    const stateFromStorage = await AsyncStorage.getItem(STORAGE_KEY);
    const persistedState = stateFromStorage ? JSON.parse(stateFromStorage) : {};

    // merge (not deep) initialState & persisted state
    const state = cloneDeep(initialState);
    merge(state, persistedState);
    console.log('STATE:', state);

    // initialize state then add persist callback
    StateProvider.setGlobal(state, (globalState) => {
      StateProvider.addCallback(persistState);
      resolve(globalState);
    });
  });
