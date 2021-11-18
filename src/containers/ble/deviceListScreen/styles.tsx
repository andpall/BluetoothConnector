import {StyleSheet} from 'react-native';
import { COLOR_GREY, COLOR_MUDDY_BLUE, COLOR_WHITE } from '../../../constants/colors';

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
  },
  listHeader: {
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
  blackText: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginVertical: 7,
    marginHorizontal: 3,
  },
  floatButton: {
    width: 80,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLOR_WHITE,
    position: 'absolute',
    borderColor: COLOR_MUDDY_BLUE,
    borderWidth: 2,
    bottom: 10,
    right: 10,
  },
});

export default styles;
