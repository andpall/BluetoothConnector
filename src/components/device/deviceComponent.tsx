import React, {useEffect, useState} from 'react';
import {Text, Pressable, View, Image, ActivityIndicator} from 'react-native';
import styles from './styles';

// import {Device} from '../../types';
import Button from '../button';
import {useDispatch} from 'react-redux';
import {setMessage, updateDevice} from '../../actions';
import {updateConnect} from '../../actions/bluetoothActions';
import {Device} from 'react-native-ble-plx';

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

  const isConnected = device.isConnected;
  const isConnecting = device.isConnecting;

  const color = isConnected ? '#798ce0' : '#ffffff';
  const title = isConnecting
    ? 'Connecting..'
    : isConnected
    ? 'Connected'
    : 'Connect';

  useEffect(() => {
    setDeviceName(device.name);
    setDeviceId(device.id);
  }, []);
  const EmptyPressHanlder = () => {};

  const pressHanlderConnect = () => {
    dispatch(updateConnect(device));
  };

  const deviceShortInfo = {
    id: device.id,
    name: device.name,
    txPowerLevel: device.txPowerLevel,
  };

  const deviceShortText =
    `id : ${device.id} \nname : ${device.name} \n txLevel : ${device.txPowerLevel}`;

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
            title={title}
            textStyle={styles.connectButtonText}
            onPress={pressHanlderConnect}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default DeviceComponent;
