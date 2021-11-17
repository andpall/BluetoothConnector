import {StyleSheet} from 'react-native';
import {COLOR_MUDDY_BLUE} from '../../../constants/colors';

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listHeader: {
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  text: {
    color: 'black',
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: 'stretch',
    tintColor: '798ce0',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginVertical: 3,
    width: 150
  },
});

export default styles;
