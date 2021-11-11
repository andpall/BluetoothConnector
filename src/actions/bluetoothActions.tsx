import {
  addDevice,
  bluetoothOff,
  bluetoothOn,
  setMessage,
  updateDevice,
} from '.';
import {Device} from '../types';

export const scan = () => {
  return (dispatch, getState, DeviceManager) => {
    dispatch(bluetoothOn());
    DeviceManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        dispatch(setMessage(error.message));
        console.error(error);
        return;
      }
      device.isConnected().then((isConnected: boolean) => {
        let {
          bluetooth: {devices},
        } = getState();

        const isScanned = checkIsScanned(device, devices);
        if (!isScanned) {
          dispatch(
            addDevice({
              id: device.id,
              name: device.name,
              isConnected: isConnected,
              isConnecting: false,
            }),
          );
        }
      });
    });
  };
};

const checkIsScanned = (device: any, devices: any[]) => {
  const found = devices.find(
    deviceInStorage => deviceInStorage.id === device.id,
  );
  if (!found) {
    return false;
  }
  return true;
};

export const stopScan = () => {
  return (dispatch, getState, DeviceManager) => {
    let {
      bluetooth: {device, devices},
    } = getState();
    DeviceManager.stopDeviceScan();
    dispatch(bluetoothOff());
  };
};

export const updateConnect = (device: Device) => {
  return (dispatch, getState, DeviceManager) => {
    let {
      bluetooth: {devices},
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
        dispatch(setMessage(`${deviceUpdated.id} is connected`));
        // console.log(deviceUpdated);
      })
      .catch((error: any) => {
        dispatch(
          updateDevice({
            ...device,
            isConnecting: false,
          }),
        );
        dispatch(setMessage(error.message));
      });
  };
};
