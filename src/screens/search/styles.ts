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
  searchWrapper: {
    flex: 1,
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(16),
  },
  searchBar: {
    backgroundColor: 'rgba(196, 196, 196, 0.2)',
    fontColor: 'white',
    width: '100%',
    borderRadius: normalize(10),
  },
  searchBarText: {
    color: 'white',
    fontSize: normalize(12),
  },
  textInputStyle: {
    color: '#DDDDDD',
    fontSize: normalize(12),
  },
  searchListWrapper: {
    width: '100%',
    marginVertical: normalize(16),
    borderTopColor: '#2F2F2F',
    borderTopWidth: 1,
  },
  searchDaoWrapper: {
    paddingVertical: normalize(14),
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#2F2F2F',
    borderBottomWidth: 1,
  },
  searchDaoLogoTextWrapper: {
    alignContent: 'center',
    flexDirection: 'row',
  },
  searchDaoLogo: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(50),
  },
  searchDaoTextWrapper: {
    paddingLeft: normalize(10),
  },
  searchDaoName: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: '400',
  },
  searchDaoPrice: {
    color: 'white',
    fontSize: normalize(12),
    fontWeight: '300',
  },
  searchDaoFollowSvg: {
    paddingTop: normalize(7),
  },
})

export default styles
