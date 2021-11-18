import React, {useEffect, useState} from 'react';
import {Text, Pressable, View, Image, ActivityIndicator} from 'react-native';
import styles from './styles';

import Button from '../button';
import {useDispatch, useSelector} from 'react-redux';
import {setMessage, updateDevice} from '../../actions';
import {disconnectDevice, updateConnect} from '../../actions/bluetoothActions';
import {Device} from 'react-native-ble-plx';
import {COLOR_MUDDY_BLUE, COLOR_WHITE} from '../../constants/colors';
import {
  DEVICE_BUTTON_CONNECT,
  DEVICE_BUTTON_CONNECTED,
  DEVICE_BUTTON_CONNECTING,
} from '../../constants/titles';

type Props = {
  device: Device;
  setModalVisible: (value: boolean) => void;
  setModalText: (value: string) => void;
};

const DeviceComponent = (props: Props) => {
  const {device, setModalVisible, setModalText} = props;
  const [deviceName, setDeviceName] = useState<string>('');
  const [deviceId, setDeviceId] = useState('');
  const dispatch = useDispatch();
  const {} = useSelector(state => state.ble);

  const isConnected = device.isConnected;
  const isConnecting = device.isConnecting;

  const color = isConnected ? COLOR_MUDDY_BLUE : COLOR_WHITE;
  const title = () => {
    if (isConnecting) {
      return DEVICE_BUTTON_CONNECTING;
    } else {
      return isConnected ? DEVICE_BUTTON_CONNECTED : DEVICE_BUTTON_CONNECT;
    }
  };

  useEffect(() => {
    setDeviceName(device.name);
    setDeviceId(device.id);
  }, []);
  const EmptyPressHanlder = () => {};

  const pressHanlderConnect = () => {
    if (device.isConnected || device.isConnecting) dispatch(disconnectDevice());
    else {
      dispatch(updateConnect(device));
    }
    // dispatch(disconnectDevice());
  };

  const deviceShortInfo = {
    id: device.id,
    name: device.name,
    txPowerLevel: device.txPowerLevel,
  };

  const deviceShortText = `id : ${device.id} \nname : ${device.name} \n txLevel : ${device.txPowerLevel}`;

  const pressHanlderInfo = () => {
    setModalText(deviceShortText);
    setModalVisible(true);
  };

  return (
    <Pressable style={styles.mainContainer} onPress={EmptyPressHanlder}>
      <View style={styles.lefContainer}>
        <View style={styles.midContainer}>
          <Text style={styles.textname}>{deviceName}</Text>
          <Text numberOfLines={2} style={styles.deviceId}>
            {deviceId}
          </Text>
        </View>
        <View style={styles.connectButtonContainer}>
          <Button
            style={{...styles.connectButton, backgroundColor: '#f4f4f4'}}
            title="Info"
            textStyle={styles.connectButtonText}
            onPress={pressHanlderInfo}
          />
          <Button
            style={{...styles.connectButton, backgroundColor: color}}
            title={title()}
            textStyle={styles.connectButtonText}
            onPress={pressHanlderConnect}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default DeviceComponent;
