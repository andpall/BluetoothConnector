import {
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  requestMultiple,
  PermissionStatus,
} from 'react-native-permissions';

const checkBluetooth_ = async (): Promise<{
  value: boolean;
  message: string;
}> => {
  return checkMultiple([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
  ])
    .then(statuses => {
      switch (statuses['android.permission.ACCESS_FINE_LOCATION']) {
        case 'unavailable':
          return {value: false, message: 'This feature is not available'};
          break;
        case 'blocked':
          return {
            value: false,
            message: 'The permission has not been blocked',
          };
          break;
        case 'limited':
          return {
            value: false,
            message: 'The permission is limited',
          };

          break;
        case 'granted':
          return {value: true, message: 'The permission is granted'};
          break;
        case 'denied':
          return {
            value: true,
            message: 'The permission is denied and not requestable anymore',
          };
          break;
      }
    })
    .catch(error => {
      return {value: true, message: error};
    });
};

const requestBluetooth_ = async () => {
  requestMultiple([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
  ]).then(statuses => {
    return (`Bluetooth ${statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]}`);
  });
};

export {checkBluetooth_, requestBluetooth_};
