import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView, Dimensions} from 'react-native';

import styles from './styles';

import Button from '../../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {reset} from '../../actions/';
import {scan, stopScan} from '../../actions/bluetoothActions';
import useBle from '../../hooks/useBle';
import {checkBluetooth_, requestBluetooth_} from '../../services/permissions';
import DeviceComponent from '../../components/device';
import {RootState} from '../../store';
import Modalka from '../../components/modal/modal';
import { BLUETOOTH_BUTTON_RESET, BLUETOOTH_BUTTON_TURN_OFF, BLUETOOTH_BUTTON_TURN_ON } from '../../constants/titles';

type Props = {};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen: React.FC<Props> = () => {
  const devices = useSelector((state: RootState) => state.ble.devices);
  const bluetoothStatus = useSelector(
    (state: RootState) => state.ble.isBluetoothOn,
  );

  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootState) => state.ble.message);

  let color = bluetoothStatus ? '#798ce0' : 'grey';
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    askPermissions();
  }, []);

  const askPermissions = async () => {
    await checkBluetooth_();
    await requestBluetooth_();
  };

  return (
    <View style={{...styles.mainContainerStyle, backgroundColor: color}}>
      <View style={styles.listHeader}>
        <Modalka
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          message={modalText}
        />
        <View style={styles.buttonContainer}>
          <Button title={BLUETOOTH_BUTTON_TURN_ON} onPress={() => dispatch(scan())} />
          <Button title={BLUETOOTH_BUTTON_TURN_OFF} onPress={() => dispatch(stopScan())} />
          <Button title={BLUETOOTH_BUTTON_RESET} onPress={() => dispatch(reset())} />
        </View>
        <ScrollView
          style={{height: windowHeight * 0.4}}
          nestedScrollEnabled={true}>
          <Text style={styles.text}>
            {errorMessage !== '' ? errorMessage : ' '}
          </Text>
        </ScrollView>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          style={{width: '100%'}}
          data={devices}
          renderItem={({item}) => (
            <DeviceComponent
              key={item.id}
              device={item}
              setModalVisible={value => setModalVisible(value)}
              setModalText={value => setModalText(value)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
