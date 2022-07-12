import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const styles = StyleSheet.create({
  loadingWrapperFullScreen: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '30%',
    backgroundColor: 'black',
  },
  daoWrapper: {
    flex: 1,
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(24),
    width: '100%',
  },
  daoInfoWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: normalize(32),
  },
  daoImage: {
    width: normalize(80),
    height: normalize(80),
  },
  daoInfoTextWrapper: {
    flexDirection: 'column',
    marginLeft: normalize(12),
    width: normalize(236),
  },
  daoName: {
    fontSize: normalize(24),
    lineHeight: normalize(29),
    paddingBottom: normalize(4),
    fontWeight: '700',
    fontFamily: 'System',
    color: '#FFFFFF',
  },
  daoUserDetail: {
    fontSize: normalize(16),
    fontWeight: '300',
    fontFamily: 'System',
    color: '#FFFFFF',
  },
  daoUserAmount: {
    fontWeight: '700',
  },
  daoFollowSvg: {
    paddingBottom: normalize(40),
  },
  daoTitleDescription: {
    height: normalize(24),
    color: '#FFFFFF',
    fontSize: normalize(20),
    fontWeight: '700',
  },
  daoTextDescription: {
    color: '#FFFFFF',
    fontSize: normalize(14),
    fontWeight: '300',
  },
})

export default styles
