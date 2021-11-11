import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    color: 'grey',
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#c4c8cc',
    borderRadius: 1,
    backgroundColor: 'white',
    marginVertical: 0,
    width: '100%',
    height: 60,
  },

  lefContainer: {
    flexDirection: 'row',
    borderColor: '#c4c8cc',
    marginTop: 2,
  },
  midContainer: {
    justifyContent: 'space-around',
  },
  textname: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  connectButton: {
    width: 150,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c4c8cc',
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#798ce0',
  },
  deviceId: {
    fontSize: 16,
    color: 'grey',
  },
  connectButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  connectButtonText: {
    color: 'black',
    fontSize: 20,
  },
});
export default styles;
