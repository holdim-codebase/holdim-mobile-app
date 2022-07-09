import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const styles = StyleSheet.create({
  loadingWrapperFullScreen: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '50%',
    backgroundColor: 'black',
  },
  proposalWrapper: {
    flex: 1,
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(15),
  },
  proposalTopSectionWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  proposalIcon: {
    width: normalize(54),
    height: normalize(54),
    borderRadius: normalize(50),
  },
  proposalDaoTitle: {
    fontWeight: '700',
    fontSize: normalize(20),
    lineHeight: normalize(24),
    color: 'white',
    marginLeft: normalize(8),
    fontFamily: 'System',
  },
  proposalTitle: {
    fontWeight: '500',
    fontSize: normalize(16),
    lineHeight: normalize(19),
    color: 'white',
    fontFamily: 'System',
    marginBottom: normalize(18),
  },
  proposalButton: {
    width: '100%',
    backgroundColor: '#8463DF',
    height: normalize(34),
    borderRadius: normalize(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(14),
  },
  proposalButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(12),
    lineHeight: normalize(14),
    fontFamily: 'System',
  },
  proposalWebView: {
    marginTop: normalize(40),
  },
})

export default styles
