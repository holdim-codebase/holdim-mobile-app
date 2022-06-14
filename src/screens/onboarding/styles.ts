import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const styles = StyleSheet.create({
  onboardingWrapper: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: normalize(17),
    paddingVertical: 0,
  },
  onboardingTitle: {
    color: '#FFFFFF',
    fontSize: normalize(48),
    fontWeight: 'bold',
  },
  onboardingSubtitle: {
    color: '#8463DF',
    fontSize: normalize(48),
    fontWeight: 'bold',
  },
  onboardingVerticalLine: {
    color: '#FFFFFF',
    fontSize: normalize(64),
    fontWeight: 'bold',
  },
  onboardingBottom: {
    marginBottom: normalize(92),
  },
  btnNextSkipWrapper: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  btnNext: {
    flex: 1,
    height: normalize(34),
    width: normalize(61),
    borderRadius: 5,
    backgroundColor: '#8463DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrevious: {
    flex: 1,
    height: normalize(34),
    width: normalize(34),
    borderRadius: 5,
    backgroundColor: '#8463DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSkip: {
    flex: 1,
    height: normalize(34),
    width: normalize(61),
    borderRadius: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSkipNextText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    color: 'white',
  },
  btnAddWalletWrapper: {
    flex: 1,
    height: normalize(64),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: normalize(53),
  },
  btnAddWallet: {
    flex: 1,
    height: normalize(64),
    borderRadius: 5,
    backgroundColor: '#8463DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAddWalletTitle: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: 'white',
  },
  btnAddWalletSubtitle: {
    fontSize: normalize(12),
    color: 'white',
  },
})

export default styles
