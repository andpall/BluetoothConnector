import * as types from '../constants/actionTypes';
import {Device} from '../types';

export const bluetoothOn = () => {
  return {
    type: types.BLUETOOTHON,
  };
};
export const bluetoothOff = () => {
  return {
    type: types.BLUETOOTHOFF,
  };
};
export const reset = () => {
  return {
    type: types.RESET,
  };
};
export const addDevice = (device: any) => {
  return {
    type: types.ADDDEVICE,
    payload: device,
  };
};
export const updateDevice = (device: any) => {
  return {
    type: types.UPDATEDEVICE,
    payload: device,
  };
};
export const setMessage = (message: string) => {
  return {
    type: types.SETMESSAGE,
    payload: message,
  };
};
