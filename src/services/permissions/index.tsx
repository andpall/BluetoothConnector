import {
  PERMISSIONS,
    RESULTS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';

const checkBluetooth_ = async () => {
  checkMultiple([
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
  ])
    .then(statuses => {
      switch (statuses) {
        case statuses[RESULTS.UNAVAILABLE]:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case statuses[RESULTS.DENIED]:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case statuses[RESULTS.LIMITED]:
          console.log('The permission is limited: some actions are possible');
          break;
        case statuses[RESULTS.GRANTED]:
          console.log('The permission is granted');
          break;
        case statuses[RESULTS.BLOCKED]:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch(error => {
      console.debug(error);
    });
};

const requestBluetooth_ = async () => {
  requestMultiple([
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
  ]).then(statuses => {
    console.debug('Bluetooth', statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN]);
  });
};


export {checkBluetooth_, requestBluetooth_};
