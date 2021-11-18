export type RootStackParamList = {
  Main: undefined;
  DeviceList: undefined;
  BlePermissions: undefined;
  DeviceLogScreen: undefined;
};

export type Device = {
  id: string;
  name: string;
  isConnected: boolean;
  isConnecting: boolean;
};
