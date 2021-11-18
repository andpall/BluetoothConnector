import {PermissionsAndroid} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';

const checkBluetooth_ = async (): Promise<boolean> => {
  return checkMultiple([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
  ])
    .then(statuses => {
      return statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};

const requestBluetooth_ = async () => {
  requestMultiple([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
  ]).then(statuses => {
    return `Bluetooth ${statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]}`;
  });
};

export {checkBluetooth_, requestBluetooth_};
