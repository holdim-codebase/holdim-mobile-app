import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const styles = StyleSheet.create({
  onboardingWrapper: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: normalize(17),
    paddingVertical: normalize(92),
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
    marginRight: normalize(12),
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
  btnNextText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    color: 'white',
  },
})

export default styles
