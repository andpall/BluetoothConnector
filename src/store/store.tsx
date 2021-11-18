import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  Dispatch,
  AnyAction,
} from 'redux';
import logger from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunkMiddleware from 'redux-thunk';
import {BleManager, Device} from 'react-native-ble-plx';
import {composeWithDevTools} from 'redux-devtools-extension';
import {apiMiddleware} from '../services/api';

import bleReducer from '../reducers';

export interface RootState {
  ble: {
    device: {id: string; name: string; isConnected: boolean};
    devices: Device[];
    isBluetoothOn: boolean;
    message: string;
  };
}
export type AppDispatch = Dispatch<AnyAction>;

export const configureStore = () => {
  const rootReducer = combineReducers({
    ble: bleReducer,
  });

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const persitedReducer = persistReducer(persistConfig, rootReducer);

  const middlewares = [
    apiMiddleware,
    thunkMiddleware.withExtraArgument(
      new BleManager({
        restoreStateIdentifier: 'BleInTheBackground',
        restoreStateFunction: restoredState => {},
      }),
    ),
  ];
  if (__DEV__) {
    middlewares.push(logger);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);
  const composedEnhancers = compose(middlewareEnhancer);

  const store = createStore(
    persitedReducer,
    composeWithDevTools(composedEnhancers),
  );
  const persistor = persistStore(store);
  return {store, persistor};
};
