import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView, Dimensions} from 'react-native';

import styles from './styles';

import Button from '../../../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {reset} from '../../../actions';
import {scan, stopScan} from '../../../actions/bluetoothActions';
import {
  checkBluetooth_,
  requestBluetooth_,
} from '../../../services/permissions';
import DeviceComponent from '../../../components/device';
import {RootState} from '../../../store';
import Modalka from '../../../components/modal/modal';
import {
  BLUETOOTH_BUTTON_RESET,
  BLUETOOTH_BUTTON_TURN_OFF,
  BLUETOOTH_BUTTON_TURN_ON,
} from '../../../constants/titles';
import {COLOR_GREY, COLOR_MUDDY_BLUE} from '../../../constants/colors';

type Props = {};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen: React.FC<Props> = () => {
  const devices = useSelector((state: RootState) => state.ble.devices);
  const device = useSelector((state: RootState) => state.ble.device);
  const bluetoothStatus = useSelector(
    (state: RootState) => state.ble.isBluetoothOn,
  );

  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootState) => state.ble.message);

  let color = bluetoothStatus ? COLOR_MUDDY_BLUE : COLOR_GREY;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    askPermissions();
  }, []);

  const askPermissions = async () => {
    await checkBluetooth_();
    await requestBluetooth_();
  };

  const nextPressHandler = () => {};

  return (
    <View style={{...styles.mainContainerStyle, backgroundColor: color}}>
      <View style={styles.listHeader}>
        <Modalka
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          message={modalText}
        />
        <View style={styles.buttonContainer}>
          <Button
            title={BLUETOOTH_BUTTON_TURN_ON}
            style={styles.button}
            onPress={() => dispatch(scan())}
          />
          <Button
            title={BLUETOOTH_BUTTON_TURN_OFF}
            style={styles.button}
            onPress={() => dispatch(stopScan())}
          />
          <Button
            title={BLUETOOTH_BUTTON_RESET}
            style={styles.button}
            onPress={() => dispatch(reset())}
          />
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
      {device.isConnected && (
        <Button
          title="Next"
          style={styles.floatButton}
          onPress={nextPressHandler}
          textStyle={styles.blackText}
        />
      )}
    </View>
  );
};

export default HomeScreen;
