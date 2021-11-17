import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    color: 'grey',
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#c4c8cc',
    borderRadius: 1,
    backgroundColor: 'white',
    width: '100%',
    height: 60,
  },

  lefContainer: {
    flexDirection: 'row',
    borderColor: '#c4c8cc',
    marginTop: 2,
  },
  midContainer: {
    paddingHorizontal: 5,
    justifyContent: 'space-around',
  },
  textname: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  connectButton: {
    width: 105,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c4c8cc',
    marginLeft: 5,
    marginRight: 0,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceId: {
    fontSize: 16,
    color: 'grey',
  },
  connectButtonContainer: {
    paddingRight: 5,
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  connectButtonText: {
    color: 'black',
    fontSize: 18,
  },
});
export default styles;
