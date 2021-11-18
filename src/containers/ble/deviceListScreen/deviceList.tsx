import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {RootStackParamList} from '../../../types';
import {useFocusEffect} from '@react-navigation/native';

import styles from './styles';

import Button from '../../../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {reset} from '../../../actions';
import {scan, stopScan} from '../../../actions/bluetoothActions';
import DeviceComponent from '../../../components/device';
import {RootState} from '../../../store';
import Modalka from '../../../components/modal/modal';
import {
  BLUETOOTH_BUTTON_NEXT,
  BLUETOOTH_BUTTON_RESET,
  BLUETOOTH_BUTTON_TURN_OFF,
  BLUETOOTH_BUTTON_TURN_ON,
} from '../../../constants/titles';
import {COLOR_GREY, COLOR_LIGHT_GREY, COLOR_MUDDY_BLUE} from '../../../constants/colors';
import * as routes from '../../../constants/routes';

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

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
  const navigation = useNavigation<ScreenNavigationProp>();
  const errorMessage = useSelector((state: RootState) => state.ble.message);

  let color = bluetoothStatus ? COLOR_MUDDY_BLUE : COLOR_GREY;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  useFocusEffect(
    useCallback(() => {
      dispatch(reset());
      dispatch(scan());

      return () => dispatch(stopScan());
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerStyle: {backgroundColor: COLOR_LIGHT_GREY},
      headerTransparent: false,
    });
  }, []);

  const nextPressHandler = () => {
    navigation.navigate(routes.DEVICE_LOG_SCREEN);
  };

  return (
    <View style={{...styles.mainContainerStyle, backgroundColor: color}}>
      <View style={styles.listHeader}>
        <Modalka
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          message={modalText}
        />
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
          title={BLUETOOTH_BUTTON_NEXT}
          style={styles.floatButton}
          onPress={nextPressHandler}
          textStyle={styles.blackText}
        />
      )}
    </View>
  );
};

export default HomeScreen;
