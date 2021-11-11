import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';

import styles from './styles';

import Button from '../../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {reset, makeDevice} from '../../actions/';
import {scan, stopScan} from '../../actions/bluetoothActions';
import useBle from '../../hooks/useBle';
import {checkBluetooth_, requestBluetooth_} from '../../services/permissions';
import DeviceComponent from '../../components/device';

type Props = {};

const HomeScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const devices = useSelector(state => state.bluetooth.devices);
  const bluetoothStatus = useSelector(state => state.bluetooth.isBluetoothOn);
  let color = bluetoothStatus ? '#798ce0' : 'grey';

  useEffect(() => {
    requestBluetooth_();
  }, []);

  return (
    <View style={{...styles.mainContainerStyle, backgroundColor: color}}>
      {/* <Text style={styles.text}> Some Text </Text> */}
      <Button title="TurnOn" onPress={() => dispatch(scan())} />
      <Button title="TurnOff" onPress={() => dispatch(stopScan())} />
      <Button title="RESET" onPress={() => dispatch(reset())} />
      <FlatList
        style={{width: '100%'}}
        data={devices}
        renderItem={({item}) => {
          return <DeviceComponent key={item.id} device={item} />;
        }}
        inverted
      />
    </View>
  );
};

export default HomeScreen;
