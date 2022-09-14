import {Platform, StatusBar, StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? normalize(44) : StatusBar.currentHeight

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
  welcomeWrapper: {
    flex: 1,
    height: STATUSBAR_HEIGHT,
  },
  welcomeStatusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: 'rgba(22, 22, 22, 1)',
  },
  welcomeFeedWrapper: {
    backgroundColor: 'rgba(22, 22, 22, 1)',
    height: normalize(52),
    alignContent: 'center',
    alignItems: 'center',
  },
  welcomeFeedText: {
    color: 'white',
    fontWeight: '500',
    fontSize: normalize(16),
    textAlign: 'center',
    lineHeight: normalize(52),
  },
  welcomeContentWrapper: {
    paddingHorizontal: normalize(16),
  },
  welcomeTextWrapper: {
    paddingTop: normalize(29),
    paddingBottom: normalize(33),
  },
  welcomeTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(20),
    lineHeight: normalize(30),
    paddingBottom: normalize(5),
  },
  welcomeText: {
    color: 'rgba(226, 223, 223, 1)',
    fontWeight: '400',
    fontSize: normalize(16),
    lineHeight: normalize(19),
  },
  welcomeProjectsListWrapper: {
    borderTopColor: 'rgba(193, 193, 193, 0.5)',
    borderTopWidth: 0.5,
    paddingBottom: normalize(17),
    marginTop: normalize(2),
  },
  welcomeProjectsListTitle: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: '700',
    lineHeight: normalize(24),
  },
  welcomeProjectWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(193, 193, 193, 0.5)',
    borderBottomWidth: 0.5,
    paddingVertical: normalize(13),
  },
  welcomeDaoLogoTextWrapper: {
    alignContent: 'center',
    flexDirection: 'row',
  },
  welcomeDaoImage: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(50),
  },
  welcomeDaoTextWrapper: {
    height: '100%',
    flexDirection: 'column',
    paddingLeft: normalize(12),
  },
  welcomeDaoTitle: {
    color: 'white',
    fontSize: normalize(16),
    lineHeight: normalize(20),
    fontWeight: '700',
    fontFamily: 'System',
  },
  welcomeDaoShareAmount: {
    color: 'white',
    fontSize: normalize(12),
    lineHeight: normalize(16),
    fontWeight: '700',
    fontFamily: 'System',
  },
  welcomeDaoShareText: {
    color: 'white',
    fontSize: normalize(12),
    lineHeight: normalize(16),
    fontWeight: '300',
    fontFamily: 'System',
  },
  welcomeDaoPrice: {
    color: 'white',
    fontSize: normalize(12),
    fontWeight: '300',
  },
  welcomeDaoFollowSvg: {
    paddingTop: normalize(7),
    paddingRight: normalize(3),
  },
  welcomeBtnContinueWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: normalize(45),
    paddingHorizontal: normalize(16),
  },
  welcomeBtnContinue: {
    flex: 1,
    height: normalize(64),
    borderRadius: 5,
    backgroundColor: '#8463DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeBtnContinueDisabled: {
    flex: 1,
    height: normalize(64),
    borderRadius: 5,
    backgroundColor: '#ACACAC80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeBtnContinueTitle: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: 'white',
  },
})

export default styles
