import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    backgroundColor: '#000000',
    marginLeft: normalize(16),
    marginRight: normalize(16),
  },
  loginTitle: {
    color: '#8463DF',
    fontSize: normalize(48),
    marginTop: normalize(91),
    fontWeight: 'bold',
  },
  loginVerticalLine: {
    color: '#FFFFFF',
    fontSize: normalize(64),
    fontWeight: 'bold',
  },
  loginBottom: {
    marginTop: 'auto',
    marginBottom: normalize(92),
  },
  loginTextInput: {
    backgroundColor: '#161616',
    borderRadius: 7,
    paddingHorizontal: normalize(16),
    height: normalize(64),
    marginBottom: normalize(16),
    color: '#FFFFFF',
  },
  loginBtnGoWrapper: {
    flex: 1,
    height: normalize(64),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: normalize(53),
  },
  loginBtnGo: {
    flex: 1,
    height: normalize(64),
    borderRadius: 5,
    backgroundColor: '#8463DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnGoTitle: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: 'white',
  },
  loginDescriptionTitle: {
    fontSize: normalize(20),
    color: '#FFFFFF',
    paddingBottom: normalize(16),
  },
  loginDescription: {
    fontSize: normalize(16),
    color: '#FFFFFF',
    paddingLeft: normalize(8),
  },
  loginIncorrectWalletAddressText: {
    color: '#FF004D',
  },
  loginIncorrectWalletAddressInput: {
    borderColor: '#FF004D',
    borderWidth: 1,
  },
  loadingWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles
