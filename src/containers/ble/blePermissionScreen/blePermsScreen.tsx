import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';

import styles from './styles';

import Button from '../../../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkBluetooth_,
  requestBluetooth_,
} from '../../../services/permissions';
import {RootState} from '../../../store';
import {
  BLUETOOTH_BUTTON_ASK_PERMS,
  BLUETOOTH_BUTTON_NEXT,
} from '../../../constants/titles';
import {
  COLOR_GREY,
  COLOR_MUDDY_BLUE,
  COLOR_WHITE,
} from '../../../constants/colors';
// import {DarkBleLogo} from '../../../assets';
import Logo from '../../../assets/images/bleY.png';
import {RootStackParamList} from '../../../types';
import * as routes from '../../../constants/routes';

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

type Props = {};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PersmScreen: React.FC<Props> = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const [permissions, setPermissions] = useState(false);
  const color = permissions ? COLOR_MUDDY_BLUE : COLOR_GREY;
  const message = permissions
    ? 'The permission is granted'
    : 'The permission is not granted';

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    let isAvailable = await checkBluetooth_();
    setPermissions(isAvailable);
  };

  const askPermissions = async () => {
    await requestBluetooth_();
  };

  const nextPressHandler = () => {
    if (permissions) {
      navigation.navigate(routes.DEVICE_LIST_SCREEN);
    } else {
    }
  };

  return (
    <View style={{...styles.mainContainerStyle, backgroundColor: COLOR_WHITE}}>
      <Image style={{...styles.image, tintColor: color}} source={Logo} />
      <Text style={styles.text}>{message}</Text>
      {!permissions ? (
        <Button
          title={BLUETOOTH_BUTTON_ASK_PERMS}
          style={{...styles.button}}
          onPress={askPermissions}
        />
      ) : (
        <></>
      )}
      <Button
        title={BLUETOOTH_BUTTON_NEXT}
        style={{...styles.button, backgroundColor: color}}
        onPress={nextPressHandler}
      />
    </View>
  );
};

export default PersmScreen;
