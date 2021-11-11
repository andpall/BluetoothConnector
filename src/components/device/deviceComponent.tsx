import React, {useEffect, useState} from 'react';
import {Text, Pressable, View, Image, ActivityIndicator} from 'react-native';
import styles from './styles';

import {Device} from '../../types';
import Button from '../button';
import {useDispatch, useSelector} from 'react-redux';
import {updateDevice} from '../../actions';
import {updateConnect} from '../../actions/bluetoothActions';

type Props = {
  device: Device;
};

const DeviceComponent = (props: Props) => {
  const {device} = props;
  const [deviceName, setDeviceName] = useState<string>('');
  const [deviceId, setDeviceId] = useState('');
  const dispatch = useDispatch();

  const isConnected = device.isConnected;
  const isConnecting = device.isConnecting;

  const color = isConnecting ? 'yellow' : isConnected ? '#798ce0' : '#ffffff';

  useEffect(() => {
    setDeviceName(device.name);
    setDeviceId(device.id);
  }, []);

  const pressHanlder = () => {
    dispatch(updateConnect(device));
  };

  return (
    <Pressable style={styles.mainContainer} onPress={pressHanlder}>
      <View style={styles.lefContainer}>
        <View style={styles.midContainer}>
          <Text style={styles.textname}>{deviceName}</Text>
          <Text numberOfLines={2} style={styles.deviceId}>
            {deviceId}
          </Text>
        </View>
        <View style={styles.connectButtonContainer}>
          <Button
            style={{...styles.connectButton, backgroundColor: color}}
            title="Connect"
            textStyle={styles.connectButtonText}
            onPress={pressHanlder}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default DeviceComponent;
