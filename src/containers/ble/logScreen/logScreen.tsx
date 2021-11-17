import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView, Dimensions} from 'react-native';

import styles from './styles';

import Button from '../../../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {reset, setMessage} from '../../../actions';
import {
  disconnectDevice,
  scan,
  stopScan,
  subscibeOnDevice,
} from '../../../actions/bluetoothActions';
import {RootState} from '../../../store';
import {
  BLUETOOTH_BUTTON_RESET,
  BLUETOOTH_BUTTON_TURN_OFF,
  BLUETOOTH_BUTTON_TURN_ON,
} from '../../../constants/titles';
import {COLOR_GREY, COLOR_MUDDY_BLUE} from '../../../constants/colors';
import * as routes from '../../../constants/routes';
import {Device} from 'react-native-ble-plx';
import Navigation from '../../../navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {RootStackParamList} from '../../../types';

type Props = {};
type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen: React.FC<Props> = () => {
  const devices = useSelector((state: RootState) => state.ble.devices);
  const device = useSelector((state: RootState) => state.ble.device);
  const bluetoothStatus = useSelector(
    (state: RootState) => state.ble.isBluetoothOn,
  );

  const dispatch = useDispatch();
  const navigation = useNavigation<ScreenNavigationProp>();

  let color = bluetoothStatus ? COLOR_MUDDY_BLUE : COLOR_GREY;
  const [text, setText] = useState('');

  const subscriber = () => {
    dispatch(subscibeOnDevice(() => setText('Device is disconnected')));
  };
  useEffect(() => {
    setText(JSON.stringify(device));
    subscriber();
    return subscriber;
  }, []);

  return (
    <View style={{...styles.mainContainerStyle, backgroundColor: color}}>
      <View style={styles.listHeader}>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title={BLUETOOTH_BUTTON_RESET}
            onPress={() => dispatch(disconnectDevice())}
          />
          <Button
            style={styles.button}
            title={BLUETOOTH_BUTTON_RESET}
            onPress={() => navigation.navigate(routes.DEVICE_LIST_SCREEN)}
          />
        </View>
        <ScrollView style={{height: windowHeight}} nestedScrollEnabled={true}>
          <Text style={styles.text}>{text}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
