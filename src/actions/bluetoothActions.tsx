import {BleManager, Device} from 'react-native-ble-plx';
import {
  addDevice,
  bluetoothOff,
  bluetoothOn,
  setMessage,
  updateDevice,
} from '.';
import {AppDispatch, RootState} from '../store/store';

export const scan = () => {
  return (
    dispatch: AppDispatch,
    getState: () => RootState,
    DeviceManager: BleManager,
  ) => {
    DeviceManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        dispatch(setMessage(JSON.stringify(error)));
        return;
      }
      dispatch(bluetoothOn());

      device &&
        device.isConnected().then((isConnected: boolean) => {
          let {
            ble: {devices},
          } = getState();

          const isScanned = checkIsScanned(device, devices);
          if (!isScanned) {
            dispatch(
              addDevice({
                ...device,
                isConnected: isConnected,
                isConnecting: false,
              }),
            );
          }
        });
    });
    dispatch(setMessage(''));
  };
};

const checkIsScanned = (device: Device, devices: Device[]) => {
  const found = devices.find(
    deviceInStorage => deviceInStorage.id === device.id,
  );
  if (!found) {
    return false;
  }
  return true;
};

export const stopScan = () => {
  return (
    dispatch: AppDispatch,
    getState: () => RootState,
    DeviceManager: BleManager,
  ) => {
    let {
      ble: {device, devices},
    } = getState();
    DeviceManager.stopDeviceScan();
    dispatch(bluetoothOff());
  };
};

export const updateConnect = (device: Device) => {
  return (
    dispatch: AppDispatch,
    getState: () => RootState,
    DeviceManager: BleManager,
  ) => {
    let {
      ble: {devices},
    } = getState();
    dispatch(
      updateDevice({
        ...device,
        isConnecting: true,
      }),
    );
    DeviceManager.connectToDevice(device.id, null)
      .then(deviceUpdated => {
        dispatch(
          updateDevice({
            ...device,
            isConnected: deviceUpdated.isConnected,
            isConnecting: false,
          }),
        );
        dispatch(setMessage(JSON.stringify(deviceUpdated)));
      })
      .catch((error: any) => {
        dispatch(
          updateDevice({
            ...device,
            isConnecting: false,
          }),
        );
        dispatch(setMessage(JSON.stringify(error)));
      });
  };
};
